import { sveltekit } from '@sveltejs/kit/vite';
import { webSocketServer, webSocketServerVite } from './socket/webSocketPluginVite';
/** @type {import('vite').UserConfig} */
const config = {
    server: {
        port: 3000,
        host: true
    },
    preview: {
        port: 3000
    },
    plugins: [
        sveltekit(),
        // webSocketServer,
        webSocketServerVite,
    ]
};

export default config;