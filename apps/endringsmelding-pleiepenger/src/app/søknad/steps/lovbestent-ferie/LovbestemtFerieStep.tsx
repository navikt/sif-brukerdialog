import { BodyLong } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/FerieuttakListAndDialog';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/types';
import { getDateRangesBetweenDateRanges } from '@navikt/sif-common-utils/lib';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import {
    getLovbestemtFerieStepInitialValues,
    getLovbestemtFerieSøknadsdataFromFormValues,
} from './lovbestemtFerieStepUtils';

export enum LovbestemtFerieFormFields {
    perioder = 'perioder',
}
export interface LovbestemtFerieFormValues {
    [LovbestemtFerieFormFields.perioder]: Ferieuttak[];
}

const { FormikWrapper, Form } = getTypedFormComponents<LovbestemtFerieFormFields, LovbestemtFerieFormValues>();

const LovbestemtFerieStep = () => {
    const stepId = StepId.LOVBESTEMT_FERIE;
    const intl = useIntl();

    const {
        state: { søknadsdata, sak, hvaSkalEndres },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();
    const stepConfig = getSøknadStepConfig(sak, hvaSkalEndres);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

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
        }
    );

    const initialValues = getLovbestemtFerieStepInitialValues(søknadsdata, stepFormValues.lovbestemtFerie);
    const harFlereSøknadsperioder = sak.søknadsperioder.length > 1;

    return (
        <SøknadStep stepId={stepId} sak={sak} hvaSkalEndres={hvaSkalEndres}>
            <SifGuidePanel>
                <>
                    <BodyLong as="div">
                        <p>
                            Her kan du endre, legge til eller fjerne lovbestemt ferie i{' '}
                            {harFlereSøknadsperioder ? 'periodene dine' : 'perioden din'} med pleiepenger. Vi trenger
                            kun å vite om ferie som tas ut på ukedager
                            {harFlereSøknadsperioder ? ', og i tidsrom hvor du har pleiepenger' : ''}.
                        </p>
                    </BodyLong>
                </>
            </SifGuidePanel>

            <FormikWrapper
                initialValues={initialValues}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'lovbestemtFerieForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            {/* <Block margin="xxl">
                                <Heading level="2" size="small" spacing={true}>
                                    Registrert ferie i perioden{' '}
                                    <PeriodeTekst periode={sak.samletSøknadsperiode} compact={false} />
                                </Heading>
                                <p>Periodene med ferie gjelder på tvers av alle dine arbeidsforhold.</p>
                            </Block> */}
                            <Block margin="xl" padBottom="xl">
                                <FerieuttakListAndDialog<LovbestemtFerieFormFields>
                                    name={LovbestemtFerieFormFields.perioder}
                                    labels={{
                                        listTitle: `Registrert ferie`,
                                        addLabel: 'Legg til ferie',
                                        modalTitle: 'Lovbestemt ferie',
                                        emptyListText: `Ingen ferie er registrert`,
                                    }}
                                    disableWeekend={true}
                                    disabledDateRanges={getDateRangesBetweenDateRanges(sak.søknadsperioder)}
                                    minDate={sak.samletSøknadsperiode.from}
                                    maxDate={sak.samletSøknadsperiode.to}
                                />
                            </Block>
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default LovbestemtFerieStep;
