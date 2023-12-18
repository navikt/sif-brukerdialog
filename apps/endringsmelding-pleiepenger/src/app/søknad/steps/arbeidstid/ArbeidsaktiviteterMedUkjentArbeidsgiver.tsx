import React from 'react';
import { useSøknadContext } from '../../../hooks';
import { Alert, Heading } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getAktiviteterSomSkalEndres } from './arbeidstidStepUtils';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import AAregisteret from '../../../components/aa-registeret/AARegisteret';

interface Props {}

const ArbeidsaktiviteterMedUkjentArbeidsgiver: React.FunctionComponent<Props> = ({}) => {
    const {
        state: { sak },
    } = useSøknadContext();

    const antallUkjente = sak.arbeidsaktivitetMedUkjentArbeidsgiver.length;

    if (antallUkjente === 0) {
        return null;
    }

    const antallSomKanEndres = getAktiviteterSomSkalEndres(sak.arbeidsaktiviteter).length;

    return (
        <FormBlock>
            <Alert variant="info">
                <Heading level="3" size="small">
                    Avsluttet arbeidsforhold
                </Heading>
                <ul>
                    {sak.arbeidsaktivitetMedUkjentArbeidsgiver.map((a) => (
                        <li key={a.organisasjonsnummer}>Org.nr. {a.organisasjonsnummer}</li>
                    ))}
                </ul>
                <p>
                    Du har arbeidsforhold i din pleiepengeperiode som er registrert som avsluttet av arbeidsgiver i{' '}
                    <AAregisteret />. Dette kan være hvis du har sluttet i en jobb, byttet avdeling eller lignende.
                </p>
                {antallSomKanEndres === 0 ? (
                    <p>Du kan ikke lenger endre arbeidstid for dette arbeidsforholdet.</p>
                ) : (
                    <p>
                        Du kan ikke lenger endre arbeidstid for{' '}
                        {antallUkjente === 1 ? 'dette arbeidsforholdet' : 'disse arbeidsforholdene'}, men du kan
                        fortsatt melde inn endringer for andre arbeidsforhold under.
                    </p>
                )}

                <ExpandableInfo title="Dette er feil, hva kan jeg gjøre?">
                    <p>
                        {antallUkjente === 1 ? (
                            <>
                                Jobber du fremdeles i arbeidsforholdet og det er feil at arbeidsforholdet er avsluttet,
                                må du be arbeidsgiveren din om å rette dette i <AAregisteret />. Dette gjør de enten via
                                eget lønns- og personalsystem, eller via Altinn.
                            </>
                        ) : (
                            <>
                                Jobber du fremdeles i noen av arbeidsforholdene og det er feil at arbeidsforholdene er
                                avsluttet, må du be arbeidsgiverene dine om å rette dette i <AAregisteret />. Dette gjør
                                de enten via eget lønns- og personalsystem, eller via Altinn.
                            </>
                        )}
                    </p>
                </ExpandableInfo>
            </Alert>
        </FormBlock>
    );
};

export default ArbeidsaktiviteterMedUkjentArbeidsgiver;
