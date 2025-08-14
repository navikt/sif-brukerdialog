import { Alert, List } from '@navikt/ds-react';
import { InvalidParameterViolation } from '@navikt/sif-common-query';
import { AppText } from '../../../../i18n';

const renderFeilmelding = (invalidParameter: InvalidParameterViolation, gjelderBeskrivelseFritekst?: boolean) => {
    const erBeskrivelseFeil =
        gjelderBeskrivelseFritekst || invalidParameter.parameterName === 'høyereRisikoForFraværBeskrivelse';
    return (
        <>
            {erBeskrivelseFeil ? (
                <List>
                    <List.Item>
                        <AppText id="apiDataValideringsfeil.tekst.høyereRisikoForFraværBeskrivelseFeil" />
                    </List.Item>
                </List>
            ) : (
                <p>
                    <AppText id="apiDataValideringsfeil.tekst.generell.1" />
                </p>
            )}
            <p>
                <AppText id="apiDataValideringsfeil.tekst.generell.2" />
            </p>
            <p>
                <AppText id="apiDataValideringsfeil.tekst.generell.3" />
            </p>
            <p>
                <AppText
                    id="apiDataValideringsfeil.tekst.generell.4"
                    values={{ Telefon: (value) => <span style={{ whiteSpace: 'nowrap' }}>{value}</span> }}
                />
            </p>
        </>
    );
};

interface Props {
    invalidParameter: InvalidParameterViolation[];
    gjelderBeskrivelseFritekst?: boolean;
}

const ApiDataValideringsfeilAlert = ({ invalidParameter, gjelderBeskrivelseFritekst }: Props) => {
    return (
        <Alert variant="error">
            <p style={{ marginTop: '.2em' }}>
                <AppText id="apiDataValideringsfeil.tittel" />
            </p>
            {renderFeilmelding(invalidParameter[0], gjelderBeskrivelseFritekst)}
        </Alert>
    );
};

export default ApiDataValideringsfeilAlert;
