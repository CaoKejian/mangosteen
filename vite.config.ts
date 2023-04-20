import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgstore } from './src/vite_plugins/svgstore'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true
    }),
    svgstore()
  ],
  server: {
    proxy: {
      '/api/v1': {
        // target: 'http://8.130.24.249:3000/'
        target: 'https://mangosteen.caokejian.club/'
      }
    }
  }
})
