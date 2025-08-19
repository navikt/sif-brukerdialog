import { Alert, BodyShort, Box, Heading, HGrid, Link, List, VStack } from '@navikt/ds-react';
import { ApiError } from '@navikt/ung-common';
import { useNavigate } from 'react-router-dom';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';

interface Props {
    error: ApiError | string;
    visTips?: boolean;
}

/** Denne er ikke bra - må fikses */
const ErrorPageContent = ({ error, visTips }: Props) => {
    const navigate = useNavigate();
    return (
        // TODO: Legg til feilmeldinger fra backend
        <Box className="p-10">
            <HGrid columns="minmax(auto,600px)">
                <VStack gap="16">
                    <VStack gap="8">
                        <div>
                            <Heading level="1" size="large" spacing>
                                Beklager, noe gikk galt.
                            </Heading>
                            <Box marginBlock="4">
                                {typeof error === 'string' ? (
                                    <Alert variant="error">{error}</Alert>
                                ) : (
                                    <ApiErrorAlert error={error} detaljert={true} />
                                )}
                            </Box>
                        </div>
                        {visTips && (
                            <VStack gap="4">
                                <BodyShort>Du kan prøve å</BodyShort>
                                <List>
                                    <List.Item>
                                        vente litt og{' '}
                                        <Link
                                            href="#"
                                            onClick={(evt) => {
                                                evt.preventDefault();
                                                location.reload();
                                            }}>
                                            laste siden på nytt
                                        </Link>
                                    </List.Item>
                                    <List.Item>
                                        <Link
                                            href="#"
                                            onClick={(evt) => {
                                                evt.preventDefault();
                                                navigate('/');
                                            }}>
                                            gå tilbake til forsiden og prøve igjen
                                        </Link>
                                    </List.Item>
                                </List>
                            </VStack>
                        )}
                    </VStack>
                </VStack>
            </HGrid>
        </Box>
    );
};
export default ErrorPageContent;
