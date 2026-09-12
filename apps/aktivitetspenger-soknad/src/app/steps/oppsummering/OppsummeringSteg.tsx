import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { useAppContext } from '@app/context/AppContext';
import { Søknadsdata } from '@app/types/Soknadsdata';
import { InfoCard } from '@navikt/ds-react';
import { dateToISODate, getDateToday, ISODate } from '@sif/utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { SøknadStep, useSøknadSendt, useSøknadsdata } from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui';
import { useForm } from 'react-hook-form';

import { useSendSøknad } from '@app/hooks/useSendSoknad';
import { søknadsdataToSøknadDTO } from '@app/utils/soknadsdataToSoknadDTO';
import { BarnOppsummering } from './parts/BarnOppsummering';
import { BostedOppsummering } from './parts/BostedOppsummering';
import { MedlemskapOppsummering } from './parts/MedlemskapOppsummering';
import { KontonummerOppsummering } from './parts/KontonummerOppsummering';
import { InnsendingFeiletAlert } from './InnsendingFeiletAlert';
import { useState } from 'react';
import { StartdatoSpørsmål } from './parts/StartdatoSpørsmål';

enum FormFields {
    bekrefterOpplysninger = 'bekrefterOpplysninger',
}

type FormValues = {
    [FormFields.bekrefterOpplysninger]: boolean;
};

const { Checkbox } = createSifFormComponents<FormValues>();

export const OppsummeringSteg = () => {
    const stepId = SøknadStepId.OPPSUMMERING;

    const { validateField } = useSifValidate('oppsummeringForm');
    const [startdato, setStartdato] = useState<ISODate>(dateToISODate(getDateToday()));

    const { søker, kontoInfo, registrerteBarn } = useAppContext();
    const søknadsdata = useSøknadsdata<Søknadsdata>();

    const { onSøknadSendt } = useSøknadSendt();

    const methods = useForm<FormValues>({ defaultValues: {} });

    const { isPending, mutate, error: sendSøknadError } = useSendSøknad();

    const dto = søknadsdataToSøknadDTO({
        søker,
        kontoInfo,
        søknadsdata,
        språk: 'nb',
        startdato,
    });

    const harBekreftetOpplysninger = methods.watch(FormFields.bekrefterOpplysninger);

    const onSubmit = () => {
        if (dto === undefined) {
            return;
        }
        mutate({ ...dto, harBekreftetOpplysninger }, { onSuccess: () => onSøknadSendt() });
    };

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                isPending={isPending}
                isFinalSubmit={true}
                submitDisabled={!dto || !startdato}>
                {
                    <StartdatoSpørsmål
                        value={startdato}
                        onDateChange={(dato) => {
                            if (dato) {
                                setStartdato(dateToISODate(dato));
                            }
                        }}
                    />
                }
                {startdato && (
                    <>
                        {!dto && (
                            <InfoCard data-color="warning">
                                <InfoCard.Header>
                                    <InfoCard.Title>
                                        <AppText id="oppsummeringSteg.feil.tittel" />
                                    </InfoCard.Title>
                                </InfoCard.Header>
                                <InfoCard.Content>
                                    <AppText id="oppsummeringSteg.feil.innhold" />
                                </InfoCard.Content>
                            </InfoCard>
                        )}

                        {dto && (
                            <FormLayout.Summary>
                                <KontonummerOppsummering
                                    kontonummerInfo={dto.kontonummerInfo}
                                    kontoOppslagInfo={kontoInfo}
                                />
                                <BostedOppsummering erBosattITrondheim={dto.erBosattITrondheim} />
                                <MedlemskapOppsummering medlemskap={dto.medlemskap} />
                                <BarnOppsummering barn={registrerteBarn} barnErRiktig={dto.barnErRiktig} />
                            </FormLayout.Summary>
                        )}
                        <FormLayout.Questions>
                            <Checkbox
                                name={FormFields.bekrefterOpplysninger}
                                validate={validateField(FormFields.bekrefterOpplysninger, getCheckedValidator())}>
                                <AppText id="oppsummeringSteg.bekrefterOpplysninger.label" />
                            </Checkbox>
                        </FormLayout.Questions>
                        {sendSøknadError && <InnsendingFeiletAlert error={sendSøknadError} />}
                    </>
                )}
            </SøknadStepForm>
        </SøknadStep>
    );
};
