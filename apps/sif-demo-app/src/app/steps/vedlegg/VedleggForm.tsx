import { useAppIntl } from '@app/i18n';
import { VedleggSøknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { UploadedFile } from '@sif/rhf';
import { SøknadStep, SøknadStepForm, useMellomlagring, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { VedleggPanel } from '@sif/soknad-forms';
import { useForm } from 'react-hook-form';

import { VedleggFormFields, VedleggFormValues } from './types';
import { toVedleggFormValues, toVedleggSøknadsdata } from './vedleggStegUtils';

const stepId = SøknadStepId.VEDLEGG;

export const VedleggForm = () => {
    const { text } = useAppIntl();

    const { lagretData, commit, draftFormValues } = useStepData<VedleggSøknadsdata, VedleggFormValues>(stepId);
    const initialVedlegg = (draftFormValues ?? toVedleggFormValues(lagretData))[VedleggFormFields.vedlegg];
    const methods = useForm<VedleggFormValues>({
        defaultValues: draftFormValues ?? toVedleggFormValues(lagretData),
    });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const { lagre } = useMellomlagring();
    const vedlegg: UploadedFile[] = methods.watch(VedleggFormFields.vedlegg) ?? [];
    const hasPendingUploads = vedlegg.some((file) => file.pending);

    const onSubmit = (data: VedleggFormValues) => commit(toVedleggSøknadsdata(data));

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                isPending={false}
                submitDisabled={hasPendingUploads}>
                <VedleggPanel<VedleggFormValues>
                    name={VedleggFormFields.vedlegg}
                    initialFiles={initialVedlegg}
                    onVedleggEndret={() => lagre()}
                    label={text('vedleggSteg.vedlegg.label')}
                    showPictureScanningGuide={true}
                />
            </SøknadStepForm>
        </SøknadStep>
    );
};
