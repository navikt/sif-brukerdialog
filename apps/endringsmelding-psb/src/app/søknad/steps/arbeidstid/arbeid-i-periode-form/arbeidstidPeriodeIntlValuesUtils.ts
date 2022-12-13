import { IntlShape } from 'react-intl';
// import { dateFormatter, DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidAktivitetType } from '../../../../types/Sak';
import { getArbeidstidPeriodeIntl } from './arbeidIPeriodeMessages';

export type ArbeidIPeriodeIntlValues = {
    hvor: string;
    skalEllerHarJobbet: string;
    timerNormalt: string;
    // fra: string;
    // til: string;
    // iPerioden: string;
};

export const getArbeidstidIPeriodeIntlValues = (
    intl: IntlShape,
    info: {
        timerNormaltString: string;
        arbeidsforhold:
            | {
                  type: ArbeidAktivitetType.arbeidstaker;
                  arbeidsstedNavn: string;
              }
            | {
                  type: ArbeidAktivitetType.frilanser | ArbeidAktivitetType.selvstendigNæringsdrivende;
              };
    }
): ArbeidIPeriodeIntlValues => {
    const arbIntl = getArbeidstidPeriodeIntl(intl);

    const getHvorTekst = () => {
        switch (info.arbeidsforhold.type) {
            case ArbeidAktivitetType.arbeidstaker:
                return arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt', {
                    arbeidsstedNavn: info.arbeidsforhold.arbeidsstedNavn,
                });
            case ArbeidAktivitetType.frilanser:
                return arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser');
            case ArbeidAktivitetType.selvstendigNæringsdrivende:
                return arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN');
        }
    };

    return {
        skalEllerHarJobbet: arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe'),
        hvor: getHvorTekst(),
        timerNormalt: info.timerNormaltString,
        // fra: dateFormatter.full(info.periode.from),
        // til: dateFormatter.full(info.periode.to),
        // iPerioden: arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden', {
        //     fra: dateFormatter.compact(info.periode.from),
        //     til: dateFormatter.compact(info.periode.to),
        // }),
    };
};
