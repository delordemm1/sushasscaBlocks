// Import statements 
import { building } from '$app/environment';

// WebSocket server logic
let wssInitialized = false;

const startupWebsocketServer = () => {
  if (wssInitialized) return;

  console.log('[wss:kit] setup');

  const wss = globalThis.GlobalThisWSS;
  // console.log({wss});
  if (wss !== undefined) {
    wss.on('connection', (ws, _request) => {
      // Authentication logic

      // console.log(`[wss:kit] client connected (${ws.socketId})`);

      // ws.send(`Hello from SvelteKit ${new Date().toLocaleString()} (${ws.socketId}]`);

      // ws.on('close', () => {
      //   console.log(`[wss:kit] client disconnected (${ws.socketId})`);
      // });
    });

    wssInitialized = true;
  }
};

// SvelteKit handle function  
export const handle = async ({ event, resolve }) => {

  startupWebsocketServer();

  if (!building) {
    const wss = globalThis.GlobalThisWSS;

    if (wss !== undefined) {
      event.locals.wss = wss;
    }
  }

  const response = await resolve(event, {
    filterSerializedResponseHeaders: name => name === 'content-type'
  });

  return response;
}