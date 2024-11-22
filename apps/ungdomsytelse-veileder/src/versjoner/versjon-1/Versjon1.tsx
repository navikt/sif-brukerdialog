import { Box, Tabs } from '@navikt/ds-react';
import BaseLayout from '../../components/layout/BaseLayout';
import RegistrertDeltaker from './RegistrertDeltaker';
import NyDeltaker from './NyDeltaker';

const Versjon1 = () => {
    return (
        <BaseLayout>
            <Tabs defaultValue="registrert">
                <Tabs.List>
                    <Tabs.Tab value="ny" label="Ny deltaker" />
                    <Tabs.Tab value="registrert" label="Registrert deltaker" />
                </Tabs.List>
                <Tabs.Panel value="ny">
                    <Box padding="8">
                        <NyDeltaker />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="registrert">
                    <Box padding="8">
                        <RegistrertDeltaker />
                    </Box>
                </Tabs.Panel>
            </Tabs>
        </BaseLayout>
    );
};

export default Versjon1;
