import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import { dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import { getPeriodeTekst } from '../../../components/periode-tekst/PeriodeTekst';
import { LovbestemtFerieApiData } from '../../../types/søknadApiData/SøknadApiData';
import { getLovbestemtFerieOppsummeringInfo } from '../../../utils/oppsummeringUtils';

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
                                <div className="capsFirstChar">{getPeriodeTekst(periode, true, true)}</div>
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
                                <div className="capsFirstChar">{getPeriodeTekst(periode, true, true)}</div>
                            </li>
                        ))}
                    </InfoList>
                </Block>
            )}
        </>
    );
};

export default LovbestemtFerieOppsummering;
