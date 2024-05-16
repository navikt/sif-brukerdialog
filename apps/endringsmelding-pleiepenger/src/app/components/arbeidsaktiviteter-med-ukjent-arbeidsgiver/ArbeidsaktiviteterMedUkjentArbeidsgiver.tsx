import { Alert, Heading } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText, useAppIntl } from '../../i18n';
import { getAktiviteterSomSkalEndres } from '../../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { Arbeidsaktiviteter, ArbeidsaktivitetUkjentArbeidsgiver } from '../../types';
import AAregisteret from '../aa-registeret/AARegisteret';

interface Props {
    arbeidsaktivitetMedUkjentArbeidsgiver: ArbeidsaktivitetUkjentArbeidsgiver[];
    arbeidsaktiviteter: Arbeidsaktiviteter;
}

const ArbeidsaktiviteterMedUkjentArbeidsgiver: React.FunctionComponent<Props> = ({
    arbeidsaktivitetMedUkjentArbeidsgiver,
    arbeidsaktiviteter,
}) => {
    const { text } = useAppIntl();
    const antallUkjente = arbeidsaktivitetMedUkjentArbeidsgiver.length;

    if (antallUkjente === 0) {
        return null;
    }

    const antallSomKanEndres = getAktiviteterSomSkalEndres(arbeidsaktiviteter).length;

    return (
        <FormBlock>
            <Alert variant="info">
                <Heading level="3" size="small">
                    <AppText id="arbeidsaktiviteterMedUkjentArbeidsgiver.tittel" />
                </Heading>
                <ul>
                    {arbeidsaktivitetMedUkjentArbeidsgiver.map((a) => (
                        <li key={a.organisasjonsnummer}>
                            <AppText
                                id="arbeidsaktiviteterMedUkjentArbeidsgiver.orgnummer"
                                values={{ orgnr: a.organisasjonsnummer }}
                            />
                        </li>
                    ))}
                </ul>
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
                        <AppText
                            id="arbeidsaktiviteterMedUkjentArbeidsgiver.kanIkkeEndreAlle"
                            values={{ antallUkjente }}
                        />
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
        </FormBlock>
    );
};

export default ArbeidsaktiviteterMedUkjentArbeidsgiver;
