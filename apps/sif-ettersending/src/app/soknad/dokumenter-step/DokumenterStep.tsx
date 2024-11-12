import { VStack } from '@navikt/ds-react';
import { FormikFileUpload, getAttachmentsValidator, useAttachmentsHelper } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
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

    const onAttachmentsChange = (attachments: Attachment[]) => {
        const formValues = { ...values, dokumenter: attachments };
        setFieldValue(SoknadFormField.dokumenter, attachments);
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

    const { hasPendingUploads } = useAttachmentsHelper(values[SoknadFormField.dokumenter], [], onAttachmentsChange);

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
                <FormikFileUpload
                    label={text('steg.dokumenter.vedlegg')}
                    fieldName={SoknadFormField.dokumenter}
                    validate={getAttachmentsValidator({ required: true })}
                />
            </VStack>
        </SoknadFormStep>
    );
};

export default DokumenterStep;
