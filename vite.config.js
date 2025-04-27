import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
   optimizeDeps: {
      esbuildOptions: {
         target: 'esnext',
         supported: {
            bigint: true,
         },
      }
   },
   build: {
      target: ['esnext'],
   },
   plugins: [
      vue(),
      VitePWA({
         mode: 
            process.env.NODE_ENV === 'production'
               ? 'production'
               : 'development',
         base: '/',
         srcDir: 'src',
         filename: 'sw.js',
         includeAssets: [
            '/favicon.png',
            '/favicon-16x16.png',
            '/favicon-32x32.png',
            '/favicon-96x96.png',
            '/badge-128x128.png',
            '/android-icon-36x36.png',
            '/android-icon-48x48.png',
            '/android-icon-72x72.png',
            '/android-icon-96x96.png',
            '/android-icon-144x144.png',
            '/android-icon-192x192.png',
            '/android-icon-512x512.png',
         ],
         strategies: 'injectManifest',
         manifest: {
            name: 'Wipe',
            short_name: 'Wipe',
            description: 'Official app to explore Wipe platform data',
            orientation: 'portrait-primary',
            display: 'standalone',
            start_url: '/',
            background_color: '#222222',
            icons: [
               {
                  src: '/android-icon-36x36.png',
                  sizes: '36x36',
                  type: 'image/png',
                  density: '0.75',
               },
               {
                  src: '/android-icon-48x48.png',
                  sizes: '48x48',
                  type: 'image/png',
                  density: '1.0',
               },
               {
                  src: '/android-icon-72x72.png',
                  sizes: '72x72',
                  type: 'image/png',
                  density: '1.5',
               },
               {
                  src: '/android-icon-96x96.png',
                  sizes: '96x96',
                  type: 'image/png',
                  density: '2.0',
               },
               {
                  src: '/android-icon-144x144.png',
                  sizes: '144x144',
                  type: 'image/png',
                  density: '3.0',
               },
               {
                  src: '/android-icon-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                  density: '4.0',
               },
               {
                  src: '/android-icon-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
               },
            ],
         },
      }),
   ],
   resolve: {
      alias: {
         // @ts-ignore
         '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
   },
});
