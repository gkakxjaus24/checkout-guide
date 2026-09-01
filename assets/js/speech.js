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

/**
 * 다음 speakScreen() 호출을 "새 발화"가 아니라 "이어 읽기"로 처리할지 여부.
 * 버튼 클릭 시 버튼 라벨을 먼저 읽고, 그 직후 일어나는 화면 전환의 안내문을
 * 끊지 않고 이어서 읽게 하기 위한 1회용 플래그입니다. (app.js의 handleAction에서 설정)
 */
let _continueSpeechQueue = false;

/** 다음 speakScreen 호출이 현재 재생 중인 음성을 끊지 않고 이어지도록 예약합니다. */
function queueNextSpeechAsContinuation() {
  _continueSpeechQueue = true;
}

/**
 * 주어진 텍스트를 지정한 언어로 읽습니다.
 * @param {string} text
 * @param {string} langCode - messages.js의 언어 코드 (예: 'ko', 'vi')
 * @param {boolean} [interrupt=true] - true면 재생 중인 음성을 멈추고 바로 읽습니다.
 *   false면 재생 중인 음성 뒤에 이어서 읽습니다(큐에 추가).
 */
function speakText(text, langCode, interrupt) {
  if (!('speechSynthesis' in window) || !text) return;
  if (interrupt !== false) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = SPEECH_LANG_MAP[langCode] || langCode;
  window.speechSynthesis.speak(utterance);
}

/**
 * 안내 문구 안의 화살표(→, ←) 기호를 TTS가 자연스럽게 넘어가도록 쉼표로 바꿉니다.
 * (화면3B의 불릿 항목에 쓰입니다. 아랍어는 RTL이라 ← 방향을 씁니다.
 * 화면에 보이는 텍스트 자체는 바꾸지 않습니다.)
 */
function stripArrowForSpeech(str) {
  return str.replace(/[→←]/g, ',');
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
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    return;
  }

  const tr = t();
  let text = '';

  switch (screenName) {
    case SCREENS.SCREEN2:
      text = tr.screen2.message;
      break;
    case SCREENS.SCREEN3A:
      text = tr.screen3a.message;
      break;
    case SCREENS.SCREEN3B: {
      const s3b = tr.screen3b;
      const bullets = s3b.bullets.map(stripArrowForSpeech).join('. ');
      text = [s3b.intro, bullets, s3b.outro].join('. ');
      break;
    }
    case SCREENS.SCREEN3C:
      text = tr.screen3c.message;
      break;
    default:
      return;
  }

  const interrupt = !_continueSpeechQueue;
  _continueSpeechQueue = false;
  speakText(text, getLang(), interrupt);
}
