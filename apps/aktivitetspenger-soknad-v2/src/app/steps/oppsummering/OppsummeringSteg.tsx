import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadFlow, useSøknadMellomlagring } from '@app/setup/hooks';
import { SøknadFormButtons } from '@app/setup/søknad/SøknadFormButtons';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';
import { FormSummary } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { useSøknadFormValues } from '@sif/soknad/consistency';

export const OppsummeringSteg = () => {
    const { setSøknadSendt } = useSøknadFlow();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring } = useSøknadMellomlagring();

    const onSubmit = async () => {
        // TODO: send søknad til API
        await slettMellomlagring();
        clearSøknadFormValues();
        setSøknadSendt();
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
                        {/* TODO: legg til oppsummeringsinnhold basert på søknadsdata */}
                    </FormSummary>
                    <SøknadFormButtons
                        stepId={SøknadStepId.OPPSUMMERING}
                        isPending={false}
                        isFinalSubmit={true}
                        submitLabel="Send inn søknad"
                    />
                </FormLayout.Summary>
            </form>
        </SøknadStep>
    );
};
