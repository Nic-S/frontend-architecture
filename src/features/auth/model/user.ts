import { ROLES, UserResponse } from './userResponse';

export interface User {
  name: string;
  email: string;
  familyName: string;
  firstName: string;
  roles: ROLES[];
}

export const toUser = (o: UserResponse): User => ({
  name: `${o.familyName} ${o.firstName}` as string,
  email: o.email as string,
  familyName: o.familyName as string,
  firstName: o.firstName as string,
  roles: o.roles as ROLES[],
});

export const checkRole = (user: User, role: ROLES): boolean => user.roles.includes(role);
export const checkRoles = (user: User, roles: ROLES[]): boolean => user.roles.some(r => roles.includes(r));
