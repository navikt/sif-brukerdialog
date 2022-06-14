import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { prettifyDate } from '@navikt/sif-common-core/lib/utils/dateUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik/lib/validation';
import { AnnetBarn } from '@navikt/sif-common-forms/lib/annet-barn/types';
import { QuestionVisibilityContext } from '@navikt/sif-common-soknad/lib/question-visibility/QuestionVisibilityContext';
import { useFormikContext } from 'formik';
import { CheckboksPanelProps } from 'nav-frontend-skjema';
import StepIntroduction from '../../components/step-introduction/StepIntroduction';
import { Barn, SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormQuestion from '../SoknadFormQuestion';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import { getOmBarnaFormStop, OmBarnaFormQuestions, OmBarnaFormStop } from './omBarnaStepFormConfig';

interface Props {
    barn: Barn[];
}

const cleanupOmBarnaStep = (values: SoknadFormData, barn: Barn[], andreBarn: AnnetBarn[]): SoknadFormData => {
    if (barn.length + andreBarn.length > 1) {
        return {
            ...values,
            harAleneomsorgFor: values.harAleneomsorg === YesOrNo.YES ? values.harAleneomsorgFor : [],
            harUtvidetRettFor: values.harUtvidetRett === YesOrNo.YES ? values.harUtvidetRettFor : [],
        };
    }
    const barnId = barn.length === 1 ? barn[0].aktørId : andreBarn[0].fnr;
    const harAleneomsorg = values.harAleneomsorg === YesOrNo.YES;
    const harUtvidetRett = values.harUtvidetRett === YesOrNo.YES;
    return {
        ...values,
        harAleneomsorgFor: harAleneomsorg ? [barnId] : [],
        harUtvidetRettFor: harUtvidetRett ? [barnId] : [],
    };
};

const getBarnOptions = (barn: Barn[] = [], andreBarn: AnnetBarn[] = [], intl: IntlShape): CheckboksPanelProps[] => {
    return [
        ...barn.map((barnet) => ({
            label: `${intlHelper(intl, 'step.om-barna.født')} ${prettifyDate(barnet.fødselsdato)} ${formatName(
                barnet.fornavn,
                barnet.etternavn
            )}`,
            value: barnet.aktørId,
        })),
        ...andreBarn.map((barnet) => ({
            label: `${intlHelper(intl, 'step.om-barna.født')} ${prettifyDate(barnet.fødselsdato)} ${barnet.navn}`,
            value: barnet.fnr,
        })),
    ];
};

const OmBarnaStep: React.FunctionComponent<Props> = ({ barn }) => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();

    const { andreBarn } = values;
    const barnOptions = getBarnOptions(barn, andreBarn, intl);
    const antallBarn = barnOptions.length;

    const omBarnaStop = getOmBarnaFormStop(values, barn);
    const visibility = OmBarnaFormQuestions.getVisbility({ ...values, antallBarn, omBarnaStop });
    const kanFortsette = omBarnaStop === undefined;

    return (
        <SoknadFormStep
            id={StepID.OM_BARNA}
            showSubmitButton={kanFortsette}
            onStepCleanup={(values): SoknadFormData => cleanupOmBarnaStep(values, barn, andreBarn)}
            stepTitle={intlHelper(intl, 'step.om-barna.stepTitle')}>
            <StepIntroduction>
                {values.gjelderMidlertidigPgaKorona === YesOrNo.NO && (
                    <>
                        <p>{intlHelper(intl, 'step.om-barna.info.1')}</p>
                        <p>
                            <b>{intlHelper(intl, 'step.om-barna.info.2')}</b>
                        </p>
                        <ul>
                            <li>{intlHelper(intl, 'step.om-barna.info.2.list.1')}</li>
                            <li>{intlHelper(intl, 'step.om-barna.info.2.list.2')}</li>
                            <li>{intlHelper(intl, 'step.om-barna.info.2.list.3')}</li>
                            <li>{intlHelper(intl, 'step.om-barna.info.2.list.4')}</li>
                        </ul>
                        <p>
                            <b>{intlHelper(intl, 'step.om-barna.info.3')}</b>
                        </p>
                        <ul>
                            <li>{intlHelper(intl, 'step.om-barna.info.3.list.1')}</li>
                            <li>{intlHelper(intl, 'step.om-barna.info.3.list.2')}</li>
                            <li>{intlHelper(intl, 'step.om-barna.info.3.list.3')}</li>
                        </ul>
                    </>
                )}
                {values.gjelderMidlertidigPgaKorona === YesOrNo.YES && intlHelper(intl, 'step.om-barna.info.korona')}
            </StepIntroduction>
            <QuestionVisibilityContext.Provider value={{ visibility }}>
                <SoknadFormQuestion
                    name={SoknadFormField.harAleneomsorg}
                    legend={
                        antallBarn === 1
                            ? intlHelper(intl, 'step.om-barna.form.spm.harAleneOmsorg.ettBarn')
                            : intlHelper(intl, 'step.om-barna.form.spm.harAleneOmsorg.flereBarn')
                    }
                    validate={getYesOrNoValidator()}
                    showStop={omBarnaStop === OmBarnaFormStop.ikkeAleneomsorgForOverføringOgFordeling}
                    stopMessage={intlHelper(intl, 'step.oppsummering.om-barna.harAleneomsorg.stopMessage')}
                />
                <SoknadFormQuestion name={SoknadFormField.harAleneomsorgFor}>
                    <SoknadFormComponents.CheckboxPanelGroup
                        legend={intlHelper(intl, 'step.om-barna.form.spm.hvilkeAvBarnaAleneomsorg')}
                        name={SoknadFormField.harAleneomsorgFor}
                        checkboxes={barnOptions}
                        validate={getListValidator({ required: true })}
                    />
                </SoknadFormQuestion>
                <SoknadFormQuestion
                    name={SoknadFormField.harUtvidetRett}
                    legend={
                        antallBarn === 1
                            ? intlHelper(intl, 'step.om-barna.form.spm.harNoenUtvidetRett.ettBarn')
                            : intlHelper(intl, 'step.om-barna.form.spm.harNoenUtvidetRett.flereBarn')
                    }
                    validate={getYesOrNoValidator()}
                    showStop={omBarnaStop === OmBarnaFormStop.alleBarnErOver12ogIngenUtvidetRett}
                    stopMessage={intlHelper(intl, 'step.om-barna.info.barnOver12')}
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'hvaBetyrDette')}>
                            {intlHelper(intl, 'step.om-barna.form.spm.harNoenUtvidetRett.hvaBetyr.svar')}
                        </ExpandableInfo>
                    }
                />
                <SoknadFormQuestion name={SoknadFormField.harUtvidetRettFor}>
                    <SoknadFormComponents.CheckboxPanelGroup
                        legend={intlHelper(intl, 'step.om-barna.form.spm.hvilkeAvBarnaUtvRett')}
                        name={SoknadFormField.harUtvidetRettFor}
                        checkboxes={barnOptions}
                        validate={getListValidator({ required: true })}
                    />
                </SoknadFormQuestion>
            </QuestionVisibilityContext.Provider>
        </SoknadFormStep>
    );
};

export default OmBarnaStep;
