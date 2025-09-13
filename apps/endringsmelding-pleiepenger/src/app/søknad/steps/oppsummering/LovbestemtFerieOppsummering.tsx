import { Heading, List, VStack } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { dateRangeToISODateRange, getDateRangeText } from '@navikt/sif-common-utils';
import { LovbestemtFerieApiData } from '@types';
import { getLovbestemtFerieOppsummeringInfo } from '@utils';
import { AppText } from '../../../i18n';

interface Props {
    lovbestemtFerie: LovbestemtFerieApiData;
}

const LovbestemtFerieOppsummering: React.FunctionComponent<Props> = ({ lovbestemtFerie }) => {
    const { locale } = useIntl();
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return (
        <VStack gap="8">
            {perioderLagtTil.length > 0 && (
                <div>
                    <Heading level="3" size="small" spacing={true}>
                        <AppText id="oppsummeringStep.ferie.lagtTil" />
                    </Heading>
                    <List>
                        {perioderLagtTil.map((periode) => (
                            <List.Item key={dateRangeToISODateRange(periode)}>
                                <div className="capsFirstChar">
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
                                <div className="capsFirstChar">
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
