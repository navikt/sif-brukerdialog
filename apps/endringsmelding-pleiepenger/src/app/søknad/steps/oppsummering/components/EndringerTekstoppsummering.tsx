import { useAppIntl } from '@app/i18n';
import { BodyLong } from '@navikt/ds-react';

interface Props {
    arbeidsforhold: { antallEndret: number; antallTotalt: number };
    ferie: { harLagtTil: boolean; harFjernet: boolean };
    tilsynsordningErEndret: boolean;
}

const getFerieType = ({ harLagtTil, harFjernet }: Props['ferie']) => {
    if (harLagtTil && harFjernet) {
        return 'begge';
    }
    return harLagtTil ? 'lagtTil' : 'fjernet';
};

const medStorForbokstav = (tekst: string) => tekst.charAt(0).toUpperCase() + tekst.slice(1);

const EndringerTekstoppsummering = ({ arbeidsforhold, ferie, tilsynsordningErEndret }: Props) => {
    const { text, intl } = useAppIntl();
    const { antallEndret, antallTotalt } = arbeidsforhold;
    const antallUendret = antallTotalt - antallEndret;
    const ferieErEndret = ferie.harLagtTil || ferie.harFjernet;

    const endret: string[] = [];
    const uendret: string[] = [];

    if (antallEndret > 0) {
        endret.push(text('endringerTekstoppsummering.endret.arbeidstid', { antallEndret, antallTotalt }));
        if (antallUendret > 0) {
            uendret.push(text('endringerTekstoppsummering.uendret.andreArbeidsforhold', { antall: antallUendret }));
        }
    } else if (antallTotalt > 0) {
        uendret.push(text('endringerTekstoppsummering.uendret.arbeidstid'));
    }

    if (ferieErEndret) {
        endret.push(text('endringerTekstoppsummering.endret.ferie', { type: getFerieType(ferie) }));
    } else {
        uendret.push(text('endringerTekstoppsummering.uendret.ferie'));
    }

    if (tilsynsordningErEndret) {
        endret.push(text('endringerTekstoppsummering.endret.tilsynsordning'));
    } else {
        uendret.push(text('endringerTekstoppsummering.uendret.tilsynsordning'));
    }

    if (endret.length === 0) {
        return null;
    }

    const setninger = [
        text('endringerTekstoppsummering.endret', { endringer: intl.formatList(endret, { type: 'conjunction' }) }),
        uendret.length > 0
            ? medStorForbokstav(
                  text('endringerTekstoppsummering.uendret', {
                      uendret: intl.formatList(uendret, { type: 'conjunction' }),
                  }),
              )
            : undefined,
    ];

    return (
        <BodyLong size="large" as="div">
            {setninger.filter(Boolean).join(' ')}
        </BodyLong>
    );
};

export default EndringerTekstoppsummering;
