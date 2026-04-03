import { AppText, useAppIntl } from '@app/i18n';
import getLenker from '@app/lenker';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { LegeerklæringSøknadsdata } from '@app/types/Soknadsdata';
import { UploadedFile } from '@sif/rhf';
import { VedleggPanel } from '@sif/soknad-forms';
import { SifGuidePanel } from '@sif/soknad-ui/components';
import { useIntl } from 'react-intl';

import { toLegeerklæringFormValues, toSøknadsdata } from './legeerklæringStegUtils';
import { LegeerklæringFormFields, LegeerklæringFormValues } from './types';

const stepId = SøknadStepId.LEGEERKLÆRING;

export const LegeerklæringForm = () => {
    const intl = useIntl();
    const { text } = useAppIntl();
    const defaultValues = useStepDefaultValues<LegeerklæringFormValues, LegeerklæringSøknadsdata>({
        stepId,
        toFormValues: toLegeerklæringFormValues,
    });
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
                initialFiles={defaultValues[LegeerklæringFormFields.vedlegg]}
                label={text('legeerklæringSteg.vedlegg.label')}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                showPictureScanningGuide={true}
            />
        </AppForm>
    );
};
