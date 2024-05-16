import { useOnValidSubmit, useSøknadContext } from '@hooks';
import { Alert, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ISODate, dateFormatter } from '@navikt/sif-common-utils';
import { SøknadContextState } from '@types';
import { erFeriedagerEndretIPeriode } from '@utils';
import { useIntl } from 'react-intl';
import DateRangeAccordion from '../../../components/date-range-accordion/DateRangeAccordion';
import EndretTag from '../../../components/tags/EndretTag';
import { useStepConfig } from '../../../hooks/useStepConfig';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import { StepId } from '../../config/StepId';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import FeriedagerISøknadsperiode from './FeriedagerISøknadperiode';
import {
    getLovbestemtFerieStepInitialValues,
    getLovbestemtFerieSøknadsdataFromFormValues,
} from './lovbestemtFerieStepUtils';
import { AppText } from '../../../i18n';

export enum LovbestemtFerieFormFields {
    perioder = 'perioder',
    feriedager = 'feriedager',
}

export interface Feriedag {
    dato: Date;
    liggerISak: boolean;
    skalHaFerie: boolean;
}
export interface FeriedagMap {
    [isoDate: ISODate]: Feriedag;
}

export interface LovbestemtFerieFormValues {
    [LovbestemtFerieFormFields.feriedager]: FeriedagMap;
}

const { FormikWrapper, Form } = getTypedFormComponents<LovbestemtFerieFormFields, LovbestemtFerieFormValues>();

const LovbestemtFerieStep = () => {
    const stepId = StepId.LOVBESTEMT_FERIE;
    const intl = useIntl();

    const {
        dispatch,
        state: { søknadsdata, sak, valgteEndringer },
    } = useSøknadContext();

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const { goBack, stepConfig } = useStepConfig(stepId);

    const onValidSubmitHandler = (values: LovbestemtFerieFormValues) => {
        const perioder = getLovbestemtFerieSøknadsdataFromFormValues(values);
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
        },
    );

    const oppdaterSøknadState = (values: LovbestemtFerieFormValues) => {
        const ferie = getLovbestemtFerieSøknadsdataFromFormValues(values);
        dispatch(actionsCreator.setSøknadLovbestemtFerie(ferie));
        dispatch(actionsCreator.requestLagreSøknad());
    };

    const initialValues = getLovbestemtFerieStepInitialValues(søknadsdata, stepFormValues.lovbestemtFerie);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <Heading level="2" size="xsmall" spacing={true}>
                    <AppText id="lovbestemtFerieStep.guide.tittel" />
                </Heading>
                <InfoList>
                    <li>
                        <AppText id="lovbestemtFerieStep.guide.tekst.1" />
                    </li>
                    <li>
                        <AppText id="lovbestemtFerieStep.guide.tekst.2" />
                    </li>
                </InfoList>
            </SifGuidePanel>

            <FormikWrapper
                initialValues={initialValues}
                onSubmit={handleSubmit}
                renderForm={({ values, setFieldValue }) => {
                    const feriedager: FeriedagMap = values[LovbestemtFerieFormFields.feriedager] || {};
                    // Raskere sjekk som sjekker values i stedet for søknadsdata
                    const harFjernetFerieIValues = Object.keys(feriedager)
                        .map((key) => feriedager[key])
                        .some((feriedag) => feriedag.skalHaFerie === false);
                    return (
                        <>
                            <PersistStepFormValues
                                stepId={stepId}
                                onChange={() => {
                                    oppdaterSøknadState({ feriedager });
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
                                        <Block margin="xl">
                                            <Heading level="3" size="small" spacing={true}>
                                                <AppText
                                                    id="lovbestemtFerieStep.heading.perioder"
                                                    values={{
                                                        antallPerioder: sak.søknadsperioder.length,
                                                    }}
                                                />
                                            </Heading>
                                        </Block>
                                    )}
                                    <DateRangeAccordion
                                        dateRanges={sak.søknadsperioder}
                                        defaultOpenState={'none'}
                                        renderContent={(søknadsperiode) => {
                                            return (
                                                <Block
                                                    margin={sak.søknadsperioder.length === 1 ? 'l' : 'm'}
                                                    padBottom="l">
                                                    <Heading
                                                        level={sak.søknadsperioder.length === 1 ? '3' : '4'}
                                                        size={sak.søknadsperioder.length === 1 ? 'small' : 'xsmall'}
                                                        spacing={true}
                                                        onChange={(feriedager) => {
                                                            setFieldValue(
                                                                LovbestemtFerieFormFields.feriedager,
                                                                feriedager,
                                                            );
                                                        }}>
                                                        <AppText id="lovbestemtFerieStep.heading.registrertFerie" />
                                                    </Heading>
                                                    <FeriedagerISøknadsperiode
                                                        alleFeriedager={values.feriedager || {}}
                                                        søknadsperiode={søknadsperiode}
                                                        onChange={(feriedager) => {
                                                            setFieldValue(
                                                                LovbestemtFerieFormFields.feriedager,
                                                                feriedager,
                                                            );
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
                                                    {erFeriedagerEndretIPeriode(feriedager, periode) && (
                                                        <span
                                                            style={{
                                                                position: 'relative',
                                                                marginLeft: '.5rem',
                                                                top: '-.125rem',
                                                            }}>
                                                            {` `}
                                                            <EndretTag>
                                                                <AppText id="lovbestemtFerieStep.tags.ferieEndret" />
                                                            </EndretTag>
                                                        </span>
                                                    )}
                                                </>
                                            );
                                        }}
                                    />
                                </FormBlock>
                                {harFjernetFerieIValues && valgteEndringer.arbeidstid === false && (
                                    <Block margin="l">
                                        <Alert variant="warning">
                                            <AppText id="lovbestemtFerieStep.ferieFjernet.melding" />
                                        </Alert>
                                    </Block>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default LovbestemtFerieStep;
