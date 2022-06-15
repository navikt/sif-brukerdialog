import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/layout/expandable-info/ExpandableInfo';
import FormattedHtmlMessage from '@navikt/sif-common-core/lib/components/formatted-html-message/FormattedHtmlMessage';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import {
    getFødselsnummerValidator,
    getNumberValidator,
    getRequiredFieldValidator,
    getStringValidator,
    getYesOrNoValidator,
} from '@navikt/sif-common-formik-ds/lib/validation';
import { QuestionVisibilityContext } from '@navikt/sif-common-soknad-ds/lib/question-visibility/QuestionVisibilityContext';
import { useFormikContext } from 'formik';
import StepIntroduction from '../../components/step-introduction/StepIntroduction';
import { Person } from '../../types/Person';
import { Mottaker, SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormQuestion from '../SoknadFormQuestion';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import { getMottakerFormStopp, MottakerFormQuestions } from './mottakerStepFormConfig';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';

export const ANTALL_DAGER_RANGE = { min: 1, max: 10 };
export const ANTALL_DAGER_KORONA_RANGE = { min: 1, max: 999 };

const getAntallDagerOptions = (intl: IntlShape): React.ReactNode => {
    const options = [<option key={'none'}></option>];
    let dag = ANTALL_DAGER_RANGE.min;
    while (dag <= ANTALL_DAGER_RANGE.max) {
        options.push(
            <option key={dag} value={dag.toString()}>
                {intlHelper(intl, 'dager', { dager: dag.toString() })}
            </option>
        );
        dag++;
    }
    return options;
};

type Props = {
    søker: Person;
};

const cleanupMottakerStep = (formData: SoknadFormData): SoknadFormData => {
    const gjelderKorona = formData.gjelderMidlertidigPgaKorona === YesOrNo.YES;

    return {
        ...formData,
        ...(gjelderKorona
            ? {
                  mottakerType: undefined,
              }
            : {
                  skalDeleMedAndreForelderSamboerEktefelle: YesOrNo.UNANSWERED,
              }),
    };
};

const getMottakertypeRadios = (intl: IntlShape): FormikRadioProp[] => {
    return [
        {
            label: intlHelper(intl, `step.mottaker.form.mottakerType.${Mottaker.samværsforelder}`),
            value: Mottaker.samværsforelder,
        },
        {
            label: intlHelper(intl, `step.mottaker.form.mottakerType.${Mottaker.ektefelle}`),
            value: Mottaker.ektefelle,
        },
        {
            label: intlHelper(intl, `step.mottaker.form.mottakerType.${Mottaker.samboer}`),
            value: Mottaker.samboer,
        },
    ];
};

const MottakerStep: React.FunctionComponent<Props> = ({ søker }) => {
    const intl = useIntl();
    const stepId = StepID.MOTTAKER;
    const { values } = useFormikContext<SoknadFormData>();
    const stopp = getMottakerFormStopp(values);
    const visibility = MottakerFormQuestions.getVisbility(values);
    const kanFortsette = stopp === undefined;
    const { gjelderMidlertidigPgaKorona, skalDeleMedAndreForelderSamboerEktefelle } = values;

    return (
        <SoknadFormStep id={stepId} showSubmitButton={kanFortsette} onStepCleanup={cleanupMottakerStep}>
            <StepIntroduction>
                <p>{intlHelper(intl, 'step.mottaker.veileder.1')}</p>
                <p>{intlHelper(intl, 'step.mottaker.veileder.2')}</p>
                <ul>
                    <li>
                        <ExpandableInfo
                            title={intlHelper(intl, 'step.mottaker.veileder.2.nedtrek.tittel')}
                            filledBackground={false}>
                            {intlHelper(intl, 'step.mottaker.veileder.2.nedtrek')}
                        </ExpandableInfo>
                    </li>
                    <li>
                        <ExpandableInfo
                            title={intlHelper(intl, 'step.mottaker.veileder.3.nedterk.tittel')}
                            filledBackground={false}>
                            <p>{intlHelper(intl, 'step.mottaker.veileder.4')}</p>
                            <ul>
                                <li>{intlHelper(intl, 'step.mottaker.veileder.4.1')}</li>
                                <li>{intlHelper(intl, 'step.mottaker.veileder.4.2')}</li>
                            </ul>
                            <p>{intlHelper(intl, 'step.mottaker.veileder.5')}</p>
                        </ExpandableInfo>
                    </li>
                    <li>
                        <ExpandableInfo
                            title={intlHelper(intl, 'step.mottaker.veileder.5.nedtrek.1.tittel')}
                            filledBackground={false}>
                            {intlHelper(intl, 'step.mottaker.veileder.5.nedtrek.1.2021')}
                        </ExpandableInfo>
                    </li>
                </ul>
            </StepIntroduction>
            <QuestionVisibilityContext.Provider value={{ visibility }}>
                <SoknadFormQuestion
                    name={SoknadFormField.gjelderMidlertidigPgaKorona}
                    legend={intlHelper(intl, 'step.mottaker.form.gjelderMidlertidigPgaKorona.spm')}
                    validate={getYesOrNoValidator()}
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'hvaBetyrDette')}>
                            {intlHelper(intl, 'step.mottaker.form.gjelderMidlertidigPgaKorona.hvaBetyr.svar')}
                        </ExpandableInfo>
                    }
                />

                <SoknadFormQuestion
                    name={SoknadFormField.skalDeleMedAndreForelderSamboerEktefelle}
                    legend={intlHelper(intl, 'step.mottaker.form.skalDeleMedAndreForelderSamboerEktefelle.spm')}
                    validate={getYesOrNoValidator()}
                    showStop={skalDeleMedAndreForelderSamboerEktefelle === YesOrNo.NO}
                    stopMessage={<FormattedHtmlMessage id="step.mottaker.form.stopMessage.korona.html" />}
                />

                <SoknadFormQuestion name={SoknadFormField.mottakerType}>
                    <SoknadFormComponents.RadioGroup
                        name={SoknadFormField.mottakerType}
                        legend={intlHelper(intl, 'step.mottaker.form.mottakerType.spm')}
                        validate={getRequiredFieldValidator()}
                        radios={getMottakertypeRadios(intl)}
                        description={
                            <ExpandableInfo
                                title={intlHelper(
                                    intl,
                                    'step.mottaker.form.mottakerType.ingenValgt.infoVarsel.hvaBetyr'
                                )}>
                                {intlHelper(intl, 'step.mottaker.form.mottakerType.ingenValgt.infoVarsel')}
                            </ExpandableInfo>
                        }
                    />
                </SoknadFormQuestion>

                <SoknadFormQuestion name={SoknadFormField.fnrMottaker}>
                    <SoknadFormComponents.TextField
                        name={SoknadFormField.fnrMottaker}
                        label={intlHelper(intl, 'step.mottaker.form.fnr.spm')}
                        validate={getFødselsnummerValidator({
                            required: true,
                            disallowedValues: [søker.fødselsnummer],
                        })}
                        inputMode="numeric"
                        maxLength={11}
                        minLength={11}
                        style={{ maxWidth: '11rem' }}
                    />
                </SoknadFormQuestion>

                <SoknadFormQuestion name={SoknadFormField.navnMottaker}>
                    <SoknadFormComponents.TextField
                        name={SoknadFormField.navnMottaker}
                        label={intlHelper(intl, 'step.mottaker.form.navn.spm')}
                        validate={(value) => {
                            const error = getStringValidator({ required: true, minLength: 2, maxLength: 50 })(value);
                            return error
                                ? {
                                      key: error,
                                      values: {
                                          min: 2,
                                          maks: 50,
                                      },
                                  }
                                : undefined;
                        }}
                    />
                </SoknadFormQuestion>

                <SoknadFormQuestion name={SoknadFormField.antallDagerSomSkalOverføres}>
                    {gjelderMidlertidigPgaKorona === YesOrNo.NO && (
                        <SoknadFormComponents.Select
                            name={SoknadFormField.antallDagerSomSkalOverføres}
                            label={intlHelper(intl, 'step.mottaker.form.antallDagerSomSkalOverføres.spm')}
                            validate={getRequiredFieldValidator()}
                            description={
                                <ExpandableInfo
                                    title={intlHelper(
                                        intl,
                                        'step.mottaker.form.antallDagerSomSkalOverføres.nedtrekk.titel'
                                    )}>
                                    {intlHelper(
                                        intl,
                                        'step.mottaker.form.antallDagerSomSkalOverføres.nedtrekk.svar.nåværendeSamboerEllerEktefelle'
                                    )}
                                </ExpandableInfo>
                            }>
                            {getAntallDagerOptions(intl)}
                        </SoknadFormComponents.Select>
                    )}
                    {gjelderMidlertidigPgaKorona === YesOrNo.YES && (
                        <SoknadFormComponents.TextField
                            name={SoknadFormField.antallDagerSomSkalOverføres}
                            label={intlHelper(intl, 'step.mottaker.form.antallDagerSomSkalOverføres.spm')}
                            validate={(value) => {
                                const error = getNumberValidator({
                                    required: true,
                                    min: ANTALL_DAGER_RANGE.min,
                                })(value);

                                return error
                                    ? {
                                          key: error,
                                          values: { min: ANTALL_DAGER_RANGE.min },
                                      }
                                    : undefined;
                            }}
                            width="xs"
                            description={
                                <ExpandableInfo
                                    title={intlHelper(
                                        intl,
                                        'step.mottaker.form.antallDagerSomSkalOverføres.nedtrekk.titel'
                                    )}>
                                    {intlHelper(
                                        intl,
                                        'step.mottaker.form.antallDagerSomSkalOverføres.nedtrekk.svar.korona2021'
                                    )}
                                </ExpandableInfo>
                            }
                            maxLength={3}
                        />
                    )}
                </SoknadFormQuestion>
            </QuestionVisibilityContext.Provider>
        </SoknadFormStep>
    );
};

export default MottakerStep;
