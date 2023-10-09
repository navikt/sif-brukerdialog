import { Panel } from '@navikt/ds-react';
import type { NextPage } from 'next';
import Info from './info/info';
import Kalkulator from './kalkulator/Kalkulator';

const Home: NextPage = () => {
    return (
        <>
            <Panel className="max-w-[800px] mt-8">
                <Info />
            </Panel>
            <Panel className="max-w-[800px] mt-8">
                <div className="p-4">
                    <Kalkulator />
                </div>
            </Panel>
        </>
    );
};

export default Home;
