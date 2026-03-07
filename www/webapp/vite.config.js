/* eslint-env node */
import {defineConfig} from 'vite'
import {resolve} from 'node:path';
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    define: {
        'process.env.BUILD': '"web"' // fix for vuelidate@0.7.7
    },
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern-compiler',
                /** @type {import('sass').Options.silenceDeprecations } */
                silenceDeprecations: ['global-builtin', 'import', 'slash-div'],
            },
        },
    },
    plugins: [
        vue({
            template: {
                transformAssetUrls: {
                    'v-img': ['src'],
                },
            },
        }),
        legacy(), // Build for old browser.
    ],
    server: {
        port: 8080,
    },
    resolve: {
        alias: [{
            find: '@', replacement: resolve(__dirname, 'src')
        }],
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
})
