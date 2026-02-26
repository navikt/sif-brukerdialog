import { Theme } from '@navikt/ds-react';
import { registrerteBarnListeSchema } from '@navikt/sif-common-query';

import { getScenarioMockData } from '../../mock/scenarios/scenarioer';
import { ScenarioType } from '../../mock/scenarios/types';
import { SøknadContextType } from '../../src/søknad/types';
import { SøknadProvider } from '../../src/søknad/context/SøknadContext';
import { HarKontonummerEnum } from '../../src/søknad/steg/oppsummering/oppsummeringUtils';

const data = getScenarioMockData(ScenarioType.søknad);

export const withSøknadContext = (Story: any, context?: Partial<SøknadContextType>) => {
    const { barn } = registrerteBarnListeSchema.parse(data.barn);

    return (
        <Theme>
            <SøknadProvider
                barn={context?.barn || barn}
                kontonummerInfo={context?.kontonummerInfo || { harKontonummer: HarKontonummerEnum.UVISST }}
                søker={data.søker}
                initialSvar={context?.svar}>
                <Story />
            </SøknadProvider>
        </Theme>
    );
};
