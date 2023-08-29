import React from 'react';
import { useSøknadContext } from '../../../hooks';
import { Alert, Heading } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';

interface Props {}

const ArbeidsaktiviteterMedUkjentArbeidsgiver: React.FunctionComponent<Props> = ({}) => {
    const {
        state: { sak },
    } = useSøknadContext();
    if (sak.arbeidsaktivitetMedUkjentArbeidsgiver.length === 0) {
        return null;
    }

    const antallUkjente = sak.arbeidsaktivitetMedUkjentArbeidsgiver.length;
    const getTittel = () => {
        return antallUkjente === 1
            ? `Ukjent arbeidsforhold - orgnr. ${sak.arbeidsaktivitetMedUkjentArbeidsgiver[0].organisasjonsnummer}`
            : `${antallUkjente} ukjente arbeidsforhold`;
    };
    return (
        <FormBlock>
            <Alert variant="info">
                <Heading level="3" size="medium">
                    {getTittel()}
                </Heading>
                {antallUkjente === 1 ? (
                    <p>
                        Det er registrert informasjon om et arbeidsforhold i saken din på en arbeidsgiver vi ikke finner
                        registrert på deg i AA-registeret.
                    </p>
                ) : (
                    <>
                        <p>
                            Det er registrert informasjon om arbeidsforhold i saken din hvor vi ikke finner
                            arbeidsforholdet registrert i AA-registeret:
                        </p>
                        <ul>
                            {sak.arbeidsaktivitetMedUkjentArbeidsgiver.map((a) => (
                                <li key={a.organisasjonsnummer}>{a.organisasjonsnummer}</li>
                            ))}
                        </ul>
                    </>
                )}
                <p>Dette kan være fordi:</p>
                <ul>
                    <li>En mulig årsak</li>
                    <li>En annen mulig årsak</li>
                </ul>
                <p>Hva skal bruker gjøre ...?</p>
            </Alert>
        </FormBlock>
    );
};

export default ArbeidsaktiviteterMedUkjentArbeidsgiver;
