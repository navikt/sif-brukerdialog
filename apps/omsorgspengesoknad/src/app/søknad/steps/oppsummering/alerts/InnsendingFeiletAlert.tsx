import { Alert, Box, List, VStack } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { InvalidParameterViolation } from '@navikt/sif-common-query';
import { AppText } from '../../../../i18n';

const renderFeilmelding = (invalidParameter: InvalidParameterViolation) => {
    const erBeskrivelseFeil = invalidParameter.parameterName === 'høyereRisikoForFraværBeskrivelse';
    return (
        <>
            {erBeskrivelseFeil ? (
                <List>
                    <List.Item>
                        <AppText id="innsendingFeilet.tekst.høyereRisikoForFraværBeskrivelseFeil" />
                    </List.Item>
                    <List.Item>
                        <VStack gap="2">
                            <AppText id="innsendingFeilet.tekst.høyereRisikoForFraværBeskrivelseFeil.tegn" />
                            <Box padding="4" background="bg-default" borderRadius="medium">
                                {invalidParameter.invalidValue}
                            </Box>
                        </VStack>
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
                    id="innsendingFeilet.tekst.generell.4"
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
        <Alert variant="error">
            <p style={{ marginTop: '.2em' }}>
                <AppText id="innsendingFeilet.tittel" />
            </p>
            {renderFeilmelding(invalidParameter[0])}
        </Alert>
    );
};

export default InnsendingFeiletAlert;
