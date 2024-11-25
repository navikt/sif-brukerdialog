import { Tabs } from '@navikt/ds-react';
import Versjon0 from './versjoner/versjon-0/Versjon0';
import Versjon1 from './versjoner/versjon-1/Versjon1';
import './app.css';

const App = () => {
    return (
        <>
            <Tabs defaultValue="v1">
                <Tabs.List>
                    <Tabs.Tab value="v0" label="V0" />
                    <Tabs.Tab value="v1" label="V1" />
                </Tabs.List>
                <Tabs.Panel value="v0">
                    <Versjon0 />
                </Tabs.Panel>
                <Tabs.Panel value="v1">
                    <Versjon1 />
                </Tabs.Panel>
            </Tabs>
        </>
    );
};

export default App;
