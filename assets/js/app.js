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
// 언어는 두 가지입니다.
//   손님 언어(_currentLang) : 화면에 크게 표시되고 음성으로 읽히는 언어.
//   직원 언어(_staffLang)   : 손님용 문구 아래에 작게 붙는 해석의 언어.
//                             화면에만 표시되고 음성으로는 읽지 않습니다.
// 이 덕분에 한국인 직원이 중국어를 몰라도, 손님이 누른 버튼 아래의
// 작은 한국어 해석을 보고 손님이 무엇을 선택했는지 알 수 있습니다.
let _currentLang = 'ko'; // 기본값: 한국어 (손님 언어 선택 화면에서 덮어씌워짐)
let _staffLang   = 'ko'; // 기본값: 한국어 (직원 언어 선택 화면에서 덮어씌워짐)

// 직원 언어를 기기에 저장해 둘 때 쓰는 키. 직원은 손님이 바뀌어도 그대로라서
// 앱을 다시 열어도 지난번에 고른 언어를 그대로 쓸 수 있게 기억해 둡니다.
const STAFF_LANG_STORAGE_KEY = 'checkoutGuide.staffLang';

/** 현재 선택된 손님 언어 코드로 변경합니다. */
function setLang(code) {
  _currentLang = code;
}

/** 현재 선택된 손님 언어 코드를 반환합니다. */
function getLang() {
  return _currentLang;
}

/** 직원 언어를 바꾸고 기기에 저장합니다. */
function setStaffLang(code) {
  _staffLang = code;
  // 시크릿 모드 등 localStorage를 못 쓰는 환경에서도 앱이 멈추지 않게 감쌉니다.
  try {
    localStorage.setItem(STAFF_LANG_STORAGE_KEY, code);
  } catch (e) { /* 저장 실패는 무시 — 이번 세션 동안만 유지됩니다. */ }
}

/** 현재 직원 언어 코드를 반환합니다. */
function getStaffLang() {
  return _staffLang;
}

/**
 * 지난번에 저장해 둔 직원 언어를 불러옵니다.
 * 저장된 값이 없거나 더 이상 지원하지 않는 코드면 null을 반환합니다.
 * @returns {string|null}
 */
function loadSavedStaffLang() {
  let saved = null;
  try {
    saved = localStorage.getItem(STAFF_LANG_STORAGE_KEY);
  } catch (e) { /* 읽기 실패는 무시 */ }
  const isSupported = STAFF_LANGUAGES.some(lang => lang.code === saved);
  return isSupported ? saved : null;
}

/**
 * 현재 손님 언어의 번역 객체를 반환합니다.
 * ui.js에서 t().screen2.message 처럼 사용합니다.
 * 해당 코드가 없으면 한국어로 폴백합니다.
 */
function t() {
  return TRANSLATIONS[_currentLang] || TRANSLATIONS['ko'];
}

/**
 * 현재 직원 언어의 번역 객체를 반환합니다. (손님용 문구의 해석에 사용)
 * ui.js에서 ts().screen2.btn1 처럼 사용합니다.
 */
function ts() {
  return TRANSLATIONS[_staffLang] || TRANSLATIONS['ko'];
}

/**
 * 현재 직원 언어의 직원 화면 전용 문구(STAFF_UI 항목)를 반환합니다.
 */
function tsUI() {
  return STAFF_UI[_staffLang] || STAFF_UI['ko'];
}

// ── 앱 초기화 ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // 지난번에 고른 직원 언어가 있으면 그대로 쓰고, 첫 화면을 건너뛰어
  // 손님 언어 선택 화면부터 시작합니다. (직원 언어는 그 화면의
  // '직원 언어' 버튼으로 언제든 다시 고를 수 있습니다.)
  const savedStaffLang = loadSavedStaffLang();
  if (savedStaffLang) {
    setStaffLang(savedStaffLang);
  }

  initRouter(savedStaffLang ? SCREENS.LANG_SELECT : SCREENS.STAFF_SELECT);
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

    // ── 직원 언어 선택 버튼 (첫 화면) ──────────────────────────────
    case 'select-staff-lang': {
      const staffLang = target.dataset.lang;
      if (staffLang && TRANSLATIONS[staffLang]) {
        setStaffLang(staffLang);
        navigate(SCREENS.LANG_SELECT);
      }
      break;
    }

    // ── 직원 언어 다시 고르기 (손님 언어 화면의 작은 버튼) ─────────
    case 'change-staff-lang': cancelChoiceIntro(); goStaffSelect(); break;

    // ── 손님 언어 선택 버튼 ────────────────────────────────────────
    case 'select-lang': {
      const lang = target.dataset.lang;
      if (lang && TRANSLATIONS[lang]) {
        setLang(lang);
        resetSpeechFlags(); // 새 언어 선택 시 모든 화면의 안내 음성을 다시 활성화
        navigate(SCREENS.SCREEN2);
      }
      break;
    }

    // ── 화면2 네 가지 버튼 ─────────────────────────────────────────
    case 'btn1': speakChoiceAndNavigate(t().screen2.btn1, SCREENS.SCREEN3A, target); break;
    case 'btn2': speakChoiceAndNavigate(t().screen2.btn2, SCREENS.SCREEN3B, target); break;
    case 'btn3': speakChoiceAndNavigate(t().screen2.btn3, SCREENS.SCREEN3C, target); break;
    case 'btn4': speakChoiceAndNavigate(t().screen2.btn4, SCREENS.SCREEN3D, target); break;

    // ── 내비게이션 버튼 ────────────────────────────────────────────
    case 'back': cancelChoiceIntro(); goBack(); break;
    case 'home': cancelChoiceIntro(); goHome(); break;
  }
}

