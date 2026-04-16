/**
 * app.js
 * ─────────────────────────────────────────────────────────────────────
 * 앱 진입점. 언어 상태 관리, 이벤트 처리, 초기화를 담당합니다.
 * App entry point: manages language state, handles events, initializes.
 *
 * 로드 순서 (index.html 기준):
 *   1. messages.js  → LANGUAGES, TRANSLATIONS
 *   2. router.js    → SCREENS, navigate, goBack, goHome, …
 *   3. ui.js        → renderCurrentScreen, buildScreen*, …
 *   4. app.js       → (현재 파일) 앱 초기화 및 이벤트 처리
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
        setLang(lang);
        navigate(SCREENS.SCREEN2);
      }
      break;
    }

    // ── 화면2 세 가지 버튼 ─────────────────────────────────────────
    case 'btn1': navigate(SCREENS.SCREEN3A); break;
    case 'btn2': navigate(SCREENS.SCREEN3B); break;
    case 'btn3': navigate(SCREENS.SCREEN3C); break;

    // ── 내비게이션 버튼 ────────────────────────────────────────────
    case 'back': goBack();  break;
    case 'home': goHome();  break;
  }
}
