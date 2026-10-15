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
    initApiClient(client, config);
    initApiClient(aktivitetspenger.client, config);
    initApiClient(omsorgspenger.client, config);
    initApiClient(ungdomsytelse.client, config);
    initApiClient(ettersendelse.client, config);
    initApiClient(omsorgspengerAleneomsorg.client, config);
    initApiClient(omsorgspengerMidlertidigAlene.client, config);
    initApiClient(omsorgspengerutbetalingArbeidstaker.client, config);
    initApiClient(omsorgspengerutbetalingSnf.client, config);
    initApiClient(opplaeringspenger.client, config);
    initApiClient(pleiepengerLivetsSluttfase.client, config);
    initApiClient(pleiepengerSyktBarnEndringsmelding.client, config);
    initApiClient(pleiepengerSyktBarnSoknad.client, config);
};
