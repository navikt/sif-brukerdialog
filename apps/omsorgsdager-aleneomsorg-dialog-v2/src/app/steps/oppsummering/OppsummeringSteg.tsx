import { useAppContext } from '@app/context/AppContext';
import { useAppIntl } from '@app/i18n';
import { Søknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { soknadsdataToSoknadDTO } from '@app/utils/soknadsdataToSoknadDTO';
import { SøknadStep, SøknadStepForm, useSøknadsdata } from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui/components';
import { useForm } from 'react-hook-form';

import { useSendSøknad } from '../../hooks/useSendSoknad';

type OppsummeringFormValues = Record<string, never>;

export const OppsummeringSteg = () => {
    const { søker, registrerteBarn } = useAppContext();
    const { locale, text } = useAppIntl();
    const søknadsdata = useSøknadsdata<Søknadsdata>();
    const { sendSøknad, isPending, sendSøknadError } = useSendSøknad();
    const methods = useForm<OppsummeringFormValues>();
    const dto = soknadsdataToSoknadDTO({
        søker,
        registrerteBarn,
        søknadsdata,
        språk: locale,
    });

    return (
        <SøknadStep stepId={SøknadStepId.OPPSUMMERING}>
            <SøknadStepForm
                stepId={SøknadStepId.OPPSUMMERING}
                methods={methods}
                onSubmit={() => {
                    if (dto) {
                        sendSøknad(dto);
                    }
                }}
                isPending={isPending}
                isFinalSubmit={true}
                submitDisabled={!dto}>
                <FormLayout.Content>
                    {sendSøknadError && <p role="alert">{text('oppsummering.innsendingFeilet')}</p>}
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
