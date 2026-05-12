import { AppText, useAppIntl } from '@app/i18n';
import { useLenker } from '@app/lenker';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import {
    useSøknadMellomlagring,
    useSøknadRhfForm,
    useSøknadState,
    useStepDefaultValues,
    useStepSubmit,
} from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { LegeerklæringSøknadsdata } from '@app/types/Soknadsdata';
import { useSifValidate, UploadedFile } from '@sif/rhf';
import { toUploadedFile, VedleggPanel } from '@sif/soknad-forms';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui/components';
import { getVedleggValidator } from '@navikt/sif-validation';

import { toLegeerklæringFormValues, toSøknadsdata } from './legeerklæringStegUtils';
import { LegeerklæringFormFields, LegeerklæringFormValues } from './types';

const stepId = SøknadStepId.LEGEERKLÆRING;

export const LegeerklæringForm = () => {
    const lenker = useLenker();
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('legeerklæringForm');
    const { søknadsdata } = useSøknadState();
    const samværsavtaleFiles = (søknadsdata[SøknadStepId.DELT_BOSTED]?.samværsavtale ?? []).map(toUploadedFile);
    const defaultValues = useStepDefaultValues<LegeerklæringFormValues, LegeerklæringSøknadsdata>({
        stepId,
        toFormValues: toLegeerklæringFormValues,
    });
    const { lagreSøknadSteg } = useSøknadMellomlagring();
    const { onSubmit, isPending } = useStepSubmit({ stepId, toSøknadsdata });
    const methods = useSøknadRhfForm<LegeerklæringFormValues>(stepId, defaultValues);
    const vedlegg: UploadedFile[] = methods.watch(LegeerklæringFormFields.vedlegg) ?? [];
    const hasPendingUploads = vedlegg.some((file) => file.pending);

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
                    onVedleggEndret={() => lagreSøknadSteg(stepId, methods.getValues())}
                    uploadLaterURL={lenker.omsorgspengerEttersending}
                    otherFiles={samværsavtaleFiles}
                    validate={validateField(
                        LegeerklæringFormFields.vedlegg,
                        getVedleggValidator({ otherFiles: samværsavtaleFiles }),
                    )}
                    showPictureScanningGuide={true}
                />
            </FormLayout.Content>
        </AppForm>
    );
};
