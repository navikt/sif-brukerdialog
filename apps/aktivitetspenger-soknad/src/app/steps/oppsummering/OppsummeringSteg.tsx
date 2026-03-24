import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadMellomlagring, useSøknadRhfForm, useSøknadsflyt, useSøknadState } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';
import { FormSummary, InfoCard } from '@navikt/ds-react';
import { getCheckedValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { FormLayout } from '@sif/soknad-ui';

import { useSendSøknad } from '../../hooks/useSendSoknad';
import { søknadsdataToSøknadDTO } from '../../utils/soknadsdataToSoknadDTO';

enum FormFields {
    bekrefterOpplysninger = 'bekrefterOpplysninger',
}

type FormValues = {
    [FormFields.bekrefterOpplysninger]: boolean;
};

const { Checkbox } = createSifFormComponents<FormValues>();

export const OppsummeringSteg = () => {
    const stepId = SøknadStepId.OPPSUMMERING;

    const { validateField } = useSifValidate();

    const methods = useSøknadRhfForm<FormValues>(stepId, {});

    const { setSøknadSendt } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring } = useSøknadMellomlagring();
    const state = useSøknadState();

    const { isPending, mutateAsync } = useSendSøknad();

    const dto = søknadsdataToSøknadDTO({
        søker: state.søker,
        kontoInfo: state.kontoInfo,
        søknadsdata: state.søknadsdata,
        språk: 'nb',
    });

    const harBekreftetOpplysninger = methods.watch(FormFields.bekrefterOpplysninger);

    const onSubmit = async () => {
        if (dto === undefined) {
            return;
        }
        await mutateAsync({ ...dto, harBekreftetOpplysninger });
        await slettMellomlagring();
        clearSøknadFormValues();
        setSøknadSendt();
    };

    return (
        <SøknadStep stepId={SøknadStepId.OPPSUMMERING}>
            <AppForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                isPending={isPending}
                isFinalSubmit={true}
                submitDisabled={!dto}>
                {!dto && (
                    <InfoCard data-color="warning">
                        <InfoCard.Header>
                            <InfoCard.Title>Det skjedde en feil</InfoCard.Title>
                        </InfoCard.Header>
                        <InfoCard.Content>
                            Det mangler nødvendig informasjon for å kunne sende inn søknaden. Prøv igjen senere.
                        </InfoCard.Content>
                    </InfoCard>
                )}
                <FormLayout.Summary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Informasjon du har oppgitt</FormSummary.Heading>
                        </FormSummary.Header>
                        {/* TODO: legg til oppsummeringsinnhold basert på søknadsdata */}
                    </FormSummary>
                </FormLayout.Summary>
                <FormLayout.Questions>
                    <Checkbox
                        name={FormFields.bekrefterOpplysninger}
                        validate={validateField(FormFields.bekrefterOpplysninger, getCheckedValidator())}>
                        Jeg bekrefter at opplysningene jeg har gitt er riktige
                    </Checkbox>
                </FormLayout.Questions>
            </AppForm>
        </SøknadStep>
    );
};
