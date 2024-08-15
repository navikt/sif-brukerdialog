import React from 'react';
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
import { FormSummary } from '@navikt/ds-react/FormSummary';

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

export const renderUtenlandsoppholdIPeriodenSummaryTitle = (opphold: UtenlandsoppholdIPeriodenApiData): string => {
    return `${opphold.landnavn}: ${prettifyDateExtended(ISODateToDate(opphold.fraOgMed))} - ${prettifyDateExtended(ISODateToDate(opphold.tilOgMed))}`;
};
export const renderUtenlandsoppholdIPeriodenSummary = (
    opphold: UtenlandsoppholdIPeriodenApiData,
    { text }: AppIntlShape,
): React.ReactNode => {
    return (
        <>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        {text('@forms.utenlandsopphold.form.erSammenMedBarnet.spm', { land: opphold.landnavn })}
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={opphold.erSammenMedBarnet} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {opphold.erUtenforEøs && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText
                                id="@forms.utenlandsopphold.form.erBarnetInnlagt.spm"
                                values={{
                                    land: opphold.landnavn,
                                }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={opphold.erBarnetInnlagt} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {opphold.erUtenforEøs && (
                    <>
                        {opphold.perioderBarnetErInnlagt !== undefined &&
                            opphold.perioderBarnetErInnlagt.length > 0 && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="@forms.utenlandsopphold.form.perioderBarnetErInnlag.listTitle" />
                                    </FormSummary.Label>
                                    <FormSummary.Value className="fullWidth">
                                        <SummaryList
                                            items={opphold.perioderBarnetErInnlagt}
                                            itemRenderer={(periode: PeriodeApiData) => (
                                                <>
                                                    {prettifyDateExtended(ISODateToDate(periode.fraOgMed))} -{' '}
                                                    {prettifyDateExtended(ISODateToDate(periode.tilOgMed))}
                                                </>
                                            )}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        {opphold.årsak && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText
                                        id="@forms.utenlandsopphold.form.årsak.spm"
                                        values={{ land: opphold.landnavn }}
                                    />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {opphold.årsak !== UtenlandsoppholdÅrsak.ANNET ? (
                                        <AppText
                                            id={`@forms.utenlandsopphold.form.årsak.${opphold.årsak}`}
                                            values={{ land: opphold.landnavn }}
                                        />
                                    ) : (
                                        <AppText id={`@forms.utenlandsopphold.oppsummering.årsak.ANNET`} />
                                    )}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                    </>
                )}
            </FormSummary.Answers>
        </>
    );
};
