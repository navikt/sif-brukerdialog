import { FormSummary } from '@navikt/ds-react';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { SummaryList } from '@navikt/sif-common-ui';
import { AppText } from '../../../../i18n';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';
import ValgteDagerMedPleie from './ValgteDagerMedPleie';

interface Props {
    dagerMedPleie: Date[];
    apiData: SøknadApiData;
    onEdit?: () => void;
}

const TidsromOppsummering = ({ apiData, dagerMedPleie, onEdit }: Props) => {
    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="step.oppsummeringtidsrom.header" />
                    </FormSummary.Heading>
                    {onEdit && <EditStepLink onEdit={onEdit} />}
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText
                                id="step.oppsummeringtidsrom.valgteDager.header"
                                values={{ dager: dagerMedPleie.length }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <ValgteDagerMedPleie dagerMedPleie={dagerMedPleie} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummeringpleierDuDenSykeHjemme.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <AppText id={apiData.pleierDuDenSykeHjemme ? 'Ja' : 'Nei'} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummeringskalJobbeOgPleieSammeDag.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <AppText id={apiData.skalJobbeOgPleieSammeDag ? 'Ja' : 'Nei'} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {apiData.utenlandsoppholdIPerioden && (
                        <>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="step.oppsummeringutenlandsoppholdIPerioden.header" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <AppText
                                        id={
                                            apiData.utenlandsoppholdIPerioden.skalOppholdeSegIUtlandetIPerioden
                                                ? 'Ja'
                                                : 'Nei'
                                        }
                                    />
                                </FormSummary.Value>
                            </FormSummary.Answer>

                            {apiData.utenlandsoppholdIPerioden.opphold.length > 0 && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="step.oppsummeringutenlandsoppholdIPerioden.listetittel" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <SummaryList
                                            useAkselList={true}
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
};

export default TidsromOppsummering;
