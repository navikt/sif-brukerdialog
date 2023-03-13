import { Heading } from '@navikt/ds-react';
import React from 'react';
import { dateRangeToISODateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { LovbestemtFerieApiData } from '../../../types/søknadApiData/SøknadApiData';
import { getPeriodeTekst } from '../../../components/periode-tekst/PeriodeTekst';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';

interface Props {
    lovbestemtFerie: LovbestemtFerieApiData;
}

const LovbestemtFerieOppsummering: React.FunctionComponent<Props> = ({ lovbestemtFerie }) => {
    const perioderLagtTil = Object.keys(lovbestemtFerie.perioderLagtTil).map(ISODateRangeToDateRange);
    const perioderFjernet = Object.keys(lovbestemtFerie.perioderFjernet).map(ISODateRangeToDateRange);

    return (
        <>
            {perioderLagtTil.length > 0 && (
                <Block padBottom="m">
                    <Heading level="3" size="small">
                        Lovbestemt ferie som er lagt til
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
                        Lovbestemt ferie som er fjernet
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
