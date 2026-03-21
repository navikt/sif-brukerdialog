/// <reference types="vite/client" />

declare const __IS_GITHUB_PAGES__: boolean;

interface ImportMetaEnv {
    readonly INJECT_DECORATOR: boolean;
    readonly IS_PLAYWRIGHT: boolean | undefined;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
