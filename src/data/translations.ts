import { Language } from '../types';

export const translations = {
  // Brand & Slogans
  brandName: {
    uz: "SportPulse",
    ru: "SportPulse",
    en: "SportPulse"
  },
  brandSubtitle: {
    uz: "SportOolami Jonli Platformasi",
    ru: "Мультиспортивный Онлайн Портал",
    en: "Multi-Sport Portal & Live Platform"
  },

  // Navigation Items (8 Modules)
  nav: {
    liveArena: { uz: "Jonli Arena", ru: "Live Арена", en: "Live Arena" },
    matchesCountdown: { uz: "Kutilyotgan O'yinlar", ru: "Матчи и Таймер", en: "Matches & Countdown" },
    searchFilter: { uz: "Tezkor Qidiruv", ru: "Поиск и Фильтр", en: "Search & Filter" },
    athleteCenter: { uz: "Sportchilar Reytingi", ru: "Центр Атлетов", en: "Athlete Center" },
    standings: { uz: "Turnir Jadvali", ru: "Таблицы Турниров", en: "Standings" },
    fanZone: { uz: "Muxlislar Hududi", ru: "Фан-Зона и Опрос", en: "Fan Zone" },
    ticketInquiry: { uz: "Chiptalar & Bog'lanish", ru: "Билеты и Запросы", en: "Tickets & Inquiry" },
    newsHub: { uz: "Jonli Xabarlar & Audio", ru: "Новости и Аудио", en: "News & Audio Hub" },
  },

  // Audio / Voice Assistant
  audio: {
    voiceAssistant: { uz: "Ovozli Yordamchi", ru: "Голосовой Помощник", en: "Voice Assistant" },
    readListen: { uz: "Tinglash (TTS)", ru: "Слушать (TTS)", en: "Listen (TTS)" },
    listening: { uz: "Ovoz yangramoqda...", ru: "Озвучивание...", en: "Speaking..." },
    stopVoice: { uz: "Ovozni to'xtatish", ru: "Остановить звук", en: "Stop Voice" },
    mute: { uz: "Ovozni o'chirish", ru: "Без звука", en: "Mute Audio" },
    unmute: { uz: "Ovozni yoqish", ru: "Включить звук", en: "Unmute Audio" },
    scoreAnnouncement: {
      uz: "Jonli hisob e'loni",
      ru: "Объявление счета",
      en: "Live score announcement"
    },
    liveCommentary: {
      uz: "Jonli sharhni tinglash",
      ru: "Слушать аудиокомментарий",
      en: "Listen to Live Commentary"
    }
  },

  // Common UI actions & states
  common: {
    live: { uz: "JONLI", ru: "LIVE", en: "LIVE" },
    upcoming: { uz: "KUTILMOQDA", ru: "СКОРО", en: "UPCOMING" },
    finished: { uz: "YAKUNLANDI", ru: "ЗАВЕРШЕН", en: "FINISHED" },
    all: { uz: "Barchasi", ru: "Все", en: "All" },
    viewDetails: { uz: "Batafsil ko'rish", ru: "Подробнее", en: "View Details" },
    refresh: { uz: "Yangilash", ru: "Обновить", en: "Refresh" },
    vs: { uz: "qarshi", ru: "против", en: "vs" },
    today: { uz: "Bugun", ru: "Сегодня", en: "Today" },
    tomorrow: { uz: "Ertaga", ru: "Завтра", en: "Tomorrow" },
    weekend: { uz: "Dam olish kunlari", ru: "Выходные", en: "Weekend" },
    remindMe: { uz: "Eslatma o'rnatish", ru: "Напомнить мне", en: "Remind Me" },
    reminderSet: { uz: "Eslatma o'rnatildi!", ru: "Напоминание установлено!", en: "Reminder set!" },
    days: { uz: "Kun", ru: "Дней", en: "Days" },
    hours: { uz: "Soat", ru: "Часов", en: "Hours" },
    mins: { uz: "Daqiqa", ru: "Мин", en: "Mins" },
    secs: { uz: "Soniya", ru: "Сек", en: "Secs" },
    clearFilters: { uz: "Filtrlarni tozalash", ru: "Сбросить фильтры", en: "Reset Filters" },
    noResults: { uz: "Hech qanday natija topilmadi", ru: "Результаты не найдены", en: "No results found" },
  },

  // Sports Names
  sports: {
    all: { uz: "Barcha Sportlar", ru: "Все виды спорта", en: "All Sports" },
    football: { uz: "Futbol", ru: "Футбол", en: "Football" },
    basketball: { uz: "Basketbol", ru: "Баскетбол", en: "Basketball" },
    tennis: { uz: "Tennis", ru: "Теннис", en: "Tennis" },
    mma: { uz: "MMA & Jang san'ati", ru: "ММА & Единоборства", en: "MMA & Combat" },
    volleyball: { uz: "Voleybol", ru: "Волейбол", en: "Volleyball" },
    boxing: { uz: "Boks", ru: "Бокс", en: "Boxing" },
    esports: { uz: "Kibersport", ru: "Киберспорт", en: "E-Sports" }
  },

  // Section 2: Live Arena & Player
  arena: {
    badge: { uz: "Markaziy Jonli Translyatsiya", ru: "Центральная Live Трансляция", en: "Central Live Broadcast" },
    title: { uz: "Multi-Sport Jonli Maydon", ru: "Мультиспортивная Live Арена", en: "Multi-Sport Live Arena" },
    subtitle: {
      uz: "Haqiqiy vaqt rejimida statistikalar, hisoblar va audio sharhlar bilan matchlarni kuzating.",
      ru: "Следите за матчами в реальном времени со статистикой, событиями и аудиокомментарием.",
      en: "Follow matches in real time with synchronized stats, key events, and live voice audio."
    },
    possession: { uz: "To'p nazorati", ru: "Владение мячом", en: "Possession" },
    shotsOnTarget: { uz: "Aniq zarbalar", ru: "Удары в створ", en: "Shots on Target" },
    fouls: { uz: "Qoidabuzarliklar", ru: "Фолы", en: "Fouls" },
    corners: { uz: "Burchak to'plari", ru: "Угловые", en: "Corners" },
    strikes: { uz: "Jang zarbalari", ru: "Удары (ММА)", en: "Significant Strikes" },
    aces: { uz: "Eyslar", ru: "Эйсы", en: "Aces" },
    timelineTitle: { uz: "O'yin Voqealari Xronologiyasi", ru: "Хронология событий матча", en: "Match Events Timeline" },
    switchStream: { uz: "Translyatsiyani o'zgartirish", ru: "Сменить трансляцию", en: "Switch Stream" },
    liveBroadcastSim: { uz: "Jonli HD Video Kanal", ru: "Прямой HD Видеоканал", en: "Live HD Broadcast Channel" },
    simulateGoal: { uz: "Golni simulyatsiya qilish (+1)", ru: "Симуляция гола (+1)", en: "Simulate Goal (+1)" },
    pauseResume: { uz: "To'xtatish / Davom etish", ru: "Пауза / Возобновить", en: "Pause / Resume" },
    quality: { uz: "1080p 60fps Jonli", ru: "1080p 60fps Live", en: "1080p 60fps Live" }
  },

  // Section 3: Countdown & Upcoming Matches
  countdown: {
    badge: { uz: "Taymer & Vaqt", ru: "Таймеры и Расписание", en: "Timers & Schedule" },
    title: { uz: "Kutilayotgan Katta O'yinlar", ru: "Ожидаемые Матчи и Обратный Отсчет", en: "Upcoming Matches Countdown" },
    subtitle: {
      uz: "Har bir soniyani o'tkazib yubormang. Dynamic JavaScript taymerlari bilan barcha top turnirlar.",
      ru: "Не пропустите ни секунды. Динамические таймеры обратного отсчета для топ-событий.",
      en: "Never miss a moment. High-precision dynamic countdown clocks for major tournaments."
    },
    startsIn: { uz: "Boshlanishiga qoldi:", ru: "До начала осталось:", en: "Starts in:" },
    matchStartsAt: { uz: "Boshlanish vaqti:", ru: "Время начала:", en: "Kickoff:" }
  },

  // Section 4: Search & Filters
  search: {
    badge: { uz: "Tezkor Parametrlar", ru: "Параметры и Фильтрация", en: "Instant Parameters" },
    title: { uz: "Global Sport Qidiruv Tizimi", ru: "Глобальный Поиск и Фильтр", en: "Global Sports Search & Filter" },
    placeholder: {
      uz: "Jamoa, sportchi, turnir yoki mamlakat nomi bo'yicha qidiring...",
      ru: "Поиск по команде, спортсмену, лиге или стране...",
      en: "Search by team, athlete, league, tournament, or country..."
    },
    bySport: { uz: "Sport turi", ru: "Вид спорта", en: "By Sport" },
    byLeague: { uz: "Liga / Turnir", ru: "Лига / Турнир", en: "By League" },
    byDate: { uz: "Sana", ru: "Дата", en: "By Date" },
    byStatus: { uz: "Holat", ru: "Статус", en: "By Status" },
    byCountry: { uz: "Mamlakat", ru: "Страна", en: "By Country" },
    matchesFound: { uz: "ta o'yin topildi", ru: "матчей найдено", en: "matches found" }
  },

  // Section 5: Athlete Stats & Impact Calculator
  athlete: {
    badge: { uz: "Analitika & Kalkulyator", ru: "Аналитика и Калькулятор", en: "Analytics & Calculator" },
    title: { uz: "Sportchilar Markazi & Samaradorlik Kalkulyatori", ru: "Центр Атлетов & Калькулятор Эффективности", en: "Athlete Center & Impact Calculator" },
    subtitle: {
      uz: "Sportchilarning hozirgi matchdagi ko'rsatkichlari va unikal o'yinchi ta'sir reytingi (PIR) hisoblagichi.",
      ru: "Показатели спортсменов в текущих матчах и интерактивный калькулятор рейтинга влияния (PIR).",
      en: "Real-time athlete metrics and an interactive Player Impact Rating (PIR) formula calculator."
    },
    goalsPoints: { uz: "Gollar / Ochkolar", ru: "Голы / Очки", en: "Goals / Points" },
    assists: { uz: "Assistlar (Golli uzatmalar)", ru: "Голевые передачи", en: "Assists" },
    minutesPlayed: { uz: "O'ynalgan daqiqalar", ru: "Сыгранные минуты", en: "Minutes Played" },
    passesRebounds: { uz: "Aniq Paslar / To'p olib qo'yish", ru: "Точные пасы / Подборы", en: "Passes / Rebounds" },
    errorsTurnovers: { uz: "Xatolar / Yo'qotishlar", ru: "Ошибки / Потери", en: "Errors / Turnovers" },
    calculateBtn: { uz: "Reytingni Hisoblash", ru: "Рассчитать Рейтинг", en: "Calculate Impact Rating" },
    pirScore: { uz: "O'yinchi Ta'sir Reytingi (PIR)", ru: "Рейтинг Влияния Игрока (PIR)", en: "Player Impact Rating (PIR)" },
    efficiency: { uz: "Samaradorlik Ko'rsatkichi", ru: "Индекс Эффективности", en: "Efficiency Index" },
    tierElite: { uz: "Yuqori Daraja (Top)", ru: "Элитный Уровень (Топ)", en: "Elite Tier (MVP Candidate)" },
    tierGreat: { uz: "A'lo O'yin", ru: "Отличная Игра", en: "Strong Performance" },
    tierAverage: { uz: "O'rtacha Ko'rsatkich", ru: "Средний Уровень", en: "Average Performance" },
    tierLow: { uz: "Rivojlanish Zarur", ru: "Требуется Улучшение", en: "Needs Improvement" },
    listenAnalysis: { uz: "Analizni Tinglash", ru: "Озвучить Анализ", en: "Listen to Analysis" },
    seasonHighlights: { uz: "Mavsum Yutuqlari", ru: "Достижения Сезона", en: "Season Highlights" }
  },

  // Section 6: Tournament Standings
  standings: {
    badge: { uz: "Natijalar & O'rinlar", ru: "Таблицы и Места", en: "Tables & Rankings" },
    title: { uz: "Interaktiv Turnir Jadvallari", ru: "Интерактивные Таблицы Турниров", en: "Interactive Tournament Standings" },
    subtitle: {
      uz: "O'zbekiston Superligasi, Yevropa Chempionlar Ligasi, NBA va ATP reytinglarining so'nggi holati.",
      ru: "Актуальное положение команд в Суперлиге Узбекистана, Лиге Чемпионов, NBA и рейтинге ATP.",
      en: "Up-to-date standings across the Uzbek Super League, Champions League, NBA, and ATP tour."
    },
    rank: { uz: "O'rin", ru: "Место", en: "Rank" },
    team: { uz: "Jamoa / Sportchi", ru: "Команда / Атлет", en: "Team / Athlete" },
    played: { uz: "O'", ru: "И", en: "P" },
    won: { uz: "G'", ru: "В", en: "W" },
    draw: { uz: "D", ru: "Н", en: "D" },
    lost: { uz: "M", ru: "П", en: "L" },
    diff: { uz: "+/-", ru: "+/-", en: "+/-" },
    points: { uz: "Ochko", ru: "Очки", en: "PTS" },
    form: { uz: "Forma", ru: "Форма", en: "Form" }
  },

  // Section 7: Fan Zone & Tickets
  fanZone: {
    badge: { uz: "Interaktiv Muxlislar Maydoni", ru: "Интерактивная Фан-Зона", en: "Interactive Fan Zone" },
    pollTitle: { uz: "Kunning Bosh O'yini: G'olibni Aniqlang!", ru: "Главный Матч Дня: Угадайте Победителя!", en: "Match of the Day: Predict the Winner!" },
    pollSubtitle: {
      uz: "O'z ovozingizni bering va butun dunyo muxlislari prognozlarini real vaqtda ko'ring.",
      ru: "Отдайте свой голос и следите за распределением прогнозов болельщиков со всего мира.",
      en: "Cast your prediction vote and view real-time sentiment breakdown across global fans."
    },
    voteBtn: { uz: "Ovoz berish", ru: "Голосовать", en: "Vote" },
    votedThankYou: { uz: "Ovozingiz qabul qilindi!", ru: "Ваш голос учтен!", en: "Your vote has been cast!" },
    totalVotes: { uz: "Jami ovozlar:", ru: "Всего голосов:", en: "Total votes:" },
    draw: { uz: "Durang", ru: "Ничья", en: "Draw" },
    ticketTitle: { uz: "Chiptalarga Buyurtma & Rasmiy Murojaat", ru: "Заказ Билетов и Обратная Связь", en: "Ticket Inquiry & Feedback Form" },
    ticketSubtitle: {
      uz: "Matchlarga rasmiy chiptalar sotib olish yoki savollar yuborish uchun formani to'ldiring.",
      ru: "Заполните форму для запроса официальных билетов или отправки отзыва организаторам.",
      en: "Inquire about official match tickets, VIP access, or share direct stadium feedback."
    },
    fullName: { uz: "To'liq Ismingiz", ru: "Ваше Имя и Фамилия", en: "Full Name" },
    fullNamePlaceholder: { uz: "Masalan: Jamshid Aliyev", ru: "Например: Алишер Усманов", en: "e.g. Alexander Stone" },
    email: { uz: "Elektron Pochta", ru: "Электронная Почта", en: "Email Address" },
    emailPlaceholder: { uz: "example@sportpulse.uz", ru: "example@sportpulse.com", en: "example@sportpulse.com" },
    selectMatch: { uz: "O'yinni tanlang", ru: "Выберите матч", en: "Select Match" },
    ticketCategory: { uz: "Chipta Toifasi", ru: "Категория Билета", en: "Ticket Category" },
    categoryVIP: { uz: "VIP Tribuna & Lounge", ru: "VIP Трибуна & Lounge", en: "VIP Box & Lounge" },
    categoryStandard: { uz: "Standart O'rindiq", ru: "Стандартное Место", en: "Standard Seat" },
    categoryFanZone: { uz: "Muxlislar Sektori (Ultra)", ru: "Фан-Сектор (Ultra)", en: "Fan Zone (Ultra)" },
    categoryPress: { uz: "Matbuot & Media", ru: "Пресса & Медиа", en: "Press & Media" },
    ticketCount: { uz: "Chiptalar Soni", ru: "Количество Билетов", en: "Number of Tickets" },
    notes: { uz: "Qo'shimcha izoh yoki savolingiz", ru: "Комментарий или вопрос", en: "Additional Notes or Inquiry" },
    notesPlaceholder: { uz: "O'rindiq joylashuvi yoki maxsus so'rovlar...", ru: "Пожелания по местам или вопросы...", en: "Special seating requests or questions..." },
    submitTicket: { uz: "So'rovni Yuborish", ru: "Отправить Заявку", en: "Submit Inquiry" },
    modalSuccessTitle: { uz: "So'rovingiz Muvaffaqiyatli Qabul Qilindi!", ru: "Заявка Успешно Принята!", en: "Inquiry Submitted Successfully!" },
    modalSuccessText: {
      uz: "Tez orada elektron pochtangizga tasdiq kodi va batafsil chipta ma'lumotlari jo'natiladi.",
      ru: "Подтверждение и реквизиты бронирования отправлены на указанный адрес электронной почты.",
      en: "A confirmation code and booking details have been dispatched to your email address."
    },
    closeModal: { uz: "Tushunarli / Yopish", ru: "Понятно / Закрыть", en: "Close" },
    errorRequired: { uz: "Iltimos, ushbu maydonni to'ldiring.", ru: "Пожалуйста, заполните это поле.", en: "Please fill out this field." },
    errorEmail: { uz: "Yaroqli elektron pochta manzilini kiriting.", ru: "Введите корректный email адрес.", en: "Please enter a valid email address." },
    errorTickets: { uz: "Chiptalar soni kamida 1 bo'lishi kerak.", ru: "Количество билетов должно быть не менее 1.", en: "Ticket quantity must be at least 1." }
  },

  // Section 8: Live News & Audio Hub
  news: {
    badge: { uz: "Eksklyuziv Yangiliklar", ru: "Эксклюзивные Новости", en: "Exclusive News" },
    title: { uz: "Jonli Xabarlar & Audio Sharh Markazi", ru: "Центр Новостей и Аудио Озвучки", en: "Live News & Voice Commentary Hub" },
    subtitle: {
      uz: "So'nggi yangiliklarni nafaqat o'qing, balki sun'iy ovoz yordamida jonli tinglang.",
      ru: "Читайте и слушайте главные события мирового спорта с помощью технологии синтеза речи.",
      en: "Read and listen to breaking world sports news powered by browser Web Speech API voice synthesis."
    },
    allNews: { uz: "Barcha xabarlar", ru: "Все новости", en: "All News" },
    transfers: { uz: "Transferlar", ru: "Трансферы", en: "Transfers" },
    breaking: { uz: "Tezkor", ru: "Срочно", en: "Breaking" },
    report: { uz: "O'yin tahlillari", ru: "Отчеты матчей", en: "Match Reports" },
    analysis: { uz: "Ekspert fikri", ru: "Аналитика", en: "Expert Analysis" },
    readTimeMin: { uz: "daqiqalik o'qish", ru: "мин чтения", en: "min read" }
  },

  // Footer
  footer: {
    description: {
      uz: "SportPulse — eng so'nggi multi-sport translyatsiyalari, jonli natijalar, tahlillar va audio sharhlar platformasi.",
      ru: "SportPulse — ведущая мультиспортивная платформа прямых трансляций, статистики, аналитики и аудиокомментариев.",
      en: "SportPulse — modern multi-sport live streaming, real-time scoreboards, athlete analytics, and voice commentary platform."
    },
    quickLinks: { uz: "Tezkor Havolalar", ru: "Быстрые Ссылки", en: "Quick Links" },
    supportedSports: { uz: "Sport Turlari", ru: "Виды Спорта", en: "Sports Covered" },
    legal: { uz: "Huquqiy Ma'lumotlar", ru: "Правовая Информация", en: "Legal" },
    privacy: { uz: "Maxfiylik Siyosati", ru: "Политика Конфиденциальности", en: "Privacy Policy" },
    terms: { uz: "Foydalanish Qoidalari", ru: "Условия Использования", en: "Terms of Service" },
    rights: { uz: "Barcha huquqlar himoyalangan.", ru: "Все права защищены.", en: "All rights reserved." },
    accessibility: { uz: "Web Speech API Ovozli Qo'llab-quvvatlash", ru: "Поддержка синтеза речи Web Speech API", en: "Web Speech API Voice Synthesis Enabled" }
  }
};
