import { parse } from 'url';
import { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid';

// Types 
globalThis.GlobalThisWSS = Symbol.for('sveltekit.wss');

class ExtendedWebSocket extends WebSocket {
  constructor() {
    super();
    this.socketId = '';
  }
}

let wss;

export const onHttpServerUpgrade = (req, sock, head) => {
  const pathname = parse(req.url).pathname;

  if (pathname !== '/websocket') return;

  wss.handleUpgrade(req, sock, head, ws => {
    console.log('[handleUpgrade] creating new connection');
    wss.emit('connection', ws, req);
  });
}

export const createWSSGlobalInstance = () => {

  wss = new WebSocketServer({ noServer: true });

  globalThis.GlobalThisWSS = wss;

  wss.on('connection', ws => {
    ws.socketId = nanoid();

    console.log(`[wss:global] client connected (${ws.socketId})`);

    ws.on('close', () => {
      console.log(`[wss:global] client disconnected (${ws.socketId})`);
    });
  });

  return wss;
}