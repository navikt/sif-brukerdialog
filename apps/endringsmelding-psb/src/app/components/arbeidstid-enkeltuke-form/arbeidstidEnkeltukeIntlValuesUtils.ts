import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ArbeidAktivitetType } from '../../types/Sak';

export type ArbeidstidEnkeltukeIntlValues = {
    hvor: string;
    dagerTekst: string;
    skalEllerHarJobbet: string;
    timerNormalt: string;
};

export const getArbeidstidEnkeltukeIntlValues = (
    intl: IntlShape,
    info: {
        timerNormaltString: string;
        dagerTekst: string;
        arbeidsforhold:
            | {
                  type: ArbeidAktivitetType.arbeidstaker;
                  arbeidsstedNavn: string;
              }
            | {
                  type: ArbeidAktivitetType.frilanser | ArbeidAktivitetType.selvstendigNæringsdrivende;
              };
    }
): ArbeidstidEnkeltukeIntlValues => {
    const getHvorTekst = () => {
        switch (info.arbeidsforhold.type) {
            case ArbeidAktivitetType.arbeidstaker:
                return intlHelper(intl, 'arbeidstidEnkeltuke.intlValues.somAnsatt', {
                    arbeidsstedNavn: info.arbeidsforhold.arbeidsstedNavn,
                });
            case ArbeidAktivitetType.frilanser:
                return intlHelper(intl, 'arbeidstidEnkeltuke.intlValues.somFrilanser');
            case ArbeidAktivitetType.selvstendigNæringsdrivende:
                return intlHelper(intl, 'arbeidstidEnkeltuke.intlValues.somSN');
        }
    };

    return {
        skalEllerHarJobbet: intlHelper(intl, 'arbeidstidEnkeltuke.intlValues.skalJobbe'),
        hvor: getHvorTekst(),
        dagerTekst: info.dagerTekst,
        timerNormalt: info.timerNormaltString,
    };
};
