export interface UserResponse {
  email: string;
  familyName: string;
  firstName: string;
  roles: ROLES[];
}

export enum ROLES {
  ADMIN = 'ADMIN',
}
