import { useOnValidSubmit } from '@hooks';
import { ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { dateFormatter, DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { SakTilsynsordningPeriode, SøknadContextState } from '@types';
import { FormattedDate, useIntl } from 'react-intl';

import TidsbrukKalender from '../../../local-sif-common-pleiepenger/components/tidsbruk-kalender/TidsbrukKalender';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { OmsorgstilbudEndringMap } from '../../../types/OmsorgstilbudEndring';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import { getOmsorgstilbudSøknadsdataFromFormValues } from './omsorgstilbudStepUtils';

const { FormikWrapper, Form } = getTypedFormComponents<
    OmsorgstilbudFormFields,
    OmsorgstilbudFormValues,
    ValidationError
>();

export interface OmsorgstilbudFormValues {
    endringer: OmsorgstilbudEndringMap;
}

export enum OmsorgstilbudFormFields {
    omsorgstilbud = 'omsorgstilbud',
}

interface Props {
    søknadsperioder: DateRange[];
    perioderMedTilsynsordning: SakTilsynsordningPeriode;
    goBack?: () => void;
}

const OmsorgstilbudForm = ({ goBack, søknadsperioder }: Props) => {
    const stepId = StepId.OMSORGSTILBUD;
    const intl = useIntl();
    const { clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OmsorgstilbudFormValues) => {
        const omsorgstilbudSøknadsdata = getOmsorgstilbudSøknadsdataFromFormValues(values);
        if (omsorgstilbudSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOmsorgstilbud(omsorgstilbudSøknadsdata)];
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

    return (
        <FormikWrapper
            initialValues={{}}
            onSubmit={handleSubmit}
            renderForm={() => {
                return (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'omsorgstilbudForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            <VStack gap="space-16">
                                {søknadsperioder.map((periode) => {
                                    const månederISøknadsperiode = dateRangeUtils.getMonthsInDateRange(periode);
                                    const key = periode.from.toDateString();
                                    return (
                                        <ExpansionCard key={key} aria-labelledby={`periode-${key}`} size="small">
                                            <ExpansionCard.Header>
                                                <ExpansionCard.Title id={`periode-${key}`} size="small">
                                                    {dateFormatter.full(periode.from)} -{' '}
                                                    {dateFormatter.full(periode.to)}
                                                </ExpansionCard.Title>
                                            </ExpansionCard.Header>
                                            <ExpansionCard.Content>
                                                <VStack key={periode.from.toDateString()} gap="space-32">
                                                    {månederISøknadsperiode.map((måned) => (
                                                        <div key={måned.from.toDateString()}>
                                                            <Heading level="3" size="small" className="capitalize">
                                                                <FormattedDate
                                                                    value={måned.from}
                                                                    month="long"
                                                                    year="numeric"
                                                                />
                                                            </Heading>
                                                            <TidsbrukKalender
                                                                key={måned.from.toDateString()}
                                                                dager={{}}
                                                                periode={måned}
                                                            />
                                                        </div>
                                                    ))}
                                                </VStack>
                                            </ExpansionCard.Content>
                                        </ExpansionCard>
                                    );
                                })}
                            </VStack>
                        </Form>
                    </>
                );
            }}
        />
    );
};

export default OmsorgstilbudForm;
