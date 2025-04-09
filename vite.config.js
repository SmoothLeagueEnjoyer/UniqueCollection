import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: "/UniqueCollection",
    plugins: [plugin()],
    server: {
        port: 51422,
    }
})