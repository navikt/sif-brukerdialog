import { Søker } from '@navikt/sif-common-api';
import { FormikFileUpload, useVedleggHelper } from '@navikt/sif-common-core-ds';
import { getVedleggValidator } from '@navikt/sif-common-core-ds/src/components/formik-file-upload/getVedleggValidator';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../i18n';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import { getFeaturesHashString } from '../../utils/featureToggleUtils';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import SøknadTempStorage from '../soknadTempStorage';
import { FormLayout } from '@navikt/sif-common-ui';

interface Props {
    søknadstype: Søknadstype;
    søker: Søker;
    soknadId: string;
}

const DokumenterStep = ({ søknadstype, søker, soknadId }: Props) => {
    const { text } = useAppIntl();
    const { values, setFieldValue } = useFormikContext<SoknadFormData>();

    const onVedleggChange = (vedlegg: Vedlegg[]) => {
        const formValues = { ...values, dokumenter: vedlegg };
        setFieldValue(SoknadFormField.dokumenter, vedlegg);
        SøknadTempStorage.update(
            soknadId,
            formValues,
            StepID.DOKUMENTER,
            {
                søker,
                features: getFeaturesHashString(),
            },
            søknadstype,
        );
    };

    const { hasPendingUploads } = useVedleggHelper(values[SoknadFormField.dokumenter], [], onVedleggChange);

    return (
        <SoknadFormStep id={StepID.DOKUMENTER} søknadstype={søknadstype} buttonDisabled={hasPendingUploads}>
            <FormLayout.Guide>
                <AppText id="steg.dokumenter.infopanel.1" />

                <p>
                    <AppText id="steg.dokumenter.infopanel.2" />
                </p>
                <p>
                    <AppText id="steg.dokumenter.infopanel.3" />
                </p>
            </FormLayout.Guide>

            <FormikFileUpload
                label={text('steg.dokumenter.vedlegg')}
                initialFiles={values[SoknadFormField.dokumenter]}
                fieldName={SoknadFormField.dokumenter}
                validate={getVedleggValidator({ required: true })}
                showPictureScanningGuide={true}
            />
        </SoknadFormStep>
    );
};

export default DokumenterStep;
