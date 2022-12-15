import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import ArbeidstidUkeListe from '../../../app/components/arbeidstid-uke-liste/ArbeidstidUkeListe';
import { getSakFromK9Sak } from '../../../app/utils/getSakFromK9Sak';
import { arbeidsgivereMock } from '../../data/arbeidsgiverreMock';
import { parseK9Format } from '../../../app/utils/parseK9Format';
export default {
    title: 'Components/ArbeidstidUkeListe',
    component: ArbeidstidUkeListe,
    decorators: [withIntl, withRouterProvider],
} as ComponentMeta<typeof ArbeidstidUkeListe>;

const k9SakJSON = require('../../../../mocks/data/soker1/sak-mock.json');
const k9sak = parseK9Format(k9SakJSON[0]);

const sak = getSakFromK9Sak(k9sak, arbeidsgivereMock);

const Template: ComponentStory<typeof ArbeidstidUkeListe> = () => <ArbeidstidUkeListe arbeidsuker={{}} />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
