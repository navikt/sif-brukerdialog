import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { StartdatoOgAndreYtelserSøknadsdata } from '@app/types/Soknadsdata';
import { FormLayout } from '@navikt/sif-common-ui';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';

import {
    toStartdatoOgAndreYtelserFormValues,
    toStartdatoOgAndreYtelserSøknadsdata,
} from './startdatoOgAndreYtelserStegUtils';
import { AndreYtelse, StartdatoOgAndreYtelserFormFields, StartdatoOgAndreYtelserFormValues } from './types';

const { YesOrNoQuestion, CheckboxGroup } = createSifFormComponents<StartdatoOgAndreYtelserFormValues>();

const stepId = SøknadStepId.STARTDATO_OG_ANDRE_YTELSER;

export const StartdatoOgAndreYtelserForm = () => {
    const { validateField } = useSifValidate('startdatoOgAndreYtelserForm');
    const { text } = useAppIntl();

    const defaultValues = useStepDefaultValues<StartdatoOgAndreYtelserFormValues, StartdatoOgAndreYtelserSøknadsdata>({
        stepId,
        toFormValues: toStartdatoOgAndreYtelserFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<
        StartdatoOgAndreYtelserFormValues,
        StartdatoOgAndreYtelserSøknadsdata
    >({
        stepId,
        toSøknadsdata: toStartdatoOgAndreYtelserSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);
    const harAndreYtelser = methods.watch(StartdatoOgAndreYtelserFormFields.harAndreYtelser);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <YesOrNoQuestion
                        name={StartdatoOgAndreYtelserFormFields.harAndreYtelser}
                        legend={text('startdatoOgAndreYtelserSteg.spørsmål.harAndreYtelser')}
                        validate={validateField(
                            StartdatoOgAndreYtelserFormFields.harAndreYtelser,
                            getYesOrNoValidator(),
                        )}
                    />
                    {harAndreYtelser === YesOrNo.YES && (
                        <CheckboxGroup
                            name={StartdatoOgAndreYtelserFormFields.andreYtelser}
                            legend={text('startdatoOgAndreYtelserSteg.spørsmål.andreYtelser')}
                            validate={validateField(
                                StartdatoOgAndreYtelserFormFields.andreYtelser,
                                getListValidator({ required: true }),
                            )}
                            checkboxes={[
                                {
                                    value: AndreYtelse.OKONOMISK_SOSIALHJELP,
                                    label: text('startdatoOgAndreYtelserSteg.andreYtelser.OKONOMISK_SOSIALHJELP'),
                                },
                                {
                                    value: AndreYtelse.ARBEIDSAVKLARINGSPENGER,
                                    label: text('startdatoOgAndreYtelserSteg.andreYtelser.ARBEIDSAVKLARINGSPENGER'),
                                },
                                {
                                    value: AndreYtelse.TILTAKSPENGER,
                                    label: text('startdatoOgAndreYtelserSteg.andreYtelser.TILTAKSPENGER'),
                                },
                                {
                                    value: AndreYtelse.DAGPENGER,
                                    label: text('startdatoOgAndreYtelserSteg.andreYtelser.DAGPENGER'),
                                },
                                {
                                    value: AndreYtelse.SYKEPENGER,
                                    label: text('startdatoOgAndreYtelserSteg.andreYtelser.SYKEPENGER'),
                                },
                                {
                                    value: AndreYtelse.PLEIE_ELLER_OPPLARINGSPENGER,
                                    label: text(
                                        'startdatoOgAndreYtelserSteg.andreYtelser.PLEIE_ELLER_OPPLARINGSPENGER',
                                    ),
                                },
                                {
                                    value: AndreYtelse.ANNET,
                                    label: text('startdatoOgAndreYtelserSteg.andreYtelser.ANNET'),
                                },
                            ]}
                        />
                    )}
                </FormLayout.Questions>
            </FormLayout.Content>
        </AppForm>
    );
};
