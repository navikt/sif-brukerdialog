import React from 'react';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { BostedUtlandApiData } from '../../../../types/søknadApiData/SøknadApiData';
import './utenlandsoppholdSummaryItem.css';

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
