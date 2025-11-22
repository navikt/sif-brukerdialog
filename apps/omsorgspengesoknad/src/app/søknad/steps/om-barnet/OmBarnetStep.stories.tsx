import { Box, Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react-vite';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { SøknadContextProvider } from '../../context/SøknadContext';
import OmBarnetStep from './OmBarnetStep';
import { omBarnetMessages } from './omBarnetMessages';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { withAnalyticsProvider } from '../../../../storybook/decorators/withAnalyticsProvider';
import { withEnvSettings } from '../../../../storybook/decorators/withEnvSettings';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withStepFormValuesContext } from '../../../../storybook/decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../../../storybook/decorators/withSøknadContext';

export default {
    title: 'Steps/OmBarnet/Step',
    component: OmBarnetStep,
    decorators: [withIntl, withRouterProvider, withStepFormValuesContext, withEnvSettings, withAnalyticsProvider],
} as Meta<typeof OmBarnetStep>;

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
                <Box paddingBlock="10">
                    <OmBarnetStep />
                </Box>
            </Tabs.Panel>
            <Tabs.Panel value="tekster">
                <Box paddingBlock="10">
                    <MessagesPreview
                        messages={omBarnetMessages}
                        showMissingTextSummary={true}
                        showExplanation={false}
                        title="Om barnet"
                    />
                </Box>
            </Tabs.Panel>
        </Tabs>
    </SøknadContextProvider>
);

export const Default = Template.bind({});

const annetBarnState: Søknadsdata = {};
Default.args = {
    context: { ...mockInitialSøknadContextState, søknadsdata: annetBarnState },
};
Default.parameters = {};
