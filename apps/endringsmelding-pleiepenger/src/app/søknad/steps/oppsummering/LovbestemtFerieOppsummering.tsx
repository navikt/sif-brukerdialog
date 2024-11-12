import { Heading, List } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
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
        <>
            {perioderLagtTil.length > 0 && (
                <Block padBottom="m">
                    <Heading level="3" size="small">
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
                </Block>
            )}
            {perioderFjernet.length > 0 && (
                <Block padBottom="m">
                    <Heading level="3" size="small">
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
                </Block>
            )}
        </>
    );
};

export default LovbestemtFerieOppsummering;
