import { Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { SøknadContextProvider } from '../../../app/søknad/context/SøknadContext';
import OmBarnetStep from '../../../app/søknad/steps/om-barnet/OmBarnetStep';
import { omBarnetMessages } from '../../../app/søknad/steps/om-barnet/stegOmBarnetMessages';
import { SøknadContextState } from '../../../app/types/SøknadContextState';
import { Søknadsdata } from '../../../app/types/søknadsdata/Søknadsdata';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withEnvSettings } from '../../decorators/withEnvSettings';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../decorators/withSøknadContext';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { PlainMessageList } from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesList';

export default {
    title: 'Steps/OmBarnetStep',
    component: OmBarnetStep,
    decorators: [withIntl, withRouterProvider, withStepFormValuesContext, withEnvSettings, withAmplitudeProvider],
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
                <Tabs.Tab value="stegOgTekst" label="Steg og tekst" />
            </Tabs.List>
            <Tabs.Panel value="steg">
                <Block margin="xl">
                    <OmBarnetStep />
                </Block>
            </Tabs.Panel>
            <Tabs.Panel value="tekster">
                <Block margin="xl">
                    <MessagesPreview
                        messages={omBarnetMessages}
                        showMissingTextSummary={true}
                        showExplanation={false}
                        title="Om barnet"
                    />
                </Block>
            </Tabs.Panel>
            <Tabs.Panel value="stegOgTekst">
                <Block margin="xl">
                    <OmBarnetStep />
                    <PlainMessageList messages={omBarnetMessages} />
                </Block>
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
