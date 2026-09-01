/**
 * speech.js
 * ─────────────────────────────────────────────────────────────────────
 * 화면이 바뀔 때 해당 화면의 안내 문구를 음성(TTS)으로 읽어줍니다.
 * Reads each screen's guidance text aloud via the Web Speech API
 * (SpeechSynthesis) whenever the screen changes.
 *
 * 브라우저 내장 기능이라 별도 서버/API 키가 필요 없습니다.
 * 단, 언어별 음성 지원 여부는 기기·브라우저에 따라 다릅니다.
 * (특히 몽골어 mn, 싱할라어 si는 음성이 없는 기기가 많습니다.)
 *
 * 의존성: messages.js (TRANSLATIONS)
 *         app.js       (getLang, t)
 * ─────────────────────────────────────────────────────────────────────
 */

// ── 언어 코드(messages.js의 code) → TTS용 BCP-47 언어 태그 매핑 ────────
const SPEECH_LANG_MAP = {
  ko: 'ko-KR',
  en: 'en-US',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ru: 'ru-RU',
  es: 'es-ES',
  mn: 'mn-MN',
  vi: 'vi-VN',
  fr: 'fr-FR',
  de: 'de-DE',
  ar: 'ar-SA',
  tr: 'tr-TR',
  th: 'th-TH',
  si: 'si-LK',
  hi: 'hi-IN',
  id: 'id-ID',
};

// 버튼 라벨 음성이 끝난 뒤, 결과 화면 안내문을 읽기까지 쉬는 시간(ms).
// 두 문장이 곧바로 붙어 나오면 어색해서 살짝 텀을 둡니다.
const SPEECH_CONTINUATION_DELAY_MS = 1000;

/**
 * 다음 speakScreen() 호출을 "새 발화"가 아니라 "이어 읽기"로 처리할지 여부.
 * 버튼 클릭 시 버튼 라벨을 먼저 읽고, 그 직후 일어나는 화면 전환의 안내문을
 * (끊지 않고, 라벨이 끝난 뒤 텀을 두고) 이어서 읽게 하기 위한 1회용 플래그입니다.
 * (app.js의 handleAction에서 설정)
 */
let _continueSpeechQueue = false;

/** 다음 speakScreen 호출이 현재 재생 중인 음성을 끊지 않고 이어지도록 예약합니다. */
function queueNextSpeechAsContinuation() {
  _continueSpeechQueue = true;
}

/**
 * 각 화면의 안내문은 언어 선택 후 그 화면에 처음 도착했을 때 한 번만 읽습니다.
 * 뒤로가기 등으로 이미 읽은 화면에 다시 오면 다시 읽지 않습니다.
 * 언어를 새로 선택하면(app.js의 select-lang) 전부 초기화되어, 다음 손님에게는
 * 모든 화면이 다시 처음 한 번씩 읽힙니다.
 */
let _spokenScreens = new Set();

/** 모든 화면을 "아직 안 읽음" 상태로 되돌립니다. 언어를 새로 선택할 때 호출합니다. */
function resetSpeechFlags() {
  _spokenScreens.clear();
}

/**
 * 텍스트를 다 읽는 데 걸릴 대략적인 시간(ms)을 추정합니다.
 * TTS 엔진은 재생 전 정확한 길이를 알려주지 않으므로, 재생바 애니메이션의
 * 목표 시간으로 쓸 대략치입니다. 일부러 넉넉하게(실제보다 느리게) 잡습니다 —
 * 호출부(app.js)가 이 시간 동안 바를 100%가 아니라 그보다 낮은 상한까지만
 * 채우고, 실제 음성이 끝나는 시점(onend)에만 100%로 채워 넣기 때문에,
 * 이 추정이 짧아서 바가 음성보다 먼저 다 차버리는 일이 없습니다.
 * @param {string} text
 * @returns {number} 추정 시간(ms), 1200~9000 사이로 제한
 */
function estimateSpeechDurationMs(text) {
  const charCount = String(text).replace(/\s/g, '').length;
  const msPerChar = 140; // 대략적인 평균 발화 속도(넉넉하게 느린 쪽으로)
  return Math.min(9000, Math.max(1200, charCount * msPerChar));
}

/**
 * "이어 읽기"로 예약된, 아직 재생하지 않은 다음 발화.
 * 버튼 라벨 음성이 끝나면 이 내용을 SPEECH_CONTINUATION_DELAY_MS 뒤에 재생합니다.
 * 토큰(token)으로 어느 예약 건인지 구분해, 그 사이에 다른 동작으로 무효화된
 * 오래된 예약이 뒤늦게 튀어나오지 않게 막습니다.
 */
let _pendingContinuation = null; // { text, lang, token }
let _pendingToken = 0;

