import React from 'react';
import { BostedUtlandApiData } from '@navikt/sif-common-forms-ds/src';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import './utenlandsoppholdSummaryItem.css';

export const renderUtenlandsoppholdIPeriodenSummary = (opphold: BostedUtlandApiData): React.ReactNode => {
    return (
        <div className={'utenlandsoppholdSummaryItem'}>
            <span className={'utenlandsoppholdSummaryItem__dates'}>
                {prettifyDateExtended(ISODateToDate(opphold.fraOgMed))} -{' '}
                {prettifyDateExtended(ISODateToDate(opphold.tilOgMed))}
            </span>
            <span>{opphold.landnavn}</span>
        </div>
    );
};
