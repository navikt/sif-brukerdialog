import { dateFormatter, dateRangeUtils } from '@navikt/sif-common-utils/lib';
import React from 'react';
import { ArbeidsukeMap } from '../../types/K9Sak';

interface Props {
    arbeidsuker: ArbeidsukeMap;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({ arbeidsuker }) => {
    const uker = Object.keys(arbeidsuker).map((key) => arbeidsuker[key]);
    return (
        <div>
            {uker.map((uke, idx) => {
                return (
                    <p key={idx}>
                        {dateRangeUtils.dateRangeToISODateRange(uke.periode)}: {dateFormatter.day(uke.periode.from)} -{' '}
                        {dateFormatter.day(uke.periode.to)}
                    </p>
                );
            })}
        </div>
    );
};

export default ArbeidstidUkeListe;
