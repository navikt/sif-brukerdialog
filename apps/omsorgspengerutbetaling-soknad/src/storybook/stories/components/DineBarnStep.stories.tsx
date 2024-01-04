import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import DineBarnForm, { DineBarnFormProps } from '../../../app/søknad/steps/dine-barn/DineBarnForm';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { Søker } from '../../../app/types/Søker';
import { useFormikContext } from 'formik';
import { DineBarnFormValues } from '../../../app/søknad/steps/dine-barn/DineBarnStep';
import { barnMockData } from '../../data/barn';
import { kanFortsetteFraDineBarnStep } from '../../../app/søknad/steps/dine-barn/dineBarnStepUtils';

const meta: Meta<typeof DineBarnForm> = {
    title: 'Skjema/DineBarnForm',
    component: DineBarnForm,
    decorators: [withAmplitudeProvider, withIntl, withRouterProvider, withFormikWrapper],
    argTypes: {},
};

export default meta;

const defaultProps: DineBarnFormProps = {
    registrerteBarn: [],
    søker: { fødselsnummer: '123' } as Søker,
    values: {},
    kanFortsette: true,
    onAndreBarnChanged: () => {},
    isSubmitting: false,
};

const Template: StoryFn<typeof DineBarnForm> = (props) => {
    const formik = useFormikContext<DineBarnFormValues>();
    return (
        <DineBarnForm
            {...defaultProps}
            {...props}
            values={{ ...formik.values }}
            kanFortsette={kanFortsetteFraDineBarnStep(props.registrerteBarn, formik.values)}
        />
    );
};

export const ToBarnUnder13 = Template.bind({});
ToBarnUnder13.args = { registrerteBarn: barnMockData.toBarnUnder13 };

export const TreEllerFlereUnder13 = Template.bind({});
TreEllerFlereUnder13.args = { registrerteBarn: barnMockData.treBarnUnder13 };

export const TreBarnOver13 = Template.bind({});
TreBarnOver13.args = { registrerteBarn: barnMockData.treBarnOver13 };

export const OverUnder13 = Template.bind({});
OverUnder13.args = { registrerteBarn: barnMockData.treBarnMix };
