import { Box, Heading, VStack } from '@navikt/ds-react';
import React from 'react';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { UtenlandsoppholdÅrsak } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { JaNeiSvar, SummaryList } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import classNames from 'classnames';
import { AppIntlShape, AppText } from '../../i18n';
import {
    BostedUtlandApiData,
    PeriodeApiData,
    UtenlandsoppholdIPeriodenApiData,
} from '../../types/søknad-api-data/SøknadApiData';

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
        <Box style={{ paddingBottom: '1rem' }}>
            <Heading level="3" size="xsmall" spacing={true}>
                {opphold.landnavn}: {prettifyDateExtended(ISODateToDate(opphold.fraOgMed))} -{' '}
                {prettifyDateExtended(ISODateToDate(opphold.tilOgMed))}
            </Heading>

            <VStack gap="4" style={{ paddingLeft: '1.5rem' }}>
                <ContentWithHeader
                    header={text('@forms.utenlandsopphold.form.erSammenMedBarnet.spm', { land: opphold.landnavn })}>
                    <JaNeiSvar harSvartJa={opphold.erSammenMedBarnet} />
                </ContentWithHeader>

                {opphold.erUtenforEøs && (
                    <>
                        <ContentWithHeader
                            header={text('@forms.utenlandsopphold.form.erBarnetInnlagt.spm', {
                                land: opphold.landnavn,
                            })}>
                            <JaNeiSvar harSvartJa={opphold.erBarnetInnlagt} />
                        </ContentWithHeader>

                        {opphold.perioderBarnetErInnlagt !== undefined &&
                            opphold.perioderBarnetErInnlagt.length > 0 && (
                                <ContentWithHeader
                                    header={text('@forms.utenlandsopphold.form.perioderBarnetErInnlag.listTitle')}>
                                    <SummaryList
                                        items={opphold.perioderBarnetErInnlagt}
                                        itemRenderer={(periode: PeriodeApiData) => (
                                            <>
                                                {prettifyDateExtended(ISODateToDate(periode.fraOgMed))} -{' '}
                                                {prettifyDateExtended(ISODateToDate(periode.tilOgMed))}
                                            </>
                                        )}></SummaryList>
                                </ContentWithHeader>
                            )}
                        {opphold.årsak && (
                            <ContentWithHeader
                                header={text('@forms.utenlandsopphold.form.årsak.spm', {
                                    land: opphold.landnavn,
                                })}>
                                {opphold.årsak !== UtenlandsoppholdÅrsak.ANNET ? (
                                    <AppText
                                        id={`@forms.utenlandsopphold.form.årsak.${opphold.årsak}`}
                                        values={{ land: opphold.landnavn }}
                                    />
                                ) : (
                                    <AppText id={`@forms.utenlandsopphold.oppsummering.årsak.ANNET`} />
                                )}
                            </ContentWithHeader>
                        )}
                    </>
                )}
            </VStack>
        </Box>
    );
};
