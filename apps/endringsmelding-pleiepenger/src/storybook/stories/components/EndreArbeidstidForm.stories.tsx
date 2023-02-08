import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { arbeidsukerMockData } from '../../../../mocks/data/app/arbeidsukerMockData';
import EndreArbeidstidForm from '../../../app/components/endre-arbeidstid-form/EndreArbeidstidForm';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../app/types/Sak';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

const { arbeidsuke, arbeidsukerEttÅr, arbeidsukerFlereÅr } = arbeidsukerMockData;

export default {
    title: 'Components/EndreArbeidstidForm',
    component: EndreArbeidstidForm,
    decorators: [withIntl, withRouterProvider, withSøknadContextProvider],
} as ComponentMeta<typeof EndreArbeidstidForm>;

const arbeidAktivitetMock: ArbeidAktivitet = {
    type: ArbeidAktivitetType.arbeidstaker,
    id: '123',
    arbeidsgiver: {
        navn: 'Senja fiskeforedling',
    },
} as ArbeidAktivitet;

const Template: ComponentStory<typeof EndreArbeidstidForm> = (props) => {
    return (
        <EndreArbeidstidForm
            {...props}
            onCancel={() => null}
            onSubmit={() => null}
            arbeidAktivitet={arbeidAktivitetMock}
        />
    );
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
