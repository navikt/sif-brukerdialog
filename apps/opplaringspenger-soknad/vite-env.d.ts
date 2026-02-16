/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly INJECT_DECORATOR: boolean;
    readonly ENABLED_UXSIGNALS: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
