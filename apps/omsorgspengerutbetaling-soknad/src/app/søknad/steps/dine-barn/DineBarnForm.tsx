import { Box } from '@navikt/ds-react';
import React from 'react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { FormikInputGroup, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { RegistrerteBarnListe } from '@navikt/sif-common-ui';
import { useAppIntl } from '../../../i18n';
import { DineBarnFormFields, DineBarnFormValues } from './DineBarnStep';
import AndreBarnPart from './parts/AndreBarnPart';
import DineBarnStepIntro from './parts/DineBarnStepIntro';
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
    const { intl, text } = useAppIntl();

    const { andreBarn = [], harSyktBarn, harDekketTiFørsteDagerSelv } = values;

    const oppdatereAndreBarn = (v: AnnetBarn[]) => {
        onAndreBarnChanged({
            andreBarn: v,
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

            <Box paddingBlock={'8 0'}>
                <RegistrerteBarnListe.Heading level="2" size="medium">
                    {text('step.dineBarn.seksjonsTittel')}
                </RegistrerteBarnListe.Heading>
            </Box>

            <FormikInputGroup
                legend={text('step.dineBarn.seksjonsTittel')}
                hideLegend={true}
                name="barn"
                validate={() => {
                    const antallBarn = andreBarn.length + registrerteBarn.length;
                    if (antallBarn === 0) {
                        return 'ingenBarn';
                    }
                }}>
                <Box paddingBlock={'4 6'}>
                    <RegistrerteBarnListe registrerteBarn={registrerteBarn} />
                </Box>

                <AndreBarnPart
                    harRegistrerteBarn={registrerteBarn.length > 0}
                    søkerFnr={søker.fødselsnummer}
                    andreBarn={andreBarn}
                    onAndreBarnChange={oppdatereAndreBarn}
                />
            </FormikInputGroup>

            {andreBarn.length + registrerteBarn.length > 0 ? (
                <DineBarnScenarioer registrerteBarn={registrerteBarn} formValues={values} />
            ) : null}
        </Form>
    );
};

export default DineBarnForm;
