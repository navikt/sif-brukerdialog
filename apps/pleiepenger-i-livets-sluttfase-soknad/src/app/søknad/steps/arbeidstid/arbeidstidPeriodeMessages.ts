import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { IntlShape } from 'react-intl';

const nb = {
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.harJobbet': 'har jobbet',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe': 'skal jobbe',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt': `hos {arbeidsstedNavn}`,
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilanser',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN': 'som selvstendig næringsdrivende',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden': `i perioden {fra} til {til}`,
    'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timer}}',
    'arbeidstidPeriode.timer.ikkeTall': `{timer} timer`,
};

const nn: Record<keyof typeof nb, string> = {
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.harJobbet': 'har jobba',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe': 'skal jobbe',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt': `hos {arbeidsstedNavn}`,
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilansar',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN': 'som sjølvstendig næringsdrivande',
    'arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden': `i perioden {fra} til {til}`,
    'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timar}}',
    'arbeidstidPeriode.timer.ikkeTall': `{timer} timar`,
};

export const arbeidstidPeriodeMessages = { nb, nn };

type ArbeidstidPeriodeMessagesType = keyof typeof arbeidstidPeriodeMessages.nb;

export const getArbeidstidPeriodeIntl = (intl: IntlShape) => typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);
