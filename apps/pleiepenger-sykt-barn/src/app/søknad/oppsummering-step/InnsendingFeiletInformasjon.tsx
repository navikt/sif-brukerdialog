import { Alert } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import InfoList from '../../pages/welcoming-page/components/info-list/InfoList';
import { InvalidParameter, K9Valideringsfeil } from './invalidParameter';

const visFlereMeldinger = false;

interface Props {
    invalidParameter: InvalidParameter[];
}

const getInvalidPatternMelding = (feil: K9Valideringsfeil): string | undefined => {
    if (feil.name.includes('selvstendigNæringsdrivende')) {
        if (feil.name.includes('regnskapsførerTlf')) {
            return 'Telefonnummeret til regnskapsføreren din inneholder ugyldige tegn.';
        }
        if (feil.name.includes('endringBegrunnelse')) {
            return 'Informasjonen for hva som har endret seg i din virksomhet inneholder ugyldige tegn.';
        }
    }
};

const renderFeilmelding = (invalidParameter: InvalidParameter) => {
    if (typeof invalidParameter === 'string') {
        return <>{invalidParameter}</>;
    }
    /** Ugyldig format på tekst */
    const { reason } = invalidParameter;
    if (reason.includes('tillatt pattern')) {
        const kjentFeltMelding = getInvalidPatternMelding(invalidParameter);
        if (kjentFeltMelding) {
            return (
                <InfoList>
                    <li>
                        <p>{kjentFeltMelding}</p>
                    </li>
                    <p>
                        Dette kan skje hvis du kopierer telefonnummeret fra et annet sted og limer det inn i søknaden,
                        da kan det komme med tegn som ikke er den del av telefonnummeret.
                    </p>
                    <p>
                        Gå tilbake til steg 3 i søknaden, og skriv inn telefonnummeret uten å kopiere det fra et annet
                        sted.
                    </p>
                </InfoList>
            );
        }
    }
    return (
        <>
            <p>Søknaden din inneholder ugyldig informasjon.</p>
            <InfoList>
                <li>
                    Når du selv skriver inn tekst i et felt i søknaden, kan noen tegn være ugyldige ut fra informasjonen
                    vi ber om. Dette skjer vanligvis hvis du kopierer og limer inn tekst fra andre steder, da kan det
                    komme med tegn som ikke hører til teksten. Du fikser dette ved å skrive inn teksten på ny, uten å
                    kopiere den fra et annet sted.
                </li>
                <li>
                    Hvis du har brukt tilbakeknappen i nettleseren, kan du ha gitt svar som ikke lar seg kombinere. Du
                    fikser dette ved å gå tilbake i søknaden og bruke den blå &quot;fortsett&quot;-knappen gjennom de
                    ulike stegene i søknaden. Da vil du få en feilmelding hvis svarene dine ikke lar seg kombinere, og
                    kan rette opp feilen.
                </li>
            </InfoList>
            <p>
                Hvis du har sjekket dette, og fortsatt ikke kommer videre, ber vi deg kontakte oss på{' '}
                <span style={{ whiteSpace: 'nowrap' }}>55 55 33 33</span> for videre veiledning.
            </p>
            <ExpandableInfo title="Detaljert info (teknisk)">
                <p style={{ wordBreak: 'break-word' }}>{invalidParameter.name}</p>
                <p style={{ wordBreak: 'break-word' }}>{invalidParameter.reason}</p>
            </ExpandableInfo>
        </>
    );
};

const InnsendingFeiletInformasjon: React.FunctionComponent<Props> = ({ invalidParameter }) => {
    return (
        <FormBlock>
            <Alert variant="error">
                <p style={{ marginTop: '.2em' }}>Oops, noe gikk galt.</p>
                {visFlereMeldinger ? (
                    <ul>
                        {invalidParameter.map((ip, index) => (
                            <li key={index}>{renderFeilmelding(ip)}</li>
                        ))}
                    </ul>
                ) : (
                    renderFeilmelding(invalidParameter[0])
                )}
            </Alert>
        </FormBlock>
    );
};

export default InnsendingFeiletInformasjon;
