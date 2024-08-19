import { FormSummary } from '@navikt/ds-react';
import { JaNeiSvar, SummaryList } from '@navikt/sif-common-ui';
import { getDateToday, ISODateToDate } from '@navikt/sif-common-utils/src';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { AppText } from '../../../../i18n';
import { UtenlandsoppholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export interface Props {
    bosteder: UtenlandsoppholdApiData[];
}

const MedlemskapOppsummering = ({ bosteder }: Props) => {
    const bostederSiste12 = bosteder.filter((b) => dayjs(ISODateToDate(b.tilOgMed)).isSameOrBefore(getDateToday()));
    const bostederNeste12 = bosteder.filter((b) => dayjs(ISODateToDate(b.tilOgMed)).isSameOrAfter(getDateToday()));

    return (
        <>
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
                            <JaNeiSvar harSvartJa={bostederSiste12.length > 0} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {bostederSiste12.length > 0 && (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="step.oppsummering.utlandetSiste12.liste.header" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <SummaryList
                                    items={bostederSiste12}
                                    itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
                                />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummering.utlandetNeste12.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={bostederNeste12.length > 0} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {bostederNeste12.length > 0 && (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="step.oppsummering.utlandetNeste12.liste.header" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <SummaryList
                                    items={bostederNeste12}
                                    itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
                                />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default MedlemskapOppsummering;
