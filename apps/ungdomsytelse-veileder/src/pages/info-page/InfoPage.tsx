import { Button, Heading, HGrid, Page, VStack } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import InfoInnhold from './InfoInnhold';
import { Route, Routes, useNavigate } from 'react-router-dom';

const InfoPage = () => {
    const navigate = useNavigate();

    return (
        <Page.Block width="xl" gutters={true} className="pt-10 pb-20 bg-white mb-40 shadow-lg">
            <VStack gap="8">
                <HGrid columns={'1fr auto'} className="border-b-2 border-b-gray-500 pb-2">
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
                <Routes>
                    <Route path="/*" element={<InfoInnhold />} />
                </Routes>
            </VStack>
        </Page.Block>
    );
};

export default InfoPage;
