import react from '@vitejs/plugin-react';
import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';

/**
 * I GitHub Actions er HEAD detached, så git ville gitt "HEAD" i stedet for branchnavnet.
 * GITHUB_REF_NAME settes av Actions og holder branchen workflowen ble startet på.
 */
const gitVerdi = (kommando: string, envVerdi?: string): string => {
    if (envVerdi) {
        return envVerdi;
    }
    try {
        return execSync(kommando, { encoding: 'utf8' }).trim();
    } catch {
        return 'ukjent';
    }
};

export default defineConfig({
    plugins: [react()],
    base: '/sif-brukerdialog/',
    define: {
        __BRANCH__: JSON.stringify(gitVerdi('git rev-parse --abbrev-ref HEAD', process.env.GITHUB_REF_NAME)),
        __COMMIT__: JSON.stringify(gitVerdi('git rev-parse --short=9 HEAD', process.env.GITHUB_SHA?.slice(0, 9))),
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    server: {
        port: 5180,
    },
    preview: {
        port: 5180,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});
