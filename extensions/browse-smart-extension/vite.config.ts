import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: './src/popup/PopUpPage.tsx',
        background: './src/background-scripts/index.ts',
        sidepanel:'./src/sidepanel/SidePanel.tsx',
        content:'./src/content-scripts/time-tracker.ts/'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
});
