import { Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { SøknadContextProvider } from '../../../app/søknad/context/SøknadContext';
import { deltBostedMessages } from '../../../app/søknad/steps/delt-bosted/deltBostedMessages';
import DeltBostedStep from '../../../app/søknad/steps/delt-bosted/DeltBostedStep';
import { SøknadContextState } from '../../../app/types/SøknadContextState';
import { Søknadsdata } from '../../../app/types/søknadsdata/Søknadsdata';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withEnvSettings } from '../../decorators/withEnvSettings';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../decorators/withSøknadContext';
import { søknadsdataMocks } from '../../mock-data/søknadsdataMocks';

export default {
    title: 'Steps/DeltBostedStep',
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
