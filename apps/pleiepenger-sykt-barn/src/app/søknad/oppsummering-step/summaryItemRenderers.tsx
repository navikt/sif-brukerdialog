import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { UtenlandsoppholdÅrsak } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { JaNeiSvar, SummaryList } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import classNames from 'classnames';
import { AppIntlShape, AppText } from '../../i18n';
import {
    BostedUtlandApiData,
    isUtenlandsoppholdUtenforEØSApiData,
    PeriodeApiData,
    UtenlandsoppholdIPeriodenApiData,
} from '../../types/søknad-api-data/SøknadApiData';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';

const bem = bemUtils('utenlandsoppholdSummaryItem');

export const renderFerieuttakIPeriodenSummary = (ferieuttak: PeriodeApiData): React.ReactNode => (
    <div className={classNames(bem.block, bem.modifier('no-details'))}>
        <span className={bem.element('dates')}>
            {prettifyDateExtended(ISODateToDate(ferieuttak.fraOgMed))} -{' '}
            {prettifyDateExtended(ISODateToDate(ferieuttak.tilOgMed))}
        </span>
    </div>
);

export const renderUtenlandsoppholdSummary = (opphold: BostedUtlandApiData): React.ReactNode => (
    <div className={bem.block}>
        <span className={bem.element('dates')}>
            {prettifyDateExtended(ISODateToDate(opphold.fraOgMed))} -{' '}
            {prettifyDateExtended(ISODateToDate(opphold.tilOgMed))}
        </span>
        <span className={bem.element('country')}>{opphold.landnavn}</span>
    </div>
);

export const renderUtenlandsoppholdIPeriodenSummary = (
    opphold: UtenlandsoppholdIPeriodenApiData,
    { text }: AppIntlShape,
): React.ReactNode => {
    return (
        <>
            <Block>
                <span className={bem.element('dates')}>
                    {prettifyDateExtended(ISODateToDate(opphold.fraOgMed))} -{' '}
                    {prettifyDateExtended(ISODateToDate(opphold.tilOgMed))}
                </span>
                <span className={bem.element('country')}>{opphold.landnavn}</span>
            </Block>
            {isUtenlandsoppholdUtenforEØSApiData(opphold) && opphold.erBarnetInnlagt === true && (
                <Block margin="l">
                    <ContentWithHeader header={text('@forms.utenlandsopphold.form.erBarnetInnlagt.spm')}>
                        <JaNeiSvar harSvartJa={opphold.erBarnetInnlagt} />
                    </ContentWithHeader>

                    {opphold.perioderBarnetErInnlagt !== undefined && opphold.perioderBarnetErInnlagt.length > 0 && (
                        <>
                            <AppText id={`@forms.utenlandsopphold.form.perioderBarnetErInnlag.listTitle`} />:
                            <SummaryList
                                items={opphold.perioderBarnetErInnlagt}
                                itemRenderer={(periode: PeriodeApiData) => (
                                    <>
                                        {prettifyDateExtended(ISODateToDate(periode.fraOgMed))} -{' '}
                                        {prettifyDateExtended(ISODateToDate(periode.tilOgMed))}
                                    </>
                                )}></SummaryList>
                        </>
                    )}
                    {opphold.årsak && opphold.årsak !== UtenlandsoppholdÅrsak.ANNET && (
                        <AppText
                            id={`@forms.utenlandsopphold.form.årsak.${opphold.årsak}`}
                            values={{ land: opphold.landnavn }}
                        />
                    )}
                    {opphold.årsak && opphold.årsak === UtenlandsoppholdÅrsak.ANNET && (
                        <AppText id={`@forms.utenlandsopphold.oppsummering.årsak.ANNET`} />
                    )}
                </Block>
            )}
            {isUtenlandsoppholdUtenforEØSApiData(opphold) && opphold.erBarnetInnlagt === false && (
                <Block margin="l">
                    asd
                    <ContentWithHeader header={text('@forms.utenlandsopphold.form.erBarnetInnlagt.spm')}>
                        <JaNeiSvar harSvartJa={opphold.erBarnetInnlagt} />
                    </ContentWithHeader>
                    <ContentWithHeader header={text('@forms.utenlandsopphold.form.erSammenMedBarnet.spm')}>
                        <JaNeiSvar harSvartJa={opphold.erSammenMedBarnet} />
                    </ContentWithHeader>
                </Block>
            )}
        </>
    );
};
