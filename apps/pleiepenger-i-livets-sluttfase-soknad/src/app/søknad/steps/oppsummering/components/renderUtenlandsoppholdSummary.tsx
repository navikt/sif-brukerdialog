import React from 'react';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { BostedUtlandApiData, PeriodeApiData } from '../../../../types/søknadApiData/SøknadApiData';
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

export const renderFerieuttakIPeriodenSummary = (ferieuttak: PeriodeApiData): React.ReactNode => (
    <div className={'utenlandsoppholdSummaryItem'}>
        <span className={'utenlandsoppholdSummaryItem__dates'}>
            {prettifyDateExtended(ISODateToDate(ferieuttak.fraOgMed))} -{' '}
            {prettifyDateExtended(ISODateToDate(ferieuttak.tilOgMed))}
        </span>
    </div>
);
