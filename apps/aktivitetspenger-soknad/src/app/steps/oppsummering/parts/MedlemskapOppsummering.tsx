import { FormSummary } from '@navikt/ds-react';
import { MedlemskapAktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { JaNeiSvar } from '@sif/soknad-ui';
import { useStepNavigation } from '@sif/soknad-app';

import { SøknadStepId } from '../../../types/SoknadStepId';

interface Props {
    medlemskap: MedlemskapAktivitetspenger;
}

export const MedlemskapOppsummering = ({ medlemskap: { harBoddIUtlandetSiste5År } }: Props) => {
    const { navigateToStep } = useStepNavigation();
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">Bosted i utlandet</FormSummary.Heading>
            </FormSummary.Header>

            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Har du bodd i utlandet de siste 5 årene?</FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={harBoddIUtlandetSiste5År} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>

            <FormSummary.Footer>
                <FormSummary.EditLink
                    href="#"
                    onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        navigateToStep(SøknadStepId.MEDLEMSKAP);
                    }}
                />
            </FormSummary.Footer>
        </FormSummary>
    );
};
