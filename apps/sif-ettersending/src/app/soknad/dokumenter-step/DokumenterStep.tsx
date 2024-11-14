import { VStack } from '@navikt/ds-react';
import { FormikFileUpload, useVedleggHelper } from '@navikt/sif-common-core-ds';
import { getVedleggValidator } from '@navikt/sif-common-core-ds/src/components/formik-file-upload/getVedleggValidator';
import PictureScanningGuide from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/PictureScanningGuide';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../i18n';
import { Person } from '../../types/Person';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import SøknadTempStorage from '../soknadTempStorage';

interface Props {
    søknadstype: Søknadstype;
    søker: Person;
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
            },
            søknadstype,
        );
    };

    const { hasPendingUploads } = useVedleggHelper(values[SoknadFormField.dokumenter], [], onVedleggChange);

    return (
        <SoknadFormStep id={StepID.DOKUMENTER} søknadstype={søknadstype} buttonDisabled={hasPendingUploads}>
            <VStack gap="8">
                <SifGuidePanel>
                    <p>
                        <AppText id={'steg.dokumenter.infopanel.1'} />
                    </p>
                    <p>
                        <AppText id={'steg.dokumenter.infopanel.2'} />
                    </p>
                    <p>
                        <AppText id={'steg.dokumenter.infopanel.3'} />
                    </p>
                </SifGuidePanel>
                <PictureScanningGuide />
                <FormikFileUpload
                    label={text('steg.dokumenter.vedlegg')}
                    initialFiles={values[SoknadFormField.dokumenter]}
                    fieldName={SoknadFormField.dokumenter}
                    validate={getVedleggValidator({ required: true })}
                />
            </VStack>
        </SoknadFormStep>
    );
};

export default DokumenterStep;
