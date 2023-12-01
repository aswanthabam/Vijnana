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

export type _UserDetails = {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  college: string | undefined;
  course: string | undefined;
  year: string | undefined;
  password: string | undefined;
  // dob: Date,
  // picture: string | null,
};
export type _User = {
  userId: string | null;
  name: string;
  email: string;
  passsword: string;
  dob: Date;
  picture: string;
  college: string;
  course: string;
  year: string;
  phone: string;
  participate: [];
  token: string;
  expiry: string;
};
