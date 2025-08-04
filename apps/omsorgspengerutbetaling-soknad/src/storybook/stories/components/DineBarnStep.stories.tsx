import { Meta, StoryFn } from '@storybook/react-vite';
import DineBarnForm, { DineBarnFormProps } from '../../../app/søknad/steps/dine-barn/DineBarnForm';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { useFormikContext } from 'formik';
import { DineBarnFormValues } from '../../../app/søknad/steps/dine-barn/DineBarnStep';
import { barnMockData } from '../../mock-data/barn';
import { kanFortsetteFraDineBarnStep } from '../../../app/søknad/steps/dine-barn/dineBarnStepUtils';
import { Søker } from '@navikt/sif-common-api';

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
ToBarnUnder13.args = { registrerteBarn: barnMockData.toBarnRegistrertUnder13 };

export const TreEllerFlereUnder13 = Template.bind({});
TreEllerFlereUnder13.args = { registrerteBarn: barnMockData.treBarnRegistrertUnder13 };

export const TreBarnOver13 = Template.bind({});
TreBarnOver13.args = { registrerteBarn: barnMockData.treBarnOver13 };

export const OverUnder13 = Template.bind({});
OverUnder13.args = { registrerteBarn: barnMockData.toBarnUnderOgEttBarnOver };

export const TreUnderEnOver13 = Template.bind({});
TreUnderEnOver13.args = { registrerteBarn: barnMockData.treBarnUnderOgEttBarnOver };

export const IngenBarn = Template.bind({});
IngenBarn.args = { registrerteBarn: [] };
