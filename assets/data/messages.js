/**
 * messages.js
 * ─────────────────────────────────────────────────────────────────────
 * 모든 언어의 번역 데이터를 담은 파일입니다.
 * All translation data for every supported language.
 *
 * ★ 문구 수정 방법:
 *   아래 TRANSLATIONS 객체에서 해당 언어 코드를 찾아 텍스트를 바꾸면 됩니다.
 *
 * ★ 언어 추가 방법:
 *   1. LANGUAGES 배열에 { code, name } 항목을 추가하세요.
 *   2. TRANSLATIONS 객체에 같은 코드로 번역 항목을 추가하세요.
 * ─────────────────────────────────────────────────────────────────────
 */

// ── 언어 선택 버튼에 표시될 목록 (순서 = 버튼 표시 순서) ──────────────
// flag: 버튼 배경에 옅게 깔리는 아이콘. 영어는 공용어 의미로 지구 🌐 사용.
const LANGUAGES = [
  { code: 'ko', name: '한국어',   img: 'assets/image/kr.svg'                  },
  { code: 'en', name: 'English',  img: 'assets/image/globe.svg'               },
  { code: 'zh', name: '中文',     img: 'assets/image/cn.svg'                  },
  { code: 'ja', name: '日本語',   img: 'assets/image/jp.svg'                  },
  { code: 'ru', name: 'Русский',  img: 'assets/image/Flag_of_Russia.svg.png'  },
  { code: 'es', name: 'Español',  img: 'assets/image/Bandera_de_España.svg.png' },
  { code: 'th', name: 'ภาษาไทย', img: 'assets/image/Flag_of_Thailand.svg.png'},
  { code: 'hi', name: 'हिन्दी',   img: 'assets/image/Flag_of_India.svg.png'   },
];

