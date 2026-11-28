import { useAppContext } from '@app/context/AppContext';
import { AppText, useAppIntl } from '@app/i18n';
import type { Søknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { soknadsdataToSoknadDTO } from '@app/utils/soknadsdataToSoknadDTO';
import { BodyLong, Button, Heading, VStack } from '@navikt/ds-react';
import { SøknadStep, SøknadStepForm, useAvbryt, useSøknadsdata } from '@sif/soknad-app';
import { FormLayout, SifInfoCard } from '@sif/soknad-ui/components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSendSøknad } from '../../hooks/useSendSoknad';
import { BarnOppsummering } from './BarnOppsummering';
import { InnsendingFeiletAlert } from './InnsendingFeiletAlert';
import { OmSøkerOppsummering } from './OmSøkerOppsummering';
import {
    BekrefterOpplysningerSpørsmål,
    type OppsummeringFormValues,
} from './spørsmål/BekrefterOpplysningerSpørsmål';

export const OppsummeringSteg = () => {
    const { søker, registrerteBarn } = useAppContext();
    const { locale, text } = useAppIntl();
    const { avbryt } = useAvbryt();
    const [starterPåNytt, setStarterPåNytt] = useState(false);
    const søknadsdata = useSøknadsdata<Søknadsdata>();
    const { sendSøknad, isPending, sendSøknadError } = useSendSøknad();
    const methods = useForm<OppsummeringFormValues>();
    const dto = soknadsdataToSoknadDTO({
        søker,
        registrerteBarn,
        søknadsdata,
        språk: locale,
    });
    const harBekreftetOpplysninger = methods.watch('bekrefterOpplysninger');

    return (
        <SøknadStep stepId={SøknadStepId.OPPSUMMERING}>
            <SøknadStepForm
                stepId={SøknadStepId.OPPSUMMERING}
                methods={methods}
                onSubmit={() => {
                    if (dto) {
                        sendSøknad({ ...dto, harBekreftetOpplysninger });
                    }
                }}
                isPending={isPending}
                isFinalSubmit={true}
                submitLabel={text('oppsummeringSteg.sendSøknad')}
                submitDisabled={!dto}>
                <FormLayout.Content>
                    {!dto && (
                        <SifInfoCard variant="warning">
                            <VStack gap="space-8">
                                <Heading level="2" size="small">
                                    <AppText id="oppsummeringSteg.feil.tittel" />
                                </Heading>
                                <BodyLong>
                                    <AppText id="oppsummeringSteg.feil.innhold" />
                                </BodyLong>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="small"
                                    loading={starterPåNytt}
                                    onClick={async () => {
                                        setStarterPåNytt(true);
                                        await avbryt();
                                    }}>
                                    <AppText id="oppsummeringSteg.feil.startPåNytt" />
                                </Button>
                            </VStack>
                        </SifInfoCard>
                    )}
                    {dto && (
                        <>
                            <FormLayout.Summary>
                                <OmSøkerOppsummering søker={søker} />
                                <BarnOppsummering barn={dto.barn} />
                            </FormLayout.Summary>
                            <FormLayout.Questions>
                                <BekrefterOpplysningerSpørsmål disabled={isPending} />
                            </FormLayout.Questions>
                        </>
                    )}
                    {sendSøknadError && <InnsendingFeiletAlert error={sendSøknadError} />}
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
