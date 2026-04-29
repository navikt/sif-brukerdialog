import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadMellomlagring, useSøknadRhfForm, useSøknadsflyt, useSøknadState } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';
import { InfoCard } from '@navikt/ds-react';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { FormLayout } from '@sif/soknad-ui';

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
                    <>
                        <FormLayout.Summary>
                            <StartdatoOppsummering startdato={ISODateToDate(dto.startdato)} />
                            <KontonummerOppsummering
                                kontonummerInfo={dto.kontonummerInfo}
                                kontoOppslagInfo={state.kontoInfo}
                            />
                            <BostedOppsummering erBosattITrondheim={dto.erBosattITrondheim} />
                            <BostedUtlandOppsummering forutgåendeBosteder={dto.forutgåendeBosteder} />
                            <BarnOppsummering barn={state.barn} barnErRiktig={dto.barnErRiktig} />
                        </FormLayout.Summary>
                    </>
                )}
                <FormLayout.Questions>
                    <Checkbox
                        name={FormFields.bekrefterOpplysninger}
                        validate={validateField(FormFields.bekrefterOpplysninger, getCheckedValidator())}>
                        <AppText id="oppsummeringSteg.bekrefterOpplysninger.label" />
                    </Checkbox>
                </FormLayout.Questions>
            </AppForm>
        </SøknadStep>
    );
};
