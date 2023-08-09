import { defineConfig } from 'vite';
// import path from "path";
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        // 'react': path.resolve(__dirname, './node_modules/react'),
        // 'use-isomorphic-layout-effect': path.resolve(__dirname, './node_modules/use-isomorphic-layout-effect'),
      }
    },
    test: {
      include: ['**/*.test.{ts,tsx}'],
      globals: true,
      setupFiles: 'src/setupTests.ts',
      environment: 'jsdom'
    }
  };
})
