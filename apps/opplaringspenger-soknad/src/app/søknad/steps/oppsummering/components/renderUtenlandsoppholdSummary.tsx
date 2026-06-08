import './utenlandsoppholdSummaryItem.css';

import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import React from 'react';

import { BostedUtlandApiData } from '../../../../types/søknadApiData/SøknadApiData';

export const renderUtenlandsoppholdIPeriodenSummary = (opphold: BostedUtlandApiData): React.ReactNode => {
    return (
        <div className="utenlandsoppholdSummaryItem">
            <span className="utenlandsoppholdSummaryItem__dates">
                {dateFormatter.full(ISODateToDate(opphold.fraOgMed))} -{' '}
                {dateFormatter.full(ISODateToDate(opphold.tilOgMed))}
            </span>
            <span>{opphold.landnavn}</span>
        </div>
    );
};
