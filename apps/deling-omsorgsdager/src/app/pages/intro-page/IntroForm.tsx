import React from 'react';
import { useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import FormQuestion from '@navikt/sif-common-soknad-ds/lib/form-question/FormQuestion';
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

    const erStoppet = (values: IntroFormData): boolean => {
        if (values.korona === YesOrNo.YES) {
            if (values.erArbeidstakerSnEllerFrilanser === YesOrNo.NO) {
                return true;
            }
            if (values.mottakersArbeidssituasjonErOk === YesOrNo.NO) {
                return true;
            }
        } else {
            if (values.mottakerErEktefelleEllerSamboer === YesOrNo.NO) {
                if (values.mottakerSamværsforelder === YesOrNo.NO) {
                    return true;
                }
                if (values.harAleneomsorg === YesOrNo.NO) {
                    return true;
                }
                if (values.mottakersArbeidssituasjonErOk === YesOrNo.NO) {
                    return true;
                }
                if (values.erArbeidstakerSnEllerFrilanser === YesOrNo.NO) {
                    return true;
                }
            }
            if (values.mottakerErEktefelleEllerSamboer === YesOrNo.YES) {
                if (values.harAleneomsorg === YesOrNo.NO) {
                    return true;
                }
                if (values.mottakersArbeidssituasjonErOk === YesOrNo.NO) {
                    return true;
                }
                if (values.erArbeidstakerSnEllerFrilanser === YesOrNo.NO) {
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <IntroFormComponents.FormikWrapper
            initialValues={introFormInitialValues}
            onSubmit={() => {
                onValidSubmit();
            }}
            renderForm={({ values }) => {
                return (
                    <section aria-label="Se om du kan bruke det dette skjemaet:">
                        <IntroFormComponents.Form
                            includeValidationSummary={true}
                            includeButtons={erStoppet(values) ? false : true}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'introForm.validation')}
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
