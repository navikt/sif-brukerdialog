import { FormSummary } from '@navikt/ds-react';
import { JaNeiSvar } from '@sif/soknad-ui';
import { useStepNavigation } from '@sif/soknad-app';

import { SøknadStepId } from '../../../types/SoknadStepId';
import { AppText } from '../../../i18n';

interface Props {
    erBosattITrondheim: boolean;
}

export const BostedOppsummering = ({ erBosattITrondheim }: Props) => {
    const { navigateToStep } = useStepNavigation();
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="oppsummeringSteg.bosted.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>

            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.bosted.erBosattITrondheim" />
                    </FormSummary.Label>
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
