import { FormSummary } from '@navikt/ds-react';
import { JaNeiSvar } from '@sif/soknad-ui';

import { SøknadStepId } from '../../../setup/config/SoknadStepId';
import { useSøknadsflyt } from '../../../setup/hooks';

interface Props {
    erBosattITrondheim: boolean;
}

export const BostedOppsummering = ({ erBosattITrondheim }: Props) => {
    const { navigateToStep } = useSøknadsflyt();
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">Bosted</FormSummary.Heading>
            </FormSummary.Header>

            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Er du bosatt i Trondheim kommune?</FormSummary.Label>
                    <FormSummary.Value className="capitalize">
                        <JaNeiSvar harSvartJa={erBosattITrondheim} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>

            <FormSummary.Footer>
                <FormSummary.EditLink
                    href="#"
                    onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        navigateToStep(SøknadStepId.BOSTED);
                    }}
                />
            </FormSummary.Footer>
        </FormSummary>
    );
};
