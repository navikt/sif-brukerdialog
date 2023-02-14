import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { arbeidsukerMockData } from '../../../../mocks/data/app/arbeidsukerMockData';
import EndreArbeidstidForm from '../../../app/components/endre-arbeidstid-form/EndreArbeidstidForm';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

const { arbeidsuke, arbeidsukerEttÅr, arbeidsukerFlereÅr } = arbeidsukerMockData;

export default {
    title: 'Components/EndreArbeidstidForm',
    component: EndreArbeidstidForm,
    decorators: [withIntl, withRouterProvider, withSøknadContextProvider],
} as ComponentMeta<typeof EndreArbeidstidForm>;

const Template: ComponentStory<typeof EndreArbeidstidForm> = (props) => {
    return <EndreArbeidstidForm {...props} onCancel={() => null} onSubmit={() => null} />;
};

export const EndreEnUke = Template.bind({});
EndreEnUke.args = {
    arbeidsuker: [arbeidsuke],
};

export const EndreFlereUkerSammeÅr = Template.bind({});
EndreFlereUkerSammeÅr.args = {
    arbeidsuker: arbeidsukerEttÅr,
};
export const EndreFlereUkerFlereÅr = Template.bind({});
EndreFlereUkerFlereÅr.args = {
    arbeidsuker: arbeidsukerFlereÅr,
};
