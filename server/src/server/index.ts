import http from 'http';
import routes from '../routes';
import CORS from '../providers/cors';
import * as config from '../config';
import { notFoundHandler } from '../helpers';
import * as ver from '../providers/version';
import { initRequest, logResponse } from '../providers/logger';

const main = (app: any, express: any): Promise<any> => {
  /**
   * HTTP and console logging middleware using winston package
   */
  return new Promise((resolve, reject) => {
    app.use(initRequest);
    app.use(logResponse);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '1.5MB' }));
    app.use(CORS.handle);

    // Set versions info
    app.set('apiVersion', ver.apiVersion.version);
    app.set('apiCommit', ver.apiVersion.commitshort);
    app.set('apiVerMajor', ver.apiVersion.apiVerMajor);
    app.set('apiVerMinor', ver.apiVersion.apiVerMinor);
    app.set('apiVerPatch', ver.apiVersion.apiVerPatch);
    app.set('apiVerBuild', ver.apiVersion.apiVerBuild);

    // set token experiation and secret
    app.set('tokenSecret', config.server.apiUuid); // secret variable used for Jwt encoding
    app.set('tokenExpire', config.server.tokenExpiration);

    // set versions
    app.use('/v1', routes);
    app.use('*', notFoundHandler);

    // create server
    const server = http.createServer(app);
    const port = config.server.port || 5002;
    server.listen(port, () => resolve(server));
  });
};

export { main as startServer };
