import { Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { SøknadContextProvider } from '../../context/SøknadContext';
import { deltBostedMessages } from './deltBostedMessages';
import DeltBostedStep from './DeltBostedStep';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitudeProvider';
import { withEnvSettings } from '../../../../storybook/decorators/withEnvSettings';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withStepFormValuesContext } from '../../../../storybook/decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../../../storybook/decorators/withSøknadContext';
import { søknadsdataMocks } from '../../../../storybook/mock-data/søknadsdataMocks';

export default {
    title: 'Steps/DeltBosted/Step',
    component: DeltBostedStep,
    decorators: [withIntl, withRouterProvider, withStepFormValuesContext, withEnvSettings, withAmplitudeProvider],
} as Meta<typeof DeltBostedStep>;

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
                    <DeltBostedStep />
                </Block>
            </Tabs.Panel>
            <Tabs.Panel value="tekster">
                <Block margin="xl">
                    <MessagesPreview
                        messages={deltBostedMessages}
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

const søknadsdata: Søknadsdata = { ...søknadsdataMocks.komplett_annetBarnFarDeltBosted, deltBosted: { vedlegg: [] } };
Default.args = {
    context: { ...mockInitialSøknadContextState, søknadsdata },
};
Default.parameters = {};
