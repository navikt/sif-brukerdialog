import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { getTypedFormComponents, UnansweredQuestionsInfo } from '@navikt/sif-common-formik';
import { getYesOrNoValidator } from '@navikt/sif-common-formik/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import FormQuestion from '@navikt/sif-common-soknad/lib/form-question/FormQuestion';
import Lenke from 'nav-frontend-lenker';
import getLenker from '../../lenker';
import { IntroFormData, IntroFormField, introFormInitialValues } from './introFormConfig';

interface Props {
    onValidSubmit: () => void;
}

const IntroFormComponents = getTypedFormComponents<IntroFormField, IntroFormData, ValidationError>();

const IntroForm: React.FunctionComponent<Props> = ({ onValidSubmit }) => {
    const intl = useIntl();

    const getArbeidstakerSnEllerFrilanserSpm = (values: IntroFormData) => {
        return (
            <FormQuestion
                legend={intlHelper(intl, `introForm.form.${IntroFormField.erArbeidstakerSnEllerFrilanser}.spm`)}
                name={IntroFormField.erArbeidstakerSnEllerFrilanser}
                validate={getYesOrNoValidator()}
                showStop={values.erArbeidstakerSnEllerFrilanser === YesOrNo.NO}
                stopMessage={intlHelper(intl, 'introForm.form.erArbeidstakerSnEllerFrilanser.stopMessage')}
            />
        );
    };

    const getMottakersArbeidssituasjonErOk = (values: IntroFormData) => {
        return (
            <FormQuestion
                legend={intlHelper(intl, `introForm.form.${IntroFormField.mottakersArbeidssituasjonErOk}.spm`)}
                name={IntroFormField.mottakersArbeidssituasjonErOk}
                validate={getYesOrNoValidator()}
                showStop={values.mottakersArbeidssituasjonErOk === YesOrNo.NO}
                stopMessage={intlHelper(intl, 'introForm.form.mottakersArbeidssituasjonErOk.stopMessage')}
            />
        );
    };

    const getCommonQuestions = (values: IntroFormData, addAleneomssorgQuestion?: boolean) => {
        return (
            <>
                {addAleneomssorgQuestion && (
                    <>
                        <FormQuestion
                            legend={intlHelper(intl, `introForm.form.${IntroFormField.harAleneomsorg}.spm`)}
                            name={IntroFormField.harAleneomsorg}
                            validate={getYesOrNoValidator()}
                            showStop={values.harAleneomsorg === YesOrNo.NO}
                            stopMessage={intlHelper(intl, 'introForm.form.harAleneomsorg.stopMessage')}
                            description={
                                <ExpandableInfo
                                    title={intlHelper(intl, 'introForm.form.harAleneomsorg.spm.nedtrekk.titel')}>
                                    {intlHelper(intl, 'introForm.form.harAleneomsorg.spm.nedtrekk.1')}
                                    <p>{intlHelper(intl, 'introForm.form.harAleneomsorg.spm.nedtrekk.2')}</p>
                                    <p>
                                        <Lenke href={getLenker().merOmFastBostedOgSamvær}>
                                            {intlHelper(intl, 'introForm.form.harAleneomsorg.spm.nedtrekk.link')}
                                        </Lenke>
                                    </p>
                                </ExpandableInfo>
                            }
                        />
                        {values.harAleneomsorg === YesOrNo.YES && getArbeidstakerSnEllerFrilanserSpm(values)}
                        {values.harAleneomsorg === YesOrNo.YES &&
                            values.erArbeidstakerSnEllerFrilanser === YesOrNo.YES &&
                            getMottakersArbeidssituasjonErOk(values)}
                    </>
                )}
                {addAleneomssorgQuestion === undefined && getArbeidstakerSnEllerFrilanserSpm(values)}
                {addAleneomssorgQuestion === undefined &&
                    values.erArbeidstakerSnEllerFrilanser === YesOrNo.YES &&
                    getMottakersArbeidssituasjonErOk(values)}
            </>
        );
    };

    const getQuestions = (values: IntroFormData) => {
        switch (values.korona) {
            case YesOrNo.YES:
                return getCommonQuestions(values);
            case YesOrNo.NO:
                return (
                    <>
                        <FormQuestion
                            legend={intlHelper(
                                intl,
                                `introForm.form.${IntroFormField.mottakerErEktefelleEllerSamboer}.spm`
                            )}
                            name={IntroFormField.mottakerErEktefelleEllerSamboer}
                            validate={getYesOrNoValidator()}
                        />
                        {values.mottakerErEktefelleEllerSamboer === YesOrNo.YES && getCommonQuestions(values, true)}
                        {values.mottakerErEktefelleEllerSamboer === YesOrNo.NO && (
                            <>
                                <FormQuestion
                                    legend={intlHelper(
                                        intl,
                                        `introForm.form.${IntroFormField.mottakerSamværsforelder}.spm`
                                    )}
                                    name={IntroFormField.mottakerSamværsforelder}
                                    validate={getYesOrNoValidator()}
                                    showStop={values.mottakerSamværsforelder === YesOrNo.NO}
                                    stopMessage={intlHelper(intl, 'introForm.form.mottakerSamværsforelder.stopMessage')}
                                />
                                {values.mottakerSamværsforelder === YesOrNo.YES && getCommonQuestions(values, true)}
                            </>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    const kanFortsetteFn = (values: IntroFormData): { kanFortsette: boolean; erStoppet: boolean } => {
        const arbeidsSituasjonErOkHosBegge =
            values.erArbeidstakerSnEllerFrilanser === YesOrNo.YES &&
            values.mottakersArbeidssituasjonErOk === YesOrNo.YES;

        const stoppPgaArbeidssituasjon =
            values.erArbeidstakerSnEllerFrilanser === YesOrNo.NO || values.mottakersArbeidssituasjonErOk === YesOrNo.NO;

        const kanFortsetteKorona = values.korona === YesOrNo.YES && arbeidsSituasjonErOkHosBegge;

        const kanFortsetteVanlig =
            values.korona === YesOrNo.NO &&
            values.mottakerErEktefelleEllerSamboer === YesOrNo.YES &&
            values.harAleneomsorg === YesOrNo.YES &&
            arbeidsSituasjonErOkHosBegge;

        const kanFortsetteSamværsforelder =
            values.korona === YesOrNo.NO &&
            values.mottakerErEktefelleEllerSamboer === YesOrNo.NO &&
            values.mottakerSamværsforelder === YesOrNo.YES &&
            values.harAleneomsorg === YesOrNo.YES &&
            arbeidsSituasjonErOkHosBegge;

        const stoppIngenValgtSituasjon =
            values.mottakerSamværsforelder === YesOrNo.NO && values.mottakerErEktefelleEllerSamboer === YesOrNo.NO;

        return {
            kanFortsette: kanFortsetteKorona || kanFortsetteVanlig || kanFortsetteSamværsforelder,
            erStoppet: stoppPgaArbeidssituasjon || stoppIngenValgtSituasjon,
        };
    };

    return (
        <IntroFormComponents.FormikWrapper
            initialValues={introFormInitialValues}
            onSubmit={() => {
                onValidSubmit();
            }}
            renderForm={({ values }) => {
                const { kanFortsette, erStoppet } = kanFortsetteFn(values);
                return (
                    <section aria-label="Se om du kan bruke det dette skjemaet:">
                        <IntroFormComponents.Form
                            includeValidationSummary={true}
                            includeButtons={kanFortsette}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'introForm.validation')}
                            noButtonsContentRenderer={
                                kanFortsette || erStoppet
                                    ? undefined
                                    : () => (
                                          <UnansweredQuestionsInfo>
                                              <FormattedMessage id="page.form.ubesvarteSpørsmålInfo" />
                                          </UnansweredQuestionsInfo>
                                      )
                            }
                            submitButtonLabel={intlHelper(intl, 'introForm.start')}>
                            <FormQuestion
                                legend={intlHelper(intl, `introForm.form.${IntroFormField.korona}.spm`)}
                                name={IntroFormField.korona}
                                validate={getYesOrNoValidator()}
                                description={
                                    <ExpandableInfo title={intlHelper(intl, 'introForm.form.hvaBetyr')}>
                                        {intlHelper(intl, 'introForm.form.korona.hvaBetyr')}
                                    </ExpandableInfo>
                                }
                            />
                            {getQuestions(values)}
                        </IntroFormComponents.Form>
                    </section>
                );
            }}
        />
    );
};

export default IntroForm;
