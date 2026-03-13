import { SøknadFormButtons, SøknadStep } from '@app/setup';
import { FormSummary } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';

import { SøknadStepId } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/søknadContext';
import { useSøknadMellomlagring } from '../../hooks';
import { useSendSøknad } from '../../hooks/useSendSøknad';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { getSøknadApiDataFromSøknad } from '../../utils/søknadsdataToSøknadApiData';

export const OppsummeringSteg = () => {
    const { søknadsdata, clearAllFormValues, setSøknadSendt } = useSøknadContext();
    const søker = useSøknadStore((s) => s.søknadState?.søker);
    const { slettMellomlagring } = useSøknadMellomlagring();
    const { isPending, mutateAsync } = useSendSøknad();

    if (!søknadsdata || !søker) {
        throw new Error('Søknadsdata mangler i oppsummering');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const apiData = getSøknadApiDataFromSøknad({ søker, søknadsdata });

    const onSubmit = async () => {
        try {
            await mutateAsync({} as any);
            await slettMellomlagring();
            clearAllFormValues();
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
