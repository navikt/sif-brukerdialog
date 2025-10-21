/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly INJECT_DECORATOR: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
