import { Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { DineBarnFormFields, DineBarnFormValues } from './DineBarnStep';
import AndreBarnPart from './parts/AndreBarnPart';
import DineBarnStepIntro from './parts/DineBarnStepIntro';
import RegistrerteBarnPart from './parts/RegistrerteBarnPart';
import { Søker } from '../../../types/Søker';
import DineBarnScenarioer from './scenario/DineBarnScenarioer';

const { Form } = getTypedFormComponents<DineBarnFormFields, DineBarnFormValues, ValidationError>();

export interface DineBarnFormProps {
    søker: Søker;
    values: Partial<DineBarnFormValues>;
    registrerteBarn: RegistrertBarn[];
    isSubmitting: boolean;
    kanFortsette: boolean;
    goBack?: () => void;
    onAndreBarnChanged: (values: Partial<DineBarnFormValues>) => void;
}

const DineBarnForm: React.FunctionComponent<DineBarnFormProps> = ({
    søker,
    values,
    registrerteBarn,
    isSubmitting,
    kanFortsette,
    goBack,
    onAndreBarnChanged,
}) => {
    const intl = useIntl();

    const { andreBarn = [], harSyktBarn, harDekketTiFørsteDagerSelv } = values;

    const oppdatereAndreBarn = (values: AnnetBarn[]) => {
        onAndreBarnChanged({
            andreBarn: values,
            harSyktBarn,
            harDekketTiFørsteDagerSelv,
        });
    };

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={isSubmitting || kanFortsette === false}
            onBack={goBack}
            runDelayedFormValidation={true}>
            <DineBarnStepIntro />

            <FormBlock margin="xxl">
                <Heading level="2" size="medium">
                    <FormattedMessage id="step.dineBarn.seksjonsTittel" />
                </Heading>
            </FormBlock>

            <RegistrerteBarnPart registrerteBarn={registrerteBarn} />

            <AndreBarnPart
                søkerFnr={søker.fødselsnummer}
                andreBarn={andreBarn}
                onAndreBarnChange={oppdatereAndreBarn}
            />

            <DineBarnScenarioer registrerteBarn={registrerteBarn} formValues={values} />
        </Form>
    );
};

export default DineBarnForm;
