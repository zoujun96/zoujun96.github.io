import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue'],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    }),
    // eslint-disable-next-line no-undef
    process.env.npm_lifecycle_event === 'report'
      ? visualizer({ open: true, brotliSize: true, filename: 'report.html' })
      : null
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8200
  },
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        // 静态资源分类
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.webp', '.svg']
          const isImage = imageExtensions.some(
            (extension) => name && name.toLocaleLowerCase().endsWith(extension)
          )
          return `assets/${isImage ? 'images' : '[ext]'}/[name]-[hash].[ext]`
        },
        manualChunks(id) {
          // 依赖分包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
