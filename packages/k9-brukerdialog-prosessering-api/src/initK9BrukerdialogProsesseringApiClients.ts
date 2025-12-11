import { initApiClient, InitApiClientOptions } from '@navikt/sif-common-api';

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
} from '.';

export const initK9BrukerdialogProsesseringApiClients = (frontendPath: string, options: InitApiClientOptions) => {
    initApiClient(omsorgspenger.client, frontendPath, options);
    initApiClient(ungdomsytelse.client, frontendPath, options);
    initApiClient(ettersendelse.client, frontendPath, options);
    initApiClient(omsorgspengerAleneomsorg.client, frontendPath, options);
    initApiClient(omsorgspengerMidlertidigAlene.client, frontendPath, options);
    initApiClient(omsorgspengerutbetalingArbeidstaker.client, frontendPath, options);
    initApiClient(omsorgspengerutbetalingSnf.client, frontendPath, options);
    initApiClient(opplaeringspenger.client, frontendPath, options);
    initApiClient(pleiepengerLivetsSluttfase.client, frontendPath, options);
    initApiClient(pleiepengerSyktBarnEndringsmelding.client, frontendPath, options);
    initApiClient(pleiepengerSyktBarnSoknad.client, frontendPath, options);
};
