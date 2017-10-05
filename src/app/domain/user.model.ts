export interface Address {
  province: string;
  city: string;
  district: string;
  street?: string;
}

export const enum IdentityType {
  IdCard,
  Insurance,
  Passport,
  Military,
  Other
}

export interface Identity {
  identityType: IdentityType;
  identityNo: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  avator: string;
  projectIds: string[];
  identity?: Identity;
  address?: Address;
  dateOfBirth?: string;
}
