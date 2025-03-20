import { Alert, List } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText } from '../../../../i18n';
import { InvalidParameterViolation } from '@navikt/sif-common-api';

const renderFeilmelding = (invalidParameter: InvalidParameterViolation) => {
    const erBeskrivelseFeil = invalidParameter.parameterName === 'høyereRisikoForFraværBeskrivelse';
    return (
        <>
            {erBeskrivelseFeil ? (
                <List>
                    <List.Item>
                        <AppText id="innsendingFeilet.tekst.høyereRisikoForFraværBeskrivelseFeil" />
                    </List.Item>
                </List>
            ) : (
                <p>
                    <AppText id="innsendingFeilet.tekst.generell.1" />
                </p>
            )}
            <p>
                <AppText id="innsendingFeilet.tekst.generell.2" />
            </p>
            <p>
                <AppText id="innsendingFeilet.tekst.generell.3" />
            </p>
            <p>
                <AppText
                    id="innsendingFeilet.tekst.generell.3"
                    values={{ Telefon: (value) => <span style={{ whiteSpace: 'nowrap' }}>{value}</span> }}
                />
            </p>

            {!erBeskrivelseFeil && (
                <ExpandableInfo title="Detaljert info (teknisk)">
                    <p style={{ wordBreak: 'break-word' }}>{invalidParameter.parameterName}</p>
                </ExpandableInfo>
            )}
        </>
    );
};

interface Props {
    invalidParameter: InvalidParameterViolation[];
}

const InnsendingFeiletAlert = ({ invalidParameter }: Props) => {
    return (
        <FormBlock>
            <Alert variant="error">
                <p style={{ marginTop: '.2em' }}>
                    <AppText id="innsendingFeilet.tittel" />
                </p>
                {renderFeilmelding(invalidParameter[0])}
            </Alert>
        </FormBlock>
    );
};

export default InnsendingFeiletAlert;
