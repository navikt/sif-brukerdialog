import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadFlow, useSøknadMellomlagring, useSøknadRhfForm, useSøknadState } from '@app/setup/hooks';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';
import { FormSummary, InfoCard } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { getCheckedValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { useSøknadFormValues } from '@sif/soknad/consistency';

import { useSendSøknad } from '../../hooks/useSendSøknad';
import { AppForm } from '../../setup/søknad/AppForm';
import { getSøknadApiDataFromSøknad } from '../../utils/søknadsdataToSøknadApiData';

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

    // const { onSubmit, isPending } = useStepSubmit<BostedFormValues, BostedSøknadsdata>({
    //     stepId,
    //     toSøknadsdata: toBostedSøknadsdata,
    // });

    const methods = useSøknadRhfForm<FormValues>(stepId, {});

    const { setSøknadSendt } = useSøknadFlow();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring } = useSøknadMellomlagring();
    const state = useSøknadState();

    const { isPending, mutateAsync } = useSendSøknad();

    const apiData = getSøknadApiDataFromSøknad({
        søker: state.søker,
        kontoInfo: state.kontoInfo,
        søknadsdata: state.søknadsdata,
        språk: 'nb',
    });

    const harBekreftetOpplysninger = methods.watch(FormFields.bekrefterOpplysninger);

    const onSubmit = async () => {
        if (apiData === undefined) {
            return;
        }
        await mutateAsync({ ...apiData, harBekreftetOpplysninger });
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
                submitDisabled={!apiData}>
                {!apiData && (
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
