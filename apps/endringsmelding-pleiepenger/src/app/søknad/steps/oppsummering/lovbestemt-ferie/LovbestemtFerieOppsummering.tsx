import { AppText } from '@app/i18n';
import { LovbestemtFerieApiData } from '@app/types';
import { getLovbestemtFerieOppsummeringInfo } from '@app/utils';
import { Heading, List, VStack } from '@navikt/ds-react';
import { dateRangeToISODateRange, getDateRangeText } from '@navikt/sif-common-utils';
import { useIntl } from 'react-intl';

interface Props {
    lovbestemtFerie: LovbestemtFerieApiData;
}

const LovbestemtFerieOppsummering = ({ lovbestemtFerie }: Props) => {
    const { locale } = useIntl();
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return (
        <VStack gap="space-32">
            {perioderLagtTil.length > 0 && (
                <div>
                    <Heading level="3" size="small" spacing={true}>
                        <AppText id="oppsummeringStep.ferie.lagtTil" />
                    </Heading>
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
                </div>
            )}
            {perioderFjernet.length > 0 && (
                <div>
                    <Heading level="3" size="small" spacing={true}>
                        <AppText id="oppsummeringStep.ferie.fjernet" />
                    </Heading>
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
                </div>
            )}
        </VStack>
    );
};

export default LovbestemtFerieOppsummering;
