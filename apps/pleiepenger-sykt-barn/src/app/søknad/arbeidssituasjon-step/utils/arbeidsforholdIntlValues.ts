import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';

interface ArbeidsforholdIntlValues extends Record<string, string> {
    hvor: string;
    jobber: string;
}

export const getArbeidsforholdIntlValues = (
    intl: IntlShape,
    info: {
        arbeidsforhold:
            | {
                  type: ArbeidsforholdType.ANSATT;
                  arbeidsstedNavn?: string;
              }
            | {
                  type: ArbeidsforholdType.FRILANSER | ArbeidsforholdType.SELVSTENDIG;
              };
    }
): ArbeidsforholdIntlValues => {
    const getHvorTekst = () => {
        switch (info.arbeidsforhold.type) {
            case ArbeidsforholdType.ANSATT:
                return intlHelper(intl, 'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt', {
                    arbeidsstedNavn: info.arbeidsforhold.arbeidsstedNavn || 'som ansatt',
                });
            case ArbeidsforholdType.FRILANSER:
                return intlHelper(intl, 'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser');
            case ArbeidsforholdType.SELVSTENDIG:
                return intlHelper(intl, 'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN');
        }
    };

    return {
        jobber: intlHelper(intl, 'arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe'),
        hvor: getHvorTekst(),
    };
};
