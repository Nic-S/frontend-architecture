const prodEnvConst: Record<string, string> = {
  REACT_APP_API_URL: '$REACT_APP_API_URL',
};

const getEnvConst = (path: string, env: string | undefined = process.env.NODE_ENV): string => {
  if (process.env.NODE_ENV === 'production') {
    return prodEnvConst[path];
  }
  return process.env[path] as string;
};

export const API_URL = getEnvConst('REACT_APP_API_URL');

export const DEFAULT_CACHE_TTL = 0;
