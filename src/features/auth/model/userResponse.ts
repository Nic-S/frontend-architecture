export interface UserResponse {
  name: string;
  email: string;
  familyName: string;
  firstName: string;
  roles: ROLES[];
  access_token: string;
}

export enum ROLES {
  ADMIN = 'ADMIN',
}
