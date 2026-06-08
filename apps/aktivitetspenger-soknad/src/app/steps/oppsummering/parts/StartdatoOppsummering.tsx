import { FormSummary } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { AppText } from '../../../i18n';
import { SøknadStepId } from '../../../setup/config/SoknadStepId';
import { useSøknadsflyt } from '../../../setup/hooks';

interface Props {
    startdato: Date;
}

export const StartdatoOppsummering = ({ startdato }: Props) => {
    const { navigateToStep } = useSøknadsflyt();
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="oppsummeringSteg.startdato.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>

            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.startdato.label" />
                    </FormSummary.Label>
                    <FormSummary.Value className="capitalize">
                        {dateFormatter.dayCompactDate(startdato)}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>

            <FormSummary.Footer>
                <FormSummary.EditLink
                    href="#"
                    onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        navigateToStep(SøknadStepId.STARTDATO);
                    }}
                />
            </FormSummary.Footer>
        </FormSummary>
    );
};
