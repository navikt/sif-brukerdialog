import {
    aktivitetspenger,
    client,
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

export const initK9BrukerdialogProsesseringApiClients = (config: {
    frontendPath: string;
    loginURL: string;
    onUnauthorized?: () => void;
}) => {
    const { frontendPath, loginURL, onUnauthorized } = config;
    initApiClient(client, frontendPath, loginURL, onUnauthorized);
    initApiClient(aktivitetspenger.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(omsorgspenger.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(ungdomsytelse.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(ettersendelse.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(omsorgspengerAleneomsorg.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(omsorgspengerMidlertidigAlene.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(omsorgspengerutbetalingArbeidstaker.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(omsorgspengerutbetalingSnf.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(opplaeringspenger.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(pleiepengerLivetsSluttfase.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(pleiepengerSyktBarnEndringsmelding.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(pleiepengerSyktBarnSoknad.client, frontendPath, loginURL, onUnauthorized);
};
