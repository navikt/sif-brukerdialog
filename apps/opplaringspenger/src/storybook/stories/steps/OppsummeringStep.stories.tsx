import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { SøknadContextProvider } from '../../../app/søknad/context/SøknadContext';
import OppsummeringStep from '../../../app/søknad/steps/oppsummering/OppsummeringStep';
import { SøknadContextState } from '../../../app/types/SøknadContextState';
import { withEnvSettings } from '../../decorators/withEnvSettings';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { mockInitialSøknadContextState } from '../../decorators/withSøknadContext';
import { søknadsdataMocks } from '../../mock-data/søknadsdataMocks';

export default {
    title: 'Steps/OppsummeringStep',
    component: OppsummeringStep,
    decorators: [withIntl, withRouterProvider, withStepFormValuesContext, withEnvSettings],
} as ComponentMeta<typeof OppsummeringStep>;

interface Props {
    context: SøknadContextState;
}

const Template: Story<Props> = ({ context }: Props) => (
    <SøknadContextProvider initialData={context}>
        <OppsummeringStep />;
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
        søknadsdata: søknadsdataMocks.komplett_annetBarnFarDeltBosted,
    },
};
