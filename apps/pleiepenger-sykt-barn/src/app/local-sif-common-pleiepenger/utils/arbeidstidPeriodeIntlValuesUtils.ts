import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeidIPeriodeIntlValues, ArbeidsforholdType } from '../types';

export const getArbeidstidIPeriodeIntlValues = (
    intl: IntlShape,
    info: {
        arbeidsforholdType: ArbeidsforholdType;
        periode: DateRange;
        jobberNormaltTimer: number;
        arbeidsgiverNavn?: string;
    },
): ArbeidIPeriodeIntlValues => {
    const getHvorTekst = () => {
        switch (info.arbeidsforholdType) {
            case ArbeidsforholdType.ANSATT:
                return intlHelper(intl, 'arbeidsforhold.arbeidsforholdIntlValues.somAnsatt', {
                    arbeidsgiverNavn: info.arbeidsgiverNavn || 'som ansatt',
                });
            case ArbeidsforholdType.FRILANSER:
                return intlHelper(intl, 'arbeidsforhold.arbeidsforholdIntlValues.somFrilanser');
            case ArbeidsforholdType.SELVSTENDIG:
                return intlHelper(intl, 'arbeidsforhold.arbeidsforholdIntlValues.somSN');
        }
    };

    return {
        hvor: getHvorTekst(),
        arbeidsgiverNavn: info.arbeidsgiverNavn,
        timer: intlHelper(intl, 'arbeidstidPeriode.timer', { timer: info.jobberNormaltTimer }),
        fra: dateFormatter.full(info.periode.from),
        til: dateFormatter.full(info.periode.to),
    };
};
