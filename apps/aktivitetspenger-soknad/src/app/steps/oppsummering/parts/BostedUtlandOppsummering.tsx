import { FormSummary } from '@navikt/ds-react';
import { ForutgåendeBosteder } from '@navikt/k9-brukerdialog-prosessering-api';
import { dateRangeFormatter, ISODate } from '@sif/utils';
import { JaNeiSvar } from '@sif/soknad-ui';
import { useStepNavigation } from '@sif/soknad-app';

import { SøknadStepId } from '../../../types/SoknadStepId';

interface Props {
    forutgåendeBosteder: ForutgåendeBosteder;
}

export const BostedUtlandOppsummering = ({
    forutgåendeBosteder: { harBoddIUtlandetSiste5År, utenlandsoppholdSiste5År },
}: Props) => {
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
                {harBoddIUtlandetSiste5År && utenlandsoppholdSiste5År && (
                    <FormSummary.Answer>
                        <FormSummary.Label>Bosteder</FormSummary.Label>
                        <FormSummary.Value>
                            {utenlandsoppholdSiste5År.map((bosted, index) => (
                                <div key={index}>
                                    {dateRangeFormatter.compact({
                                        from: bosted.fraOgMed as ISODate,
                                        to: bosted.tilOgMed as ISODate,
                                    })}
                                    : {bosted.landnavn}
                                </div>
                            ))}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>

            <FormSummary.Footer>
                <FormSummary.EditLink
                    href="#"
                    onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        navigateToStep(SøknadStepId.BOSTED_UTLAND);
                    }}
                />
            </FormSummary.Footer>
        </FormSummary>
    );
};
