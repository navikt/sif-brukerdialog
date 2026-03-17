import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { IntlShape } from 'react-intl';

const arbeidIPeriodeIntlValuesMessages = {
    nb: {
        'arbeidIPeriode.arbeidIPeriodeIntlValues.harJobbet': 'har jobbet',
        'arbeidIPeriode.arbeidIPeriodeIntlValues.skalJobbe': 'skal jobbe',
        'arbeidIPeriode.arbeidIPeriodeIntlValues.somAnsatt': `hos {arbeidsstedNavn}`,
        'arbeidIPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilanser',
        'arbeidIPeriode.arbeidIPeriodeIntlValues.somSN': 'som selvstendig næringsdrivende',
        'arbeidIPeriode.arbeidIPeriodeIntlValues.iPerioden': `i perioden {fra} til {til}`,
    },
    nn: {
        'arbeidIPeriode.arbeidIPeriodeIntlValues.harJobbet': 'har jobba',
        'arbeidIPeriode.arbeidIPeriodeIntlValues.skalJobbe': 'skal jobbe',
        'arbeidIPeriode.arbeidIPeriodeIntlValues.somAnsatt': 'hos {arbeidsstedNavn}',
        'arbeidIPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilanser',
        'arbeidIPeriode.arbeidIPeriodeIntlValues.somSN': 'som sjølvstendig næringsdrivande',
        'arbeidIPeriode.arbeidIPeriodeIntlValues.iPerioden': 'i perioden {fra} til {til}',
    },
};

export const arbeidstidPeriodeMessages = {
    nb: {
        ...arbeidIPeriodeIntlValuesMessages.nb,
        'arbeidIPeriode.timer': '{timer, plural, one {# time} other {# timer}}',
        'arbeidIPeriode.timer.ikkeTall': `{timer} timer`,
    },
    nn: {
        ...arbeidIPeriodeIntlValuesMessages.nn,
        'arbeidIPeriode.timer': '{timer, plural, one {# time} other {# timar}}',
        'arbeidIPeriode.timer.ikkeTall': `{timer} timar`,
    },
};

type ArbeidstidPeriodeMessagesType = keyof typeof arbeidstidPeriodeMessages.nb;

export const getArbeidstidPeriodeIntl = (intl: IntlShape) => typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);
