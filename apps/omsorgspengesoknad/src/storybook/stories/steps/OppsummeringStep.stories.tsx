import { Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { SøknadContextProvider } from '../../../app/søknad/context/SøknadContext';
import { oppsummeringMessages } from '../../../app/søknad/steps/oppsummering/oppsummeringMessages';
import OppsummeringStep from '../../../app/søknad/steps/oppsummering/OppsummeringStep';
import { SøknadContextState } from '../../../app/types/SøknadContextState';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withEnvSettings } from '../../decorators/withEnvSettings';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../decorators/withSøknadContext';
import { søknadsdataMocks } from '../../mock-data/søknadsdataMocks';

export default {
    title: 'Steps/OppsummeringStep',
    component: OppsummeringStep,
    decorators: [withIntl, withRouterProvider, withStepFormValuesContext, withEnvSettings, withAmplitudeProvider],
} as Meta<typeof OppsummeringStep>;

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
                    <OppsummeringStep />
                </Block>
            </Tabs.Panel>
            <Tabs.Panel value="tekster">
                <Block margin="xl">
                    <MessagesPreview
                        messages={oppsummeringMessages}
                        showMissingTextSummary={true}
                        showExplanation={false}
                        title="Om barnet"
                    />
                </Block>
            </Tabs.Panel>
        </Tabs>
    </SøknadContextProvider>
);

/** Registrert barn */
export const RegistrertBarn = Template.bind({});

RegistrertBarn.args = {
    context: {
        ...mockInitialSøknadContextState,
        søknadsdata: søknadsdataMocks.komplett_registrertBarnIngenLegeerklæring,
    },
};

/** Annet barn barn */
export const AnnetBarn = Template.bind({});
AnnetBarn.args = {
    context: {
        ...mockInitialSøknadContextState,
        søknadsdata: søknadsdataMocks.komplett_annetBarnAnnenAdresse,
    },
};

/** Annet barn barn */
export const AnnetBarnSamværsavtale = Template.bind({});
AnnetBarnSamværsavtale.args = {
    context: {
        ...mockInitialSøknadContextState,
        søknadsdata: { ...søknadsdataMocks.komplett_annetBarnFarDeltBosted },
    },
};
