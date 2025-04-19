import { BodyShort, Box, Heading, HGrid, Link, List, VStack } from '@navikt/ds-react';
import { ApiError } from '@navikt/ung-common';
import ApiErrorInfo from '../../components/api-error-info/ApiErrorInfo';

interface Props {
    error: ApiError | null;
}

const ErrorPageContent = ({ error }: Props) => (
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
                                <ApiErrorInfo apiError={error} />
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
                                {/* Vurder å sjekke at window.history.length > 1 før dere rendrer dette som en lenke */}
                                <Link href="#" onClick={() => history.back()}>
                                    gå tilbake til forrige side
                                </Link>
                            </List.Item>
                        </List>
                    </div>
                    {/* <BodyShort size="small" textColor="subtle">
                        Feil-id: Feilkode
                    </BodyShort> */}
                </VStack>
            </VStack>
        </HGrid>
    </Box>
);

export default ErrorPageContent;