/**
 * 재생 중이거나 예약된 모든 음성을 취소합니다.
 * 화면 전환(뒤로가기, 홈, 새 언어 선택 등) 시점에 호출해
 * 지금과 무관해진 이전 발화가 뒤늦게 나오는 것을 막습니다.
 */
function cancelSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  _pendingContinuation = null;
}

/**
 * 주어진 텍스트를 지정한 언어로 읽습니다.
 * @param {string} text
 * @param {string} langCode - messages.js의 언어 코드 (예: 'ko', 'vi')
 * @param {boolean} [interrupt=true] - true면 재생 중인 음성을 멈추고 바로 읽습니다.
 *   false면 재생 중인 음성 뒤에 이어서 읽습니다(큐에 추가).
 * @returns {SpeechSynthesisUtterance|null} 실제로 재생을 시작한 utterance
 *   (호출자가 onend 등을 걸 수 있도록 반환합니다). 재생하지 못했으면 null.
 */
function speakText(text, langCode, interrupt) {
  if (!('speechSynthesis' in window) || !text) return null;
  if (interrupt !== false) {
    cancelSpeech();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = SPEECH_LANG_MAP[langCode] || langCode;
  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * 예약된 이어 읽기를 실제로 재생합니다. token이 예약 당시와 다르면
 * (그 사이 다른 동작으로 예약이 취소·교체된 것이므로) 아무것도 하지 않습니다.
 * @param {number} token
 */
function runPendingContinuation(token) {
  if (!_pendingContinuation || _pendingContinuation.token !== token) return;
  const { text, lang } = _pendingContinuation;
  _pendingContinuation = null;
  speakText(text, lang, false);
}

/**
 * 지금 예약되어 있는 이어 읽기의 토큰을 반환합니다.
 * app.js가 버튼 라벨 utterance의 onend에 걸 콜백에서, "그 시점에 유효했던
 * 예약"만 재생하도록 이 토큰을 기억해둡니다.
 * @returns {number}
 */
function getPendingSpeechToken() {
  return _pendingToken;
}

/**
 * 현재 화면(screenName)에 해당하는 안내 문구를 모아 현재 언어로 읽습니다.
 * ui.js의 renderCurrentScreen()에서 화면을 다시 그린 직후 호출됩니다.
 * 언어 선택 화면(LANG_SELECT)은 아직 언어가 정해지지 않았으므로 읽지 않습니다.
 * @param {string} screenName - SCREENS 상수 중 하나
 */
function speakScreen(screenName) {
  if (screenName === SCREENS.LANG_SELECT) {
    // 읽을 문구는 없지만, 재생 중이던 이전 화면 음성은 멈춥니다.
    cancelSpeech();
    return;
  }

  // 이번 발화가 직전 발화(버튼 라벨 등)를 끊어야 하는지 여부.
  const interrupt = !_continueSpeechQueue;
  _continueSpeechQueue = false;

  if (_spokenScreens.has(screenName)) {
    // 이미 한 번 읽은 화면에 재방문한 경우 새로 읽지 않습니다.
    // interrupt인 경우(예: 뒤로가기)에만 재생 중이던 이전 화면 음성을 멈추고,
    // 이어읽기인 경우(예: 방금 시작한 버튼 라벨)는 그대로 재생되게 둡니다.
    if (interrupt) cancelSpeech();
    return;
  }

  const tr = t();
  let text = '';

  switch (screenName) {
    case SCREENS.SCREEN2:
      text = tr.screen2.message;
      break;
    // SCREEN3A("감사합니다")는 버튼1 라벨 음성만으로 충분해 안내 음성을 재생하지 않습니다.
    case SCREENS.SCREEN3B:
      // 화면3B는 intro(청소직원이 도와줄 수 없다는 안내)만 읽습니다.
      // 불릿 목록·outro는 화면에는 표시되지만 음성으로는 읽지 않습니다.
      text = tr.screen3b.intro;
      break;
    case SCREENS.SCREEN3C:
      text = tr.screen3c.message;
      break;
    case SCREENS.SCREEN3D:
      // note(체크인 3시부터 가능 등 괄호 문구)는 화면에만 표시하고 읽지 않습니다.
      text = tr.screen3d.message;
      break;
    default:
      return;
  }

  _spokenScreens.add(screenName);

  if (interrupt) {
    speakText(text, getLang(), true);
    return;
  }

  // 이어읽기: 지금 바로 잇지 않고, 직전 발화(버튼 라벨)가 끝난 뒤
  // 텀을 두고 재생하도록 예약만 해둡니다. 실제 재생은 app.js가 버튼 라벨
  // utterance의 onend에서 runPendingContinuation()을 호출할 때 일어납니다.
  _pendingToken++;
  _pendingContinuation = { text, lang: getLang(), token: _pendingToken };
}
