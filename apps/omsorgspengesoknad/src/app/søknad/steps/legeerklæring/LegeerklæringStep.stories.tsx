import { Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitudeProvider';
import { withEnvSettings } from '../../../../storybook/decorators/withEnvSettings';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withStepFormValuesContext } from '../../../../storybook/decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../../../storybook/decorators/withSøknadContext';
import { søknadsdataMocks } from '../../../../storybook/mock-data/søknadsdataMocks';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { SøknadContextProvider } from '../../context/SøknadContext';
import { legeerklæringMessages } from './legeerklæringMessages';
import LegeerklæringStep from './LegeerklæringStep';

export default {
    title: 'Steps/Legeerklæring/Step',
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
