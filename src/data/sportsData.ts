import { MatchItem, Athlete, StandingRow, NewsArticle } from '../types';

export const initialMatches: MatchItem[] = [
  {
    id: 'match-1',
    sport: 'football',
    league: 'UEFA Champions League',
    country: 'Europe',
    homeTeam: {
      name: 'Real Madrid',
      shortName: 'RMA',
      logoText: 'RM',
      flag: '🇪🇸',
      color: '#00529F'
    },
    awayTeam: {
      name: 'Manchester City',
      shortName: 'MCI',
      logoText: 'MC',
      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      color: '#6CABDD'
    },
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    periodText: "74' 2-bo'lim",
    minuteNumber: 74,
    scheduledTime: new Date(Date.now() + 1000 * 60 * 35).toISOString(),
    dateLabel: 'Today, 21:00',
    venue: 'Santiago Bernabéu, Madrid',
    previewImage: '/src/assets/images/hero_match_stadium_1792403093609.jpg',
    stats: {
      homePossession: 53,
      awayPossession: 47,
      homeShots: 11,
      awayShots: 9,
      homeFouls: 8,
      awayFouls: 10,
      homeCorners: 6,
      awayCorners: 4
    },
    events: [
      { id: 'e1', minute: "24'", type: 'goal', team: 'home', player: 'Vinicius Jr.', description: 'Ajoyib o\'ng qanot reydi va pastki burchakka zarba.' },
      { id: 'e2', minute: "41'", type: 'card', team: 'away', player: 'Rodri', description: 'Markazda qo\'pol to\'xtatish uchun sariq kartochka.' },
      { id: 'e3', minute: "53'", type: 'goal', team: 'away', player: 'Erling Haaland', description: 'De Bruyne uzatmasidan so\'ng bosh bilan darvozani ishg\'ol qildi.' },
      { id: 'e4', minute: "68'", type: 'goal', team: 'home', player: 'Jude Bellingham', description: 'Jarima maydonchasi ichidagi kombinatsiyadan keyin hisobni oshirdi.' }
    ],
    audioDescriptionUz: "UEFA Chempionlar Ligasi chorak finali. Real Madrid 2, Manchester Siti 1. Hozir 74-daqiqa o'tmoqda. Real Madrid to'p nazoratini saqlab turibdi.",
    audioDescriptionRu: "Лига Чемпионов УЕФА. Реал Мадрид 2, Манчестер Сити 1. Идет 74-я минута матча на стадионе Сантьяго Бернабеу.",
    audioDescriptionEn: "UEFA Champions League. Real Madrid 2, Manchester City 1. 74 minutes played at the Santiago Bernabeu stadium."
  },
  {
    id: 'match-2',
    sport: 'basketball',
    league: 'NBA Championship',
    country: 'USA',
    homeTeam: {
      name: 'Boston Celtics',
      shortName: 'BOS',
      logoText: 'BOS',
      flag: '🇺🇸',
      color: '#007A33'
    },
    awayTeam: {
      name: 'Dallas Mavericks',
      shortName: 'DAL',
      logoText: 'DAL',
      flag: '🇺🇸',
      color: '#00538C'
    },
    homeScore: 98,
    awayScore: 94,
    status: 'live',
    periodText: 'Q4 02:34',
    minuteNumber: 46,
    scheduledTime: new Date(Date.now() + 1000 * 60 * 12).toISOString(),
    dateLabel: 'Today, 22:30',
    venue: 'TD Garden, Boston',
    previewImage: '/src/assets/images/basketball_arena_action_1792403094864.jpg',
    stats: {
      homePossession: 51,
      awayPossession: 49,
      homeShots: 42,
      awayShots: 39,
      homeFouls: 14,
      awayFouls: 16
    },
    events: [
      { id: 'b1', minute: 'Q4 03:10', type: 'point', team: 'home', player: 'Jayson Tatum', description: 'Step-back 3-pointer from top of the key.' },
      { id: 'b2', minute: 'Q4 02:45', type: 'point', team: 'away', player: 'Luka Dončić', description: 'Driving layup plus foul contact.' }
    ],
    audioDescriptionUz: "NBA chempionati. Boston Seltiks 98, Dallas Maveriks 94. To'rtinchi chorakning oxirgi 2 daqiqasi ketmoqda.",
    audioDescriptionRu: "Финал NBA. Бостон Селтикс 98, Даллас Маверикс 94. 4-я четверть, 2 минуты 34 секунды до конца.",
    audioDescriptionEn: "NBA Finals. Boston Celtics 98, Dallas Mavericks 94. Fourth quarter, two minutes remaining on the game clock."
  },
  {
    id: 'match-3',
    sport: 'football',
    league: "O'zbekiston Superligasi",
    country: 'Uzbekistan',
    homeTeam: {
      name: 'Paxtakor Toshkent',
      shortName: 'PAK',
      logoText: 'PAK',
      flag: '🇺🇿',
      color: '#FFCC00'
    },
    awayTeam: {
      name: 'Nasaf Qarshi',
      shortName: 'NAS',
      logoText: 'NAS',
      flag: '🇺🇿',
      color: '#003399'
    },
    homeScore: 1,
    awayScore: 1,
    status: 'live',
    periodText: "62' 2-bo'lim",
    minuteNumber: 62,
    scheduledTime: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
    dateLabel: 'Today, 19:30',
    venue: 'Paxtakor Markaziy Stadioni, Toshkent',
    previewImage: '/src/assets/images/hero_match_stadium_1792403093609.jpg',
    stats: {
      homePossession: 52,
      awayPossession: 48,
      homeShots: 7,
      awayShots: 6,
      homeFouls: 11,
      awayFouls: 13,
      homeCorners: 5,
      awayCorners: 3
    },
    events: [
      { id: 'p1', minute: "32'", type: 'goal', team: 'home', player: 'Dostonbek Hamdamov', description: 'Jarima zarbasidan kiritilgan gol.' },
      { id: 'p2', minute: "57'", type: 'goal', team: 'away', player: 'Zafarmurod Abdurahmatov', description: 'Qarshi hujumda hisob tenglashtirildi.' }
    ],
    audioDescriptionUz: "O'zbekiston Superligasi markaziy uchrashuvi. Paxtakor 1, Nasaf 1. 62-daqiqa o'tmoqda.",
    audioDescriptionRu: "Суперлига Узбекистана. Пахтакор 1, Насаф 1. 62-я минута матча в Ташкенте.",
    audioDescriptionEn: "Uzbekistan Super League. Pakhtakor 1, Nasaf 1. 62 minutes played at Pakhtakor Central Stadium."
  },
  {
    id: 'match-4',
    sport: 'mma',
    league: 'UFC 314 Championship',
    country: 'USA',
    homeTeam: {
      name: 'Shavkat Rakhmonov',
      shortName: 'RAK',
      logoText: 'SHR',
      flag: '🇰🇿',
      color: '#D4AF37'
    },
    awayTeam: {
      name: 'Belal Muhammad',
      shortName: 'MUH',
      logoText: 'BLM',
      flag: '🇵🇸',
      color: '#CC0000'
    },
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    periodText: '5 Rounds / Title',
    scheduledTime: new Date(Date.now() + 1000 * (60 * 60 * 26 + 1800)).toISOString(), // ~26 hours away
    dateLabel: 'Tomorrow, 07:00 AM',
    venue: 'T-Mobile Arena, Las Vegas',
    previewImage: '/src/assets/images/mma_championship_octagon_1792403095807.jpg',
    stats: {
      homeStrikes: 0,
      awayStrikes: 0
    },
    events: [],
    audioDescriptionUz: "UFC yarim o'rta vazn toifasida chempionlik jangi. Shavkat Rahmonov va Belal Muhammad o'rtasidagi to'qnashuv ertaga ertalab boshlanadi.",
    audioDescriptionRu: "Титульный бой UFC в полусреднем весе. Шавкат Рахмонов против Белала Мухаммада на арене T-Mobile в Лас-Вегасе.",
    audioDescriptionEn: "UFC Welterweight Championship title fight. Shavkat Rakhmonov vs Belal Muhammad at T-Mobile Arena, Las Vegas."
  },
  {
    id: 'match-5',
    sport: 'tennis',
    league: 'ATP Masters 1000 Finals',
    country: 'Europe',
    homeTeam: {
      name: 'Jannik Sinner',
      shortName: 'SIN',
      logoText: 'JS',
      flag: '🇮🇹',
      color: '#FF6B00'
    },
    awayTeam: {
      name: 'Carlos Alcaraz',
      shortName: 'ALC',
      logoText: 'CA',
      flag: '🇪🇸',
      color: '#E00613'
    },
    homeScore: 1,
    awayScore: 1,
    status: 'upcoming',
    periodText: 'Set 3 Tiebreak',
    scheduledTime: new Date(Date.now() + 1000 * (60 * 60 * 4 + 1200)).toISOString(), // ~4 hours away
    dateLabel: 'Today, 18:00',
    venue: 'Court Rainier III, Monte Carlo',
    previewImage: '/src/assets/images/hero_match_stadium_1792403093609.jpg',
    stats: {
      homeAces: 8,
      awayAces: 6
    },
    events: [],
    audioDescriptionUz: "ATP Masters 1000 finali. Yannik Sinner va Karlos Alkaras o'rtasidagi super uchrashuv.",
    audioDescriptionRu: "Финал ATP Masters 1000. Янник Синнер против Карлоса Алькараса на грунтовом корте Монте-Карло.",
    audioDescriptionEn: "ATP Masters 1000 Finals. Jannik Sinner against Carlos Alcaraz on Court Rainier III."
  },
  {
    id: 'match-6',
    sport: 'boxing',
    league: 'Undisputed Heavyweight Title',
    country: 'Global',
    homeTeam: {
      name: 'Bakhodir Jalolov',
      shortName: 'JAL',
      logoText: 'BJ',
      flag: '🇺🇿',
      color: '#0099FF'
    },
    awayTeam: {
      name: 'Anthony Joshua',
      shortName: 'JOS',
      logoText: 'AJ',
      flag: '🇬🇧',
      color: '#111111'
    },
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    periodText: '12 Rounds Main Event',
    scheduledTime: new Date(Date.now() + 1000 * (60 * 60 * 48 + 7200)).toISOString(), // 2 days away
    dateLabel: 'Saturday, 23:00',
    venue: 'Kingdom Arena, Riyadh',
    previewImage: '/src/assets/images/mma_championship_octagon_1792403095807.jpg',
    stats: {},
    events: [],
    audioDescriptionUz: "Og'ir vaznda jahon chempionligi jangi: Bahodir Jalolov va Entoni Joshua to'qnashuvi.",
    audioDescriptionRu: "Бой за титул в супертяжелом весе: Баходир Джалолов против Энтони Джошуа.",
    audioDescriptionEn: "World Heavyweight Championship: Bakhodir Jalolov takes on Anthony Joshua in Riyadh."
  },
  {
    id: 'match-7',
    sport: 'volleyball',
    league: 'FIVB Nations League',
    country: 'Global',
    homeTeam: {
      name: 'Italy',
      shortName: 'ITA',
      logoText: 'ITA',
      flag: '🇮🇹',
      color: '#0055A5'
    },
    awayTeam: {
      name: 'Poland',
      shortName: 'POL',
      logoText: 'POL',
      flag: '🇵🇱',
      color: '#DC143C'
    },
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    periodText: 'Set 4 (21-19)',
    minuteNumber: 88,
    scheduledTime: new Date(Date.now() + 1000 * 60 * 20).toISOString(),
    dateLabel: 'Today, 20:00',
    venue: 'Palazzetto dello Sport, Rome',
    previewImage: '/src/assets/images/basketball_arena_action_1792403094864.jpg',
    stats: {
      homePossession: 54,
      awayPossession: 46
    },
    events: [],
    audioDescriptionUz: "Voleybol Millatlar Ligasi. Italiya 2, Polsha 1. 4-set 21-19 hisobida davom etmoqda.",
    audioDescriptionRu: "Волейбол, Лига Наций. Италия 2, Польша 1. 4-й сет со счетом 21:19.",
    audioDescriptionEn: "FIVB Volleyball Nations League. Italy leads Poland 2 sets to 1 in the fourth set."
  },
  {
    id: 'match-8',
    sport: 'esports',
    league: 'The International Major',
    country: 'Global',
    homeTeam: {
      name: 'Team Spirit',
      shortName: 'TS',
      logoText: 'TS',
      flag: '🌐',
      color: '#111827'
    },
    awayTeam: {
      name: 'Gaimin Gladiators',
      shortName: 'GG',
      logoText: 'GG',
      flag: '🌐',
      color: '#B91C1C'
    },
    homeScore: 1,
    awayScore: 0,
    status: 'live',
    periodText: 'Game 2 (38:12)',
    minuteNumber: 38,
    scheduledTime: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
    dateLabel: 'Today, 17:30',
    venue: 'Royal Arena, Copenhagen',
    previewImage: '/src/assets/images/hero_match_stadium_1792403093609.jpg',
    stats: {
      homePossession: 60,
      awayPossession: 40
    },
    events: [],
    audioDescriptionUz: "Kibersport Dota 2 Major Grand Finali. Team Spirit 1, Gaimin Gladiators 0. 2-xarita qizg'in davom etmoqda.",
    audioDescriptionRu: "Гранд-Финал Dota 2 Major. Team Spirit 1, Gaimin Gladiators 0. Вторая карта, 38-я минута.",
    audioDescriptionEn: "Dota 2 Major Grand Final. Team Spirit leads Gaimin Gladiators 1-0. Game 2 at minute 38."
  }
];

