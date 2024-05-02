import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { arbeidsukerMockData } from '../../../mocks/data/app/arbeidsukerMockData';
import EndreArbeidstidForm from '../../../app/modules/endre-arbeidstid-form/EndreArbeidstidForm';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

const { arbeidsuke, arbeidsukerEttÅr, arbeidsukerFlereÅr } = arbeidsukerMockData;

export default {
    title: 'Forms/EndreArbeidstidForm',
    component: EndreArbeidstidForm,
    decorators: [withIntl, withRouterProvider, withSøknadContextProvider],
} as Meta<typeof EndreArbeidstidForm>;

const Template: StoryFn<typeof EndreArbeidstidForm> = (props) => {
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
