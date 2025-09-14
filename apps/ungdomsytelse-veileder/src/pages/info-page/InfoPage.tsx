import { Button, Heading, HGrid, Page, VStack } from '@navikt/ds-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@navikt/aksel-icons';
import InfoInnhold from './InfoInnhold';

const InfoPage = () => {
    const navigate = useNavigate();

    return (
        <Page>
            <Page.Block width="xl" gutters={true} className="pt-5">
                <VStack gap="8">
                    <HGrid columns="1fr auto" className="border-b-2 border-b-gray-500 pb-2">
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
        </Page>
    );
};

export default InfoPage;
