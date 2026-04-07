import { AppText, useAppIntl } from '@app/i18n';
import getLenker from '@app/lenker';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { DeltBostedSøknadsdata } from '@app/types/Soknadsdata';
import { UploadedFile } from '@sif/rhf';
import { VedleggPanel } from '@sif/soknad-forms';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui/components';
import { useIntl } from 'react-intl';

import { toDeltBostedFormValues, toSøknadsdata } from './deltBostedStegUtils';
import { DeltBostedFormFields, DeltBostedFormValues } from './types';

const stepId = SøknadStepId.DELT_BOSTED;

export const DeltBostedForm = () => {
    const intl = useIntl();
    const { text } = useAppIntl();
    const defaultValues = useStepDefaultValues<DeltBostedFormValues, DeltBostedSøknadsdata>({
        stepId,
        toFormValues: toDeltBostedFormValues,
    });
    const { onSubmit, isPending } = useStepSubmit({ stepId, toSøknadsdata });
    const methods = useSøknadRhfForm<DeltBostedFormValues>(stepId, defaultValues);
    const samværsavtale: UploadedFile[] = methods.watch(DeltBostedFormFields.samværsavtale) ?? [];
    const hasPendingUploads = samværsavtale.some((file) => file.pending);

    return (
        <AppForm
            stepId={stepId}
            methods={methods}
            onSubmit={onSubmit}
            isPending={isPending}
            submitDisabled={hasPendingUploads}>
            <FormLayout.Content>
                <SifGuidePanel>
                    <p>
                        <AppText id="deltBostedSteg.counsellorpanel" />
                    </p>
                </SifGuidePanel>

                <VedleggPanel<DeltBostedFormValues>
                    name={DeltBostedFormFields.samværsavtale}
                    initialFiles={defaultValues[DeltBostedFormFields.samværsavtale]}
                    label={text('deltBostedSteg.samværsavtale.label')}
                    uploadLaterURL={getLenker(intl.locale).ettersend}
                    showPictureScanningGuide={true}
                />
            </FormLayout.Content>
        </AppForm>
    );
};
