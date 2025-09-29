import { Panel } from '@navikt/ds-react';
import SectionPanel from '@/components/section-panel/SectionPanel';
import { CalculatorIcon } from '@navikt/aksel-icons';
import Info from '../components/info/info';
import Kalkulator from '../components/kalkulator/Kalkulator';

import type { NextPage } from 'next';
const Home: NextPage = () => {
    return (
        <div id="__kalkulator-kontainer">
            <Panel className="max-w-[800px] mt-8 mb-10">
                <Info />
            </Panel>
            <SectionPanel
                illustration={<CalculatorIcon title="a11y-title" fontSize="2.5rem" />}
                illustrationPlacement="outside">
                <div className="mt-8">
                    <Kalkulator />
                </div>
            </SectionPanel>
        </div>
    );
};

export default Home;
