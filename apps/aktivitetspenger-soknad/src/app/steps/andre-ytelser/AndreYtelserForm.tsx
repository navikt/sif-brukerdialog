import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { AndreYtelserSøknadsdata } from '@app/types/Soknadsdata';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { FormLayout } from '@sif/soknad-ui';

import { toAndreYtelserFormValues, toAndreYtelserSøknadsdata } from './andreYtelserStegUtils';
import { AndreYtelse, AndreYtelserFormFields, AndreYtelserFormValues } from './types';

const { YesOrNoQuestion, CheckboxGroup } = createSifFormComponents<AndreYtelserFormValues>();

const stepId = SøknadStepId.ANDRE_YTELSER;

export const AndreYtelserForm = () => {
    const { validateField } = useSifValidate('andreYtelserForm');
    const { text } = useAppIntl();

    const defaultValues = useStepDefaultValues<AndreYtelserFormValues, AndreYtelserSøknadsdata>({
        stepId,
        toFormValues: toAndreYtelserFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<AndreYtelserFormValues, AndreYtelserSøknadsdata>({
        stepId,
        toSøknadsdata: toAndreYtelserSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);
    const harAndreYtelser = methods.watch(AndreYtelserFormFields.harAndreYtelser);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <YesOrNoQuestion
                        name={AndreYtelserFormFields.harAndreYtelser}
                        legend={text('andreYtelserSteg.spørsmål.harAndreYtelser')}
                        validate={validateField(AndreYtelserFormFields.harAndreYtelser, getYesOrNoValidator())}
                    />
                    {harAndreYtelser === YesOrNo.YES && (
                        <CheckboxGroup
                            name={AndreYtelserFormFields.andreYtelser}
                            legend={text('andreYtelserSteg.spørsmål.andreYtelser')}
                            validate={validateField(
                                AndreYtelserFormFields.andreYtelser,
                                getListValidator({ required: true }),
                            )}
                            checkboxes={[
                                {
                                    value: AndreYtelse.OKONOMISK_SOSIALHJELP,
                                    label: text('andreYtelserSteg.andreYtelser.OKONOMISK_SOSIALHJELP'),
                                },
                                {
                                    value: AndreYtelse.ARBEIDSAVKLARINGSPENGER,
                                    label: text('andreYtelserSteg.andreYtelser.ARBEIDSAVKLARINGSPENGER'),
                                },
                                {
                                    value: AndreYtelse.TILTAKSPENGER,
                                    label: text('andreYtelserSteg.andreYtelser.TILTAKSPENGER'),
                                },
                                {
                                    value: AndreYtelse.DAGPENGER,
                                    label: text('andreYtelserSteg.andreYtelser.DAGPENGER'),
                                },
                                {
                                    value: AndreYtelse.SYKEPENGER,
                                    label: text('andreYtelserSteg.andreYtelser.SYKEPENGER'),
                                },
                                {
                                    value: AndreYtelse.PLEIE_ELLER_OPPLARINGSPENGER,
                                    label: text('andreYtelserSteg.andreYtelser.PLEIE_ELLER_OPPLARINGSPENGER'),
                                },
                                {
                                    value: AndreYtelse.ANNET,
                                    label: text('andreYtelserSteg.andreYtelser.ANNET'),
                                },
                            ]}
                        />
                    )}
                </FormLayout.Questions>
            </FormLayout.Content>
        </AppForm>
    );
};
