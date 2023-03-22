import { BodyLong, Heading, Tag } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import PerioderAccordion from '../../../components/perioder-accordion/PerioderAccordion';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { LovbestemtFeriePeriode } from '../../../types/Sak';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import LovbestemtFerieISøknadsperiode from './LovbestemtFerieISøknadsperiode';
import {
    getLovbestemtFerieStepInitialValues,
    getLovbestemtFerieSøknadsdataFromFormValues,
    lovbestemtFerieStepUtils,
} from './lovbestemtFerieStepUtils';

export enum LovbestemtFerieFormFields {
    perioder = 'perioder',
}
export interface LovbestemtFerieFormValues {
    [LovbestemtFerieFormFields.perioder]: LovbestemtFeriePeriode[];
}

const { FormikWrapper, Form } = getTypedFormComponents<LovbestemtFerieFormFields, LovbestemtFerieFormValues>();

const LovbestemtFerieStep = () => {
    const stepId = StepId.LOVBESTEMT_FERIE;
    const intl = useIntl();

    const {
        dispatch,
        state: { søknadsdata, sak, hvaSkalEndres },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();
    const stepConfig = getSøknadStepConfig(sak, hvaSkalEndres);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    const { getLovbestemtFerieEndringerForPeriode } = lovbestemtFerieStepUtils;

    const onValidSubmitHandler = (values: LovbestemtFerieFormValues) => {
        const perioder = getLovbestemtFerieSøknadsdataFromFormValues(values, sak.lovbestemtFerie.perioder);
        if (perioder) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadLovbestemtFerie(perioder)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    const oppdaterSøknadState = (values: LovbestemtFerieFormValues) => {
        const perioder = getLovbestemtFerieSøknadsdataFromFormValues(values, sak.lovbestemtFerie.perioder);
        dispatch(actionsCreator.setSøknadLovbestemtFerie(perioder));
        dispatch(actionsCreator.requestLagreSøknad());
    };

    const initialValues = getLovbestemtFerieStepInitialValues(søknadsdata, stepFormValues.lovbestemtFerie);
    const harFlereSøknadsperioder = sak.søknadsperioder.length > 1;

    return (
        <SøknadStep stepId={stepId} sak={sak} hvaSkalEndres={hvaSkalEndres}>
            <SifGuidePanel>
                <>
                    <BodyLong as="div">
                        <Heading level="2" size="xsmall" spacing={true}>
                            Slik endrer du ferie
                        </Heading>
                        <InfoList>
                            <li>Du kan legge til, endre eller fjerne ferie i periodene hvor du har pleiepenger.</li>
                            <li>
                                Vi trenger kun å vite om ferie som tas ut på ukedager
                                {harFlereSøknadsperioder ? ', og i tidsrom hvor du har pleiepenger' : ''}.
                            </li>
                            <li>
                                Endringer i ferie kan medføre at du må også endre på hvor mye du jobber i perioden.
                                Dette kan du gjøre på neste steg.
                            </li>
                        </InfoList>
                    </BodyLong>
                </>
            </SifGuidePanel>

            <FormikWrapper
                initialValues={initialValues}
                onSubmit={handleSubmit}
                renderForm={({ values, setFieldValue }) => {
                    const perioderIMelding = values[LovbestemtFerieFormFields.perioder] || [];
                    return (
                        <>
                            <PersistStepFormValues
                                stepId={stepId}
                                onChange={() => {
                                    oppdaterSøknadState({ perioder: perioderIMelding });
                                }}
                            />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'lovbestemtFerieForm')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                runDelayedFormValidation={true}
                                onBack={goBack}>
                                <FormBlock>
                                    {sak.søknadsperioder.length === 1 ? null : (
                                        <div
                                            style={{
                                                borderBottom:
                                                    '2px solid var(--ac-accordion-header-border, var(--a-border-strong)',
                                            }}>
                                            <Block margin="xl">
                                                <Heading level="3" size="small" spacing={true}>
                                                    Dine perioder med pleiepenger
                                                </Heading>
                                            </Block>
                                        </div>
                                    )}
                                    <PerioderAccordion
                                        perioder={sak.søknadsperioder}
                                        renderContent={(søknadsperiode) => {
                                            return (
                                                <Block
                                                    margin={sak.søknadsperioder.length === 1 ? 'l' : 'm'}
                                                    padBottom="l">
                                                    <Heading
                                                        level={sak.søknadsperioder.length === 1 ? '3' : '4'}
                                                        size={sak.søknadsperioder.length === 1 ? 'small' : 'xsmall'}
                                                        spacing={true}>
                                                        Registrert ferie
                                                    </Heading>
                                                    <LovbestemtFerieISøknadsperiode
                                                        søknadsperiode={søknadsperiode}
                                                        perioderIMelding={perioderIMelding}
                                                        perioderISak={sak.lovbestemtFerie.perioder}
                                                        onChange={(perioder) => {
                                                            setFieldValue(LovbestemtFerieFormFields.perioder, perioder);
                                                        }}
                                                    />
                                                </Block>
                                            );
                                        }}
                                        renderHeader={(periode) => {
                                            return (
                                                <>
                                                    <span style={{ display: 'inlineBlock' }}>
                                                        {dateFormatter.full(periode.from)} -{' '}
                                                        {dateFormatter.full(periode.to)}
                                                    </span>
                                                    {getLovbestemtFerieEndringerForPeriode(
                                                        periode,
                                                        perioderIMelding,
                                                        sak.lovbestemtFerie.perioder
                                                    ).erEndret && (
                                                        <span
                                                            style={{
                                                                position: 'relative',
                                                                marginLeft: '.5rem',
                                                                top: '-.125rem',
                                                            }}>
                                                            {` `}
                                                            <Tag variant="alt3" size="small">
                                                                Endret
                                                            </Tag>
                                                        </span>
                                                    )}
                                                </>
                                            );
                                        }}
                                    />
                                </FormBlock>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default LovbestemtFerieStep;
