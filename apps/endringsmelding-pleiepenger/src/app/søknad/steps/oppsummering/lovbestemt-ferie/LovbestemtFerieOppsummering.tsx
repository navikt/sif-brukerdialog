import { AppText } from '@app/i18n';
import { LovbestemtFerieApiData } from '@app/types';
import { getLovbestemtFerieOppsummeringInfo } from '@app/utils';
import { FormSummary, Heading, List, VStack } from '@navikt/ds-react';
import { ActionLink } from '@navikt/sif-common-ui';
import { dateRangeToISODateRange, getDateRangeText } from '@navikt/sif-common-utils';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute } from '../../../config/SøknadRoutes';
import { StepId } from '../../../config/StepId';

interface Props {
    lovbestemtFerie: LovbestemtFerieApiData;
}

const LovbestemtFerieOppsummering = ({ lovbestemtFerie }: Props) => {
    const navigate = useNavigate();
    const { locale } = useIntl();
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return (
        <VStack gap="space-16">
            {perioderLagtTil.length > 0 && (
                <FormSummary>
                    <FormSummary.Header>
                        <Heading level="3" size="small">
                            <AppText id="oppsummeringStep.ferie.lagtTil" />
                        </Heading>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <List>
                                {perioderLagtTil.map((periode) => (
                                    <List.Item key={dateRangeToISODateRange(periode)}>
                                        <div className="capsFirstLetter">
                                            {getDateRangeText(periode, locale, {
                                                compact: true,
                                                includeDayName: true,
                                            })}
                                        </div>
                                    </List.Item>
                                ))}
                            </List>
                        </FormSummary.Answer>
                    </FormSummary.Answers>
                </FormSummary>
            )}
            {perioderFjernet.length > 0 && (
                <FormSummary>
                    <FormSummary.Header>
                        <Heading level="3" size="small">
                            <AppText id="oppsummeringStep.ferie.fjernet" />
                        </Heading>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <List>
                                {perioderFjernet.map((periode) => (
                                    <List.Item key={dateRangeToISODateRange(periode)}>
                                        <div className="capsFirstLetter">
                                            {getDateRangeText(periode, locale, {
                                                compact: true,
                                                includeDayName: true,
                                            })}
                                        </div>
                                    </List.Item>
                                ))}
                            </List>
                        </FormSummary.Answer>
                    </FormSummary.Answers>
                </FormSummary>
            )}
            <VStack gap="space-16">
                <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.LOVBESTEMT_FERIE))}>
                    Gå til endring av ferie
                </ActionLink>
            </VStack>
        </VStack>
    );
};

export default LovbestemtFerieOppsummering;
