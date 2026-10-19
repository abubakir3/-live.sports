export type Language = 'uz' | 'ru' | 'en';

export type SportType = 'all' | 'football' | 'basketball' | 'tennis' | 'mma' | 'volleyball' | 'boxing' | 'esports';

export type MatchStatus = 'live' | 'upcoming' | 'finished';

export interface MatchEvent {
  id: string;
  minute: string;
  type: 'goal' | 'card' | 'sub' | 'point' | 'foul' | 'knockdown';
  team: 'home' | 'away';
  player: string;
  description: string;
}

export interface MatchStats {
  homePossession?: number;
  awayPossession?: number;
  homeShots?: number;
  awayShots?: number;
  homeFouls?: number;
  awayFouls?: number;
  homeCorners?: number;
  awayCorners?: number;
  homeAces?: number;
  awayAces?: number;
  homeStrikes?: number;
  awayStrikes?: number;
}

export interface MatchItem {
  id: string;
  sport: SportType;
  league: string;
  country: string;
  homeTeam: {
    name: string;
    shortName: string;
    logoText: string;
    flag: string;
    color: string;
  };
  awayTeam: {
    name: string;
    shortName: string;
    logoText: string;
    flag: string;
    color: string;
  };
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  periodText: string;
  minuteNumber?: number;
  scheduledTime: string; // ISO date string for countdown
  dateLabel: string;
  venue: string;
  previewImage: string;
  stats: MatchStats;
  events: MatchEvent[];
  audioDescriptionUz: string;
  audioDescriptionRu: string;
  audioDescriptionEn: string;
}

export interface Athlete {
  id: string;
  name: string;
  sport: SportType;
  team: string;
  country: string;
  position: string;
  number: number;
  avatar: string;
  currentMatch: {
    points: number;
    assists: number;
    minutes: number;
    passes: number;
    errors: number;
    rating: number;
  };
  seasonHighlights: {
    label: string;
    value: string;
  }[];
}

export interface StandingRow {
  rank: number;
  team: string;
  badge: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsDiff: string;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface NewsArticle {
  id: string;
  sport: SportType;
  category: 'breaking' | 'transfers' | 'report' | 'analysis';
  title: Record<Language, string>;
  summary: Record<Language, string>;
  timestamp: Record<Language, string>;
  readTime: string;
  image: string;
  featured?: boolean;
}

export interface PollState {
  id: string;
  matchTitle: string;
  teamA: string;
  teamB: string;
  votesA: number;
  votesDraw: number;
  votesB: number;
}
