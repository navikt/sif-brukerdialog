import { VStack } from '@navikt/ds-react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import {
    FormikInputGroup,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { FormLayout, RegistrerteBarnListe } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import { DineBarnFormFields, DineBarnFormValues } from './DineBarnStep';
import AndreBarnPart from './parts/AndreBarnPart';
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

const DineBarnForm = ({
    søker,
    values,
    registrerteBarn,
    isSubmitting,
    kanFortsette,
    goBack,
    onAndreBarnChanged,
}: DineBarnFormProps) => {
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
            <FormLayout.Guide>
                <p>
                    <AppText id="step.dineBarn.intro.1" />
                </p>
                <ExpandableInfo title={text('step.dineBarn.intro.info.tittel')}>
                    <p>
                        <AppText id="step.dineBarn.intro.info.tekst.1" />
                    </p>
                    <p>
                        <AppText id="step.dineBarn.intro.info.tekst.2" />
                    </p>
                </ExpandableInfo>
            </FormLayout.Guide>

            <FormLayout.Questions>
                <VStack gap="4">
                    <RegistrerteBarnListe.Heading level="2" size="medium">
                        {text('step.dineBarn.seksjonsTittel')}
                    </RegistrerteBarnListe.Heading>

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
                        <FormLayout.Questions>
                            <RegistrerteBarnListe registrerteBarn={registrerteBarn} />

                            <AndreBarnPart
                                harRegistrerteBarn={registrerteBarn.length > 0}
                                søkerFnr={søker.fødselsnummer}
                                andreBarn={andreBarn}
                                onAndreBarnChange={oppdatereAndreBarn}
                            />
                        </FormLayout.Questions>
                    </FormikInputGroup>
                </VStack>

                {andreBarn.length + registrerteBarn.length > 0 ? (
                    <DineBarnScenarioer registrerteBarn={registrerteBarn} formValues={values} />
                ) : null}
            </FormLayout.Questions>
        </Form>
    );
};

export default DineBarnForm;
