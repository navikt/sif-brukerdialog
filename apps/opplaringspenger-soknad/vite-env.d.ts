/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly INJECT_DECORATOR: boolean;
    readonly IS_PLAYWRIGHT: boolean | undefined;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
