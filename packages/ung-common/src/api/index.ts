export * from './errorHandlers';
export * from './initK9BrukerdialogProsesseringApiClient';
export * from './initK9BrukerdialogProsesseringUngdomsytelseApiClient';

export const commonRequestHeader = {
    'Content-type': 'application/json; charset=utf-8',
    'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
} as any;
