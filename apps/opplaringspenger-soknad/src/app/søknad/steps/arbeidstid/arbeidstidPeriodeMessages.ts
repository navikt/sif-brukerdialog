import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { IntlShape } from 'react-intl';

const nb = {
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.jobber': 'jobber',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt': `hos {arbeidsstedNavn}`,
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilanser',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN': 'som selvstendig næringsdrivende',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden': `i perioden {fra} til {til}`,
    'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timer}}',
    'arbeidstidPeriode.timer.ikkeTall': `{timer} timer`,
};

type ArbeidstidPeriodeMessagesType = keyof typeof nb;

const nn: Record<keyof typeof nb, string> = {
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.jobber': 'jobbar',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt': 'hos {arbeidsstedNavn}',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilanser',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN': 'som sjølvstendig næringsdrivande',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden': 'i perioden {fra} til {til}',
    'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timar}}',
    'arbeidstidPeriode.timer.ikkeTall': '{timer} timar',
};
export const arbeidstidPeriodeMessages = { nb, nn };

export const getArbeidstidPeriodeIntl = (intl: IntlShape) => typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);
