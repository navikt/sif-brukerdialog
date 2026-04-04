import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { KontonummerSøknadsdata } from '@app/types/Soknadsdata';
import { BodyLong, Heading } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { HarKontonummerEnum, UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { FormLayout } from '@sif/soknad-ui';
import { AriaLiveRegion, SifInfoCard } from '@sif/soknad-ui/components';

import { toKontonummerFormValues, toKontonummerSøknadsdata } from './kontonummerStegUtils';
import { KontonummerFormFields, KontonummerFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<KontonummerFormValues>();

const stepId = SøknadStepId.KONTONUMMER;

interface Props {
    kontonummerInfo: UtvidetKontonummerInfo;
}

export const KontonummerForm = ({ kontonummerInfo }: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('kontonummerForm');

    const defaultValues = useStepDefaultValues<KontonummerFormValues, KontonummerSøknadsdata>({
        stepId,
        toFormValues: toKontonummerFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<KontonummerFormValues, KontonummerSøknadsdata>({
        stepId,
        toSøknadsdata: toKontonummerSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);
    const kontonummerErRiktig = methods.watch(KontonummerFormFields.kontonummerErRiktig);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Questions>
                {kontonummerInfo.harKontonummer === HarKontonummerEnum.JA && (
                    <>
                        <YesOrNoQuestion
                            name={KontonummerFormFields.kontonummerErRiktig}
                            legend={text('kontonummerSteg.spørsmål.kontonummerErRiktig', {
                                kontonummer: kontonummerInfo.formatertKontonummer,
                            })}
                            validate={validateField(KontonummerFormFields.kontonummerErRiktig, getYesOrNoValidator())}
                        />
                        <AriaLiveRegion visible={kontonummerErRiktig === YesOrNo.NO}>
                            <FormLayout.QuestionRelatedMessage>
                                <SifInfoCard>
                                    <AppText id="kontonummerSteg.kontonummerStemmerIkke.info" />
                                </SifInfoCard>
                            </FormLayout.QuestionRelatedMessage>
                        </AriaLiveRegion>
                    </>
                )}
                {kontonummerInfo.harKontonummer === HarKontonummerEnum.NEI && (
                    <SifInfoCard variant="warning">
                        <Heading level="3" size="small" spacing>
                            <AppText id="kontonummerSteg.harIkkeKontonummer.tittel" />
                        </Heading>
                        <BodyLong spacing>
                            <AppText id="kontonummerSteg.harIkkeKontonummer.info" />
                        </BodyLong>
                    </SifInfoCard>
                )}
                {kontonummerInfo.harKontonummer === HarKontonummerEnum.UVISST && (
                    <SifInfoCard variant="warning">
                        <Heading level="3" size="small" spacing>
                            <AppText id="kontonummerSteg.uvissOmKontonummer.tittel" />
                        </Heading>
                        <BodyLong spacing>
                            <AppText id="kontonummerSteg.uvissOmKontonummer.info" />
                        </BodyLong>
                    </SifInfoCard>
                )}
            </FormLayout.Questions>
        </AppForm>
    );
};
