import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { JaNeiSvar, SummaryList } from '@navikt/sif-common-ui';
import { AppText } from '../../../../i18n';
import { MedlemskapApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';

export interface Props {
    medlemskap: MedlemskapApiData;
}

const MedlemskapOppsummering: React.FC<Props> = ({ medlemskap }) => {
    const {
        harBoddIUtlandetSiste12Mnd,
        utenlandsoppholdSiste12Mnd,
        skalBoIUtlandetNeste12Mnd,
        utenlandsoppholdNeste12Mnd,
    } = medlemskap;
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.medlemskap.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.utlandetSiste12.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <div data-testid="oppsummering-medlemskap-utlandetSiste12">
                            <JaNeiSvar harSvartJa={harBoddIUtlandetSiste12Mnd} />
                        </div>
                    </FormSummary.Value>
                </FormSummary.Answer>
                {harBoddIUtlandetSiste12Mnd && utenlandsoppholdSiste12Mnd.length > 0 && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummering.utlandetSiste12.liste.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <div data-testid="oppsummering-medlemskap-utlandetSiste12-list">
                                <SummaryList
                                    useAkselList={true}
                                    items={utenlandsoppholdSiste12Mnd}
                                    itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
                                />
                            </div>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.utlandetNeste12.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <div data-testid="oppsummering-medlemskap-utlandetNeste12">
                            <JaNeiSvar harSvartJa={skalBoIUtlandetNeste12Mnd} />
                        </div>
                    </FormSummary.Value>
                </FormSummary.Answer>
                {skalBoIUtlandetNeste12Mnd && utenlandsoppholdNeste12Mnd.length > 0 && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummering.utlandetNeste12.liste.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <div data-testid="oppsummering-medlemskap-utlandetNeste12-list">
                                <SummaryList
                                    useAkselList={true}
                                    items={utenlandsoppholdNeste12Mnd}
                                    itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
                                />
                            </div>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default MedlemskapOppsummering;
