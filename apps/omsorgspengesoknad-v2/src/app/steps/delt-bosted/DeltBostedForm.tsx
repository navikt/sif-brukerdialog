import { AppText, useAppIntl } from '@app/i18n';
import { useLenker } from '@app/lenker';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { DeltBostedSøknadsdata, Søknadsdata } from '@app/types/Soknadsdata';
import { useSifValidate, UploadedFile } from '@sif/rhf';
import { toUploadedFile, VedleggPanel } from '@sif/soknad-forms';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui/components';
import { getVedleggValidator } from '@navikt/sif-validation';
import { SøknadStepForm, useMellomlagring, useSaveSøknadFormValues, useSøknadsdata, useStepData } from '@sif/soknad-app';
import { useForm } from 'react-hook-form';

import { toDeltBostedFormValues, toSøknadsdata } from './deltBostedStegUtils';
import { DeltBostedFormFields, DeltBostedFormValues } from './types';

const stepId = SøknadStepId.DELT_BOSTED;

export const DeltBostedForm = () => {
    const lenker = useLenker();
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('deltBostedForm');

    const søknadsdata = useSøknadsdata<Søknadsdata>();
    const legeerklæringFiles = (søknadsdata[SøknadStepId.LEGEERKLÆRING]?.vedlegg ?? []).map(toUploadedFile);

    const { lagretData, draftFormValues, commit } = useStepData<DeltBostedSøknadsdata, DeltBostedFormValues>(stepId);
    const defaultValues = draftFormValues ?? toDeltBostedFormValues(lagretData);
    const methods = useForm<DeltBostedFormValues>({ defaultValues });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const { lagre } = useMellomlagring();

    const onSubmit = (data: DeltBostedFormValues) => commit(toSøknadsdata(data));

    const samværsavtale: UploadedFile[] = methods.watch(DeltBostedFormFields.samværsavtale) ?? [];
    const hasPendingUploads = samværsavtale.some((file) => file.pending);

    return (
        <SøknadStepForm
            stepId={stepId}
            methods={methods}
            onSubmit={onSubmit}
            isPending={false}
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
                    uploadLaterURL={lenker.omsorgspengerEttersending}
                    onVedleggEndret={() => lagre()}
                    otherFiles={legeerklæringFiles}
                    validate={validateField(
                        DeltBostedFormFields.samværsavtale,
                        getVedleggValidator({ otherFiles: legeerklæringFiles }),
                    )}
                    showPictureScanningGuide={true}
                />
            </FormLayout.Content>
        </SøknadStepForm>
    );
};
