import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
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
                  arbeidsgiverNavn?: string;
              }
            | {
                  type: ArbeidsforholdType.FRILANSER | ArbeidsforholdType.SELVSTENDIG;
              };
    },
): ArbeidsforholdIntlValues => {
    const getHvorTekst = () => {
        switch (info.arbeidsforhold.type) {
            case ArbeidsforholdType.ANSATT:
                return intlHelper(intl, 'arbeidsforhold.arbeidsforholdIntlValues.somAnsatt', {
                    arbeidsgiverNavn: info.arbeidsforhold.arbeidsgiverNavn || 'som ansatt',
                });
            case ArbeidsforholdType.FRILANSER:
                return intlHelper(intl, 'arbeidsforhold.arbeidsforholdIntlValues.somFrilanser');
            case ArbeidsforholdType.SELVSTENDIG:
                return intlHelper(intl, 'arbeidsforhold.arbeidsforholdIntlValues.somSN');
        }
    };

    return {
        jobber: intlHelper(intl, 'arbeidsforhold.arbeidsforholdIntlValues.jobber'),
        hvor: getHvorTekst(),
    };
};
