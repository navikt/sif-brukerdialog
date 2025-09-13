import {
    ettersendelse,
    omsorgspenger,
    omsorgspengerAleneomsorg,
    omsorgspengerMidlertidigAlene,
    omsorgspengerutbetalingArbeidstaker,
    omsorgspengerutbetalingSnf,
    opplaeringspenger,
    pleiepengerLivetsSluttfase,
    pleiepengerSyktBarnEndringsmelding,
    pleiepengerSyktBarnSoknad,
    ungdomsytelse,
} from './';
import { initApiClient } from './utils/initApiClient';

export const initK9BrukerdialogProsesseringApiClients = (config: { frontendPath: string; loginURL: string }) => {
    const { frontendPath, loginURL } = config;
    initApiClient(omsorgspenger.client, frontendPath, loginURL);
    initApiClient(ungdomsytelse.client, frontendPath, loginURL);
    initApiClient(ettersendelse.client, frontendPath, loginURL);
    initApiClient(omsorgspengerAleneomsorg.client, frontendPath, loginURL);
    initApiClient(omsorgspengerMidlertidigAlene.client, frontendPath, loginURL);
    initApiClient(omsorgspengerutbetalingArbeidstaker.client, frontendPath, loginURL);
    initApiClient(omsorgspengerutbetalingSnf.client, frontendPath, loginURL);
    initApiClient(opplaeringspenger.client, frontendPath, loginURL);
    initApiClient(pleiepengerLivetsSluttfase.client, frontendPath, loginURL);
    initApiClient(pleiepengerSyktBarnEndringsmelding.client, frontendPath, loginURL);
    initApiClient(pleiepengerSyktBarnSoknad.client, frontendPath, loginURL);
};
