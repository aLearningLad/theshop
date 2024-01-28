export type Ihomelinks = {
  title: string;
  img: React.ReactElement;
  uniquelink: string;
  id: number;
};

export type Ilinkbutton = {
  link: string;
  icon: React.ReactElement;
  title: string;
};

export type Idevemployeedata = {
  name: string;
  surname: string;
  email: string;
  passport: string;
  role: string;
  leaveStatus: boolean;
  id: string;
  index?: number;
};

export type Idevleavedata = {
  name: string;
  surname: string;
  leaveStatus: boolean;
  fromDay: string;
  untilDay: string;
  fromMonth: string;
  untilMonth: string;
  id: string;
  role: string;
  whom?: string;
};

export type Igeneralsigninlinks = {
  title: string;
  uniqueLink: string;
};

export type Imanagerdashlinks = {
  title: string;
  uniqueLink: string;
  img: React.ReactElement;
};

export type Iparams = {
  id: string;
};

export type Irealemployee = {
  name: string;
  surname: string;
  email: string;
  password?: string;
  day?: string;
  month?: string;
  role?: string;
  moreInfo?: string;
  leaveStatus?: boolean;
  passport: string;
  id: string;
};

export type Ipayslip = {
  _id?: string | number;
  drivelink: string | any;
  forMonth: string | any;
};
