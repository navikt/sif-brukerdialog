import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import { dateRangeToISODateRange, getDateRangeText } from '@navikt/sif-common-utils';
import { LovbestemtFerieApiData } from '@types';
import { getLovbestemtFerieOppsummeringInfo } from '@utils';

interface Props {
    lovbestemtFerie: LovbestemtFerieApiData;
}

const LovbestemtFerieOppsummering: React.FunctionComponent<Props> = ({ lovbestemtFerie }) => {
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return (
        <>
            {perioderLagtTil.length > 0 && (
                <Block padBottom="m">
                    <Heading level="3" size="small">
                        Ferie som er lagt til
                    </Heading>
                    <InfoList>
                        {perioderLagtTil.map((periode) => (
                            <li key={dateRangeToISODateRange(periode)}>
                                <div className="capsFirstChar">
                                    {getDateRangeText(periode, { compact: true, includeDayName: true })}
                                </div>
                            </li>
                        ))}
                    </InfoList>
                </Block>
            )}
            {perioderFjernet.length > 0 && (
                <Block padBottom="m">
                    <Heading level="3" size="small">
                        Ferie som er fjernet
                    </Heading>
                    <InfoList>
                        {perioderFjernet.map((periode) => (
                            <li key={dateRangeToISODateRange(periode)}>
                                <div className="capsFirstChar">
                                    {getDateRangeText(periode, { compact: true, includeDayName: true })}
                                </div>
                            </li>
                        ))}
                    </InfoList>
                </Block>
            )}
        </>
    );
};

export default LovbestemtFerieOppsummering;
