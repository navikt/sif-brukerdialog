import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/soknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { VedleggSøknadsdata } from '@app/types/Soknadsdata';
import { UploadedFile } from '@sif/rhf';
import { VedleggPanel } from '@sif/soknad-forms';

import { VedleggFormFields, VedleggFormValues } from './types';
import { toVedleggFormValues, toVedleggSøknadsdata } from './vedleggStegUtils';

const stepId = SøknadStepId.VEDLEGG;

export const VedleggForm = () => {
    const { text } = useAppIntl();
    const defaultValues = useStepDefaultValues<VedleggFormValues, VedleggSøknadsdata>({
        stepId,
        toFormValues: toVedleggFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<VedleggFormValues, VedleggSøknadsdata>({
        stepId,
        toSøknadsdata: toVedleggSøknadsdata,
    });

    const methods = useSøknadRhfForm<VedleggFormValues>(stepId, defaultValues);
    const vedlegg: UploadedFile[] = methods.watch(VedleggFormFields.vedlegg) ?? [];
    const hasPendingUploads = vedlegg.some((file) => file.pending);

    return (
        <AppForm
            stepId={stepId}
            methods={methods}
            onSubmit={onSubmit}
            isPending={isPending}
            submitDisabled={hasPendingUploads}>
            <VedleggPanel<VedleggFormValues>
                name={VedleggFormFields.vedlegg}
                initialFiles={defaultValues[VedleggFormFields.vedlegg]}
                label={text('vedleggSteg.vedlegg.label')}
                showPictureScanningGuide={true}
            />
        </AppForm>
    );
};