import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { SøknadContextProvider } from '../../../app/søknad/context/SøknadContext';
import LegeerklæringStep from '../../../app/søknad/steps/legeerklæring/LegeerklæringStep';
import { SøknadContextState } from '../../../app/types/SøknadContextState';
import { Søknadsdata } from '../../../app/types/søknadsdata/Søknadsdata';
import { withEnvSettings } from '../../decorators/withEnvSettings';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../decorators/withSøknadContext';
import { søknadsdataMocks } from '../../mock-data/søknadsdataMocks';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { Tabs } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { legeerklæringMessages } from '../../../app/søknad/steps/legeerklæring/legeerklæringMessages';

export default {
    title: 'Steps/LegeerklæringStep',
    component: LegeerklæringStep,
    decorators: [withIntl, withRouterProvider, withStepFormValuesContext, withEnvSettings, withAmplitudeProvider],
} as Meta<typeof LegeerklæringStep>;

interface Props {
    context: SøknadContextState;
}

const Template: StoryFn<Props> = ({ context }: Props) => (
    <SøknadContextProvider initialData={context}>
        <Tabs defaultValue="steg">
            <Tabs.List>
                <Tabs.Tab value="steg" label="Steg" />
                <Tabs.Tab value="tekster" label="Tekster" />
            </Tabs.List>
            <Tabs.Panel value="steg">
                <Block margin="xl">
                    <LegeerklæringStep />
                </Block>
            </Tabs.Panel>
            <Tabs.Panel value="tekster">
                <Block margin="xl">
                    <MessagesPreview
                        messages={legeerklæringMessages}
                        showMissingTextSummary={true}
                        showExplanation={false}
                        title="Om barnet"
                    />
                </Block>
            </Tabs.Panel>
        </Tabs>
    </SøknadContextProvider>
);

export const Default = Template.bind({});

const søknadsdata: Søknadsdata = { ...søknadsdataMocks.komplett_annetBarnFarDeltBosted };
Default.args = {
    context: { ...mockInitialSøknadContextState, søknadsdata },
};
Default.parameters = {};
