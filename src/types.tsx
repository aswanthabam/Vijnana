export type _Event = {
  id: string;
  name: string;
  description: string;
  type: string;
  is_reg: boolean;
  reg_link: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  closed: boolean;
};
export type _EventInfo = {
  details: string;
  poster: string;
  docs: string[] | null;
  minpart: number;
  maxpart: number;
  is_team: boolean;
  participants: any[];
  teams: any[];
} & _Event;
