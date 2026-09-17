/**
 * messages.js
 * ─────────────────────────────────────────────────────────────────────
 * 모든 언어의 번역 데이터를 담은 파일입니다.
 * All translation data for every supported language.
 *
 * ★ 문구 수정 방법:
 *   아래 TRANSLATIONS 객체에서 해당 언어 코드를 찾아 텍스트를 바꾸면 됩니다.
 *
 * ★ 손님 언어 추가 방법:
 *   1. LANGUAGES 배열에 { code, name, img } 항목을 추가하세요.
 *   2. TRANSLATIONS 객체에 같은 코드로 번역 항목을 추가하세요.
 *   3. STAFF_UI의 각 직원 언어 langNames에 그 언어의 이름을 추가하세요.
 *
 * ★ 직원 언어 추가 방법:
 *   STAFF_LANGUAGES 배열 위의 주석을 참고하세요.
 * ─────────────────────────────────────────────────────────────────────
 */

// ── 언어 선택 버튼에 표시될 목록 (순서 = 버튼 표시 순서) ──────────────
// flag: 버튼 배경에 옅게 깔리는 아이콘. 영어는 공용어 의미로 지구 🌐 사용.
const LANGUAGES = [
  { code: 'ko', name: '한국어',    img: 'assets/image/kr.svg'                  },
  { code: 'en', name: 'English',   img: 'assets/image/globe.svg'               },
  { code: 'zh', name: '中文',      img: 'assets/image/cn.svg'                  },
  { code: 'ja', name: '日本語',    img: 'assets/image/jp.svg'                  },
  { code: 'ru', name: 'Русский',   img: 'assets/image/Flag_of_Russia.svg.png'  },
  { code: 'es', name: 'Español',   img: 'assets/image/Bandera_de_España.svg.png' },
  { code: 'mn', name: 'Монгол',    img: 'assets/image/mn.svg'                  },
  { code: 'vi', name: 'Tiếng Việt', img: 'assets/image/vi.svg'                 },
  { code: 'fr', name: 'Français',  img: 'assets/image/fr.svg'                  },
  { code: 'de', name: 'Deutsch',   img: 'assets/image/de.svg'                  },
  { code: 'ar', name: 'العربية',   img: 'assets/image/ar.svg'                  },
  { code: 'tr', name: 'Türkçe',    img: 'assets/image/tr.svg'                  },
  { code: 'th', name: 'ภาษาไทย',  img: 'assets/image/Flag_of_Thailand.svg.png'},
  { code: 'si', name: 'සිංහල',    img: 'assets/image/si.svg'                  },
  { code: 'hi', name: 'हिन्दी',    img: 'assets/image/Flag_of_India.svg.png'   },
  { code: 'id', name: 'Indonesia', img: 'assets/image/id.svg'                  },
];

// ── 직원(청소 담당) 언어 선택 버튼 목록 ───────────────────────────────
// 첫 화면에서 직원이 자기 언어를 고릅니다. 이후 손님용 화면의 버튼·문구
// 아래에 이 언어로 된 작은 해석이 붙어, 손님이 무엇을 눌렀는지 직원이
// 알 수 있습니다. 손님용 LANGUAGES와 달리 실제 근무 중인 직원들의
// 언어만 담습니다.
//
// ★ 직원 언어 추가 방법:
//   1. STAFF_LANGUAGES 배열에 { code, name, img } 항목을 추가하세요.
//   2. TRANSLATIONS 객체에 같은 코드의 번역이 있는지 확인하세요.
//      (없으면 추가해야 합니다 — 해석 문구가 여기서 나옵니다.)
//   3. STAFF_UI 객체에 같은 코드의 항목(staffLabel, guestPrompt,
//      langNames)을 추가하세요.
const STAFF_LANGUAGES = [
  { code: 'ko', name: '한국어',    img: 'assets/image/kr.svg'    },
  { code: 'en', name: 'English',   img: 'assets/image/globe.svg' },
  { code: 'zh', name: '中文',      img: 'assets/image/cn.svg'    },
  { code: 'bn', name: 'বাংলা',      img: 'assets/image/bd.svg'    },
  { code: 'pt', name: 'Português', img: 'assets/image/br.svg'    },
];

