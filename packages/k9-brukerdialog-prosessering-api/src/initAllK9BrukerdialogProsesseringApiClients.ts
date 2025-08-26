import {
    omsorgspenger,
    ungdomsytelse,
    ettersendelse,
    omsorgspengerAleneomsorg,
    omsorgspengerMidlertidigAlene,
    omsorgspengerutbetalingArbeidstaker,
    omsorgspengerutbetalingSnf,
    opplaeringspenger,
    pleiepengerLivetsSluttfase,
    pleiepengerSyktBarnEndringsmelding,
    pleiepengerSyktBarnSoknad,
} from '.';
import { initK9BrukerdialogProsesseringApiClient } from './utils/initK9BrukerdialogProsesseringApiClient';

export const initAllK9BrukerdialogProsesseringApiClients = (config: { frontendPath: string; loginURL: string }) => {
    const { frontendPath, loginURL } = config;
    initK9BrukerdialogProsesseringApiClient(omsorgspenger.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(ungdomsytelse.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(ettersendelse.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(omsorgspengerAleneomsorg.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(omsorgspengerMidlertidigAlene.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(omsorgspengerutbetalingArbeidstaker.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(omsorgspengerutbetalingSnf.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(opplaeringspenger.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(pleiepengerLivetsSluttfase.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(pleiepengerSyktBarnEndringsmelding.client, frontendPath, loginURL);
    initK9BrukerdialogProsesseringApiClient(pleiepengerSyktBarnSoknad.client, frontendPath, loginURL);
};
