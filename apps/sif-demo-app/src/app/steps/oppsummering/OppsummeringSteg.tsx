import { SøknadStepId } from '@app/setup/config/soknadStepConfig';
import { useSøknadMellomlagring, useSøknadsflyt, useSøknadStore } from '@app/setup/hooks';
import { SøknadFormButtons } from '@app/setup/soknad/SoknadFormButtons';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';
import { FormSummary } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { useSøknadFormValues } from '@sif/soknad/consistency';

import { useSendSøknad } from '../../hooks/useSendSoknad';
import { getSøknadApiDataFromSøknad } from '../../utils/soknadsdataToSoknadApiData';

export const OppsummeringSteg = () => {
    const { søknadsdata, setSøknadSendt } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const søker = useSøknadStore((s) => s.søknadState?.søker);
    const { slettMellomlagring } = useSøknadMellomlagring();
    const { isPending, mutateAsync } = useSendSøknad();

    if (!søknadsdata || !søker) {
        throw new Error('Søknadsdata mangler i oppsummering');
    }

    const apiData = getSøknadApiDataFromSøknad({ søker, søknadsdata });
    // eslint-disable-next-line no-console
    console.log(apiData);

    const onSubmit = async () => {
        try {
            await mutateAsync({} as any);
            await slettMellomlagring();
            clearSøknadFormValues();
            setSøknadSendt();
        } catch (e) {
            alert(JSON.stringify(e));
        }
    };

    return (
        <SøknadStep stepId={SøknadStepId.OPPSUMMERING}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}>
                <FormLayout.Summary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Informasjon du har oppgitt</FormSummary.Heading>
                        </FormSummary.Header>
                    </FormSummary>
                    <SøknadFormButtons
                        stepId={SøknadStepId.OPPSUMMERING}
                        isPending={isPending}
                        isFinalSubmit={true}
                        submitLabel="Send inn søknad"
                    />
                </FormLayout.Summary>
            </form>
        </SøknadStep>
    );
};
