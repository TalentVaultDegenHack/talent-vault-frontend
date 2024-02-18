import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        checker({ typescript: false }),
        react()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
