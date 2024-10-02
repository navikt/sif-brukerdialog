// vite.config.ts
import react from "file:///Users/frodehansen/prosjekter/git/sif-brukerdialog/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { sentryVitePlugin } from "file:///Users/frodehansen/prosjekter/git/sif-brukerdialog/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import path from "path";
import { defineConfig } from "file:///Users/frodehansen/prosjekter/git/sif-brukerdialog/node_modules/vite/dist/node/index.js";
import checker from "file:///Users/frodehansen/prosjekter/git/sif-brukerdialog/node_modules/vite-plugin-checker/dist/esm/main.js";
var __vite_injected_original_dirname = "/Users/frodehansen/prosjekter/git/sif-brukerdialog/apps/endringsmelding-pleiepenger";
var vite_config_default = defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx}"
    }),
    checker({ typescript: true }),
    ...[
      process.env.SENTRY_AUTH_TOKEN ? [
        sentryVitePlugin({
          org: "nav",
          project: "sykdom-i-familien",
          authToken: process.env.SENTRY_AUTH_TOKEN
        })
      ] : []
    ]
  ],
  resolve: {
    alias: {
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/app/utils"),
      "@types": path.resolve(__vite_injected_original_dirname, "./src/app/types"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/app/hooks")
    }
  },
  build: {
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZnJvZGVoYW5zZW4vcHJvc2pla3Rlci9naXQvc2lmLWJydWtlcmRpYWxvZy9hcHBzL2VuZHJpbmdzbWVsZGluZy1wbGVpZXBlbmdlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Zyb2RlaGFuc2VuL3Byb3NqZWt0ZXIvZ2l0L3NpZi1icnVrZXJkaWFsb2cvYXBwcy9lbmRyaW5nc21lbGRpbmctcGxlaWVwZW5nZXIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Zyb2RlaGFuc2VuL3Byb3NqZWt0ZXIvZ2l0L3NpZi1icnVrZXJkaWFsb2cvYXBwcy9lbmRyaW5nc21lbGRpbmctcGxlaWVwZW5nZXIvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gJ0BzZW50cnkvdml0ZS1wbHVnaW4nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBjaGVja2VyIGZyb20gJ3ZpdGUtcGx1Z2luLWNoZWNrZXInO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3Qoe1xuICAgICAgICAgICAgaW5jbHVkZTogJyoqLyoue2pzeCx0c3h9JyxcbiAgICAgICAgfSksXG4gICAgICAgIGNoZWNrZXIoeyB0eXBlc2NyaXB0OiB0cnVlIH0pLFxuICAgICAgICAuLi5bXG4gICAgICAgICAgICBwcm9jZXNzLmVudi5TRU5UUllfQVVUSF9UT0tFTlxuICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgIHNlbnRyeVZpdGVQbHVnaW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvcmc6ICduYXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0OiAnc3lrZG9tLWktZmFtaWxpZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRoVG9rZW46IHByb2Nlc3MuZW52LlNFTlRSWV9BVVRIX1RPS0VOLFxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIDogW10sXG4gICAgICAgIF0sXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQHV0aWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2FwcC91dGlscycpLFxuICAgICAgICAgICAgJ0B0eXBlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hcHAvdHlwZXMnKSxcbiAgICAgICAgICAgICdAaG9va3MnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvYXBwL2hvb2tzJyksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sV0FBVztBQUNsQixTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBTHBCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxNQUNGLFNBQVM7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELFFBQVEsRUFBRSxZQUFZLEtBQUssQ0FBQztBQUFBLElBQzVCLEdBQUc7QUFBQSxNQUNDLFFBQVEsSUFBSSxvQkFDTjtBQUFBLFFBQ0ksaUJBQWlCO0FBQUEsVUFDYixLQUFLO0FBQUEsVUFDTCxTQUFTO0FBQUEsVUFDVCxXQUFXLFFBQVEsSUFBSTtBQUFBLFFBQzNCLENBQUM7QUFBQSxNQUNMLElBQ0EsQ0FBQztBQUFBLElBQ1g7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUNuRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUNuRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxJQUN2RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFdBQVc7QUFBQSxFQUNmO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
