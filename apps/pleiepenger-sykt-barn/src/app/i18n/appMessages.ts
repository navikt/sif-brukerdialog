/* eslint-disable max-len */
import { sifCommonPleiepengerMessages } from '../local-sif-common-pleiepenger/i18n';
import { confirmationPageMessages } from '../pages/confirmation-page/confirmationPageMessages';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import { arbeidssituasjonMessages } from '../søknad/arbeidssituasjon-step/arbeidssituasjonMessages';
import { arbeidIPeriodeMessages } from '../søknad/arbeidstid-step/i18n/arbeidIPeriodeMessages';
import { legeerklæringMessages } from '../søknad/legeerklæring-step/legeerklæringMessages';
import { medlemskapMessages } from '../søknad/medlemskap-step/medlemskapMessages';
import { nattevåkOgBeredskapMessages } from '../søknad/nattevåk-og-beredskap-step/nattevåkOgBeredskapMessages';
import { omsorgstilbudMessages } from '../søknad/omsorgstilbud-step/omsorgstilbudMessages';
import { omBarnetMessages } from '../søknad/opplysninger-om-barnet-step/omBarnetMessages';
import { oppsummeringMessages } from '../søknad/oppsummering-step/oppsummeringMessages';
import { tidsromMessages } from '../søknad/tidsrom-step/tidsromMessages';
import { appCommonMessages } from './appCommonMessages';

const nb = {
    ...sifCommonPleiepengerMessages.nb,
    ...velkommenPageMessages.nb,
    ...confirmationPageMessages.nb,
    ...omBarnetMessages.nb,
    ...oppsummeringMessages.nb,
    ...tidsromMessages.nb,
    ...arbeidssituasjonMessages.nb,
    ...omsorgstilbudMessages.nb,
    ...nattevåkOgBeredskapMessages.nb,
    ...arbeidIPeriodeMessages.nb,
    ...legeerklæringMessages.nb,
    ...medlemskapMessages.nb,
    ...appCommonMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...sifCommonPleiepengerMessages.nn,
    ...arbeidIPeriodeMessages.nn,
    ...velkommenPageMessages.nn,
    ...confirmationPageMessages.nn,
    ...omBarnetMessages.nn,
    ...oppsummeringMessages.nn,
    ...tidsromMessages.nn,
    ...arbeidssituasjonMessages.nn,
    ...omsorgstilbudMessages.nn,
    ...nattevåkOgBeredskapMessages.nn,
    ...legeerklæringMessages.nn,
    ...medlemskapMessages.nn,
    ...appCommonMessages.nn,
};

export const appMessages = { nb, nn };
