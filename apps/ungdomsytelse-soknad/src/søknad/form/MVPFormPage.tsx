import { Alert, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { SoknadVelkommenGuide } from '@navikt/sif-common-soknad-ds/src';
import { v4 } from 'uuid';
import { SøknadApiData } from '../../api/types';
import VelkommenPageHeader from '../../pages/velkommen/VelkommenPageHeader';
import { useSendSøknad } from '../hooks/useSendSøknad';
import { useSøknadContext } from '../hooks/useSøknadContext';
import MVPForm, { FormValues } from './MVPForm';

const initialValues: FormValues = {
    fom: '2024-09-01',
    tom: '2024-09-30',
    harBekreftetOpplysninger: true,
};

const MVPFormPage = () => {
    const { søker } = useSøknadContext();

    const { isSubmitting, sendSøknad, sendSøknadError } = useSendSøknad();

    return (
        <Page title="Ungdomsytelse">
            <VStack gap="8">
                <VelkommenPageHeader title="Ungdomsytelse" />
                <SoknadVelkommenGuide title={`Hei ${søker.fornavn}`}>
                    Dette er en MVP-søknad for pending av data til søknad om ungdomsytelse.
                </SoknadVelkommenGuide>

                <TypedFormikWrapper
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        const data: SøknadApiData = {
                            fraOgMed: values.fom,
                            tilOgMed: values.tom,
                            harBekreftetOpplysninger: values.harBekreftetOpplysninger,
                            harForståttRettigheterOgPlikter: true,
                            språk: 'nb',
                            søkerNorskIdent: søker.fødselsnummer,
                            søknadId: v4(),
                        };
                        sendSøknad(data);
                    }}
                    renderForm={({ values }) => {
                        return <MVPForm pending={isSubmitting} values={values} />;
                    }}
                />
                {sendSøknadError && (
                    <Alert variant="error">
                        Det skjedde en feil ved sending av søknad:
                        <div>
                            <code>{JSON.stringify(sendSøknadError.message)}</code>
                        </div>
                    </Alert>
                )}
            </VStack>
        </Page>
    );
};

export default MVPFormPage;
