import { FormSummary } from '@navikt/ds-react';
import { JaNeiSvar, SummaryList } from '@navikt/sif-common-ui';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';
import ValgteDagerMedPleie from './ValgteDagerMedPleie';

interface Props {
    dagerMedPleie: Date[];
    apiData: SøknadApiData;
}

const TidsromOppsummering = ({ apiData, dagerMedPleie }: Props) => (
    <>
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="steg.oppsummering.tidsrom.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText
                            id="steg.oppsummering.tidsrom.valgteDager.header"
                            values={{ dager: dagerMedPleie.length }}
                        />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <ValgteDagerMedPleie dagerMedPleie={dagerMedPleie} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.pleierDuDenSykeHjemme.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={apiData.pleierDuDenSykeHjemme} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.skalJobbeOgPleieSammeDag.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={apiData.skalJobbeOgPleieSammeDag} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {apiData.utenlandsoppholdIPerioden && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="steg.oppsummering.utenlandsoppholdIPerioden.header" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <JaNeiSvar
                                    harSvartJa={apiData.utenlandsoppholdIPerioden.skalOppholdeSegIUtlandetIPerioden}
                                />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        {apiData.utenlandsoppholdIPerioden.opphold.length > 0 && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="steg.oppsummering.utenlandsoppholdIPerioden.listetittel" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <SummaryList
                                        items={apiData.utenlandsoppholdIPerioden.opphold}
                                        itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
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

export default TidsromOppsummering;
