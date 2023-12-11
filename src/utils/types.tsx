export type _Event = {
  id: string;
  name: string;
  description: string;
  type: string;
  reg_link: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  closed: boolean;
  gctian_only: boolean;
  is_reg: boolean;
  participate_in: boolean;
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

// export type _UserDetails = {
//   name: string | undefined;
//   email: string | undefined;
//   phone: string | undefined;
//   college: string | undefined;
//   course: string | undefined;
//   year: string | undefined;
//   password: string | undefined;
//   // dob: Date,
//   // picture: string | null,
// };

export type _User = {
  userId: string | null;
  name: string;
  email: string;
  passsword: string;
  picture: string;
  college: string;
  course: string;
  year: string;
  phone: string;
  participate: [];
  token: string;
  expiry: string;
};

/* User Details */

export type _UserDetails = {
  userId: string;
  name: string;
  email: string;
  picture: string | null;
  gctian: boolean;
  college: string;
  course: string;
  year: number;
  step: number;
};

/* User Login Data */

export type _UserLogin = {
  email: string;
  password: string;
};

/* User Step 1 Registration Data*/

export type _UserStep1 = {
  name: string;
  email: string;
  password: string;
};

/* User Step 2 Registration Data */

export type _UserStep2 = {
  phone: string;
  college: string | null;
  course: string;
  year: number;
  gctian: boolean | null;
};

export type _EventCreateData = {
  name: string;
  description: string;
  details: string;
  type: string;
  date: string;
  reg_link: string | null;
  image: string | null;
  venue: string;
  closed: boolean;
  gctian_only: boolean;
  is_reg: boolean;
};

export type _AdminUserList = {
  is_google: boolean;
  is_admin: boolean;
  participation: { event: string }[];
  phone: string;
} & _UserDetails;