// ── 직원 화면 전용 문구 ───────────────────────────────────────────────
// staffLabel : 첫 화면 제목에 나란히 표시되는 "직원" 단어
// guestPrompt: 손님 언어 선택 화면 맨 위에 직원에게만 보이는 안내
// langNames  : 손님 언어 버튼 아래에 붙는, 그 언어의 직원 언어 이름
//              (예: 직원이 한국어면 '中文' 버튼 아래에 '중국어')
const STAFF_UI = {
  ko: {
    staffLabel : '직원',
    guestPrompt: '손님에게 화면을 보여주고 언어를 고르게 하세요',
    langNames  : {
      ko: '한국어',   en: '영어',       zh: '중국어',   ja: '일본어',
      ru: '러시아어', es: '스페인어',   mn: '몽골어',   vi: '베트남어',
      fr: '프랑스어', de: '독일어',     ar: '아랍어',   tr: '튀르키예어',
      th: '태국어',   si: '싱할라어',   hi: '힌디어',   id: '인도네시아어',
    },
  },
  en: {
    staffLabel : 'Staff',
    guestPrompt: 'Show this screen to the guest and let them pick a language',
    langNames  : {
      ko: 'Korean',  en: 'English', zh: 'Chinese', ja: 'Japanese',
      ru: 'Russian', es: 'Spanish', mn: 'Mongolian', vi: 'Vietnamese',
      fr: 'French',  de: 'German',  ar: 'Arabic',  tr: 'Turkish',
      th: 'Thai',    si: 'Sinhala', hi: 'Hindi',   id: 'Indonesian',
    },
  },
  zh: {
    staffLabel : '员工',
    guestPrompt: '请把画面给客人看，让客人选择语言',
    langNames  : {
      ko: '韩语',     en: '英语',     zh: '中文',     ja: '日语',
      ru: '俄语',     es: '西班牙语', mn: '蒙古语',   vi: '越南语',
      fr: '法语',     de: '德语',     ar: '阿拉伯语', tr: '土耳其语',
      th: '泰语',     si: '僧伽罗语', hi: '印地语',   id: '印尼语',
    },
  },
  bn: {
    staffLabel : 'কর্মী',
    guestPrompt: 'অতিথিকে এই স্ক্রিন দেখান এবং তাঁর ভাষা বেছে নিতে বলুন',
    langNames  : {
      ko: 'কোরিয়ান',   en: 'ইংরেজি',    zh: 'চাইনিজ',    ja: 'জাপানি',
      ru: 'রুশ',       es: 'স্প্যানিশ',   mn: 'মঙ্গোলীয়',   vi: 'ভিয়েতনামি',
      fr: 'ফরাসি',     de: 'জার্মান',    ar: 'আরবি',      tr: 'তুর্কি',
      th: 'থাই',       si: 'সিংহলি',    hi: 'হিন্দি',      id: 'ইন্দোনেশীয়',
    },
  },
  pt: {
    staffLabel : 'Funcionário',
    guestPrompt: 'Mostre esta tela ao hóspede e peça que escolha o idioma',
    langNames  : {
      ko: 'Coreano', en: 'Inglês',  zh: 'Chinês',  ja: 'Japonês',
      ru: 'Russo',   es: 'Espanhol', mn: 'Mongol', vi: 'Vietnamita',
      fr: 'Francês', de: 'Alemão',  ar: 'Árabe',   tr: 'Turco',
      th: 'Tailandês', si: 'Cingalês', hi: 'Híndi', id: 'Indonésio',
    },
  },
};

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
      btn4: '저는 오늘 다른 방으로 옮겨요',
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
    screen3d: {
      message: '청소를 시작할 수 있도록 가능한 한 빨리 객실(침대)을 비워주시면 감사하겠습니다.',
      note: '(체크인 3시부터 가능)',
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
      btn4: "I'm moving to a different room today",
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
    screen3d: {
      message: 'Please leave your room (bed) as soon as possible so we can start cleaning. Thank you.',
      note: '(Check-in available from 3 PM)',
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
      btn4: '我今天要换到别的房间',
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
    screen3d: {
      message: '为了方便我们开始清洁，请尽早离开房间（床位）。谢谢您的配合。',
      note: '（下午3点后可办理入住）',
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
      btn4: '今日、別の部屋に移ります',
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
    screen3d: {
      message: '清掃を始められるよう、できるだけ早めにお部屋（ベッド）を空けていただけますと幸いです。',
      note: '(チェックインは15時から可能です)',
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
      btn4: 'Сегодня я перееду в другой номер',
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
    screen3d: {
      message: 'Пожалуйста, освободите номер (кровать) как можно скорее, чтобы мы могли начать уборку. Спасибо.',
      note: '(Заселение возможно с 15:00)',
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
      btn4: 'Hoy me mudo a otra habitación',
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
    screen3d: {
      message: 'Por favor, deje libre la habitación (cama) lo antes posible para que podamos empezar a limpiar. Gracias.',
      note: '(Check-in disponible desde las 3 PM)',
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
      btn4: 'วันนี้ฉันจะย้ายไปห้องอื่น',
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
    screen3d: {
      message: 'กรุณาออกจากห้อง (เตียง) โดยเร็วที่สุด เพื่อให้เราเริ่มทำความสะอาดได้ ขอบคุณสำหรับความร่วมมือ',
      note: '(เช็คอินได้ตั้งแต่ 15:00 น.)',
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
      btn4: 'मैं आज दूसरे कमरे में जा रहा/रही हूं',
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
    screen3d: {
      message: 'कृपया कमरा (बेड) जल्द से जल्द खाली कर दें, ताकि हम सफाई शुरू कर सकें। धन्यवाद।',
      note: '(चेक-इन दोपहर 3 बजे से संभव है)',
    },
    nav: { back: '← वापस', home: '↺ शुरू' },
  },

  // ════════════════════════════════════════════════════════════════════
  // Монгол
  // ════════════════════════════════════════════════════════════════════
  mn: {
    selectLanguage: 'Хэлээ сонгоно уу',
    screen2: {
      message: 'Сайн байна уу.\nБүртгэлээс гарах цаг 11:00 цаг байна.\nГарахад бэлдэнэ үү.',
      btn1: 'Ойлголоо. Хурдан бэлдэж гарна.',
      btn2: 'Байрлалаа сунгаж болох уу?',
      btn3: 'Миний гарах өдөр өнөөдөр биш.',
      btn4: 'Би өнөөдөр өөр өрөөнд шилжинэ',
    },
    screen3a: {
      message: 'Баярлалаа.',
    },
    screen3b: {
      intro: 'Би цэвэрлэгээний ажилтан тул захиалгад тусалж чадахгүй.\nОнлайнаар өөрөө сунгалт хийнэ үү.',
      bullets: [
        'Хоосон өрөө байхгүй → Гарахад бэлдэнэ үү',
        'Ижил өрөө захиалсан → Энд үлдэж болно',
        'Өөр өрөө захиалсан → Орноо хоослож, 15:00 цагийн дараа дахин бүртгүүлнэ үү',
      ],
      outro: '10 минутын дараа дахин шалгахаар ирнэ :)',
    },
    screen3c: {
      message: 'Уучлаарай, ямар нэгэн будлиан гарсан бололтой.\nЗахиалгын мэдээллээ үзүүлж болох уу?\nМенежертэй лавлаж үзье :)',
    },
    screen3d: {
      message: 'Цэвэрлэгээг эхлүүлэхийн тулд өрөө (ор)-өө аль болох хурдан чөлөөлж өгнө үү. Баярлалаа.',
      note: '(Бүртгэл 15:00 цагаас боломжтой)',
    },
    nav: { back: '← Буцах', home: '↺ Эхлэл' },
  },

  // ════════════════════════════════════════════════════════════════════
  // Tiếng Việt
  // ════════════════════════════════════════════════════════════════════
  vi: {
    selectLanguage: 'Vui lòng chọn ngôn ngữ',
    screen2: {
      message: 'Xin chào.\nGiờ trả phòng là 11:00 sáng.\nVui lòng chuẩn bị trả phòng.',
      btn1: 'Đã hiểu. Tôi sẽ chuẩn bị và rời đi ngay.',
      btn2: 'Tôi có thể gia hạn lưu trú không?',
      btn3: 'Ngày trả phòng của tôi không phải hôm nay.',
      btn4: 'Hôm nay tôi chuyển sang phòng khác',
    },
    screen3a: {
      message: 'Cảm ơn bạn.',
    },
    screen3b: {
      intro: 'Tôi là nhân viên dọn phòng nên không thể hỗ trợ đặt phòng.\nVui lòng tự gia hạn trực tuyến.',
      bullets: [
        'Không còn phòng trống → Vui lòng chuẩn bị trả phòng',
        'Đặt cùng phòng → Bạn có thể ở lại đây',
        'Đặt phòng khác → Vui lòng dọn giường và nhận phòng lại sau 15:00',
      ],
      outro: 'Tôi sẽ quay lại kiểm tra sau 10 phút :)',
    },
    screen3c: {
      message: 'Xin lỗi, hình như có sự nhầm lẫn nào đó.\nBạn có thể cho tôi xem thông tin đặt phòng không?\nTôi sẽ xác nhận với quản lý :)',
    },
    screen3d: {
      message: 'Vui lòng rời phòng (giường) sớm nhất có thể để chúng tôi bắt đầu dọn dẹp. Xin cảm ơn.',
      note: '(Nhận phòng từ 15:00)',
    },
    nav: { back: '← Quay lại', home: '↺ Trang chủ' },
  },

  // ════════════════════════════════════════════════════════════════════
  // Français
  // ════════════════════════════════════════════════════════════════════
  fr: {
    selectLanguage: 'Veuillez sélectionner votre langue',
    screen2: {
      message: "Bonjour.\nL'heure de départ est 11h00.\nVeuillez vous préparer à quitter la chambre.",
      btn1: 'Compris. Je me prépare et je pars bientôt.',
      btn2: 'Puis-je prolonger mon séjour ?',
      btn3: "Ma date de départ n'est pas aujourd'hui.",
      btn4: "Aujourd'hui, je déménage dans une autre chambre",
    },
    screen3a: {
      message: 'Merci.',
    },
    screen3b: {
      intro: "Je suis employé(e) de ménage et je ne peux pas vous aider avec les réservations.\nVeuillez prolonger votre séjour en ligne vous-même.",
      bullets: [
        'Aucune chambre disponible → Veuillez vous préparer à partir',
        'Même chambre réservée → Vous pouvez rester ici',
        'Autre chambre réservée → Veuillez libérer le lit et vous réenregistrer après 15h00',
      ],
      outro: 'Je reviendrai vérifier dans 10 minutes :)',
    },
    screen3c: {
      message: "Désolé(e), il semble y avoir une confusion.\nPourriez-vous me montrer les détails de votre réservation ?\nJe vais vérifier avec le responsable :)",
    },
    screen3d: {
      message: 'Merci de libérer votre chambre (lit) dès que possible afin que nous puissions commencer le ménage.',
      note: '(Enregistrement possible à partir de 15h00)',
    },
    nav: { back: '← Retour', home: '↺ Accueil' },
  },

  // ════════════════════════════════════════════════════════════════════
  // Deutsch
  // ════════════════════════════════════════════════════════════════════
  de: {
    selectLanguage: 'Bitte wählen Sie Ihre Sprache',
    screen2: {
      message: 'Hallo.\nDie Check-out-Zeit ist 11:00 Uhr.\nBitte bereiten Sie sich auf den Check-out vor.',
      btn1: 'Verstanden. Ich mache mich schnell fertig und gehe.',
      btn2: 'Kann ich meinen Aufenthalt verlängern?',
      btn3: 'Mein Check-out-Datum ist nicht heute.',
      btn4: 'Ich ziehe heute in ein anderes Zimmer um',
    },
    screen3a: {
      message: 'Danke.',
    },
    screen3b: {
      intro: 'Ich bin Reinigungspersonal und kann bei Buchungen nicht helfen.\nBitte verlängern Sie Ihren Aufenthalt selbst online.',
      bullets: [
        'Kein Zimmer frei → Bitte bereiten Sie sich auf den Check-out vor',
        'Gleiches Zimmer gebucht → Sie können hierbleiben',
        'Anderes Zimmer gebucht → Bitte räumen Sie das Bett und checken Sie nach 15:00 Uhr erneut ein',
      ],
      outro: 'Ich komme in 10 Minuten wieder vorbei, um nachzusehen :)',
    },
    screen3c: {
      message: 'Entschuldigung, es scheint ein Missverständnis zu geben.\nKönnten Sie mir bitte Ihre Reservierungsdetails zeigen?\nIch werde das mit dem Manager klären :)',
    },
    screen3d: {
      message: 'Bitte geben Sie Ihr Zimmer (Bett) so bald wie möglich frei, damit wir mit der Reinigung beginnen können. Vielen Dank.',
      note: '(Check-in ab 15:00 Uhr möglich)',
    },
    nav: { back: '← Zurück', home: '↺ Start' },
  },

  // ════════════════════════════════════════════════════════════════════
  // العربية
  // ════════════════════════════════════════════════════════════════════
  ar: {
    selectLanguage: 'الرجاء اختيار لغتك',
    screen2: {
      message: 'مرحباً.\nموعد المغادرة الساعة 11:00 صباحاً.\nيرجى الاستعداد للمغادرة.',
      btn1: 'مفهوم. سأستعد وأغادر بسرعة.',
      btn2: 'هل يمكنني تمديد إقامتي؟',
      btn3: 'تاريخ مغادرتي ليس اليوم.',
      btn4: 'سأنتقل إلى غرفة أخرى اليوم',
    },
    screen3a: {
      message: 'شكراً لك.',
    },
    screen3b: {
      intro: 'أنا موظف تنظيف ولا يمكنني المساعدة في الحجوزات.\nيرجى تمديد إقامتك عبر الإنترنت بنفسك.',
      bullets: [
        'لا توجد غرف متاحة ← يرجى الاستعداد للمغادرة',
        'تم حجز نفس الغرفة ← يمكنك البقاء هنا',
        'تم حجز غرفة أخرى ← يرجى إخلاء السرير وتسجيل الدخول مرة أخرى بعد الساعة 3:00 مساءً',
      ],
      outro: 'سأعود للتحقق بعد 10 دقائق :)',
    },
    screen3c: {
      message: 'عذراً، يبدو أن هناك بعض الالتباس.\nهل يمكنك أن تريني تفاصيل حجزك؟\nسأتحقق مع المدير :)',
    },
    screen3d: {
      message: 'يرجى إخلاء الغرفة (السرير) في أقرب وقت ممكن حتى نتمكن من بدء التنظيف. شكرًا لتعاونكم.',
      note: '(تسجيل الوصول متاح من الساعة 3:00 مساءً)',
    },
    nav: { back: '← رجوع', home: '↺ الرئيسية' },
  },

  // ════════════════════════════════════════════════════════════════════
  // Türkçe
  // ════════════════════════════════════════════════════════════════════
  tr: {
    selectLanguage: 'Lütfen dilinizi seçin',
    screen2: {
      message: "Merhaba.\nÇıkış saati 11:00'dir.\nLütfen çıkışa hazırlanın.",
      btn1: 'Anlaşıldı. Hemen hazırlanıp çıkacağım.',
      btn2: 'Konaklamamı uzatabilir miyim?',
      btn3: 'Çıkış tarihim bugün değil.',
      btn4: 'Bugün başka bir odaya geçiyorum',
    },
    screen3a: {
      message: 'Teşekkür ederim.',
    },
    screen3b: {
      intro: 'Ben temizlik personeliyim, rezervasyon konusunda yardımcı olamam.\nLütfen uzatma işlemini kendiniz çevrimiçi yapın.',
      bullets: [
        'Boş oda yok → Lütfen çıkışa hazırlanın',
        'Aynı oda rezerve edilmiş → Burada kalabilirsiniz',
        "Başka oda rezerve edilmiş → Lütfen yatağı boşaltın ve 15:00'ten sonra tekrar giriş yapın",
      ],
      outro: '10 dakika sonra tekrar kontrol etmeye geleceğim :)',
    },
    screen3c: {
      message: 'Üzgünüm, bir yanlış anlaşılma var gibi görünüyor.\nRezervasyon bilgilerinizi gösterebilir misiniz?\nYöneticiyle kontrol edeceğim :)',
    },
    screen3d: {
      message: 'Temizliğe başlayabilmemiz için lütfen odanızı (yatağınızı) mümkün olduğunca erken boşaltın. Teşekkür ederiz.',
      note: "(Giriş saat 15:00'ten itibaren mümkündür)",
    },
    nav: { back: '← Geri', home: '↺ Ana Sayfa' },
  },

  // ════════════════════════════════════════════════════════════════════
  // සිංහල
  // ════════════════════════════════════════════════════════════════════
  si: {
    selectLanguage: 'කරුණාකර ඔබේ භාෂාව තෝරන්න',
    screen2: {
      message: 'ආයුබෝවන්.\nවිත්ති කිරීමේ වේලාව උදේ 11.00 ය.\nකරුණාකර පිටවීමට සූදානම් වන්න.',
      btn1: 'තේරුණා. මම ඉක්මනින් සූදානම් වී පිටව යන්නම්.',
      btn2: 'මට නවාතැන කාලය දික් කළ හැකිද?',
      btn3: 'මගේ පිටවීමේ දිනය අද නොවේ.',
      btn4: 'මම අද වෙනත් කාමරයකට මාරු වෙනවා',
    },
    screen3a: {
      message: 'ස්තුතියි.',
    },
    screen3b: {
      intro: 'මම පිරිසිදු කිරීමේ සේවකයෙක් නිසා වෙන්කිරීම් සම්බන්ධයෙන් උදව් කළ නොහැක.\nකරුණාකර මාර්ගගතව ඔබම කාලය දික් කරගන්න.',
      bullets: [
        'හිස් කාමරයක් නැත → කරුණාකර පිටවීමට සූදානම් වන්න',
        'එම කාමරයම වෙන් කර ඇත → ඔබට මෙහි රැඳී සිටිය හැක',
        'වෙනත් කාමරයක් වෙන් කර ඇත → කරුණාකර ඇඳ හිස් කර, පස්වරු 3ට පසු නැවත ලියාපදිංචි වන්න',
      ],
      outro: 'මිනිත්තු 10කින් නැවත පරීක්ෂා කිරීමට එන්නම් :)',
    },
    screen3c: {
      message: 'සමාවෙන්න, යම් ව්‍යාකූලත්වයක් ඇති බව පෙනේ.\nඔබේ වෙන්කිරීමේ තොරතුරු පෙන්විය හැකිද?\nපරිපාලක සමඟ පරීක්ෂා කරන්නම් :)',
    },
    screen3d: {
      message: 'පිරිසිදු කිරීම ආරම්භ කිරීමට කරුණාකර කාමරය (ඇඳ) හැකි ඉක්මනින් හිස් කර දෙන්න. ස්තූතියි.',
      note: '(පස්වරු 3 සිට ලියාපදිංචි විය හැක)',
    },
    nav: { back: '← ආපසු', home: '↺ මුල් පිටුව' },
  },

  // ════════════════════════════════════════════════════════════════════
  // Bahasa Indonesia
  // ════════════════════════════════════════════════════════════════════
  id: {
    selectLanguage: 'Silakan pilih bahasa Anda',
    screen2: {
      message: 'Halo.\nWaktu check-out adalah pukul 11:00.\nSilakan bersiap untuk check-out.',
      btn1: 'Baik. Saya akan segera bersiap dan keluar.',
      btn2: 'Bisakah saya memperpanjang masa inap?',
      btn3: 'Tanggal check-out saya bukan hari ini.',
      btn4: 'Hari ini saya pindah ke kamar lain',
    },
    screen3a: {
      message: 'Terima kasih.',
    },
    screen3b: {
      intro: 'Saya staf kebersihan dan tidak bisa membantu dengan pemesanan.\nSilakan perpanjang masa inap Anda secara online sendiri.',
      bullets: [
        'Tidak ada kamar kosong → Silakan bersiap untuk check-out',
        'Kamar yang sama dipesan → Anda bisa tetap di sini',
        'Kamar lain dipesan → Silakan kosongkan tempat tidur dan check-in kembali setelah pukul 15:00',
      ],
      outro: 'Saya akan kembali memeriksa dalam 10 menit :)',
    },
    screen3c: {
      message: 'Maaf, sepertinya ada kesalahpahaman.\nBisakah Anda menunjukkan detail pemesanan Anda?\nSaya akan periksa dengan manajer :)',
    },
    screen3d: {
      message: 'Mohon kosongkan kamar (tempat tidur) secepat mungkin agar kami dapat mulai membersihkan. Terima kasih.',
      note: '(Check-in tersedia mulai pukul 15:00)',
    },
    nav: { back: '← Kembali', home: '↺ Beranda' },
  },

  // ════════════════════════════════════════════════════════════════════
  // বাংলা — 직원 언어 전용 (손님 언어 목록에는 없습니다)
  // ════════════════════════════════════════════════════════════════════
  bn: {
    selectLanguage: 'অনুগ্রহ করে আপনার ভাষা নির্বাচন করুন',
    screen2: {
      message: 'নমস্কার।\nচেক-আউটের সময় সকাল ১১টা।\nঅনুগ্রহ করে চেক-আউটের প্রস্তুতি নিন।',
      btn1: 'বুঝেছি। আমি দ্রুত প্রস্তুত হয়ে বেরিয়ে যাব।',
      btn2: 'আমি কি থাকার সময় বাড়াতে পারি?',
      btn3: 'আমার চেক-আউটের তারিখ আজ নয়।',
      btn4: 'আমি আজ অন্য রুমে চলে যাচ্ছি',
    },
    screen3a: {
      message: 'ধন্যবাদ।',
    },
    screen3b: {
      intro: 'আমি পরিচ্ছন্নতাকর্মী, তাই বুকিংয়ে সাহায্য করতে পারি না।\nঅনুগ্রহ করে অনলাইনে নিজেই সময় বাড়িয়ে নিন।',
      bullets: [
        'কোনো খালি রুম নেই → অনুগ্রহ করে চেক-আউটের প্রস্তুতি নিন',
        'একই রুম বুক করা হয়েছে → আপনি এখানেই থাকতে পারেন',
        'অন্য রুম বুক করা হয়েছে → বিছানা খালি করুন এবং বিকাল ৩টার পর আবার চেক-ইন করুন',
      ],
      outro: '১০ মিনিট পর আবার দেখতে আসব :)',
    },
    screen3c: {
      message: 'দুঃখিত, মনে হচ্ছে কোথাও ভুল হয়েছে।\nআপনার বুকিংয়ের তথ্য দেখাতে পারবেন?\nআমি ম্যানেজারের সঙ্গে যাচাই করে নেব :)',
    },
    screen3d: {
      message: 'আমরা যাতে পরিষ্কার করা শুরু করতে পারি, সেজন্য অনুগ্রহ করে যত তাড়াতাড়ি সম্ভব রুম (বিছানা) খালি করে দিন। ধন্যবাদ।',
      note: '(চেক-ইন বিকাল ৩টা থেকে সম্ভব)',
    },
    nav: { back: '← পিছনে', home: '↺ শুরুতে' },
  },

  // ════════════════════════════════════════════════════════════════════
  // Português (Brasil) — 직원 언어 전용 (손님 언어 목록에는 없습니다)
  // ════════════════════════════════════════════════════════════════════
  pt: {
    selectLanguage: 'Por favor, selecione seu idioma',
    screen2: {
      message: 'Olá.\nO horário de check-out é às 11h.\nPor favor, prepare-se para o check-out.',
      btn1: 'Entendi. Vou me arrumar e sair logo.',
      btn2: 'Posso estender minha estadia?',
      btn3: 'Minha data de check-out não é hoje.',
      btn4: 'Hoje vou mudar para outro quarto',
    },
    screen3a: {
      message: 'Obrigado.',
    },
    screen3b: {
      intro: 'Sou da equipe de limpeza e não posso ajudar com reservas.\nPor favor, faça a extensão on-line você mesmo.',
      bullets: [
        'Não há quarto disponível → Por favor, prepare-se para o check-out',
        'Mesmo quarto reservado → Você pode continuar aqui',
        'Outro quarto reservado → Desocupe a cama e faça o check-in novamente após as 15h',
      ],
      outro: 'Voltarei para verificar em 10 minutos :)',
    },
    screen3c: {
      message: 'Desculpe, parece que houve algum engano.\nVocê poderia me mostrar os dados da sua reserva?\nVou verificar com o gerente :)',
    },
    screen3d: {
      message: 'Por favor, desocupe o quarto (cama) o quanto antes para que possamos começar a limpeza. Obrigado.',
      note: '(Check-in disponível a partir das 15h)',
    },
    nav: { back: '← Voltar', home: '↺ Início' },
  },

}; // end TRANSLATIONS
