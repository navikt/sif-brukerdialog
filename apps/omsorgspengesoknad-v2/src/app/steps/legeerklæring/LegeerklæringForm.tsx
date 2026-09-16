import { AppText, useAppIntl } from '@app/i18n';
import { useLenker } from '@app/lenker';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { LegeerklæringSøknadsdata, Søknadsdata } from '@app/types/Soknadsdata';
import { useSifValidate, UploadedFile } from '@sif/rhf';
import { toUploadedFile, VedleggPanel } from '@sif/soknad-forms';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui/components';
import { getVedleggValidator } from '@navikt/sif-validation';
import { SøknadStepForm, useMellomlagring, useSaveSøknadFormValues, useSøknadsdata, useStepData } from '@sif/soknad-app';
import { useForm } from 'react-hook-form';

import { toLegeerklæringFormValues, toSøknadsdata } from './legeerklæringStegUtils';
import { LegeerklæringFormFields, LegeerklæringFormValues } from './types';

const stepId = SøknadStepId.LEGEERKLÆRING;

export const LegeerklæringForm = () => {
    const lenker = useLenker();
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('legeerklæringForm');

    const søknadsdata = useSøknadsdata<Søknadsdata>();
    const samværsavtaleFiles = (søknadsdata[SøknadStepId.DELT_BOSTED]?.samværsavtale ?? []).map(toUploadedFile);

    const { lagretData, draftFormValues, commit } = useStepData<LegeerklæringSøknadsdata, LegeerklæringFormValues>(stepId);
    const defaultValues = draftFormValues ?? toLegeerklæringFormValues(lagretData);
    const methods = useForm<LegeerklæringFormValues>({ defaultValues });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const { lagre } = useMellomlagring();

    const onSubmit = (data: LegeerklæringFormValues) => commit(toSøknadsdata(data));

    const vedlegg: UploadedFile[] = methods.watch(LegeerklæringFormFields.vedlegg) ?? [];
    const hasPendingUploads = vedlegg.some((file) => file.pending);

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
                        <AppText id="legeerklæringSteg.counsellorpanel.1" />
                    </p>
                    <p>
                        <AppText id="legeerklæringSteg.counsellorpanel.2" />
                    </p>
                </SifGuidePanel>

                <VedleggPanel<LegeerklæringFormValues>
                    name={LegeerklæringFormFields.vedlegg}
                    label={text('legeerklæringSteg.vedlegg.label')}
                    initialFiles={defaultValues[LegeerklæringFormFields.vedlegg]}
                    onVedleggEndret={() => lagre()}
                    uploadLaterURL={lenker.omsorgspengerEttersending}
                    otherFiles={samværsavtaleFiles}
                    validate={validateField(
                        LegeerklæringFormFields.vedlegg,
                        getVedleggValidator({ otherFiles: samværsavtaleFiles }),
                    )}
                    showPictureScanningGuide={true}
                />
            </FormLayout.Content>
        </SøknadStepForm>
    );
};
