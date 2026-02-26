import { Theme } from '@navikt/ds-react';
import { registrerteBarnListeSchema } from '@navikt/sif-common-query';

import { getScenarioMockData } from '../../mock/scenarios/scenarioer';
import { ScenarioType } from '../../mock/scenarios/types';
import { SøknadProvider } from '../../src/søknad/context/SøknadContext';
import { HarKontonummerEnum } from '../../src/søknad/steg/oppsummering/oppsummeringUtils';
import { SøknadContextType } from '../../src/søknad/types';

const data = getScenarioMockData(ScenarioType.søknad);

export const withSøknadContext = (Story: any, context?: Partial<SøknadContextType>) => {
    const { barn } = registrerteBarnListeSchema.parse(data.registrerteBarn);

    return (
        <Theme>
            <SøknadProvider
                registrerteBarn={context?.registrerteBarn || barn}
                kontonummerInfo={context?.kontonummerInfo || { harKontonummer: HarKontonummerEnum.UVISST }}
                søker={data.søker}
                initialSvar={context?.søknadsdata?.svar}>
                <Story />
            </SøknadProvider>
        </Theme>
    );
};
