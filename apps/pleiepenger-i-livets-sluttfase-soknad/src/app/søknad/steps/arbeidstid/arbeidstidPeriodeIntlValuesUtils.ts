import { IntlShape } from 'react-intl';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds';
import { DateRange, prettifyDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { ArbeidIPeriodeIntlValues } from '../../../types/ArbeidIPeriodeIntlValues';
import { ArbeidsforholdType } from '../../../types/ArbeidsforholdType';
import { getArbeidstidPeriodeIntl } from './arbeidstidPeriodeMessages';

export const getArbeidstidIPeriodeIntlValues = (
    intl: IntlShape,
    info: {
        periode: DateRange;
        arbeidsforhold:
            | {
                  type: ArbeidsforholdType.ANSATT;
                  arbeidsstedNavn: string;
                  jobberNormaltTimer: string | number | undefined;
              }
            | {
                  type: ArbeidsforholdType.FRILANSER | ArbeidsforholdType.SELVSTENDIG;
                  jobberNormaltTimer: string | number | undefined;
              };
    },
): ArbeidIPeriodeIntlValues => {
    const arbIntl = getArbeidstidPeriodeIntl(intl);
    const getTimerTekst = (): string => {
        const timer =
            typeof info.arbeidsforhold.jobberNormaltTimer === 'number'
                ? info.arbeidsforhold.jobberNormaltTimer
                : getNumberFromNumberInputValue(info.arbeidsforhold.jobberNormaltTimer);
        return timer !== undefined
            ? arbIntl.text('arbeidstidPeriode.timer', { timer })
            : arbIntl.text('arbeidstidPeriode.timer.ikkeTall', {
                  timer: info.arbeidsforhold.jobberNormaltTimer || '-',
              });
    };

    const getHvorTekst = () => {
        switch (info.arbeidsforhold.type) {
            case ArbeidsforholdType.ANSATT:
                return arbIntl.text('arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt', {
                    arbeidsstedNavn: info.arbeidsforhold.arbeidsstedNavn,
                });
            case ArbeidsforholdType.FRILANSER:
                return arbIntl.text('arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser');
            case ArbeidsforholdType.SELVSTENDIG:
                return arbIntl.text('arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN');
        }
    };

    return {
        skalEllerHarJobbet: arbIntl.text('arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe'),
        hvor: getHvorTekst(),
        timer: getTimerTekst(),
        fra: prettifyDateExtended(info.periode.from),
        til: prettifyDateExtended(info.periode.to),
        iPerioden: arbIntl.text('arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden', {
            fra: prettifyDate(info.periode.from),
            til: prettifyDate(info.periode.to),
        }),
    };
};
