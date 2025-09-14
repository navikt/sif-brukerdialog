import './utenlandsoppholdSummaryItem.css';

import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import React from 'react';

import { UtenlandsoppholdApiData } from '../../../../types/søknadApiData/SøknadApiData';

export const renderUtenlandsoppholdIPeriodenSummary = (opphold: UtenlandsoppholdApiData): React.ReactNode => {
    return (
        <div className="utenlandsoppholdSummaryItem">
            <span className="utenlandsoppholdSummaryItem__dates">
                {prettifyDateExtended(ISODateToDate(opphold.fraOgMed))} -{' '}
                {prettifyDateExtended(ISODateToDate(opphold.tilOgMed))}
            </span>
            <span>{opphold.landnavn}</span>
        </div>
    );
};
