import React from 'react';
import { useSøknadContext } from '../../../hooks';
import { Alert, Heading } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { getAktiviteterSomSkalEndres } from './arbeidstidStepUtils';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';

interface Props {}

const ArbeidsaktiviteterMedUkjentArbeidsgiver: React.FunctionComponent<Props> = ({}) => {
    const {
        state: { sak },
    } = useSøknadContext();

    const antallUkjente = sak.arbeidsaktivitetMedUkjentArbeidsgiver.length;

    if (antallUkjente === 0) {
        return null;
    }

    const antallKjente = getAktiviteterSomSkalEndres(sak.arbeidsaktiviteter).length;
    const flertall = antallUkjente > 1;

    return (
        <FormBlock>
            <Alert variant="info">
                <Heading level="3" size="small">
                    Avsluttet arbeidsforhold
                </Heading>
                <>
                    Det er {flertall ? 'flere' : 'ett'} arbeidsforhold i saken din som ikke er registrert på deg i
                    AA-registeret. Du kan ikke endre arbeidstid for{' '}
                    {flertall ? 'disse arbeidsforholdene' : 'dette arbeidsforholdet'}
                    {antallKjente === 0 ? (
                        '.'
                    ) : (
                        <>
                            , men du kan fortsatt endre{' '}
                            {antallKjente === 1 ? 'ditt andre arbeidsforhold' : 'de andre arbeidsforholdene dine'}{' '}
                            nedenfor.
                        </>
                    )}
                </>
                <ExpandableInfo title="Hvilke arbeidsforhold gjelder det?">
                    <p>Arbeidsforhold du ikke kan endre er (organisasjonsnummer):</p>
                    <ul>
                        {sak.arbeidsaktivitetMedUkjentArbeidsgiver.map((a) => (
                            <li key={a.organisasjonsnummer}>{a.organisasjonsnummer}</li>
                        ))}
                    </ul>
                </ExpandableInfo>
                <ExpandableInfo title="Hva betyr dette, og trenger jeg å gjøre noe?">
                    <p>Nå vi ikke finner arbeidsforholdet i AA-registrert så kan dette ha flere årsaker:</p>
                    <ul>
                        <li>En</li>
                        <li>To</li>
                        <li>Tre</li>
                    </ul>
                    <p>Du bør ...</p>
                </ExpandableInfo>
            </Alert>
        </FormBlock>
    );
};

export default ArbeidsaktiviteterMedUkjentArbeidsgiver;
