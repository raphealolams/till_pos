
/**
 * @author Server Configuration
 * Configurable server object required by the API include settings for the server port (port), a UUID
 * used to encode the authorization token (apiUuid), and the duration of that token (tokenExpiration).
 */
export const server = {
  port: Number(process.env.PORT) || 9000,
  apiUuid: '0eb14adc-a16e-400c-8f55-7d6c016bb36d',
  hostname: process.env.HOSTNAME || '',
  tokenExpiration: {
    days: 1,
    hours: 8,
    minutes: 0,
    seconds: 0
  }
};

/**
 * @author Customize your logs & don't let them occupy too much space.
 */
export const logs = {
  maxFiles: 5,
  maxFileSize: 20971520, // 20 MB
  zipOldLogs: true,
  fileName: 'till_pos'
};
