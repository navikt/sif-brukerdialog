import React from 'react';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { UtenlandsoppholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import './utenlandsoppholdSummaryItem.css';

export const renderUtenlandsoppholdIPeriodenSummary = (opphold: UtenlandsoppholdApiData): React.ReactNode => {
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