export const featuredAthletes: Athlete[] = [
  {
    id: 'ath-1',
    name: 'Eldor Shomurodov',
    sport: 'football',
    team: 'O\'zbekiston Milliy Terma Jamoasi / Serie A',
    country: 'Uzbekistan',
    position: 'Forward / Hujumchi',
    number: 14,
    avatar: '/src/assets/images/athlete_soccer_forward_1792403096172.jpg',
    currentMatch: {
      points: 2, // goals
      assists: 1,
      minutes: 78,
      passes: 28,
      errors: 2,
      rating: 9.2
    },
    seasonHighlights: [
      { label: 'Jami Gollar', value: '18' },
      { label: 'Xalqaro O\'yinlar', value: '72' },
      { label: 'O\'rtacha Reyting', value: '8.4' }
    ]
  },
  {
    id: 'ath-2',
    name: 'Luka Dončić',
    sport: 'basketball',
    team: 'Dallas Mavericks',
    country: 'Slovenia',
    position: 'Point Guard / Himoyachi',
    number: 77,
    avatar: '/src/assets/images/athlete_basketball_guard_1792403095759.jpg',
    currentMatch: {
      points: 34,
      assists: 12,
      minutes: 38,
      passes: 54,
      errors: 4,
      rating: 9.6
    },
    seasonHighlights: [
      { label: 'PPG (Ochkolar)', value: '33.9' },
      { label: 'Triple-Doubles', value: '21' },
      { label: 'FG Aniqligi', value: '48.7%' }
    ]
  },
  {
    id: 'ath-3',
    name: 'Jannik Sinner',
    sport: 'tennis',
    team: 'ATP World No. 1',
    country: 'Italy',
    position: 'Singles Champion',
    number: 1,
    avatar: '/src/assets/images/athlete_soccer_forward_1792403096172.jpg',
    currentMatch: {
      points: 24, // winners
      assists: 0,
      minutes: 110,
      passes: 38, // net points
      errors: 12, // unforced errors
      rating: 8.9
    },
    seasonHighlights: [
      { label: 'G\'alaba Foizi', value: '92.4%' },
      { label: 'Grand Slam Unvonlari', value: '2' },
      { label: 'Eyslar Soni', value: '480+' }
    ]
  },
  {
    id: 'ath-4',
    name: 'Shavkat Rakhmonov',
    sport: 'mma',
    team: 'UFC Welterweight #1',
    country: 'Kazakhstan',
    position: 'Welterweight Contender',
    number: 18,
    avatar: '/src/assets/images/athlete_basketball_guard_1792403095759.jpg',
    currentMatch: {
      points: 18, // record 18-0
      assists: 0,
      minutes: 15,
      passes: 45, // significant strikes
      errors: 0,
      rating: 9.8
    },
    seasonHighlights: [
      { label: 'Jang Rekordi', value: '18-0 (100% Finish)' },
      { label: 'Submissions', value: '10' },
      { label: 'KO / TKO', value: '8' }
    ]
  }
];

