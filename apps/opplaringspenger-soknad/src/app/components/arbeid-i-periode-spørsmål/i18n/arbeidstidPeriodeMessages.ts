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
};

export const arbeidstidPeriodeMessages = {
    nb: {
        ...arbeidIPeriodeIntlValuesMessages.nb,
        'arbeidIPeriode.timer': '{timer, plural, one {# time} other {# timer}}',
        'arbeidIPeriode.timer.ikkeTall': `{timer} timer`,
    },
};

type ArbeidstidPeriodeMessagesType = keyof typeof arbeidstidPeriodeMessages.nb;

export const getArbeidstidPeriodeIntl = (intl: IntlShape) => typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);
