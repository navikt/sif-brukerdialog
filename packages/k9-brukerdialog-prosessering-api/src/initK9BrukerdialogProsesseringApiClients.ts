import { omsorgspenger, ungdomsytelse } from '.';
import { initApiClient } from './utils/initApiClient';

export const initK9BrukerdialogProsesseringApiClients = (frontendPath: string, loginURL: string) => {
    initApiClient(omsorgspenger.client, frontendPath, loginURL);
    initApiClient(ungdomsytelse.client, frontendPath, loginURL);
};
