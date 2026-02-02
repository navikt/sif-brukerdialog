/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly INJECT_DECORATOR: boolean;
    readonly TOGGLE_ARBEIDSTID: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
