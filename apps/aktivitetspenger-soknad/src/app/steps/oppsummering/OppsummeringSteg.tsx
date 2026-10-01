import { useAppContext } from '@app/context/AppContext';
import { useSendSøknad } from '@app/hooks/useSendSoknad';
import { AppText, useAppIntl } from '@app/i18n';
import { Søknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { søknadsdataToSøknadDTO } from '@app/utils/soknadsdataToSoknadDTO';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { InfoCard } from '@navikt/ds-react';
import { getCheckedValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { SøknadStep, SøknadStepForm, useSøknadsdata } from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui';
import { dateToISODate, getDateToday, ISODate } from '@sif/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { getAppEnv } from '../../setup/appEnv';
import { InnsendingFeiletAlert } from './InnsendingFeiletAlert';
import { BarnOppsummering } from './parts/BarnOppsummering';
import { BostedOppsummering } from './parts/BostedOppsummering';
import { KontonummerOppsummering } from './parts/KontonummerOppsummering';
import { MedlemskapOppsummering } from './parts/MedlemskapOppsummering';
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
    const { locale } = useAppIntl();

    const { validateField } = useSifValidate('oppsummeringForm');
    const [startdato, setStartdato] = useState<ISODate>(dateToISODate(getDateToday()));

    const { søker, kontoInfo, registrerteBarn } = useAppContext();
    const søknadsdata = useSøknadsdata<Søknadsdata>();

    const methods = useForm<FormValues>({ defaultValues: {} });

    const { sendSøknad, isPending, sendSøknadError } = useSendSøknad();

    const dto = søknadsdataToSøknadDTO({
        søker,
        kontoInfo,
        søknadsdata,
        språk: locale,
        startdato,
    });

    const harBekreftetOpplysninger = methods.watch(FormFields.bekrefterOpplysninger);

    const onSubmit = () => {
        if (dto === undefined) {
            return;
        }
        sendSøknad({ ...dto, harBekreftetOpplysninger });
    };

    const submitEnabled = getAppEnv().SIF_PUBLIC_SUBMIT_ENABLED === 'true';

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                isPending={isPending}
                isFinalSubmit={true}
                submitDisabled={!dto || !startdato || submitEnabled === false}>
                {submitEnabled === false && (
                    <InfoCard data-color="warning">
                        <InfoCard.Message icon={<InformationSquareIcon />}>
                            Innsending av søknad er ikke tilgjengelig fordi denne ikke er lansert enda.
                        </InfoCard.Message>
                    </InfoCard>
                )}
                <StartdatoSpørsmål
                    value={startdato}
                    onDateChange={(dato) => {
                        if (dato) {
                            setStartdato(dateToISODate(dato));
                        }
                    }}
                />
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
