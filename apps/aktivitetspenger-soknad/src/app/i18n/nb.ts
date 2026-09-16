import { apmTestPageMessages_nb } from '../content/apm-test/i18n/nb';
import { kanIkkeSøkePageMessages_nb } from '../content/kan-ikke-soke/i18n/nb';
import { kvitteringPageMessages_nb } from '../content/kvittering/i18n/nb';
import { velkommenPageMessages_nb } from '../content/velkommen/i18n/nb';
import { scenarioHeaderMessages_nb } from '../../demo/i18n/nb';
import { barnStegMessages_nb } from '../steps/barn/i18n/nb';
import { bostedStegMessages_nb } from '../steps/bosted/i18n/nb';
import { kontonummerStegMessages_nb } from '../steps/kontonummer/i18n/nb';
import { medlemskapStegMessages_nb } from '../steps/medlemskap/i18n/nb';
import { oppsummeringStegMessages_nb } from '../steps/oppsummering/i18n/nb';

export const appMessages_nb = {
    ...apmTestPageMessages_nb,
    ...barnStegMessages_nb,
    ...bostedStegMessages_nb,
    ...kanIkkeSøkePageMessages_nb,
    ...medlemskapStegMessages_nb,
    ...kontonummerStegMessages_nb,
    ...oppsummeringStegMessages_nb,
    ...velkommenPageMessages_nb,
    ...kvitteringPageMessages_nb,
    ...scenarioHeaderMessages_nb,
    'application.title': 'Søknad om aktivitetspenger',
    'kvittering.documentTitle': 'Søknad om aktivitetspenger mottatt',
    'kvittering.title': 'Søknaden er sendt',
    'kvittering.message': 'Vi har fått søknaden din om aktivitetspenger.',
    'step.startdato.title': 'Startdato',
    'step.kontonummer.title': 'Kontonummer for utbetaling',
    'step.bosted.title': 'Bosted',
    'step.medlemskap.title': 'Medlemskap i folketrygden',
    'step.barn.title': 'Barn',
    'step.oppsummering.title': 'Oppsummering',
    'component.todo.label': 'Todo',
};
