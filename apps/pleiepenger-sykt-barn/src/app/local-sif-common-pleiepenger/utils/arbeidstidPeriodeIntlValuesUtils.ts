import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { AppIntlShape } from '../../i18n';
import { ArbeidIPeriodeIntlValues, ArbeidsforholdType } from '../types';

export const getArbeidstidIPeriodeIntlValues = (
    { text }: AppIntlShape,
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
                return text('arbeidsforhold.arbeidsforholdIntlValues.somAnsatt', {
                    arbeidsgiverNavn: info.arbeidsgiverNavn || 'som ansatt',
                });
            case ArbeidsforholdType.FRILANSER:
                return text('arbeidsforhold.arbeidsforholdIntlValues.somFrilanser');
            case ArbeidsforholdType.SELVSTENDIG:
                return text('arbeidsforhold.arbeidsforholdIntlValues.somSN');
        }
    };

    return {
        hvor: getHvorTekst(),
        arbeidsgiverNavn: info.arbeidsgiverNavn,
        timer: text('arbeidstidPeriode.timer', { timer: info.jobberNormaltTimer }),
        fra: dateFormatter.full(info.periode.from),
        til: dateFormatter.full(info.periode.to),
    };
};
