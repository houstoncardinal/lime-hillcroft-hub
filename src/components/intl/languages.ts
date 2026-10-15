// Summary pages in additional languages (/vi, /zh, /ar, …). English and Spanish are the full site.
// Every page states that the team speaks English and Spanish. Have a native speaker review these
// before promoting them. Dollar amounts are written as "$40" so the currency converter picks them up.

export type IntlLang = {
  code: string;
  /** BCP-47 tag for <html lang> and hreflang. */
  tag: string;
  english: string;
  native: string;
  dir: "ltr" | "rtl";
  title: string;
  description: string;
  h1: string;
  intro: string;
  servicesTitle: string;
  services: string[];
  hoursTitle: string;
  hours: string[];
  langNote: string;
  call: string;
  directions: string;
  address: string;
  phone: string;
  rating: string;
  leaseNote: string;
  fullSite: string;
};

export const INTL_LANGS: IntlLang[] = [
  {
    code: "vi",
    tag: "vi",
    english: "Vietnamese",
    native: "Tiếng Việt",
    dir: "ltr",
    title: "Cửa hàng điện thoại & sửa điện thoại tại Houston | TIC Wireless",
    description:
      "Điện thoại mở khóa, thuê mua không cần tín dụng từ $40, sửa màn hình trong ngày, mở mạng, gói trả trước và nạp tiền quốc tế. Hillcroft, Houston.",
    h1: "Cửa hàng điện thoại và sửa điện thoại tại Houston",
    intro:
      "TIC Wireless Electronic & Repair Center là cửa hàng điện thoại độc lập tại 3640 Hillcroft St, Suite C, Houston, TX 77057. Chúng tôi bán điện thoại đã mở khóa, sửa điện thoại trong ngày và hỗ trợ các gói cước trả trước của 12 nhà mạng.",
    servicesTitle: "Dịch vụ của chúng tôi",
    services: [
      "Điện thoại mới đã mở khóa: iPhone 18 Pro Max, Samsung Galaxy và nhiều dòng Android khác.",
      "Thuê mua (lease-to-own): không cần tín dụng, trả trước chỉ từ $40, thanh toán hằng tuần, hai tuần một lần hoặc hằng tháng (cần được duyệt).",
      "Thuê mua cả PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop và iPad.",
      "Sửa điện thoại trong ngày: màn hình, pin, cổng sạc cho iPhone, Samsung và Android. Báo giá trước khi sửa.",
      "Mở mạng điện thoại để dùng với nhà mạng bạn chọn.",
      "Gói trả trước: Verizon, AT&T, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Tracfone, H2O Wireless, Lyca, GoSmart, Gen Mobile; internet trả trước Xfinity.",
      "Thanh toán hóa đơn điện thoại tại cửa hàng không tính phí thêm, và nạp tiền điện thoại quốc tế.",
      "Phụ kiện: ốp lưng, kính cường lực, sạc, AirPods, Galaxy Buds, loa JBL.",
    ],
    hoursTitle: "Giờ mở cửa",
    hours: [
      "Thứ Hai – Thứ Bảy: 9:00 sáng – 8:00 tối",
      "Chủ Nhật: 9:00 sáng – 5:00 chiều",
      "Không cần hẹn trước.",
    ],
    langNote:
      "Nhân viên của chúng tôi nói tiếng Anh và tiếng Tây Ban Nha. Trang tiếng Việt này tóm tắt các dịch vụ chính.",
    call: "Gọi",
    directions: "Chỉ đường",
    address: "Địa chỉ",
    phone: "Điện thoại",
    rating: "4,7★ trên Google · 408 đánh giá",
    leaseNote: "Thuê mua không phải là khoản vay; tổng chi phí cao hơn giá mua trả thẳng.",
    fullSite: "Xem toàn bộ trang web bằng tiếng Anh",
  },
  {
    code: "zh",
    tag: "zh-Hans",
    english: "Chinese (Simplified)",
    native: "简体中文",
    dir: "ltr",
    title: "休斯顿手机店及手机维修 | TIC Wireless",
    description:
      "已解锁手机、免信用租购（首付 $40 起）、当日修屏、手机解锁、预付费套餐及国际充值。地址：3640 Hillcroft St, Suite C, Houston。",
    h1: "休斯顿手机店与手机维修",
    intro:
      "TIC Wireless Electronic & Repair Center 是位于 3640 Hillcroft St, Suite C, Houston, TX 77057 的独立手机店。我们销售已解锁手机，提供当日手机维修，并提供 12 家运营商的预付费套餐。",
    servicesTitle: "我们的服务",
    services: [
      "全新已解锁手机：iPhone 18 Pro Max、Samsung Galaxy 及更多 Android 机型。",
      "租购（lease-to-own）：无需信用记录，首付 $40 起，可按周、双周或按月付款（需审核）。",
      "PlayStation 5、Xbox、Nintendo Switch 2、MacBook、笔记本电脑和 iPad 也可租购。",
      "当日维修：iPhone、Samsung 及 Android 的屏幕、电池和充电口，维修前先报价。",
      "手机解锁，可使用您选择的运营商。",
      "预付费套餐：Verizon、AT&T、T-Mobile、Metro、Cricket、Boost、Simple Mobile、Tracfone、H2O Wireless、Lyca、GoSmart、Gen Mobile；以及 Xfinity 预付费家庭网络。",
      "店内缴纳话费不收额外费用；提供国际手机充值。",
      "配件：手机壳、钢化膜、充电器、AirPods、Galaxy Buds、JBL 音箱。",
    ],
    hoursTitle: "营业时间",
    hours: ["周一至周六：上午 9:00 – 晚上 8:00", "周日：上午 9:00 – 下午 5:00", "无需预约。"],
    langNote: "我们的员工讲英语和西班牙语。本中文页面为主要服务的简介。",
    call: "致电",
    directions: "导航",
    address: "地址",
    phone: "电话",
    rating: "Google 评分 4.7★ · 408 条评价",
    leaseNote: "租购不是贷款；总成本高于现金价格。",
    fullSite: "查看完整英文网站",
  },
  {
    code: "ar",
    tag: "ar",
    english: "Arabic",
    native: "العربية",
    dir: "rtl",
    title: "متجر هواتف وإصلاح هواتف في هيوستن | TIC Wireless",
    description:
      "هواتف مفتوحة، تأجير منتهٍ بالتملك بدون ائتمان يبدأ من $40، إصلاح الشاشات في نفس اليوم، فك قفل الهواتف، باقات مسبقة الدفع وشحن دولي. \u2066Hillcroft, Houston\u2069.",
    h1: "متجر هواتف وإصلاح هواتف في هيوستن",
    intro:
      "TIC Wireless Electronic & Repair Center متجر هواتف مستقل في \u20663640 Hillcroft St, Suite C, Houston, TX 77057\u2069. نبيع هواتف مفتوحة، ونصلح الهواتف في نفس اليوم، ونوفر باقات مسبقة الدفع من 12 شركة اتصالات.",
    servicesTitle: "خدماتنا",
    services: [
      "هواتف جديدة مفتوحة: iPhone 18 Pro Max وSamsung Galaxy والمزيد من هواتف Android.",
      "التأجير المنتهي بالتملك: بدون ائتمان، دفعة أولى تبدأ من $40، ودفعات أسبوعية أو كل أسبوعين أو شهرية (يخضع للموافقة).",
      "التأجير متاح أيضًا لأجهزة PlayStation 5 وXbox وNintendo Switch 2 وMacBook وأجهزة اللابتوب وiPad.",
      "إصلاح في نفس اليوم: الشاشات والبطاريات ومنافذ الشحن لأجهزة iPhone وSamsung وAndroid، مع تحديد السعر قبل البدء.",
      "فك قفل الهاتف لاستخدامه مع شركة الاتصالات التي تختارها.",
      "باقات مسبقة الدفع: Verizon وAT&T وT-Mobile وMetro وCricket وBoost وSimple Mobile وTracfone وH2O Wireless وLyca وGoSmart وGen Mobile، وإنترنت Xfinity المنزلي مسبق الدفع.",
      "دفع فواتير الهاتف في المتجر دون رسوم إضافية، وشحن رصيد الهواتف دوليًا.",
      "إكسسوارات: أغطية، واقيات شاشة زجاجية، شواحن، AirPods، Galaxy Buds، سماعات JBL.",
    ],
    hoursTitle: "ساعات العمل",
    hours: [
      "الاثنين – السبت: 9:00 صباحًا – 8:00 مساءً",
      "الأحد: 9:00 صباحًا – 5:00 مساءً",
      "لا حاجة لموعد مسبق.",
    ],
    langNote: "فريقنا يتحدث الإنجليزية والإسبانية. هذه الصفحة العربية ملخص لخدماتنا الرئيسية.",
    call: "اتصل",
    directions: "الاتجاهات",
    address: "العنوان",
    phone: "الهاتف",
    rating: "تقييم 4.7★ على Google · 408 مراجعات",
    leaseNote: "التأجير المنتهي بالتملك ليس قرضًا؛ التكلفة الإجمالية أعلى من سعر الشراء نقدًا.",
    fullSite: "عرض الموقع الكامل بالإنجليزية",
  },
  {
    code: "ur",
    tag: "ur",
    english: "Urdu",
    native: "اردو",
    dir: "rtl",
    title: "ہیوسٹن میں موبائل فون اسٹور اور فون مرمت | TIC Wireless",
    description:
      "ان لاکڈ فون، بغیر کریڈٹ کے لیز ٹو اون $40 سے، اسی دن اسکرین کی مرمت، فون ان لاک، پری پیڈ پلان اور بین الاقوامی ری چارج۔ \u20663640 Hillcroft St, Suite C, Houston\u2069.",
    h1: "ہیوسٹن میں موبائل فون اسٹور اور فون کی مرمت",
    intro:
      "TIC Wireless Electronic & Repair Center ایک آزاد موبائل فون اسٹور ہے جو \u20663640 Hillcroft St, Suite C, Houston, TX 77057\u2069 پر واقع ہے۔ ہم ان لاکڈ فون فروخت کرتے ہیں، اسی دن فون کی مرمت کرتے ہیں اور 12 کمپنیوں کے پری پیڈ پلان فراہم کرتے ہیں۔",
    servicesTitle: "ہماری خدمات",
    services: [
      "نئے ان لاکڈ فون: iPhone 18 Pro Max، Samsung Galaxy اور دیگر Android فون۔",
      "لیز ٹو اون: کریڈٹ کی ضرورت نہیں، ابتدائی ادائیگی $40 سے، ہفتہ وار، دو ہفتہ وار یا ماہانہ اقساط (منظوری سے مشروط)۔",
      "PlayStation 5، Xbox، Nintendo Switch 2، MacBook، لیپ ٹاپ اور iPad بھی لیز پر دستیاب ہیں۔",
      "اسی دن مرمت: iPhone، Samsung اور Android کی اسکرین، بیٹری اور چارجنگ پورٹ؛ کام شروع کرنے سے پہلے قیمت بتائی جاتی ہے۔",
      "فون ان لاک کریں تاکہ آپ اپنی پسند کی کمپنی استعمال کر سکیں۔",
      "پری پیڈ پلان: Verizon، AT&T، T-Mobile، Metro، Cricket، Boost، Simple Mobile، Tracfone، H2O Wireless، Lyca، GoSmart، Gen Mobile؛ اور Xfinity پری پیڈ ہوم انٹرنیٹ۔",
      "اسٹور میں فون بل کی ادائیگی بغیر اضافی فیس کے، اور بین الاقوامی موبائل ری چارج۔",
      "لوازمات: کیس، ٹیمپرڈ گلاس، چارجر، AirPods، Galaxy Buds، JBL اسپیکر۔",
    ],
    hoursTitle: "اوقاتِ کار",
    hours: [
      "پیر تا ہفتہ: صبح 9:00 – رات 8:00",
      "اتوار: صبح 9:00 – شام 5:00",
      "اپوائنٹمنٹ کی ضرورت نہیں۔",
    ],
    langNote: "ہمارا عملہ انگریزی اور ہسپانوی بولتا ہے۔ یہ اردو صفحہ ہماری اہم خدمات کا خلاصہ ہے۔",
    call: "کال کریں",
    directions: "راستہ",
    address: "پتہ",
    phone: "فون",
    rating: "Google پر 4.7★ · 408 ریویوز",
    leaseNote: "لیز ٹو اون قرض نہیں ہے؛ کل لاگت نقد قیمت سے زیادہ ہوتی ہے۔",
    fullSite: "مکمل ویب سائٹ انگریزی میں دیکھیں",
  },
  {
    code: "hi",
    tag: "hi",
    english: "Hindi",
    native: "हिन्दी",
    dir: "ltr",
    title: "ह्यूस्टन में मोबाइल फ़ोन स्टोर और फ़ोन रिपेयर | TIC Wireless",
    description:
      "अनलॉक्ड फ़ोन, बिना क्रेडिट के लीज़-टू-ओन $40 से, उसी दिन स्क्रीन रिपेयर, फ़ोन अनलॉक, प्रीपेड प्लान और अंतरराष्ट्रीय रिचार्ज। Hillcroft, Houston.",
    h1: "ह्यूस्टन में मोबाइल फ़ोन स्टोर और फ़ोन रिपेयर",
    intro:
      "TIC Wireless Electronic & Repair Center एक स्वतंत्र मोबाइल फ़ोन स्टोर है, जो 3640 Hillcroft St, Suite C, Houston, TX 77057 पर है। हम अनलॉक्ड फ़ोन बेचते हैं, उसी दिन फ़ोन रिपेयर करते हैं और 12 कंपनियों के प्रीपेड प्लान देते हैं।",
    servicesTitle: "हमारी सेवाएँ",
    services: [
      "नए अनलॉक्ड फ़ोन: iPhone 18 Pro Max, Samsung Galaxy और अन्य Android फ़ोन।",
      "लीज़-टू-ओन: क्रेडिट की ज़रूरत नहीं, शुरुआती भुगतान $40 से, साप्ताहिक, हर दो सप्ताह या मासिक भुगतान (मंज़ूरी के अधीन)।",
      "PlayStation 5, Xbox, Nintendo Switch 2, MacBook, लैपटॉप और iPad भी लीज़ पर उपलब्ध।",
      "उसी दिन रिपेयर: iPhone, Samsung और Android की स्क्रीन, बैटरी और चार्जिंग पोर्ट; काम शुरू होने से पहले कीमत बताई जाती है।",
      "फ़ोन अनलॉक, ताकि आप अपनी पसंद की कंपनी इस्तेमाल कर सकें।",
      "प्रीपेड प्लान: Verizon, AT&T, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Tracfone, H2O Wireless, Lyca, GoSmart, Gen Mobile; और Xfinity प्रीपेड होम इंटरनेट।",
      "स्टोर पर फ़ोन बिल का भुगतान बिना अतिरिक्त शुल्क के, और अंतरराष्ट्रीय मोबाइल रिचार्ज।",
      "एक्सेसरीज़: केस, टेम्पर्ड ग्लास, चार्जर, AirPods, Galaxy Buds, JBL स्पीकर।",
    ],
    hoursTitle: "खुलने का समय",
    hours: [
      "सोमवार – शनिवार: सुबह 9:00 – रात 8:00",
      "रविवार: सुबह 9:00 – शाम 5:00",
      "अपॉइंटमेंट की ज़रूरत नहीं।",
    ],
    langNote:
      "हमारी टीम अंग्रेज़ी और स्पेनिश बोलती है। यह हिंदी पेज हमारी मुख्य सेवाओं का सारांश है।",
    call: "कॉल करें",
    directions: "रास्ता देखें",
    address: "पता",
    phone: "फ़ोन",
    rating: "Google पर 4.7★ · 408 रिव्यू",
    leaseNote: "लीज़-टू-ओन ऋण नहीं है; कुल लागत नकद कीमत से अधिक होती है।",
    fullSite: "पूरी वेबसाइट अंग्रेज़ी में देखें",
  },
  {
    code: "fr",
    tag: "fr",
    english: "French",
    native: "Français",
    dir: "ltr",
    title: "Magasin de téléphones et réparation à Houston | TIC Wireless",
    description:
      "Téléphones débloqués, location-achat sans crédit dès $40, réparation d'écran le jour même, déblocage, forfaits prépayés et recharge internationale à Houston.",
    h1: "Magasin de téléphones et réparation à Houston",
    intro:
      "TIC Wireless Electronic & Repair Center est un magasin de téléphonie indépendant situé au 3640 Hillcroft St, Suite C, Houston, TX 77057. Nous vendons des téléphones débloqués, réparons les téléphones le jour même et proposons les forfaits prépayés des principaux opérateurs.",
    servicesTitle: "Nos services",
    services: [
      "Téléphones neufs débloqués : iPhone 18 Pro Max, Samsung Galaxy et autres Android.",
      "Location avec option d'achat : sans crédit, dès $40 d'acompte, paiements hebdomadaires, toutes les deux semaines ou mensuels (sous réserve d'approbation).",
      "Également disponible pour PlayStation 5, Xbox, Nintendo Switch 2, MacBook, ordinateurs portables et iPad.",
      "Réparation le jour même : écrans, batteries et ports de charge pour iPhone, Samsung et Android ; devis avant toute intervention.",
      "Déblocage de téléphone pour utiliser l'opérateur de votre choix.",
      "Forfaits prépayés : Verizon, AT&T, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Tracfone, H2O Wireless, Lyca, GoSmart, Gen Mobile ; et Internet prépayé Xfinity.",
      "Paiement de factures en magasin sans frais supplémentaires, et recharge mobile internationale.",
      "Accessoires : coques, verre trempé, chargeurs, AirPods, Galaxy Buds, enceintes JBL.",
    ],
    hoursTitle: "Horaires",
    hours: ["Lundi – samedi : 9 h – 20 h", "Dimanche : 9 h – 17 h", "Sans rendez-vous."],
    langNote:
      "Notre équipe parle anglais et espagnol. Cette page en français résume nos principaux services.",
    call: "Appeler",
    directions: "Itinéraire",
    address: "Adresse",
    phone: "Téléphone",
    rating: "4,7★ sur Google · 408 avis",
    leaseNote:
      "La location avec option d'achat n'est pas un prêt ; le coût total dépasse le prix comptant.",
    fullSite: "Voir le site complet en anglais",
  },
  {
    code: "pt",
    tag: "pt",
    english: "Portuguese",
    native: "Português",
    dir: "ltr",
    title: "Loja de celulares e conserto em Houston | TIC Wireless",
    description:
      "Celulares desbloqueados, leasing sem crédito a partir de $40, conserto de tela no mesmo dia, desbloqueio, planos pré-pagos e recarga internacional em Houston.",
    h1: "Loja de celulares e conserto de celular em Houston",
    intro:
      "A TIC Wireless Electronic & Repair Center é uma loja de celulares independente no 3640 Hillcroft St, Suite C, Houston, TX 77057. Vendemos celulares desbloqueados, consertamos celulares no mesmo dia e oferecemos planos pré-pagos das principais operadoras.",
    servicesTitle: "Nossos serviços",
    services: [
      "Celulares novos desbloqueados: iPhone 18 Pro Max, Samsung Galaxy e outros Android.",
      "Leasing com opção de compra: sem necessidade de crédito, entrada a partir de $40, pagamentos semanais, quinzenais ou mensais (sujeito a aprovação).",
      "Também disponível para PlayStation 5, Xbox, Nintendo Switch 2, MacBook, notebooks e iPad.",
      "Conserto no mesmo dia: telas, baterias e entradas de carregamento de iPhone, Samsung e Android; orçamento antes do serviço.",
      "Desbloqueio de celular para usar a operadora que você escolher.",
      "Planos pré-pagos: Verizon, AT&T, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Tracfone, H2O Wireless, Lyca, GoSmart, Gen Mobile; e internet residencial pré-paga Xfinity.",
      "Pagamento de contas na loja sem taxas extras, e recarga internacional de celular.",
      "Acessórios: capinhas, película de vidro temperado, carregadores, AirPods, Galaxy Buds, caixas de som JBL.",
    ],
    hoursTitle: "Horário",
    hours: ["Segunda a sábado: 9h – 20h", "Domingo: 9h – 17h", "Sem agendamento."],
    langNote:
      "Nossa equipe fala inglês e espanhol. Esta página em português resume nossos principais serviços.",
    call: "Ligar",
    directions: "Como chegar",
    address: "Endereço",
    phone: "Telefone",
    rating: "4,7★ no Google · 408 avaliações",
    leaseNote:
      "O leasing com opção de compra não é um empréstimo; o custo total é maior que o preço à vista.",
    fullSite: "Ver o site completo em inglês",
  },
  {
    code: "ko",
    tag: "ko",
    english: "Korean",
    native: "한국어",
    dir: "ltr",
    title: "휴스턴 휴대폰 매장 및 수리 | TIC Wireless",
    description:
      "언락폰, 신용 조회 없는 리스 후 구매 $40부터, 당일 액정 수리, 언락, 선불 요금제 및 국제 충전. Hillcroft, Houston.",
    h1: "휴스턴 휴대폰 매장 및 휴대폰 수리",
    intro:
      "TIC Wireless Electronic & Repair Center는 3640 Hillcroft St, Suite C, Houston, TX 77057에 있는 독립 휴대폰 매장입니다. 언락폰을 판매하고, 당일 휴대폰 수리를 하며, 주요 선불 통신사 요금제를 제공합니다.",
    servicesTitle: "서비스",
    services: [
      "새 언락폰: iPhone 18 Pro Max, Samsung Galaxy 및 기타 Android 휴대폰.",
      "리스 후 구매(lease-to-own): 신용 기록 불필요, 초기 납입금 $40부터, 매주·격주·매월 납부(승인 필요).",
      "PlayStation 5, Xbox, Nintendo Switch 2, MacBook, 노트북, iPad도 리스 가능.",
      "당일 수리: iPhone, Samsung, Android의 액정, 배터리, 충전 포트. 수리 전 가격 안내.",
      "원하는 통신사를 쓸 수 있도록 휴대폰 언락.",
      "선불 요금제: Verizon, AT&T, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Tracfone, H2O Wireless, Lyca, GoSmart, Gen Mobile, 그리고 Xfinity 선불 인터넷.",
      "매장에서 추가 수수료 없이 휴대폰 요금 납부, 국제 휴대폰 충전.",
      "액세서리: 케이스, 강화유리, 충전기, AirPods, Galaxy Buds, JBL 스피커.",
    ],
    hoursTitle: "영업시간",
    hours: ["월–토: 오전 9:00 – 오후 8:00", "일: 오전 9:00 – 오후 5:00", "예약 없이 방문 가능."],
    langNote: "직원은 영어와 스페인어를 사용합니다. 이 한국어 페이지는 주요 서비스 요약입니다.",
    call: "전화하기",
    directions: "길찾기",
    address: "주소",
    phone: "전화",
    rating: "Google 평점 4.7★ · 리뷰 408개",
    leaseNote: "리스 후 구매는 대출이 아니며, 총비용이 현금 가격보다 높습니다.",
    fullSite: "전체 웹사이트 영어로 보기",
  },
  {
    code: "tl",
    tag: "tl",
    english: "Tagalog",
    native: "Tagalog",
    dir: "ltr",
    title: "Tindahan ng cellphone at repair sa Houston | TIC Wireless",
    description:
      "Unlocked na phone, lease-to-own nang walang credit mula $40, same-day na pag-aayos ng screen, unlocking, prepaid plans at international recharge sa Houston.",
    h1: "Tindahan ng cellphone at pag-aayos ng phone sa Houston",
    intro:
      "Ang TIC Wireless Electronic & Repair Center ay isang independent na tindahan ng cellphone sa 3640 Hillcroft St, Suite C, Houston, TX 77057. Nagbebenta kami ng unlocked na phone, nag-aayos ng phone sa parehong araw, at nag-aalok ng prepaid plans ng mga pangunahing carrier.",
    servicesTitle: "Aming mga serbisyo",
    services: [
      "Bagong unlocked na phone: iPhone 18 Pro Max, Samsung Galaxy at iba pang Android.",
      "Lease-to-own: hindi kailangan ng credit, paunang bayad mula $40, lingguhan, kada dalawang linggo o buwanang hulog (depende sa approval).",
      "Puwede ring i-lease ang PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop at iPad.",
      "Same-day na pag-aayos: screen, baterya at charging port ng iPhone, Samsung at Android; sinasabi ang presyo bago simulan.",
      "Pag-unlock ng phone para magamit ang carrier na gusto mo.",
      "Prepaid plans: Verizon, AT&T, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Tracfone, H2O Wireless, Lyca, GoSmart, Gen Mobile; at Xfinity Prepaid home internet.",
      "Pagbabayad ng phone bill sa tindahan nang walang dagdag na bayad, at international mobile recharge.",
      "Accessories: case, tempered glass, charger, AirPods, Galaxy Buds, JBL speaker.",
    ],
    hoursTitle: "Oras ng tindahan",
    hours: [
      "Lunes – Sabado: 9:00 AM – 8:00 PM",
      "Linggo: 9:00 AM – 5:00 PM",
      "Walang appointment na kailangan.",
    ],
    langNote:
      "Ang aming team ay nagsasalita ng English at Spanish. Ang page na ito sa Tagalog ay buod ng aming mga pangunahing serbisyo.",
    call: "Tumawag",
    directions: "Direksyon",
    address: "Address",
    phone: "Telepono",
    rating: "4.7★ sa Google · 408 na review",
    leaseNote:
      "Ang lease-to-own ay hindi loan; ang kabuuang halaga ay mas mataas kaysa sa cash price.",
    fullSite: "Tingnan ang buong website sa English",
  },
];

export const findIntl = (code: string) => INTL_LANGS.find((l) => l.code === code);
export const intlPath = (code: string) => `/${code}`;
