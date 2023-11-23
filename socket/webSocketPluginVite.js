import { createWSSGlobalInstance, onHttpServerUpgrade } from '../src/lib/server/webSocketUtils.js';
import injectSocketIO from './socketIoHandler.js';

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        injectSocketIO(server.httpServer);
    }
};
export const webSocketServerVite = {
    name: 'integratedWebsocketServer',
    configureServer(server) {
        createWSSGlobalInstance();
        server.httpServer?.on('upgrade', onHttpServerUpgrade);
    },
    configurePreviewServer(server) {
        createWSSGlobalInstance();
        server.httpServer?.on('upgrade', onHttpServerUpgrade);
    }
}