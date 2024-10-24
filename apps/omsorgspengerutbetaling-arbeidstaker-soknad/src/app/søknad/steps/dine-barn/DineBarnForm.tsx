import { Heading, VStack } from '@navikt/ds-react';
import React from 'react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import {
    FormikInputGroup,
    FormikYesOrNoQuestion,
    getTypedFormComponents,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { AppText, useAppIntl } from '../../../i18n';
import { DineBarnFormFields, DineBarnFormValues } from './DineBarnStep';
import AndreBarnPart from './parts/AndreBarnPart';
import DineBarnStepIntro from './parts/DineBarnStepIntro';
import RegistrerteBarnPart from './parts/RegistrerteBarnPart';

const { Form } = getTypedFormComponents<DineBarnFormFields, DineBarnFormValues, ValidationError>();

export interface DineBarnFormProps {
    søker: Søker;
    values: Partial<DineBarnFormValues>;
    registrerteBarn: RegistrertBarn[];
    isSubmitting: boolean;
    goBack?: () => void;
    onAndreBarnChanged: (values: Partial<DineBarnFormValues>) => void;
}

const DineBarnForm: React.FunctionComponent<DineBarnFormProps> = ({
    søker,
    values,
    registrerteBarn,
    isSubmitting,
    goBack,
    onAndreBarnChanged,
}) => {
    const { text, intl } = useAppIntl();

    const { andreBarn = [], harDeltBosted } = values;

    const oppdatereAndreBarn = (v: AnnetBarn[]) => {
        onAndreBarnChanged({
            andreBarn: v,
            harDeltBosted,
        });
    };

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={isSubmitting}
            onBack={goBack}
            runDelayedFormValidation={true}>
            <DineBarnStepIntro />

            <FormBlock margin="xxl" paddingBottom="m">
                <Heading level="2" size="medium">
                    <AppText id="step.dineBarn.seksjonsTittel" />
                </Heading>
            </FormBlock>

            <FormikInputGroup
                legend={'Barn'}
                hideLegend={true}
                name="barn"
                validate={() => {
                    const antallBarn = andreBarn.length + registrerteBarn.length;
                    if (antallBarn === 0) {
                        return 'ingenBarn';
                    }
                }}>
                <VStack gap={'8'}>
                    <RegistrerteBarnPart registrerteBarn={registrerteBarn} />

                    <FormikYesOrNoQuestion
                        name={DineBarnFormFields.harDeltBosted}
                        legend={text('step.dineBarn.harDeltBosted.spm')}
                        validate={getYesOrNoValidator()}
                        description={
                            <ExpandableInfo title={text('step.dineBarn.harDeltBosted.info.tittel')}>
                                <p>
                                    <AppText id="step.dineBarn.harDeltBosted.info.tekst" />
                                </p>
                            </ExpandableInfo>
                        }
                    />

                    <AndreBarnPart
                        harRegistrerteBarn={registrerteBarn.length > 0}
                        søkerFnr={søker.fødselsnummer}
                        andreBarn={andreBarn}
                        onAndreBarnChange={oppdatereAndreBarn}
                    />
                </VStack>
            </FormikInputGroup>
        </Form>
    );
};

export default DineBarnForm;
