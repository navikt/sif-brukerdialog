import { SøknadStepId } from '@app/setup/config/SøknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { HarKontonummerEnum, UtvidetKontonummerInfo } from '@sif/api';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { FormLayout } from '@sif/soknad-ui';
import { AriaLiveRegion } from '@sif/soknad-ui/components';

import { KontonummerSøknadsdata } from '../../types/Søknadsdata';
import { toKontonummerFormValues, toKontonummerSøknadsdata } from './kontonummerStegUtils';
import { KontonummerFormFields, KontonummerFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<KontonummerFormValues>();

const stepId = SøknadStepId.KONTONUMMER;

interface Props {
    kontonummerInfo: UtvidetKontonummerInfo;
}

export const KontonummerForm = ({ kontonummerInfo }: Props) => {
    const { validateField } = useSifValidate();

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
                            legend={`Stemmer det at ditt kontonummer er ${kontonummerInfo.formatertKontonummer}?`}
                            validate={validateField(KontonummerFormFields.kontonummerErRiktig, getYesOrNoValidator())}
                        />
                        <AriaLiveRegion visible={kontonummerErRiktig === YesOrNo.NO}>
                            <FormLayout.QuestionRelatedMessage>
                                <Alert variant="info">Info når kontonummer ikke stemmer</Alert>
                            </FormLayout.QuestionRelatedMessage>
                        </AriaLiveRegion>
                    </>
                )}
                {kontonummerInfo.harKontonummer === HarKontonummerEnum.NEI && (
                    <Alert variant="warning">
                        <Heading level="3" size="small" spacing>
                            Har ikke kontonummer melding
                        </Heading>
                        <BodyLong spacing>info</BodyLong>
                    </Alert>
                )}
                {kontonummerInfo.harKontonummer === HarKontonummerEnum.UVISST && (
                    <Alert variant="warning">
                        <Heading level="3" size="small" spacing>
                            Uvisst om en har kontonummer
                        </Heading>
                        <BodyLong spacing>info</BodyLong>
                    </Alert>
                )}
            </FormLayout.Questions>
        </AppForm>
    );
};
