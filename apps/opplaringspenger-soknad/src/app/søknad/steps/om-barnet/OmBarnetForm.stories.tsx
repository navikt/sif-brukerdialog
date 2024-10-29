import { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import OmBarnetForm from './om-barnet-form/OmBarnetForm';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { OmBarnetFormValues } from './om-barnet-form/types';

const initialValues: OmBarnetFormValues = {
    søknadenGjelderEtAnnetBarn: undefined,
    barnetsFødselsnummer: undefined,
    barnetsNavn: undefined,
    relasjonTilBarnet: undefined,
};

const meta: Meta<typeof OmBarnetForm> = {
    title: 'Form/OmBarnetForm',
    component: OmBarnetForm,
    decorators: [
        withIntl,
        (Story) => withSøknadContextProvider(Story),
        withAmplitudeProvider,
        withRouterProvider,
        (Story) => (
            <TypedFormikWrapper
                initialValues={initialValues}
                onSubmit={(values) => {
                    // eslint-disable-next-line no-console
                    console.log('StoryFormikProvider', values);
                }}
                renderForm={() => {
                    return <Story />;
                }}
            />
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof OmBarnetForm>;

const barn1: RegistrertBarn = {
    fornavn: 'ALFABETISK',
    etternavn: 'FAGGOTT',
    aktørId: '2811762539343',
    fødselsdato: ISODateToDate('2019-06-08'),
};

const barn2: RegistrertBarn = {
    fornavn: 'Barn',
    mellomnavn: 'Barne',
    etternavn: 'Barnesen',
    fødselsdato: ISODateToDate('2020-04-20'),
    aktørId: '123',
};

const registrerteBarn: RegistrertBarn[] = [barn1, barn2];

export const Default: Story = {
    args: {
        registrerteBarn,
        initialValues,
    },
};
