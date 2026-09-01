/**
 * app.js
 * ─────────────────────────────────────────────────────────────────────
 * 앱 진입점. 언어 상태 관리, 이벤트 처리, 초기화를 담당합니다.
 * App entry point: manages language state, handles events, initializes.
 *
 * 로드 순서 (index.html 기준):
 *   1. messages.js  → LANGUAGES, TRANSLATIONS
 *   2. router.js    → SCREENS, navigate, goBack, goHome, …
 *   3. speech.js    → speakText, queueNextSpeechAsContinuation, …
 *   4. ui.js        → renderCurrentScreen, buildScreen*, …
 *   5. app.js       → (현재 파일) 앱 초기화 및 이벤트 처리
 * ─────────────────────────────────────────────────────────────────────
 */

// ── 언어 상태 ─────────────────────────────────────────────────────────
let _currentLang = 'ko'; // 기본값: 한국어 (언어 선택 화면에서 덮어씌워짐)

/** 현재 선택된 언어 코드로 변경합니다. */
function setLang(code) {
  _currentLang = code;
}

/** 현재 선택된 언어 코드를 반환합니다. */
function getLang() {
  return _currentLang;
}

/**
 * 현재 언어의 번역 객체를 반환합니다.
 * ui.js에서 t().screen2.message 처럼 사용합니다.
 * 해당 코드가 없으면 한국어로 폴백합니다.
 */
function t() {
  return TRANSLATIONS[_currentLang] || TRANSLATIONS['ko'];
}

// ── 앱 초기화 ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // 라우터를 초기화하고 언어 선택 화면을 렌더링합니다.
  initRouter();
  renderCurrentScreen();

  // 이벤트 위임: 클릭 이벤트를 #app 하나에서 모두 처리합니다.
  // 개별 버튼마다 리스너를 붙이지 않아도 됩니다.
  document.getElementById('app').addEventListener('click', handleAction);
});

// ── 이벤트 핸들러 ─────────────────────────────────────────────────────
/**
 * [data-action] 속성을 활용한 이벤트 위임 처리.
 * 버튼에 data-action 값을 부여하면 이 함수 하나에서 모두 처리합니다.
 *
 * @param {MouseEvent} event
 */
function handleAction(event) {
  // 클릭한 요소 또는 가장 가까운 [data-action] 부모 요소를 찾습니다.
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;

  switch (action) {

    // ── 언어 선택 버튼 ─────────────────────────────────────────────
    case 'select-lang': {
      const lang = target.dataset.lang;
      if (lang && TRANSLATIONS[lang]) {
        startLangIntro(lang, target);
      }
      break;
    }

    // ── 화면2 네 가지 버튼 ─────────────────────────────────────────
    case 'btn1': speakChoiceAndNavigate(t().screen2.btn1, SCREENS.SCREEN3A); break;
    case 'btn2': speakChoiceAndNavigate(t().screen2.btn2, SCREENS.SCREEN3B); break;
    case 'btn3': speakChoiceAndNavigate(t().screen2.btn3, SCREENS.SCREEN3C); break;
    case 'btn4': speakChoiceAndNavigate(t().screen2.btn4, SCREENS.SCREEN3D); break;

    // ── 내비게이션 버튼 ────────────────────────────────────────────
    case 'back': goBack();  break;
    case 'home': goHome();  break;
  }
}

// ── 언어 선택 화면: 버튼 안 재생바로 안내음성 진행 표시 ────────────────
/**
 * 지금 재생 중인 "언어 소개" 상태(버튼 안 재생바 + 음성).
 * 다른 언어 버튼을 누르면 이 상태를 취소하고 새로 시작합니다(cancelLangIntro).
 */
let _langIntroState = null; // { track, fill, safetyTimeout }

