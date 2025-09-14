import { Alert, Heading, List } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

import { AppText, useAppIntl } from '../../i18n';
import { getAktiviteterSomSkalEndres } from '../../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { Arbeidsaktiviteter, ArbeidsaktivitetUkjentArbeidsgiver } from '../../types';
import AAregisteret from '../aa-registeret/AARegisteret';

interface Props {
    arbeidsaktivitetMedUkjentArbeidsgiver: ArbeidsaktivitetUkjentArbeidsgiver[];
    arbeidsaktiviteter: Arbeidsaktiviteter;
}

const ArbeidsaktiviteterMedUkjentArbeidsgiver = ({
    arbeidsaktivitetMedUkjentArbeidsgiver,
    arbeidsaktiviteter,
}: Props) => {
    const { text } = useAppIntl();
    const antallUkjente = arbeidsaktivitetMedUkjentArbeidsgiver.length;

    if (antallUkjente === 0) {
        return null;
    }

    const antallSomKanEndres = getAktiviteterSomSkalEndres(arbeidsaktiviteter).length;

    return (
        <Alert variant="info">
            <Heading level="3" size="small">
                <AppText id="arbeidsaktiviteterMedUkjentArbeidsgiver.tittel" />
            </Heading>
            <List>
                {arbeidsaktivitetMedUkjentArbeidsgiver.map((a) => (
                    <List.Item key={a.organisasjonsnummer}>
                        <AppText
                            id="arbeidsaktiviteterMedUkjentArbeidsgiver.orgnummer"
                            values={{ orgnr: a.organisasjonsnummer }}
                        />
                    </List.Item>
                ))}
            </List>
            <p>
                <AppText
                    id="arbeidsaktiviteterMedUkjentArbeidsgiver.aaRegisteret"
                    values={{ AAregisteret: <AAregisteret /> }}
                />
            </p>
            {antallSomKanEndres === 0 ? (
                <p>
                    <AppText id="arbeidsaktiviteterMedUkjentArbeidsgiver.kanIkkeEndreNoe" />
                </p>
            ) : (
                <p>
                    <AppText id="arbeidsaktiviteterMedUkjentArbeidsgiver.kanIkkeEndreAlle" values={{ antallUkjente }} />
                </p>
            )}

            <ExpandableInfo title={text('arbeidsaktiviteterMedUkjentArbeidsgiver.feil.tittel')}>
                <p>
                    {antallUkjente === 1 ? (
                        <AppText id="arbeidsaktiviteterMedUkjentArbeidsgiver.feil.enUkjent" />
                    ) : (
                        <AppText id="arbeidsaktiviteterMedUkjentArbeidsgiver.feil.flereUkjent" />
                    )}
                </p>
            </ExpandableInfo>
        </Alert>
    );
};

export default ArbeidsaktiviteterMedUkjentArbeidsgiver;
