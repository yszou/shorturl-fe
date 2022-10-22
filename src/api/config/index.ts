export const PROJECT_NAME = 'shorturl';
export type ENV_TYPE = 'LOCAL' | 'DAILY' | 'PUBLISH';
export const ENV: Record<ENV_TYPE, ENV_TYPE> = {
  LOCAL: 'LOCAL',
  DAILY: 'DAILY',
  PUBLISH: 'PUBLISH',
};
export const ENV_PROTOCOL_HOST: Record<ENV_TYPE, string> = {
  LOCAL: 'https://t.zys.me',
  DAILY: '',
  PUBLISH: '',
};
export const API_PREFIX = '/api';

export class Config {
  static getProjectName(): string {
    return PROJECT_NAME;
  }

  static getEnv(): ENV_TYPE {
    const { hostname } = window.location;
    if (hostname === 'localhost') {
      return ENV.LOCAL;
    }
    return ENV.PUBLISH;
  }

  static getUrlPrefix(): string {
    const env = Config.getEnv();
    return ENV_PROTOCOL_HOST[env] + API_PREFIX;
  }
}