// ── 각 언어별 번역 데이터 ─────────────────────────────────────────────
const TRANSLATIONS = {

  // ════════════════════════════════════════════════════════════════════
  // 한국어
  // ════════════════════════════════════════════════════════════════════
  ko: {
    selectLanguage: '언어를 선택해 주세요',
    screen2: {
      message: '안녕하세요.\n체크아웃 시간은 11시입니다.\n체크아웃을 준비해 주세요.',
      btn1: '알겠습니다. 빨리 준비해서 나갈게요',
      btn2: '숙박을 연장할 수 있나요?',
      btn3: '저의 퇴실날짜는 오늘이 아닙니다',
    },
    screen3a: {
      message: '감사합니다.',
    },
    screen3b: {
      intro: '저는 청소직원이라 예약을 도와드릴 수 없습니다. 온라인으로 직접 연장 예약해주세요.',
      bullets: [
        '빈방 없음 → 체크아웃 준비',
        '같은 객실 예약 → 그대로 사용 가능',
        '다른 객실 예약 → 침대를 비우고 3시 이후 체크인',
      ],
      outro: '10분 뒤에 다시 확인하러 오겠습니다 :)',
    },
    screen3c: {
      message: '죄송합니다. 뭔가 착오가 있는 것 같네요.\n예약정보화면을 보여주시겠어요?\n매니저에게 확인해보겠습니다 :)',
    },
    nav: { back: '← 이전으로', home: '↺ 처음으로' },
  },

  // ════════════════════════════════════════════════════════════════════
  // English
  // ════════════════════════════════════════════════════════════════════
  en: {
    selectLanguage: 'Please select your language',
    screen2: {
      message: 'Hello.\nCheckout time is 11:00 AM.\nPlease prepare for checkout.',
      btn1: 'Understood. I will get ready and leave soon.',
      btn2: 'Can I extend my stay?',
      btn3: 'My checkout date is not today.',
    },
    screen3a: {
      message: 'Thank you.',
    },
    screen3b: {
      intro: 'I cannot help with reservations.\nPlease extend your stay online by yourself.',
      bullets: [
        'No room available → Please prepare to check out',
        'Same room booked → You can stay here',
        'Different room booked → Please clear the bed and check in again after 3 PM',
      ],
      outro: 'I will come back to check in 10 minutes :)',
    },
    screen3c: {
      message: "I'm sorry, there seems to be some confusion.\nCould you please show me your reservation details?\nI will check with the manager :)",
    },
    nav: { back: '← Back', home: '↺ Home' },
  },

  // ════════════════════════════════════════════════════════════════════
  // 中文（简体）
  // ════════════════════════════════════════════════════════════════════
  zh: {
    selectLanguage: '请选择语言',
    screen2: {
      message: '您好。\n退房时间是上午11点。\n请准备退房。',
      btn1: '好的，我马上收拾行李离开。',
      btn2: '我可以延长住宿吗？',
      btn3: '我的退房日期不是今天。',
    },
    screen3a: {
      message: '谢谢。',
    },
    screen3b: {
      intro: '我无法帮助您办理预订。\n请您自己在网上续住。',
      bullets: [
        '没有空房 → 请准备退房',
        '预订同一房间 → 可以继续使用这里',
        '预订其他房间 → 请先清空床位，下午3点后重新入住',
      ],
      outro: '我将在10分钟后再来确认 :)',
    },
    screen3c: {
      message: '非常抱歉，好像有些误会。\n能给我看一下您的预订信息吗？\n我会向经理确认的 :)',
    },
    nav: { back: '← 返回', home: '↺ 首页' },
  },

  // ════════════════════════════════════════════════════════════════════
  // 日本語
  // ════════════════════════════════════════════════════════════════════
  ja: {
    selectLanguage: '言語を選択してください',
    screen2: {
      message: 'こんにちは。\nチェックアウトは11時です。\nチェックアウトのご準備をお願いします。',
      btn1: 'わかりました。すぐに準備して出ます。',
      btn2: '宿泊を延長できますか？',
      btn3: 'チェックアウト日は今日ではありません。',
    },
    screen3a: {
      message: 'ありがとうございます。',
    },
    screen3b: {
      intro: '私は予約のお手伝いができません。\nご自身でオンラインで延泊予約をしてください。',
      bullets: [
        '空室なし → チェックアウトの準備をしてください',
        '同じ部屋を予約 → そのまま利用できます',
        '別の部屋を予約 → ベッドを空けて、午後3時以降に再チェックインしてください',
      ],
      outro: '10分後にまた確認に参ります :)',
    },
    screen3c: {
      message: '申し訳ありません。何か誤りがあるようです。\n予約情報の画面を見せていただけますか？\nマネージャーに確認いたします :)',
    },
    nav: { back: '← 戻る', home: '↺ はじめに' },
  },

  // ════════════════════════════════════════════════════════════════════
  // Русский
  // ════════════════════════════════════════════════════════════════════
  ru: {
    selectLanguage: 'Пожалуйста, выберите язык',
    screen2: {
      message: 'Здравствуйте.\nВремя выезда — 11:00.\nПожалуйста, приготовьтесь к выезду.',
      btn1: 'Понял(а). Быстро соберусь и уйду.',
      btn2: 'Можно ли продлить проживание?',
      btn3: 'Мой день выезда — не сегодня.',
    },
    screen3a: {
      message: 'Спасибо.',
    },
    screen3b: {
      intro: 'Я не могу помочь с бронированием.\nПожалуйста, продлите проживание онлайн самостоятельно.',
      bullets: [
        'Нет свободных мест → Пожалуйста, подготовьтесь к выезду',
        'Забронирована та же комната → Вы можете остаться здесь',
        'Забронирована другая комната → Пожалуйста, освободите кровать и заселитесь снова после 15:00',
      ],
      outro: 'Я вернусь проверить через 10 минут :)',
    },
    screen3c: {
      message: 'Извините, кажется, произошла ошибка.\nНе могли бы вы показать информацию о бронировании?\nЯ уточню у менеджера :)',
    },
    nav: { back: '← Назад', home: '↺ Начало' },
  },

  // ════════════════════════════════════════════════════════════════════
  // Español
  // ════════════════════════════════════════════════════════════════════
  es: {
    selectLanguage: 'Por favor, seleccione su idioma',
    screen2: {
      message: 'Hola.\nLa hora de salida es a las 11:00 AM.\nPor favor, prepárese para el check-out.',
      btn1: 'Entendido. Me prepararé y saldré pronto.',
      btn2: '¿Puedo extender mi estadía?',
      btn3: 'Mi fecha de salida no es hoy.',
    },
    screen3a: {
      message: 'Gracias.',
    },
    screen3b: {
      intro: 'No puedo ayudar con la reserva.\nPor favor, haga la extensión en línea usted mismo.',
      bullets: [
        'No hay habitación disponible → Prepárese para hacer check-out',
        'Misma habitación reservada → Puede quedarse aquí',
        'Otra habitación reservada → Por favor, deje la cama y haga check-in otra vez después de las 3 PM',
      ],
      outro: 'Volveré a verificar en 10 minutos :)',
    },
    screen3c: {
      message: 'Lo siento, parece que hay alguna confusión.\n¿Podría mostrarme su información de reserva?\nLo verificaré con el gerente :)',
    },
    nav: { back: '← Atrás', home: '↺ Inicio' },
  },

  // ════════════════════════════════════════════════════════════════════
  // ภาษาไทย
  // ════════════════════════════════════════════════════════════════════
  th: {
    selectLanguage: 'กรุณาเลือกภาษา',
    screen2: {
      message: 'สวัสดีครับ/ค่ะ\nเวลาเช็คเอาท์คือ 11 โมงเช้า\nกรุณาเตรียมตัวเช็คเอาท์',
      btn1: 'เข้าใจแล้ว จะรีบเก็บของและออกไปเลย',
      btn2: 'ฉันสามารถต่อเวลาพักได้ไหม?',
      btn3: 'วันเช็คเอาท์ของฉันไม่ใช่วันนี้',
    },
    screen3a: {
      message: 'ขอบคุณครับ/ค่ะ',
    },
    screen3b: {
      intro: 'ฉันไม่สามารถช่วยเรื่องการจองได้\nกรุณาต่อการเข้าพักด้วยตัวเองทางออนไลน์',
      bullets: [
        'ไม่มีห้องว่าง → กรุณาเตรียมเช็กเอาต์',
        'จองห้องเดิม → สามารถพักต่อที่นี่ได้',
        'จองห้องอื่น → กรุณาเก็บของออกจากเตียง และเช็กอินใหม่หลัง 15:00',
      ],
      outro: 'จะกลับมาตรวจสอบใน 10 นาที :)',
    },
    screen3c: {
      message: 'ขอโทษนะครับ/ค่ะ ดูเหมือนจะมีความเข้าใจผิด\nช่วยแสดงข้อมูลการจองให้ดูได้ไหม?\nจะไปถามผู้จัดการให้นะครับ/ค่ะ :)',
    },
    nav: { back: '← ย้อนกลับ', home: '↺ หน้าแรก' },
  },

  // ════════════════════════════════════════════════════════════════════
  // हिन्दी
  // ════════════════════════════════════════════════════════════════════
  hi: {
    selectLanguage: 'कृपया अपनी भाषा चुनें',
    screen2: {
      message: 'नमस्ते।\nचेक-आउट का समय सुबह 11 बजे है।\nकृपया चेक-आउट की तैयारी करें।',
      btn1: 'समझ गया। मैं जल्दी तैयार होकर निकल जाऊंगा/जाऊंगी।',
      btn2: 'क्या मैं अपना प्रवास बढ़ा सकता/सकती हूं?',
      btn3: 'मेरी चेक-आउट तारीख आज नहीं है।',
    },
    screen3a: {
      message: 'धन्यवाद।',
    },
    screen3b: {
      intro: 'मैं बुकिंग में मदद नहीं कर सकता।\nकृपया खुद ऑनलाइन एक्सटेंशन बुक करें।',
      bullets: [
        'कमरा खाली नहीं है → कृपया चेक-आउट की तैयारी करें',
        'वही कमरा बुक किया → आप यहीं रह सकते हैं',
        'दूसरा कमरा बुक किया → कृपया बिस्तर खाली करें और 3 बजे के बाद फिर से चेक-इन करें',
      ],
      outro: 'मैं 10 मिनट में वापस आऊंगा/आऊंगी :)',
    },
    screen3c: {
      message: 'माफ़ कीजिए, लगता है कुछ गलतफहमी हो गई है।\nक्या आप अपनी बुकिंग की जानकारी दिखा सकते/सकती हैं?\nमैं मैनेजर से पूछ लेता/लेती हूं :)',
    },
    nav: { back: '← वापस', home: '↺ शुरू' },
  },

}; // end TRANSLATIONS
