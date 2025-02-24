import { AppIntlShape } from '../../../i18n';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';

interface ArbeidsforholdIntlValues extends Record<string, string> {
    hvor: string;
    jobber: string;
}

export const getArbeidsforholdIntlValues = (
    { text }: AppIntlShape,
    info: {
        arbeidsforhold:
            | {
                  type: ArbeidsforholdType.ANSATT;
                  arbeidsgiverNavn?: string;
                  erAnsatt?: boolean;
              }
            | {
                  type: ArbeidsforholdType.FRILANSER | ArbeidsforholdType.SELVSTENDIG;
              };
    },
): ArbeidsforholdIntlValues => {
    const getHvorTekst = () => {
        switch (info.arbeidsforhold.type) {
            case ArbeidsforholdType.ANSATT:
                return text('arbeidsforhold.arbeidsforholdIntlValues.somAnsatt', {
                    arbeidsgiverNavn: info.arbeidsforhold.arbeidsgiverNavn || 'som ansatt',
                });
            case ArbeidsforholdType.FRILANSER:
                return text('arbeidsforhold.arbeidsforholdIntlValues.somFrilanser');
            case ArbeidsforholdType.SELVSTENDIG:
                return text('arbeidsforhold.arbeidsforholdIntlValues.somSN');
        }
    };

    return {
        jobber:
            info.arbeidsforhold.type === ArbeidsforholdType.ANSATT && info.arbeidsforhold.erAnsatt === false
                ? text('arbeidsforhold.arbeidsforholdIntlValues.jobbet')
                : text('arbeidsforhold.arbeidsforholdIntlValues.jobber'),
        hvor: getHvorTekst(),
    };
};
