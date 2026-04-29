import { FormSummary } from '@navikt/ds-react';
import { ForutgåendeBosteder } from '@navikt/k9-brukerdialog-prosessering-api/src/generated/aktivitetspenger';
import { dateRangeFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { JaNeiSvar } from '@sif/soknad-ui';

import { SøknadStepId } from '../../../setup/config/SoknadStepId';
import { useSøknadsflyt } from '../../../setup/hooks';

interface Props {
    forutgåendeBosteder: ForutgåendeBosteder;
}

export const BostedUtlandOppsummering = ({
    forutgåendeBosteder: { harBoddIUtlandetSiste5År, utenlandsoppholdSiste5År },
}: Props) => {
    const { navigateToStep } = useSøknadsflyt();
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
                                        from: ISODateToDate(bosted.fraOgMed),
                                        to: ISODateToDate(bosted.tilOgMed),
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
