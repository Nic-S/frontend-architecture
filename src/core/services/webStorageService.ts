const jwtTokenKey = 'jwt-token';

export const getJwtToken = (): string | null => localStorage.getItem(jwtTokenKey);

export const setJwtToken = (token: string): void => localStorage.setItem(jwtTokenKey, token);

export const deleteJwtToken = (): void => localStorage.removeItem(jwtTokenKey);

const redirectPagePathKey = 'redirect-page-path';

export const getRedirectPagePath = (): string => sessionStorage.getItem(redirectPagePathKey) || '/';

export const setRedirectPagePath = (pagePath: string): void => {
  if (getJwtToken() == null) sessionStorage.setItem(redirectPagePathKey, pagePath);
};

export const resetRedirectPagePath = (): void => sessionStorage.removeItem(redirectPagePathKey);
