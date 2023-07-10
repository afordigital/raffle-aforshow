import UnoCSS from 'unocss/vite'
import { defineConfig, presetUno, presetTypography, presetWebFonts } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  presets: [
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter:400,500,600,700',
        headings: 'Syne:700'
      }
    })
  ]
})
