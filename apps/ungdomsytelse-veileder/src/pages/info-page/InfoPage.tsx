import { Box, Button, Heading, HGrid, Page, VStack } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import InfoInnhold from './InfoInnhold';
import { useNavigate } from 'react-router-dom';

const InfoPage = () => {
    const navigate = useNavigate();

    return (
        <Box className="bg-gray-200 pb-20 pt-5">
            <Page.Block width="xl" gutters={true} className="pt-10 pb-20 bg-white mb-40 shadow-lg">
                <VStack gap="8">
                    <HGrid columns={'1fr auto'} className="border-b-2 border-b-gray-500">
                        <Heading size="large" level="1">
                            Informasjon
                        </Heading>
                        <Button
                            variant="tertiary-neutral"
                            icon={<XMarkIcon />}
                            onClick={() => {
                                navigate('/');
                            }}>
                            Lukk informasjon
                        </Button>
                    </HGrid>

                    <InfoInnhold />
                </VStack>
            </Page.Block>
        </Box>
    );
};

export default InfoPage;
