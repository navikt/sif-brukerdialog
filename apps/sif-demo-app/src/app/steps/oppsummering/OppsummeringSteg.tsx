import { FormSummary } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';

import { SøknadStepId } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/søknadContext';
import { useSøknadMellomlagring } from '../../hooks';
import { useSendSøknad } from '../../hooks/useSendSøknad';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { SøknadFormButtons } from '../../setup/søknad-form-buttons/SøknadFormButtons';
import { SøknadStep } from '../../setup/søknad-step/SøknadStep';
import { getSøknadApiDataFromSøknad } from '../../utils/søknadsdataToSøknadApiData';

export const OppsummeringSteg = () => {
    const ctx = useSøknadContext();
    const state = useSøknadStore((s) => s.søknadState);
    const setSøknadSendt = useSøknadStore((s) => s.setSøknadSendt);
    const { slettMellomlagring } = useSøknadMellomlagring();
    const { isPending, mutateAsync } = useSendSøknad();

    if (!state) {
        throw new Error('Søknadsdata mangler i oppsummering');
    }
    const { søker, søknadsdata } = state;

    const apiData = getSøknadApiDataFromSøknad({ søker, søknadsdata });
    console.log(apiData);

    const onSubmit = async () => {
        try {
            await mutateAsync({} as any);
            await slettMellomlagring();
            ctx.clearAllFormValues();
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
