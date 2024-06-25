import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

import reactRefresh from '@vitejs/plugin-react-refresh';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "reactappnetcore.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7298';

// https://vitejs.dev/config/
export default defineConfig((mode) => {
    env.NODE_ENV = mode === 'development' ? 'development' : 'production';

    const envWithProcessPrefix = {
        global: 'globalThis',
        'process.env': `${JSON.stringify(env)}`,
    };
    return {
        base: '/',
        plugins: [
            plugin(), 
            reactRefresh(), 
            nodePolyfills(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '~pe7-icon': path.resolve(__dirname, 'node_modules/pe7-icon'),
            }
        },
        build: {
            commonjsOptions: { transformMixedEsModules: true } // Change
        },
        optimizeDeps: {
            include: [
                'react',
                'react-dom',
                'react-router-dom',
                'react-redux',
                'react-is',
                'vite-plugin-node-polyfills/shims/buffer',
                'vite-plugin-node-polyfills/shims/global',
                'vite-plugin-node-polyfills/shims/process',
            ],
            esbuildOptions: {
                // Node.js global to browser globalThis
                define: envWithProcessPrefix,
            },
        },
        server: {
            proxy: {
                '^/weatherforecast': {
                    target,
                    secure: false
                }
            },
            port: 5173,
            https: {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            }
        }
    }
})
