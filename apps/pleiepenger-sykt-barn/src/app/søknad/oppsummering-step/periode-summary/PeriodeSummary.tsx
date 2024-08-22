import { FormSummary } from '@navikt/ds-react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { SummaryList } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { AppText, useAppIntl } from '../../../i18n';
import {
    PeriodeApiData,
    SøknadApiData,
    UtenlandsoppholdIPeriodenApiData,
} from '../../../types/søknad-api-data/SøknadApiData';
import {
    renderFerieuttakIPeriodenSummary,
    renderUtenlandsoppholdIPeriodenSummary,
    renderUtenlandsoppholdIPeriodenSummaryTitle,
} from '../summaryItemRenderers';

interface Props {
    apiValues: SøknadApiData;
    søknadsperiode: DateRange;
    onEdit?: () => void;
}

const PeriodeSummary = ({ apiValues, søknadsperiode, onEdit }: Props) => {
    const appIntl = useAppIntl();

    const { utenlandsoppholdIPerioden, ferieuttakIPerioden } = apiValues;
    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="steg.oppsummering.tidsrom.header" />
                    </FormSummary.Heading>
                    {onEdit && <EditStepLink onEdit={onEdit} />}
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.søknadsperiode.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <AppText
                                id="steg.oppsummering.tidsrom.fomtom"
                                values={{
                                    fom: `${dayjs(søknadsperiode.from).format('D. MMMM YYYY')}`,
                                    tom: `${dayjs(søknadsperiode.to).format('D. MMMM YYYY')}`,
                                }}
                            />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {utenlandsoppholdIPerioden && (
                        <>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="steg.oppsummering.utenlandsoppholdIPerioden.header" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <AppText
                                        id={utenlandsoppholdIPerioden.skalOppholdeSegIUtlandetIPerioden ? 'Ja' : 'Nei'}
                                    />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            {utenlandsoppholdIPerioden.opphold.length > 0 && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="steg.oppsummering.utenlandsoppholdIPerioden.listTitle" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <SummaryList<UtenlandsoppholdIPeriodenApiData>
                                            variant="bullet-blocks"
                                            items={utenlandsoppholdIPerioden.opphold}
                                            itemTitleRenderer={renderUtenlandsoppholdIPeriodenSummaryTitle}
                                            itemRenderer={(item) =>
                                                renderUtenlandsoppholdIPeriodenSummary(item, appIntl)
                                            }
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </>
                    )}
                    {ferieuttakIPerioden && (
                        <>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="steg.oppsummering.ferieuttakIPerioden.header" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <AppText id={ferieuttakIPerioden.skalTaUtFerieIPerioden ? 'Ja' : 'Nei'} />
                                </FormSummary.Value>
                            </FormSummary.Answer>

                            {ferieuttakIPerioden.ferieuttak.length > 0 && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="steg.oppsummering.utenlandsoppholdIPerioden.listTitle" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <SummaryList<PeriodeApiData>
                                            useAkselList={true}
                                            items={ferieuttakIPerioden.ferieuttak}
                                            itemRenderer={renderFerieuttakIPeriodenSummary}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </>
                    )}
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default PeriodeSummary;
