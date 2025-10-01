exports.handler = async (event, context) => {
    // Diccionario Global: 25 Idiomas (Palabras comunes, sustantivos, verbos, adjetivos)
    const DICTIONARIES = {
        'es': ["PERRO", "GATO", "CASA", "SOL", "LUNA", "AGUA", "FUEGO", "LIBRO", "MESA", "SILLA", "VERDE", "AZUL", "GRANDE", "RÁPIDO", "LENTO", "COMER", "DORMIR", "CORRER", "PENSAR", "HABLAR", "AYER", "HOY", "MAÑANA", "FELIZ", "TRISTE", "CALOR", "FRÍO", "CIELO", "TIERRA", "MAR", "MONTAÑA", "FLOR", "ÁRBOL", "PLUMA", "TELÉFONO", "MÚSICA", "LENGUA", "PALABRA", "NÚMERO", "CERO", "UNO", "DIEZ", "CIEN", "MIEDO", "AMOR", "VIDA", "MUERTE", "BIEN", "MAL"],
        'en': ["DOG", "CAT", "HOUSE", "SUN", "MOON", "WATER", "FIRE", "BOOK", "TABLE", "CHAIR", "GREEN", "BLUE", "BIG", "FAST", "SLOW", "EAT", "SLEEP", "RUN", "THINK", "SPEAK", "YESTERDAY", "TODAY", "TOMORROW", "HAPPY", "SAD", "HEAT", "COLD", "SKY", "EARTH", "SEA", "MOUNTAIN", "FLOWER", "TREE", "FEATHER", "PHONE", "MUSIC", "LANGUAGE", "WORD", "NUMBER", "ZERO", "ONE", "TEN", "HUNDRED", "FEAR", "LOVE", "LIFE", "DEATH", "GOOD", "EVIL"],
        'fr': ["CHIEN", "CHAT", "MAISON", "SOLEIL", "LUNE", "EAU", "FEU", "LIVRE", "TABLE", "CHAISE", "VERT", "BLEU", "GRAND", "RAPIDE", "LENT", "MANGER", "DORMIR", "COURIR", "PENSER", "PARLER", "HIER", "AUJOURD'HUI", "DEMAIN", "HEUREUX", "TRISTE", "CHALEUR", "FROID", "CIEL", "TERRE", "MER", "MONTAGNE", "FLEUR", "ARBRE", "PLUME", "TÉLÉPHONE", "MUSIQUE", "LANGUE", "MOT", "NOMBRE", "ZÉRO", "UN", "DIX", "CENT", "PEUR", "AMOUR", "VIE", "MORT", "BIEN", "MAL"],
        'de': ["HUND", "KATZE", "HAUS", "SONNE", "MOND", "WASSER", "FEUER", "BUCH", "TISCH", "STUHL", "GRÜN", "BLAU", "GROSS", "SCHNELL", "LANGSAM", "ESSEN", "SCHLAFEN", "LAUFEN", "DENKEN", "SPRECHEN", "GESTERN", "HEUTE", "MORGEN", "GLÜCKLICH", "TRAURIG", "WÄRME", "KÄLTE", "HIMMEL", "ERDE", "MEER", "BERG", "BLUME", "BAUM", "FEDER", "TELEFON", "MUSIK", "SPRACHE", "WORT", "NUMMER", "NULL", "EINS", "ZEHN", "HUNDERT", "ANGST", "LIEBE", "LEBEN", "TOD", "GUT", "BÖSE"],
        'it': ["CANE", "GATTO", "CASA", "SOLE", "LUNA", "ACQUA", "FUOCO", "LIBRO", "TAVOLO", "SEDIA", "VERDE", "BLU", "GRANDE", "VELOCE", "LENTO", "MANGIARE", "DORMIRE", "CORRERE", "PENSARE", "PARLARE", "IERI", "OGGI", "DOMANI", "FELICE", "TRISTE", "CALORE", "FREDDO", "CIELO", "TERRA", "MARE", "MONTAGNA", "FIORE", "ALBERO", "PIUMA", "TELEFONO", "MUSICA", "LINGUA", "PAROLA", "NUMERO", "ZERO", "UNO", "DIECI", "CENTO", "PAURA", "AMORE", "VITA", "MORTE", "BENE", "MALE"],
        'pt': ["CÃO", "GATO", "CASA", "SOL", "LUA", "ÁGUA", "FOGO", "LIVRO", "MESA", "CADEIRA", "VERDE", "AZUL", "GRANDE", "RÁPIDO", "LENTO", "COMER", "DORMIR", "CORRER", "PENSAR", "FALAR", "ONTEM", "HOJE", "AMANHÃ", "FELIZ", "TRISTE", "CALOR", "FRIO", "CÉU", "TERRA", "MAR", "MONTANHA", "FLOR", "ÁRVORE", "PENA", "TELEFONE", "MÚSICA", "LÍNGUA", "PALAVRA", "NÚMERO", "ZERO", "UM", "DEZ", "CEM", "MEDO", "AMOR", "VIDA", "MORTE", "BEM", "MAL"],
        'ru': ["СОБАКА", "КОШКА", "ДОМ", "СОЛНЦЕ", "ЛУНА", "ВОДА", "ОГОНЬ", "КНИГА", "СТОЛ", "СТУЛ", "ЗЕЛЕНЫЙ", "СИНИЙ", "БОЛЬШОЙ", "БЫСТРЫЙ", "МЕДЛЕННЫЙ", "ЕСТЬ", "СПАТЬ", "БЕГАТЬ", "ДУМАТЬ", "ГОВОРИТЬ", "ВЧЕРА", "СЕГОДНЯ", "ЗАВТРА", "СЧАСТЛИВЫЙ", "ГРУСТНЫЙ", "ТЕПЛО", "ХОЛОД", "НЕБО", "ЗЕМЛЯ", "МОРЕ", "ГОРА", "ЦВЕТОК", "ДЕРЕВО", "ПЕРО", "ТЕЛЕФОН", "МУЗЫКА", "ЯЗЫК", "СЛОВО", "ЧИСЛО", "НОЛЬ", "ОДИН", "ДЕСЯТЬ", "СТО", "СТРАХ", "ЛЮБОВЬ", "ЖИЗНЬ", "СМЕРТЬ", "ХОРОШО", "ПЛОХО"],
        'ja': ["イヌ", "ネコ", "いえ", "たいよう", "つき", "みず", "ひ", "ほん", "つくえ", "いす", "みどり", "あお", "おおきい", "はやい", "おそい", "たべる", "ねる", "はしる", "かんがえる", "はなす", "きのう", "きょう", "あした", "しあわせ", "かなしい", "あつい", "さむい", "そら", "ちきゅう", "うみ", "やま", "はな", "き", "はね", "でんわ", "おんがく", "ことば", "たんご", "かず", "ゼロ", "いち", "じゅう", "ひゃく", "きょうふ", "あい", "いのち", "し", "よい", "わるい"],
        'ko': ["개", "고양이", "집", "태양", "달", "물", "불", "책", "테이블", "의자", "녹색", "파란색", "큰", "빠른", "느린", "먹다", "자다", "달리다", "생각하다", "말하다", "어제", "오늘", "내일", "행복한", "슬픈", "더위", "추위", "하늘", "지구", "바다", "산", "꽃", "나무", "깃털", "전화", "음악", "언어", "단어", "숫자", "영", "하나", "열", "백", "두려움", "사랑", "삶", "죽음", "좋은", "나쁜"],
        'zh': ["狗", "猫", "房子", "太阳", "月亮", "水", "火", "书", "桌子", "椅子", "绿色", "蓝色", "大", "快", "慢", "吃", "睡觉", "跑", "思考", "说", "昨天", "今天", "明天", "快乐", "悲伤", "热", "冷", "天空", "地球", "海洋", "山", "花", "树", "羽毛", "电话", "音乐", "语言", "词", "数字", "零", "一", "十", "百", "恐惧", "爱", "生活", "死亡", "好", "坏"],
        'ar': ["كلب", "قطة", "منزل", "شمس", "قمر", "ماء", "نار", "كتاب", "طاولة", "كرسي", "أخضر", "أزرق", "كبير", "سريع", "بطيء", "يأكل", "ينام", "يركض", "يفكر", "يتحدث", "أمس", "اليوم", "غدا", "سعيد", "حزين", "حرارة", "برودة", "سماء", "أرض", "بحر", "جبل", "زهرة", "شجرة", "ريشة", "هاتف", "موسيقى", "لغة", "كلمة", "رقم", "صفر", "واحد", "عشرة", "مائة", "خوف", "حب", "حياة", "موت", "جيد", "سيئ"],
        'tr': ["KÖPEK", "KEDİ", "EV", "GÜNEŞ", "AY", "SU", "ATEŞ", "KİTAP", "MASA", "SANDALYE", "YEŞİL", "MAVİ", "BÜYÜK", "HIZLI", "YAVAŞ", "YEMEK", "UYUMAK", "KOŞMAK", "DÜŞÜNMEK", "KONUŞMAK", "DÜN", "BUGÜN", "YARIN", "MUTLU", "ÜZGÜN", "SICAK", "SOĞUK", "GÖK", "TOPRAK", "DENİZ", "DAĞ", "ÇİÇEK", "AĞAÇ", "TÜY", "TELEFON", "MÜZİK", "DİL", "KELİME", "SAYI", "SIFIR", "BİR", "ON", "YÜZ", "KORKU", "AŞK", "HAYAT", "ÖLÜM", "İYİ", "KÖTÜ"],
        'sv': ["HUND", "KATT", "HUS", "SOL", "MÅNE", "VATTEN", "ELD", "BOK", "BORD", "STOL", "GRÖN", "BLÅ", "STOR", "SNABB", "LÅNGSAM", "ÄTA", "SOVA", "SPRINGA", "TÄNKA", "TALA", "IGÅR", "IDAG", "IMORGON", "LYCKLIG", "LEDEN", "VÄRME", "KYLA", "HIMMEL", "JORD", "HAV", "BERG", "BLOMMA", "TRÄD", "FJÄDER", "TELEFON", "MUSIK", "SPRÅK", "ORD", "NUMMER", "NOLL", "ETT", "TIO", "HUNDRA", "RÄDSLA", "KÄRLEK", "LIV", "DÖD", "BRA", "ONDSKA"],
        'nl': ["HOND", "KAT", "HUIS", "ZON", "MAAN", "WATER", "VUUR", "BOEK", "TAFEL", "STOEL", "GROEN", "BLAUW", "GROOT", "SNEL", "LANGZAAM", "ETEN", "SLAPEN", "LOPEN", "DENKEN", "SPREKEN", "GISTEREN", "VANDAAG", "MORGEN", "BLIJ", "DROEVIG", "WARMTE", "KOU", "HEMEL", "AARDE", "ZEE", "BERG", "BLOEM", "BOOM", "VEER", "TELEFOON", "MUZIEK", "TAAL", "WOORD", "NUMMER", "NUL", "EEN", "TIEN", "HONDERD", "ANGST", "LIEFDE", "LEVEN", "DOOD", "GOED", "KWAAD"],
        'pl': ["PIES", "KOT", "DOM", "SŁOŃCE", "KSIĘŻYC", "WODA", "OGIEŃ", "KSIĄŻKA", "STÓŁ", "KRZESŁO", "ZIELONY", "NIEBIESKI", "DUŻY", "SZYBKI", "WOLNY", "JEŚĆ", "SPAĆ", "BIEGAĆ", "MYŚLEĆ", "MÓWIĆ", "WCZORAJ", "DZISIAJ", "JUTRO", "SZCZĘŚLIWY", "SMUTNY", "CIEPŁO", "ZIMNO", "NIEBO", "ZIEMIA", "MORZE", "GÓRA", "KWIAT", "DRZEWO", "PIÓRO", "TELEFON", "MUZYKA", "JĘZYK", "SŁOWO", "LICZBA", "ZERO", "JEDEN", "DZIESIĘĆ", "STO", "STRACH", "MIŁOŚĆ", "ŻYCIE", "ŚMIERĆ", "DOBRZE", "ZŁO"],
        'hi': ["कुत्ता", "बिल्ली", "घर", "सूरज", "चाँद", "पानी", "आग", "किताब", "मेज़", "कुर्सी", "हरा", "नीला", "बड़ा", "तेज़", "धीमा", "खाना", "सोना", "दौड़ना", "सोचना", "बोलना", "कल", "आज", "कल", "खुश", "उदास", "गर्मी", "सर्दी", "आसमान", "पृथ्वी", "समुद्र", "पहाड़", "फूल", "पेड़", "पंख", "फ़ोन", "संगीत", "भाषा", "शब्द", "संख्या", "शून्य", "एक", "दस", "सौ", "डर", "प्यार", "जीवन", "मृत्यु", "अच्छा", "बुरा"],
        'id': ["ANJING", "KUCING", "RUMAH", "MATAHARI", "BULAN", "AIR", "API", "BUKU", "MEJA", "KURSI", "HIJAU", "BIRU", "BESAR", "CEPAT", "LAMBAT", "MAKAN", "TIDUR", "LARI", "PIKIR", "BICARA", "KEMARIN", "HARI_INI", "BESOK", "SENANG", "SEDIH", "PANAS", "DINGIN", "LANGIT", "BUMI", "LAUT", "GUNUNG", "BUNGA", "POHON", "BULU", "TELEPON", "MUSIK", "BAHASA", "KATA", "ANGKA", "NOL", "SATU", "SEPULUH", "SERATUS", "TAKUT", "CINTA", "HIDUP", "MATI", "BAIK", "BURUK"],
        'el': ["ΣΚΥΛΟΣ", "ΓΑΤΑ", "ΣΠΙΤΙ", "ΗΛΙΟΣ", "ΦΕΓΓΑΡΙ", "ΝΕΡΟ", "ΦΩΤΙΑ", "ΒΙΒΛΙΟ", "ΤΡΑΠΕΖΙ", "ΚΑΡΕΚΛΑ", "ΠΡΑΣΙΝΟ", "ΜΠΛΕ", "ΜΕΓΑΛΟ", "ΓΡΗΓΟΡΟΣ", "ΑΡΓΟΣ", "ΤΡΩΩ", "ΚΟΙΜΑΜΑΙ", "ΤΡΕΧΩ", "ΣΚΕΦΤΟΜΑΙ", "ΜΙΛΑΩ", "ΧΘΕΣ", "ΣΗΜΕΡΑ", "ΑΥΡΙΟ", "ΕΥΤΥΧΙΣΜΕΝΟΣ", "ΛΥΠΗΜΕΝΟΣ", "ΖΕΣΤΗ", "ΚΡΥΟ", "ΟΥΡΑΝΟΣ", "ΓΗ", "ΘΑΛΑΣΣΑ", "ΒΟΥΝΟ", "ΛΟΥΛΟΥΔΙ", "ΔΕΝΤΡΟ", "ΦΤΕΡΟ", "ΤΗΛΕΦΩΝΟ", "ΜΟΥΣΙΚΗ", "ΓΛΩΣΣΑ", "ΛΕΞΗ", "ΑΡΙΘΜΟΣ", "ΜΗΔΕΝ", "ΕΝΑ", "ΔΕΚΑ", "ΕΚΑΤΟ", "ΦΟΒΟΣ", "ΑΓΑΠΗ", "ΖΩΗ", "ΘΑΝΑΤΟΣ", "ΚΑΛΟ", "ΚΑΚΟ"],
        'th': ["สุนัข", "แมว", "บ้าน", "ดวงอาทิตย์", "พระจันทร์", "น้ำ", "ไฟ", "หนังสือ", "โต๊ะ", "เก้าอี้", "สีเขียว", "สีน้ำเงิน", "ใหญ่", "เร็ว", "ช้า", "กิน", "นอน", "วิ่ง", "คิด", "พูด", "เมื่อวาน", "วันนี้", "พรุ่งนี้", "มีความสุข", "เศร้า", "ร้อน", "เย็น", "ท้องฟ้า", "โลก", "ทะเล", "ภูเขา", "ดอกไม้", "ต้นไม้", "ขนนก", "โทรศัพท์", "ดนตรี", "ภาษา", "คำ", "หมายเลข", "ศูนย์", "หนึ่ง", "สิบ", "ร้อย", "ความกลัว", "ความรัก", "ชีวิต", "ความตาย", "ดี", "ชั่ว"],
        'vi': ["CHÓ", "MÈO", "NHÀ", "MẶT_TRỜI", "MẶT_TRĂNG", "NƯỚC", "LỬA", "SÁCH", "BÀN", "GHẾ", "XANH_LÁ", "XANH_DƯƠNG", "LỚN", "NHANH", "CHẬM", "ĂN", "NGỦ", "CHẠY", "NGHĨ", "NÓI", "HÔM_QUA", "HÔM_NAY", "NGÀY_MAI", "VUI_VẺ", "BUỒN", "NÓNG", "LẠNH", "TRỜI", "ĐẤT", "BIỂN", "NÚI", "HOA", "CÂY", "LÔNG_VŨ", "ĐIỆN_THOẠI", "ÂM_NHẠC", "NGÔN_NGỮ", "TỪ", "SỐ", "KHÔNG", "MỘT", "MƯỜI", "TRĂM", "SỢ_HÃI", "TÌNH_YÊU", "CUỘC_SỐNG", "CÁI_CHẾT", "TỐT", "XẤU"],
        'fi': ["KOIRA", "KISSA", "TALO", "AURINKO", "KUU", "VESI", "TULI", "KIRJA", "PÖYTÄ", "TUOLI", "VIHREÄ", "SININEN", "ISO", "NOPEA", "HIDAS", "SYÖDÄ", "NUKKUA", "JUOSTA", "AJATELLA", "PUHUA", "EILEN", "TÄNÄÄN", "HUOMENNA", "ILOINEN", "SURULLINEN", "LÄMPÖ", "KYLMÄ", "TAIVAS", "MAA", "MERI", "VUORI", "KUKKA", "PUU", "SULKA", "PUHELIN", "MUSIIKKI", "KIELI", "SANA", "NUMERO", "NÄYTE", "YKSI", "KYMMENEN", "SATA", "PELKO", "RAKKAUS", "ELÄMÄ", "KUOLEMA", "HYVÄ", "PAHA"],
        'cs': ["PES", "KOČKA", "DŮM", "SLUNCE", "MĚSÍC", "VODA", "OHEŇ", "KNIHA", "STŮL", "ŽIDLE", "ZELENÁ", "MODRÁ", "VELKÝ", "RYCHLÝ", "POMALÝ", "JÍST", "SPÁT", "BĚHAT", "PŘEMÝŠLET", "MLUVIT", "VČERA", "DNES", "ZÍTRA", "ŠŤASTNÝ", "SMUTNÝ", "TEPLO", "ZIMA", "OBLOHA", "ZEMĚ", "MOŘE", "HORA", "KVĚTINA", "STROM", "PEŘÍ", "TELEFON", "HUDBA", "JAZYK", "SLOVO", "ČÍSLO", "NULA", "JEDNA", "DESET", "STO", "STRACH", "LÁSKA", "ŽIVOT", "SMRT", "DOBRÝ", "ZLÝ"],
        'da': ["HUND", "KAT", "HUS", "SOL", "MÅNE", "VAND", "ILD", "BOG", "BORD", "STOL", "GRØN", "BLÅ", "STOR", "HURTIG", "LANGSOM", "SPISE", "SOVE", "LØBE", "TÆNKE", "TALE", "I_GÅR", "I_DAG", "I_MORGEN", "GLAD", "TRIST", "VARME", "KULDE", "HIMMEL", "JORD", "HAV", "BJERG", "BLOMST", "TRÆ", "FJER", "TELEFON", "MUSIK", "SPROG", "ORD", "NUMMER", "NUL", "EN", "TI", "HUNDREDE", "FRYGT", "KÆRLIGHED", "LIV", "DØD", "GOD", "OND"],
        'hu': ["KUTYA", "MACSKA", "HÁZ", "NAP", "HOLD", "VÍZ", "TŰZ", "KÖNYV", "ASZTAL", "SZÉK", "ZÖLD", "KÉK", "NAGY", "GYORS", "LASSÚ", "ESZIK", "ALSZIK", "FUT", "GONDOLKODIK", "BESZÉL", "TEGNAP", "MA", "HOLNAP", "BOLDOG", "SZOMORÚ", "HŐ", "HIDEG", "ÉG", "FÖLD", "TENGER", "HEGY", "VIRÁG", "FA", "TOLL", "TELEFON", "ZENE", "NYELV", "SZÓ", "SZÁM", "NULLA", "EGY", "TÍZ", "SZÁZ", "FÉLELEM", "SZERETET", "ÉLET", "HALÁL", "JÓ", "ROSSZ"],
        'el': ["ΣΚΥΛΟΣ", "ΓΑΤΑ", "ΣΠΙΤΙ", "ΗΛΙΟΣ", "ΦΕΓΓΑΡΙ", "ΝΕΡΟ", "ΦΩΤΙΑ", "ΒΙΒΛΙΟ", "ΤΡΑΠΕΖΙ", "ΚΑΡΕΚΛΑ", "ΠΡΑΣΙΝΟ", "ΜΠΛΕ", "ΜΕΓΑΛΟ", "ΓΡΗΓΟΡΟΣ", "ΑΡΓΟΣ", "ΤΡΩΩ", "ΚΟΙΜΑΜΑΙ", "ΤΡΕΧΩ", "ΣΚΕΦΤΟΜΑΙ", "ΜΙΛΑΩ", "ΧΘΕΣ", "ΣΗΜΕΡΑ", "ΑΥΡΙΟ", "ΕΥΤΥΧΙΣΜΕΝΟΣ", "ΛΥΠΗΜΕΝΟΣ", "ΖΕΣΤΗ", "ΚΡΥΟ", "ΟΥΡΑΝΟΣ", "ΓΗ", "ΘΑΛΑΣΣΑ", "ΒΟΥΝΟ", "ΛΟΥΛΟΥΔΙ", "ΔΕΝΤΡΟ", "ΦΤΕΡΟ", "ΤΗΛΕΦΩΝΟ", "ΜΟΥΣΙΚΗ", "ΓΛΩΣΣΑ", "ΛΕΞΗ", "ΑΡΙΘΜΟΣ", "ΜΗΔΕΝ", "ΕΝΑ", "ΔΕΚΑ", "ΕΚΑΤΟ", "ΦΟΒΟΣ", "ΑΓΑΠΗ", "ΖΩΗ", "ΘΑΝΑΤΟΣ", "ΚΑΛΟ", "ΚΑΚΟ"],
        'he': ["כֶּלֶב", "חָתוּל", "בַּיִת", "שֶׁמֶשׁ", "יָרֵחַ", "מַיִם", "אֵשׁ", "סֵפֶר", "שֻׁלְחָן", "כִּסֵּא", "יָרֹק", "כָּחֹל", "גָּדוֹל", "מָהִיר", "אִטִּי", "לֶאֱכֹל", "לִישׁוֹן", "לָרוּץ", "לַחְשׁוֹב", "לְדַבֵּר", "אֶתְמוֹל", "הַיּוֹם", "מָחָר", "שָׂמֵחַ", "עָצוּב", "חֹם", "קֹר", "שָׁמַיִם", "אֲדָמָה", "יָם", "הַר", "פֶּרַח", "עֵץ", "נוֹצָה", "טֶלֶפוֹן", "מוּזִיקָה", "שָׂפָה", "מִלָּה", "מִסְפָּר", "אֶפֶס", "אֶחָד", "עֶשֶׂר", "מֵאָה", "פַּחַד", "אַהֲבָה", "חַיִּים", "מָוֶת", "טוֹב", "רַע"],
        'no': ["HUND", "KATT", "HUS", "SOL", "MÅNE", "VANN", "ILD", "BOK", "BORD", "STOL", "GRØNN", "BLÅ", "STOR", "RASK", "SAKTE", "SPISE", "SOVE", "LØPE", "TENKE", "SNAKKE", "I_GÅR", "I_DAG", "I_MORGEN", "GLAD", "TRIST", "VARME", "KULDE", "HIMMEL", "JORD", "HAV", "FJELL", "BLOMST", "TRE", "FJÆR", "TELEFON", "MUSIKK", "SPRÅK", "ORD", "NUMMER", "NULL", "EN", "TI", "HUNDRE", "FRYKT", "KJÆRLIGHET", "LIV", "DØD", "BRA", "ONDT"],

        // Diccionario de Emergencia si el idioma solicitado no se encuentra o está vacío
        'fallback': ["ERROR_LANGUAGE", "FALLBACK_USED", "CHECK_CODE_OR_COUNT"] 
    };
    
    // 2. Obtener Parámetros
    const { lang, count } = event.queryStringParameters;
    
    // 3. Validar Idioma y Cargar Diccionario
    const languageCode = (lang && lang.toLowerCase()) || 'es'; // 'es' es el idioma por defecto
    
    let dictionary = DICTIONARIES[languageCode];
    
    // Si el diccionario del idioma solicitado no existe o está vacío
    if (!dictionary || dictionary.length === 0) {
        dictionary = DICTIONARIES['fallback'];
    }
    
    // 4. Validar Número de Palabras
    const numToReturn = parseInt(count) || 1; 

    // El límite máximo es el tamaño del diccionario para evitar errores si pides más palabras de las que hay.
    const MAX_COUNT = dictionary.length; 

    if (numToReturn <= 0 || numToReturn > 50) {
        return { 
            statusCode: 400, 
            body: `ERROR: 'count' must be between 1 and 50.` 
        };
    }

    // 5. Generar Palabras Aleatorias (Permite Repetición)
    let result = [];
    const dictLength = dictionary.length;
    
    for (let i = 0; i < numToReturn; i++) {
        const randomIndex = Math.floor(Math.random() * dictLength);
        result.push(dictionary[randomIndex]);
    }
    
    // 6. Devolver el resultado separado por comas
    return {
        statusCode: 200,
        body: result.join(','), 
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    };
};