/**
 * 언어 버튼을 눌렀을 때 호출됩니다. 화면2로 바로 넘어가지 않고, 눌린 버튼
 * 안의 재생바를 화면2 안내음성 길이에 맞춰 채우면서 음성을 재생합니다.
 * 음성이 끝나는 순간 재생바도 100%에 도달하고, 그 즉시 화면2로 넘어갑니다.
 * @param {string} lang - messages.js의 언어 코드
 * @param {HTMLElement} buttonEl - 클릭된 .lang-btn 요소
 */
function startLangIntro(lang, buttonEl) {
  cancelLangIntro(); // 재생 중이던 다른 언어 소개가 있으면 취소하고 새로 시작합니다.

  setLang(lang);
  resetSpeechFlags();

  const track = buttonEl.querySelector('[data-role="progress-track"]');
  const fill  = buttonEl.querySelector('[data-role="progress-fill"]');
  const text  = t().screen2.message;

  track.classList.add('is-active');
  _langIntroState = { track, fill, safetyTimeout: null };

  const finish = () => {
    if (_langIntroState) clearTimeout(_langIntroState.safetyTimeout);
    _langIntroState = null;
    fill.classList.remove('is-animating');
    fill.style.width = '100%';
    // 화면2 문구는 이 재생바 안내음성으로 이미 읽었으므로, 화면2 진입 시
    // speakScreen()이 같은 문구를 중복 재생하지 않도록 표시해둡니다.
    markScreenAsSpoken(SCREENS.SCREEN2);
    navigate(SCREENS.SCREEN2);
  };

  const estMs = estimateSpeechDurationMs(text);
  const utterance = speakText(text, lang);

  // 재생바는 다음 프레임부터 채우기 시작합니다(같은 프레임에서 폭을
  // 0%→100%로 바꾸면 브라우저가 transition을 생략할 수 있어 한 프레임 늦춥니다).
  requestAnimationFrame(() => {
    fill.classList.add('is-animating');
    fill.style.transitionDuration = estMs + 'ms';
    fill.style.width = '100%';
  });

  if (utterance) {
    utterance.onend = finish;
    utterance.onerror = finish;
    // 안전망: 어떤 이유로 onend가 오지 않아도 예상 시간 뒤엔 다음 화면으로 넘어갑니다.
    _langIntroState.safetyTimeout = setTimeout(finish, estMs + 1500);
  } else {
    // TTS 미지원 환경: 음성 없이 재생바 애니메이션 시간만큼 보여주고 넘어갑니다.
    _langIntroState.safetyTimeout = setTimeout(finish, estMs);
  }
}

/** 재생 중인 언어 소개(재생바 + 음성)를 취소하고 버튼을 원래 상태로 되돌립니다. */
function cancelLangIntro() {
  if (_langIntroState) {
    clearTimeout(_langIntroState.safetyTimeout);
    _langIntroState.track.classList.remove('is-active');
    _langIntroState.fill.classList.remove('is-animating');
    _langIntroState.fill.style.width = '0%';
    _langIntroState = null;
  }
  cancelSpeech();
}

/**
 * 화면2의 선택지 버튼(btn1/2/3) 공통 처리.
 * 누른 버튼의 문구를 먼저 음성으로 읽고, 결과 화면으로 이동합니다.
 * 결과 화면의 안내문은 곧바로 이어붙이지 않고, 버튼 문구 음성이 끝난 뒤
 * 텀을 두고 재생되도록 예약합니다(speech.js의 이어읽기 큐).
 * 두 문장이 바로 붙어 나오면 어색해서 텀을 둡니다.
 * @param {string} label - t().screen2.btnN
 * @param {string} targetScreen - SCREENS 상수
 */
function speakChoiceAndNavigate(label, targetScreen) {
  const utterance = speakText(label, getLang());
  queueNextSpeechAsContinuation();
  navigate(targetScreen);

  if (utterance) {
    const token = getPendingSpeechToken();
    const playContinuation = () => {
      setTimeout(() => runPendingContinuation(token), SPEECH_CONTINUATION_DELAY_MS);
    };
    utterance.onend = playContinuation;
    utterance.onerror = playContinuation; // 라벨 음성이 실패해도 결과 안내는 이어서 재생
  }
}
