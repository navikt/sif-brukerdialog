import { Alert } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import InfoList from '../../pages/welcoming-page/components/info-list/InfoList';
import { InvalidParameter, K9Valideringsfeil } from './invalidParameter';

const visFlereMeldinger = false;

interface Props {
    invalidParameter: InvalidParameter[];
}

const getInvalidPatternMelding = (feil: K9Valideringsfeil): string | undefined => {
    if (feil.name.includes('selvstendigNæringsdrivende')) {
        if (feil.name.includes('regnskapsførerTlf')) {
            return 'Oppgitt telefonnummer på regnskapsfører inneholder ugyldige tegn.';
        }
        if (feil.name.includes('endringBegrunnelse')) {
            return 'Oppgitt informasjon for hva som har endret seg i din virksomhet inneholder ugyldige tegn.';
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
                        Dette kan f.eks. oppstå hvis du kopierer og limer inn verdier fra et annet sted, da kan det
                        komme med usynlige tegn som ikke vi godtar.
                    </p>
                    <p>
                        Gå tilbake til der hvor informasjonen ble oppgitt og legg informasjonen på nytt uten å bruke
                        kopier og lim inn.
                    </p>
                </InfoList>
            );
        }
        return (
            <>
                <p>Søknaden inneholder ugyldig informasjon. Dette kan være:</p>
                <InfoList>
                    <li>
                        Ugyldig tegn i tekstfelter. Dette kan oppstå hvis du kopierer og limer inn verdier fra et annet
                        sted, da kan det komme med usynlige tegn som ikke vi godtar. For å rette opp i dette, er det
                        best å skrive inn teksten direkte i feltet.
                    </li>
                    <li>
                        Ugyldige svarkombinasjoner. Dette kan oppstå hvis du bruker frem og tilbake i nettleseren i
                        stedet for å bruke &quot;Fortsett&quot;-knappen nederst i skjemaet. Gå tilbake til første steg i
                        søknaden og bruk &quot;Fortsett&quot;-knappen for å gå videre, og se om du får en feilmelding
                        underveis.
                    </li>
                </InfoList>
                <ExpandableInfo title="Detaljert info (teknisk)">
                    <p style={{ wordBreak: 'break-word' }}>{invalidParameter.name}</p>
                    <p style={{ wordBreak: 'break-word' }}>{invalidParameter.reason}</p>
                </ExpandableInfo>
            </>
        );
    }
};

const InnsendingFeiletInformasjon: React.FunctionComponent<Props> = ({ invalidParameter }) => {
    return (
        <FormBlock>
            <Alert variant="error">
                <p style={{ marginTop: '.2em' }}>Oops, der oppstod det en feil.</p>
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
