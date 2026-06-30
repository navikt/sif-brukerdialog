import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { useAppContext } from '@app/context/AppContext';
import { Søknadsdata } from '@app/types/Soknadsdata';
import { InfoCard } from '@navikt/ds-react';
import { ISODate } from '@sif/utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { SøknadStep, useSøknadAppContext, useSøknadSendt } from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui';
import { useForm } from 'react-hook-form';

import { useSendSøknad } from '../../hooks/useSendSoknad';
import { søknadsdataToSøknadDTO } from '../../utils/soknadsdataToSoknadDTO';
import { BarnOppsummering } from './parts/BarnOppsummering';
import { BostedOppsummering } from './parts/BostedOppsummering';
import { BostedUtlandOppsummering } from './parts/BostedUtlandOppsummering';
import { KontonummerOppsummering } from './parts/KontonummerOppsummering';
import { StartdatoOppsummering } from './parts/StartdatoOppsummering';

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

    const { søker, kontoInfo, registrerteBarn } = useAppContext();
    const { store } = useSøknadAppContext();
    const søknadsdata = store((s) => s.søknadsdata) as Søknadsdata;

    const { onSøknadSendt } = useSøknadSendt();

    const methods = useForm<FormValues>({ defaultValues: {} });

    const { isPending, mutateAsync } = useSendSøknad();

    const dto = søknadsdataToSøknadDTO({
        søker,
        kontoInfo,
        søknadsdata,
        språk: 'nb',
    });

    const harBekreftetOpplysninger = methods.watch(FormFields.bekrefterOpplysninger);

    const onSubmit = async () => {
        if (dto === undefined) {
            return;
        }
        await mutateAsync({ ...dto, harBekreftetOpplysninger });
        await onSøknadSendt();
    };

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                isPending={isPending}
                isFinalSubmit={true}
                submitDisabled={!dto}>
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
                        <StartdatoOppsummering startdato={dto.startdato as ISODate} />
                        <KontonummerOppsummering kontonummerInfo={dto.kontonummerInfo} kontoOppslagInfo={kontoInfo} />
                        <BostedOppsummering erBosattITrondheim={dto.erBosattITrondheim} />
                        <BostedUtlandOppsummering forutgåendeBosteder={dto.forutgåendeBosteder} />
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
            </SøknadStepForm>
        </SøknadStep>
    );
};
