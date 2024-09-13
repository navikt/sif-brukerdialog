import { Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { SøknadContextProvider } from '../../context/SøknadContext';
import { oppsummeringMessages } from './oppsummeringMessages';
import OppsummeringStep from './OppsummeringStep';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitudeProvider';
import { withEnvSettings } from '../../../../storybook/decorators/withEnvSettings';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withStepFormValuesContext } from '../../../../storybook/decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../../../storybook/decorators/withSøknadContext';
import { søknadsdataMocks } from '../../../../storybook/mock-data/søknadsdataMocks';

export default {
    title: 'Steps/Oppsummering/Step',
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