// ── 화면2 선택지 버튼: 버튼 안 재생바로 안내음성 진행 표시 ──────────────
/**
 * 지금 재생 중인 "선택지 소개" 상태(버튼 안 재생바 + 음성).
 * 다른 버튼을 누르거나 뒤로가기/홈으로 화면을 벗어나면 이 상태를 취소합니다.
 */
let _choiceIntroState = null; // { track, fill, safetyTimeout, token }
let _choiceIntroToken = 0;

// 실제 음성이 끝나기(onend) 전까지 재생바가 도달할 수 있는 최대치.
// 100%로 잡으면 시간 추정이 실제보다 짧을 때 "바는 다 찼는데 음성은
// 계속 나오는" 어색한 상태가 생기므로, 추정이 틀려도 안전하게 여기서
// 멈춰 기다리다가 음성이 끝나는 순간에만 100%로 채웁니다.
const CHOICE_PROGRESS_CAP_PERCENT = 92;

/**
 * 화면2의 선택지 버튼(btn1~4)을 눌렀을 때 호출됩니다. 결과 화면으로 바로
 * 넘어가지 않고, 눌린 버튼 안의 재생바를 그 버튼 문구 음성 길이에 맞춰
 * 채우면서 음성을 재생합니다. 음성이 끝나는 순간 재생바도 100%에 도달하고,
 * 그 즉시 결과 화면으로 넘어갑니다.
 *
 * 결과 화면의 안내문은 곧바로 이어붙이지 않고, 이 버튼 문구 음성이 끝난 뒤
 * (=화면 전환 직후) 텀을 두고 재생되도록 예약합니다(speech.js의 이어읽기 큐).
 * 두 문장이 바로 붙어 나오면 어색해서 텀을 둡니다.
 *
 * @param {string} label - t().screen2.btnN
 * @param {string} targetScreen - SCREENS 상수
 * @param {HTMLElement} buttonEl - 클릭된 .action-btn 요소
 */
function speakChoiceAndNavigate(label, targetScreen, buttonEl) {
  cancelChoiceIntro(); // 재생 중이던 다른 선택지 소개가 있으면 취소하고 새로 시작합니다.

  const track = buttonEl.querySelector('[data-role="progress-track"]');
  const fill  = buttonEl.querySelector('[data-role="progress-fill"]');

  track.classList.add('is-active');
  _choiceIntroToken++;
  const myToken = _choiceIntroToken;
  _choiceIntroState = { track, fill, safetyTimeout: null, token: myToken };

  const finish = () => {
    // 이 사이에 취소되거나 다른 버튼으로 교체됐다면(cancelChoiceIntro) 무시합니다.
    // utterance.onend 콜백은 setTimeout과 달리 clearTimeout으로 막을 수 없어
    // 토큰으로 "지금도 유효한 예약인지"를 직접 확인합니다.
    if (!_choiceIntroState || _choiceIntroState.token !== myToken) return;
    clearTimeout(_choiceIntroState.safetyTimeout);
    _choiceIntroState = null;
    fill.classList.remove('is-animating');
    fill.style.width = '100%';

    queueNextSpeechAsContinuation();
    navigate(targetScreen);

    // 결과 화면 안내문을, 지금 끝난 버튼 라벨 음성 뒤에 텀을 두고 재생합니다.
    const token = getPendingSpeechToken();
    setTimeout(() => runPendingContinuation(token), SPEECH_CONTINUATION_DELAY_MS);
  };

  const estMs = estimateSpeechDurationMs(label);
  const utterance = speakText(label, getLang());

  // 재생바는 다음 프레임부터 채우기 시작합니다(같은 프레임에서 폭을
  // 0%→목표치로 바꾸면 브라우저가 transition을 생략할 수 있어 한 프레임 늦춥니다).
  // 음성이 있는 경우 CAP까지만 채우고, 실제 onend에서 finish()가 100%로
  // 마무리합니다. 음성이 아예 없는 환경(utterance === null)은 끝을 알려줄
  // onend가 없으므로 처음부터 100%를 목표로 채웁니다.
  requestAnimationFrame(() => {
    if (!_choiceIntroState || _choiceIntroState.token !== myToken) return; // 그 사이 취소/교체됨
    fill.classList.add('is-animating');
    fill.style.transitionDuration = estMs + 'ms';
    fill.style.width = (utterance ? CHOICE_PROGRESS_CAP_PERCENT : 100) + '%';
  });

  if (utterance) {
    utterance.onend = finish;
    utterance.onerror = finish;
    // 안전망: onend가 영영 오지 않는 극단적 상황(브라우저/엔진 결함)에 대비한
    // 최후의 방어선일 뿐이라, 실제 음성 재생 중에는 절대 먼저 발동하면 안
    // 됩니다. estMs는 실제보다 느리게 잡은 추정치인데도 실제 발화가 그보다
    // 더 오래 걸리는 경우가 흔해, 넉넉하게 여유를 둡니다.
    _choiceIntroState.safetyTimeout = setTimeout(finish, estMs * 3 + 4000);
  } else {
    // TTS 미지원 환경: 음성 없이 재생바 애니메이션 시간만큼 보여주고 넘어갑니다.
    _choiceIntroState.safetyTimeout = setTimeout(finish, estMs);
  }
}

/** 재생 중인 선택지 소개(재생바 + 음성)를 취소하고 버튼을 원래 상태로 되돌립니다. */
function cancelChoiceIntro() {
  if (_choiceIntroState) {
    clearTimeout(_choiceIntroState.safetyTimeout);
    _choiceIntroState.track.classList.remove('is-active');
    _choiceIntroState.fill.classList.remove('is-animating');
    _choiceIntroState.fill.style.width = '0%';
    _choiceIntroState = null;
  }
  cancelSpeech();
}
