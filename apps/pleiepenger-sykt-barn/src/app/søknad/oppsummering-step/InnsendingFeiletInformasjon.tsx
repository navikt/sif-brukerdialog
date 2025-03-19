import { Alert, List } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { InvalidParameter } from './invalidParameter';
import { FritekstfeltValideringsfeil } from '@navikt/sif-common-api';

const visFlereMeldinger = false;

interface Props {
    invalidParameter: InvalidParameter[];
}

enum HåndterteFeilFelter {
    REGNSKAPSFØRER_TLF = 'regnskapsførerTlf',
    REGNSKAPSFØRER_NAVN = 'regnskapsførerNavn',
    ENDRING_BEGRUNNELSE = 'endringBegrunnelse',
}

const getFeltFraValideringsfeil = (feil: FritekstfeltValideringsfeil): HåndterteFeilFelter | undefined => {
    if (feil.parameterName.includes('selvstendigNæringsdrivende')) {
        if (feil.parameterName.includes('regnskapsførerTlf')) {
            return HåndterteFeilFelter.REGNSKAPSFØRER_TLF;
            // return 'Telefonnummeret til regnskapsføreren din inneholder ugyldige tegn.';
        }
        if (feil.parameterName.includes('regnskapsførerNavn')) {
            return HåndterteFeilFelter.REGNSKAPSFØRER_NAVN;
            // return 'Navnet til regnskapsføreren din inneholder ugyldige tegn.';
        }
        if (feil.parameterName.includes('endringBegrunnelse')) {
            return HåndterteFeilFelter.ENDRING_BEGRUNNELSE;
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
        const felt = getFeltFraValideringsfeil(invalidParameter);
        const tegn = invalidParameter.reason.split('matcher')[0];
        switch (felt) {
            case HåndterteFeilFelter.REGNSKAPSFØRER_TLF:
                return (
                    <>
                        <List>
                            <List.Item>Telefonnummeret til regnskapsføreren din inneholder ugyldige tegn.</List.Item>
                            <List.Item>Tekst med ugyldige tegn: {tegn}</List.Item>
                        </List>
                        <p>
                            Dette kan skje hvis du kopierer telefonnummeret fra et annet sted og limer det inn i
                            søknaden, da kan det komme med tegn som ikke er den del av telefonnummeret.
                        </p>
                        <p>
                            Gå tilbake til steg 3 i søknaden, og skriv inn telefonnummeret uten å kopiere det fra et
                            annet sted.
                        </p>
                    </>
                );
            case HåndterteFeilFelter.REGNSKAPSFØRER_NAVN:
                return (
                    <>
                        <List>
                            <List.Item>Navnet til regnskapsføreren din inneholder ugyldige tegn.</List.Item>
                            <List.Item>Tekst med ugyldige tegn: {tegn}</List.Item>
                        </List>
                        <p>
                            Dette kan skje hvis du kopierer teksten fra et annet sted og limer det inn i søknaden, da
                            kan det komme med tegn som ikke er den del av navnet.
                        </p>
                        <p>
                            Gå tilbake til steg 3 i søknaden, og skriv inn navnet uten å kopiere det fra et annet sted.
                        </p>
                    </>
                );
            case HåndterteFeilFelter.ENDRING_BEGRUNNELSE:
                return (
                    <>
                        <List>
                            <List.Item>
                                Informasjonen for hva som har endret seg i din virksomhet inneholder ugyldige tegn.
                            </List.Item>
                            <List.Item>Tekst med ugyldige tegn: {tegn}</List.Item>
                        </List>
                        <p>
                            Dette kan skje hvis du kopierer teksten fra et annet sted og limer det inn i søknaden, da
                            kan det komme med tegn som ikke er gyldige.
                        </p>
                        <p>
                            Gå tilbake til steg 3 i søknaden, og kontroller feltet, eventuelt skriv inn informasjonen på
                            nytt.
                        </p>
                    </>
                );
        }
    }
    return (
        <>
            <p>Søknaden din inneholder ugyldig informasjon.</p>
            <List>
                <List.Item>
                    Når du selv skriver inn tekst i et felt i søknaden, kan noen tegn være ugyldige ut fra informasjonen
                    vi ber om. Dette skjer vanligvis hvis du kopierer og limer inn tekst fra andre steder, da kan det
                    komme med tegn som ikke hører til teksten. Du fikser dette ved å skrive inn teksten på ny, uten å
                    kopiere den fra et annet sted.
                </List.Item>
                <List.Item>
                    Hvis du har brukt tilbakeknappen i nettleseren, kan du ha gitt svar som ikke lar seg kombinere. Du
                    fikser dette ved å gå tilbake i søknaden og bruke den blå &quot;fortsett&quot;-knappen gjennom de
                    ulike stegene i søknaden. Da vil du få en feilmelding hvis svarene dine ikke lar seg kombinere, og
                    kan rette opp feilen.
                </List.Item>
            </List>
            <p>
                Hvis du har sjekket dette, og fortsatt ikke kommer videre, ber vi deg kontakte oss på{' '}
                <span style={{ whiteSpace: 'nowrap' }}>55 55 33 33</span> for videre veiledning.
            </p>
            <ExpandableInfo title="Detaljert info (teknisk)">
                <p style={{ wordBreak: 'break-word' }}>{invalidParameter.parameterName}</p>
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
                    <List>
                        {invalidParameter.map((ip, index) => (
                            <List.Item key={index}>{renderFeilmelding(ip)}</List.Item>
                        ))}
                    </List>
                ) : (
                    renderFeilmelding(invalidParameter[0])
                )}
            </Alert>
        </FormBlock>
    );
};

export default InnsendingFeiletInformasjon;
