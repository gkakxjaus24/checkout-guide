/**
 * router.js
 * ─────────────────────────────────────────────────────────────────────
 * 화면 전환과 히스토리(뒤로가기) 스택을 관리합니다.
 * Manages screen navigation and the back-navigation history stack.
 * ─────────────────────────────────────────────────────────────────────
 */

// ── 화면 이름 상수 ────────────────────────────────────────────────────
// 각 화면을 식별하는 문자열 상수. 오타 방지를 위해 하드코딩 대신 사용.
const SCREENS = {
  STAFF_SELECT: 'staff_select', // 첫 번째 화면: 직원 언어 선택
  LANG_SELECT : 'lang_select',  // 두 번째 화면: 손님 언어 선택
  SCREEN2     : 'screen2',      // 세 번째 화면: 체크아웃 안내 + 4개 버튼
  SCREEN3A    : 'screen3a',     // 네 번째 화면 (버튼1 결과): 감사합니다
  SCREEN3B    : 'screen3b',     // 네 번째 화면 (버튼2 결과): 연장 안내
  SCREEN3C    : 'screen3c',     // 네 번째 화면 (버튼3 결과): 날짜 착오
  SCREEN3D    : 'screen3d',     // 네 번째 화면 (버튼4 결과): 다른 방 이동 안내
};

// ── 내비게이션 히스토리 스택 ──────────────────────────────────────────
// 방문한 화면 이름을 순서대로 쌓아두어 뒤로가기 기능을 구현합니다.
let _history = [];

// ── 공개 함수들 ───────────────────────────────────────────────────────

/**
 * 새 화면으로 이동합니다. 히스토리에 현재 화면을 추가한 뒤 렌더합니다.
 * @param {string} screenName - SCREENS 상수 중 하나
 */
function navigate(screenName) {
  _history.push(screenName);
  renderCurrentScreen();
}

/**
 * 이전 화면으로 돌아갑니다.
 * 히스토리가 1개 이하(처음 화면)이면 아무것도 하지 않습니다.
 */
function goBack() {
  if (_history.length > 1) {
    _history.pop();
    renderCurrentScreen();
  }
}

/**
 * 히스토리를 초기화하고 손님 언어 선택 화면으로 이동합니다.
 * 직원 언어는 손님이 바뀌어도 그대로이므로, 다음 손님을 맞을 때
 * 직원 언어 화면까지 되돌아가지 않고 손님 언어 화면에서 시작합니다.
 * (직원 언어를 바꾸려면 손님 언어 화면의 '직원 언어' 버튼을 누릅니다.)
 */
function goHome() {
  _history = [SCREENS.LANG_SELECT];
  renderCurrentScreen();
}

/**
 * 히스토리를 완전히 초기화하고 첫 화면(직원 언어 선택)으로 이동합니다.
 * 직원이 교대해 언어를 다시 고를 때 사용합니다.
 */
function goStaffSelect() {
  _history = [SCREENS.STAFF_SELECT];
  renderCurrentScreen();
}

/**
 * 현재 화면 이름을 반환합니다.
 * @returns {string}
 */
function getCurrentScreen() {
  return _history[_history.length - 1];
}

/**
 * 뒤로 갈 수 있는지(히스토리가 2개 이상인지) 반환합니다.
 * @returns {boolean}
 */
function canGoBack() {
  return _history.length > 1;
}

/**
 * 라우터를 초기화합니다. 주어진 화면을 히스토리의 첫 항목으로 설정합니다.
 * app.js의 DOMContentLoaded 핸들러에서 호출됩니다.
 * @param {string} [startScreen=SCREENS.STAFF_SELECT] - 시작 화면
 */
function initRouter(startScreen) {
  _history = [startScreen || SCREENS.STAFF_SELECT];
}