export const standingsData: Record<string, StandingRow[]> = {
  superleague: [
    { rank: 1, team: 'Nasaf Qarshi', badge: '🔵', played: 22, won: 15, draw: 5, lost: 2, goalsDiff: '+26', points: 50, form: ['W', 'W', 'D', 'W', 'W'] },
    { rank: 2, team: 'Paxtakor Toshkent', badge: '🟡', played: 22, won: 14, draw: 4, lost: 4, goalsDiff: '+21', points: 46, form: ['W', 'D', 'W', 'W', 'L'] },
    { rank: 3, team: 'Navbahor Namangan', badge: '🔴', played: 22, won: 13, draw: 6, lost: 3, goalsDiff: '+18', points: 45, form: ['W', 'W', 'W', 'D', 'W'] },
    { rank: 4, team: 'So\'g\'diyona Jizzax', badge: '🟣', played: 22, won: 12, draw: 5, lost: 5, goalsDiff: '+14', points: 41, form: ['D', 'W', 'L', 'W', 'W'] },
    { rank: 5, team: 'OKMK Olmaliq', badge: '⚪', played: 22, won: 11, draw: 6, lost: 5, goalsDiff: '+11', points: 39, form: ['W', 'L', 'W', 'D', 'D'] },
    { rank: 6, team: 'Neftchi Farg\'ona', badge: '🟢', played: 22, won: 10, draw: 7, lost: 5, goalsDiff: '+9', points: 37, form: ['D', 'W', 'D', 'W', 'L'] }
  ],
  ucl: [
    { rank: 1, team: 'Real Madrid', badge: '👑', played: 8, won: 7, draw: 1, lost: 0, goalsDiff: '+16', points: 22, form: ['W', 'W', 'W', 'D', 'W'] },
    { rank: 2, team: 'Manchester City', badge: '⚡', played: 8, won: 6, draw: 2, lost: 0, goalsDiff: '+14', points: 20, form: ['W', 'W', 'D', 'W', 'W'] },
    { rank: 3, team: 'Bayern Munich', badge: '🔴', played: 8, won: 6, draw: 1, lost: 1, goalsDiff: '+12', points: 19, form: ['W', 'L', 'W', 'W', 'W'] },
    { rank: 4, team: 'Arsenal London', badge: '🔴', played: 8, won: 5, draw: 2, lost: 1, goalsDiff: '+10', points: 17, form: ['W', 'W', 'D', 'W', 'L'] },
    { rank: 5, team: 'Inter Milan', badge: '🔵', played: 8, won: 5, draw: 2, lost: 1, goalsDiff: '+8', points: 17, form: ['W', 'D', 'W', 'W', 'W'] }
  ],
  nba: [
    { rank: 1, team: 'Boston Celtics', badge: '☘️', played: 78, won: 61, draw: 0, lost: 17, goalsDiff: '+11.2', points: 122, form: ['W', 'W', 'W', 'W', 'L'] },
    { rank: 2, team: 'Oklahoma City Thunder', badge: '⚡', played: 78, won: 55, draw: 0, lost: 23, goalsDiff: '+7.4', points: 110, form: ['W', 'L', 'W', 'W', 'W'] },
    { rank: 3, team: 'Denver Nuggets', badge: '🏔️', played: 78, won: 54, draw: 0, lost: 24, goalsDiff: '+5.6', points: 108, form: ['W', 'W', 'L', 'W', 'W'] },
    { rank: 4, team: 'Dallas Mavericks', badge: '🐴', played: 78, won: 51, draw: 0, lost: 27, goalsDiff: '+4.8', points: 102, form: ['W', 'W', 'W', 'L', 'W'] }
  ],
  atp: [
    { rank: 1, team: 'Jannik Sinner (ITA)', badge: '🇮🇹', played: 64, won: 58, draw: 0, lost: 6, goalsDiff: '11,830 pts', points: 11830, form: ['W', 'W', 'W', 'W', 'W'] },
    { rank: 2, team: 'Carlos Alcaraz (ESP)', badge: '🇪🇸', played: 60, won: 52, draw: 0, lost: 8, goalsDiff: '8,905 pts', points: 8905, form: ['W', 'W', 'L', 'W', 'W'] },
    { rank: 3, team: 'Alexander Zverev (GER)', badge: '🇩🇪', played: 66, won: 53, draw: 0, lost: 13, goalsDiff: '7,795 pts', points: 7795, form: ['W', 'L', 'W', 'W', 'L'] },
    { rank: 4, team: 'Novak Djokovic (SRB)', badge: '🇷🇸', played: 42, won: 34, draw: 0, lost: 8, goalsDiff: '6,210 pts', points: 6210, form: ['L', 'W', 'W', 'W', 'L'] }
  ]
};

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    sport: 'football',
    category: 'breaking',
    featured: true,
    title: {
      uz: "O'zbekiston Milliy Terma Jamoasi Jahon Chempionati saralashida muhim g'alabaga erishdi",
      ru: "Сборная Узбекистана одержала важнейшую победу в отборе на Чемпионат Мира",
      en: "Uzbekistan National Team Secures Crucial Victory in World Cup Qualifiers"
    },
    summary: {
      uz: "Toshkentdagi 'Bunyodkor' stadionida kechgan shiddatli uchrashuvda vakillarimiz yirik hisobda zafar quchib, guruh peshqadamligini mustahkamladi.",
      ru: "В напряженном матче на стадионе 'Бунёдкор' в Ташкенте наши футболисты одержали уверенную победу и укрепили лидерство в группе.",
      en: "In an electric clash at Bunyodkor Stadium in Tashkent, the White Wolves dominated to consolidate their top spot in the qualifying table."
    },
    timestamp: {
      uz: "12 daqiqa oldin",
      ru: "12 минут назад",
      en: "12 minutes ago"
    },
    readTime: "3 min",
    image: '/src/assets/images/hero_match_stadium_1792403093609.jpg'
  },
  {
    id: 'news-2',
    sport: 'basketball',
    category: 'report',
    title: {
      uz: "NBA Pley-off: Dončić 45 ochko to'plab yangi rekord o'rnatdi",
      ru: "Плей-офф NBA: Дончич набрал 45 очков и установил новый рекорд",
      en: "NBA Playoffs: Dončić Records Historic 45-Point Masterclass"
    },
    summary: {
      uz: "Luka Dončić uchinchi o'yinda aql bovar qilmas aniqlik namoyish etib, jamoasini seriyada oldinga olib chiqdi.",
      ru: "Лука Дончич продемонстрировал феноменальную игру в третьем матче серии, обеспечив решающее преимущество.",
      en: "Luka Dončić delivered an unstoppable performance in Game 3, knocking down clutch threes to seal the victory."
    },
    timestamp: {
      uz: "45 daqiqa oldin",
      ru: "45 минут назад",
      en: "45 minutes ago"
    },
    readTime: "2 min",
    image: '/src/assets/images/basketball_arena_action_1792403094864.jpg'
  },
  {
    id: 'news-3',
    sport: 'mma',
    category: 'analysis',
    title: {
      uz: "UFC 314 oldidan ekspertlar taxmini: Shavkat Rahmonov kamar uchun tayyor",
      ru: "Прогноз экспертов перед UFC 314: Шавкат Рахмонов готов к чемпионскому титулу",
      en: "UFC 314 Expert Analysis: Shavkat Rakhmonov Primed for Championship Belt"
    },
    summary: {
      uz: "Tahlilchilar Rahmonovning kurash va stoykadagi yuqori tempini chempionlik jangidagi asosiy ustunlik sifatida baholamoqda.",
      ru: "Аналитики единогласно выделяют темп и борьбу непобежденного претендента как ключевой фактор предстоящего боя.",
      en: "Analysts cite the undefeated contender's relentless wrestling pressure and clinical striking as the decisive factor."
    },
    timestamp: {
      uz: "2 soat oldin",
      ru: "2 часа назад",
      en: "2 hours ago"
    },
    readTime: "4 min",
    image: '/src/assets/images/mma_championship_octagon_1792403095807.jpg'
  },
  {
    id: 'news-4',
    sport: 'football',
    category: 'transfers',
    title: {
      uz: "Yozgi transfer oynasi: Real Madrid yangi yulduz himoyachi bilan shartnoma imzoladi",
      ru: "Летнее трансферное окно: Реал Мадрид подписал нового звездного защитника",
      en: "Summer Transfer Window: Real Madrid Completes Signing of Elite Defender"
    },
    summary: {
      uz: "Qirollik klubi himoya chizig'ini mustahkamlash maqsadida uzoq muddatli shartnomaga erishganini rasman e'lon qildi.",
      ru: "Королевский клуб официально объявил о подписании долгосрочного соглашения для укрепления оборонительной линии.",
      en: "The European champions have officially announced a multi-year deal to reinforce their defensive backline."
    },
    timestamp: {
      uz: "3 soat oldin",
      ru: "3 часа назад",
      en: "3 hours ago"
    },
    readTime: "2 min",
    image: '/src/assets/images/hero_match_stadium_1792403093609.jpg'
  }
];
