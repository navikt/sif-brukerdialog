import { scenarioHeaderMessages_nn } from '../../demo/i18n/nn';
import { apmTestPageMessages_nn } from '../content/apm-test/i18n/nn';
import { kanIkkeSøkePageMessages_nn } from '../content/kan-ikke-soke/i18n/nn';
import { kvitteringPageMessages_nn } from '../content/kvittering/i18n/nn';
import { velkommenPageMessages_nn } from '../content/velkommen/i18n/nn';
import { barnStegMessages_nn } from '../steps/barn/i18n/nn';
import { bostedStegMessages_nn } from '../steps/bosted/i18n/nn';
import { kontonummerStegMessages_nn } from '../steps/kontonummer/i18n/nn';
import { medlemskapStegMessages_nn } from '../steps/medlemskap/i18n/nn';
import { oppsummeringStegMessages_nn } from '../steps/oppsummering/i18n/nn';
import { appMessages_nb } from './nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...apmTestPageMessages_nn,
    ...barnStegMessages_nn,
    ...bostedStegMessages_nn,
    ...kanIkkeSøkePageMessages_nn,
    ...medlemskapStegMessages_nn,
    ...kontonummerStegMessages_nn,
    ...oppsummeringStegMessages_nn,
    ...velkommenPageMessages_nn,
    ...kvitteringPageMessages_nn,
    ...scenarioHeaderMessages_nn,
    'application.title': 'Søknad om aktivitetspengar',
    'kvittering.documentTitle': 'Søknad om aktivitetspengar teken imot',
    'kvittering.title': 'Søknaden er sendt',
    'kvittering.message': 'Me har fått søknaden din om aktivitetspengar.',
    'step.startdato.title': 'Startdato',
    'step.kontonummer.title': 'Kontonummer for utbetaling',
    'step.bosted.title': 'Bustad',
    'step.medlemskap.title': 'Medlemskap i folketrygda',
    'step.barn.title': 'Barn',
    'step.oppsummering.title': 'Oppsummering',
    'component.todo.label': 'Oppgåve',
};
