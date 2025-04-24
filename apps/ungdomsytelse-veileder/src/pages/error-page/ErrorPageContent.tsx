import { Alert, BodyShort, Box, Heading, HGrid, Link, List, VStack } from '@navikt/ds-react';
import { ApiError } from '@navikt/ung-common';
import ApiErrorInfo from '../../components/api-error-info/ApiErrorInfo';
import { useNavigate } from 'react-router-dom';

interface Props {
    error: ApiError | null;
}

const ErrorPageContent = ({ error }: Props) => {
    const navigate = useNavigate();
    return (
        // TODO: Legg til feilmeldinger fra backend
        <Box className="p-10">
            <HGrid columns="minmax(auto,600px)">
                <VStack gap="16">
                    <VStack gap="12">
                        <div>
                            <Heading level="1" size="large" spacing>
                                Beklager, noe gikk galt.
                            </Heading>
                            {error && error !== null ? (
                                <Box marginBlock={'4'}>
                                    <Alert variant="error">
                                        <ApiErrorInfo apiError={error} />
                                    </Alert>
                                </Box>
                            ) : null}

                            <BodyShort>Du kan prøve å</BodyShort>
                            <List>
                                <List.Item>
                                    vente noen minutter og{' '}
                                    <Link href="#" onClick={() => location.reload()}>
                                        laste siden på nytt
                                    </Link>
                                </List.Item>
                                <List.Item>
                                    <Link href="#" onClick={() => navigate('/')}>
                                        gå tilbake til forsiden og prøve igjen
                                    </Link>
                                </List.Item>
                            </List>
                        </div>
                    </VStack>
                </VStack>
            </HGrid>
        </Box>
    );
};
export default ErrorPageContent;
