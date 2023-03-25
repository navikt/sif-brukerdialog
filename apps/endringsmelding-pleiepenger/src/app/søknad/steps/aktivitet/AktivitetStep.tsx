import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { FormikCheckboxGroupCheckboxProp } from '@navikt/sif-common-formik-ds/lib/components/formik-checkbox-group/FormikCheckboxGroup';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { ArbeidsgiverType } from '../../../types/Arbeidsgiver';
import { ArbeidAktiviteter, ArbeidAktivitetType } from '../../../types/Sak';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getAktivitetStepInitialValues, getAktivitetSøknadsdataFromFormValues } from './aktivitetStepUtils';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { useIntl } from 'react-intl';
import { SkrivTilOssLink } from '../../../lenker';
import { harFjernetLovbestemtFerie } from '../../../utils/lovbestemtFerieUtils';

export enum AktivitetFormFields {
    aktiviteterSomSkalEndres = 'aktiviteterSomSkalEndres',
}
export interface AktivitetFormValues {
    [AktivitetFormFields.aktiviteterSomSkalEndres]: string[];
}

const { FormikWrapper, Form, CheckboxGroup } = getTypedFormComponents<AktivitetFormFields, AktivitetFormValues>();

const AktivitetStep = () => {
    const stepId = StepId.AKTIVITET;
    const intl = useIntl();

    const {
        state: { søknadsdata, sak, hvaSkalEndres },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();
    const harFjernetFerie = harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie);
    const stepConfig = getSøknadStepConfig(sak, hvaSkalEndres, harFjernetFerie);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: AktivitetFormValues) => {
        const aktivitetSøknadsdata = getAktivitetSøknadsdataFromFormValues(values);
        if (aktivitetSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadAktivitet(aktivitetSøknadsdata)];
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

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <FormikWrapper
                initialValues={getAktivitetStepInitialValues(søknadsdata, stepFormValues?.aktivitet)}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'aktivitetForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            <CheckboxGroup
                                legend={'Velg hvilke arbeidsforhold du ønsker å endre?'}
                                description={
                                    <ExpandableInfo title="Mangler du noen arbeidsforhold?">
                                        <p>
                                            Nedenfor ser du arbeidsforhold hvor du har oppgitt arbeidstid på saken din.
                                            Dersom det er et arbeidsforhold du mener burde vært i listen, send en
                                            melding via <SkrivTilOssLink />.
                                        </p>
                                        <p>
                                            Endring av arbeidstid for selvstendig næringsdrivende er ikke støttet enda.
                                            Dersom du er selvstendig næringsdrivende og ønsker å melde om endring, kan
                                            du sende inn en ny søknad eller send en melding via <SkrivTilOssLink />.
                                        </p>
                                    </ExpandableInfo>
                                }
                                name={AktivitetFormFields.aktiviteterSomSkalEndres}
                                validate={getListValidator({ required: true })}
                                checkboxes={getOpptjeningAktivitetCheckboxes(sak.arbeidAktiviteter)}
                            />
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default AktivitetStep;

const getAktivitetCheckboxLabel = ({ title, info }: { title: string; info?: React.ReactNode }): React.ReactNode => {
    return (
        <BodyShort as="div">
            <strong>{title}</strong>
            {info ? <div>{info}</div> : null}
        </BodyShort>
    );
};

const getOpptjeningAktivitetCheckboxes = (arbeidAktiviteter: ArbeidAktiviteter): FormikCheckboxGroupCheckboxProp[] => {
    const checkboxProps: FormikCheckboxGroupCheckboxProp[] = [];

    const { arbeidstakerArktiviteter: arbeidstaker, frilanser, selvstendigNæringsdrivende } = arbeidAktiviteter;

    arbeidstaker.forEach(({ id, arbeidsgiver: { organisasjonsnummer: orgnr, navn, type } }) => {
        checkboxProps.push({
            label: getAktivitetCheckboxLabel({
                title: navn,
                info: type === ArbeidsgiverType.ORGANISASJON ? `Orgnr. ${orgnr}` : 'Privatperson',
            }),
            value: id,
            'data-testid': `aktivitet-${id}`,
        });
    });

    if (frilanser) {
        checkboxProps.push({
            label: getAktivitetCheckboxLabel({
                title: 'Frilanser',
            }),
            value: ArbeidAktivitetType.frilanser,
        });
    }
    if (selvstendigNæringsdrivende) {
        checkboxProps.push({
            label: getAktivitetCheckboxLabel({
                title: 'Selvstendig næringsdrivende',
            }),
            value: ArbeidAktivitetType.selvstendigNæringsdrivende,
        });
    }

    return checkboxProps;
};
