import { execSync } from 'node:child_process';

/**
 * Brukes kun i vite-config (Node), ikke i browser-koden.
 *
 * GITHUB_REF_NAME settes av GitHub Actions og holder branchen workflowen ble startet på.
 * I Actions er HEAD detached, så git ville gitt "HEAD" i stedet for branchnavnet.
 */
export const getBuildBranch = (): string => {
    if (process.env.GITHUB_REF_NAME) {
        return process.env.GITHUB_REF_NAME;
    }
    try {
        return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    } catch {
        return 'ukjent';
    }
};
