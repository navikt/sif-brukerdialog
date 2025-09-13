import { BodyLong } from '@navikt/ds-react';
import { useCallback, useState } from 'react';
import { Office1 } from '@navikt/ds-icons';
import {
    DateRange,
    FormikValuesObserver,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/BostedUtlandListAndDialog';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { FormLayout } from '@navikt/sif-common-ui';
import { getDate1YearAgo, getDateToday } from '@navikt/sif-common-utils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { AppText, useAppIntl } from '../../../i18n';
import { FraværMap } from '../../../types/FraværTypes';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { ArbeidforholdSøknadsdata } from '../../../types/søknadsdata/SituasjonSøknadsdata';
import {
    getAlleFraværDager,
    getAlleFraværDagerFromSøknadsdata,
    getAlleFraværPerioder,
    getAlleFraværPerioderFromSøknadsdata,
    getTidsromFromÅrstall,
    getÅrstallFromFravær,
} from '../../../utils/fraværUtils';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../søknadStepConfig';
import ArbeidsforholdFraværSpørsmål from './form-parts/ArbeidsforholdFraværSpørsmål';
import {
    getFraværStepInitialValues,
    getFraværSøknadsdataFromFormValues,
    getOrganisasjonsnummerKey,
} from './fraværStepUtils';

export enum FraværStepFormFields {
    fravær = 'fravær',
    perioderHarVærtIUtlandet = 'perioderHarVærtIUtlandet',
    perioderUtenlandsopphold = 'perioderUtenlandsopphold',
}

export interface FraværStepFormValues {
    [FraværStepFormFields.fravær]: FraværMap;
    [FraværStepFormFields.perioderHarVærtIUtlandet]: YesOrNo;
    [FraværStepFormFields.perioderUtenlandsopphold]: Utenlandsopphold[];
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    FraværStepFormFields,
    FraværStepFormValues,
    ValidationError
>();

const FraværStep: React.FC = () => {
    const { text, intl } = useAppIntl();

    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.FRAVÆR;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig(søknadsdata));
    const hasInvalidSteps = invalidSteps.length > 0;

    const onValidSubmitHandler = (values: FraværStepFormValues) => {
        const fraværSøknadsdata = getFraværSøknadsdataFromFormValues(values);
        if (fraværSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadFravær(fraværSøknadsdata)];
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

    const { situasjon } = søknadsdata;

    if (!situasjon) {
        return undefined;
    }

    const arbeidsforholdliste = Object.values(situasjon).filter(
        (forhold) => forhold.type !== 'harIkkeHattFravær' && forhold.type !== 'harHattFraværMedLønn',
    );

    const fraværDagerFromSøknadsdata =
        søknadsdata && søknadsdata.fravær?.fravær ? getAlleFraværDagerFromSøknadsdata(søknadsdata.fravær.fravær) : [];

    const fraværPerioderFromSøknadsdata =
        søknadsdata && søknadsdata.fravær ? getAlleFraværPerioderFromSøknadsdata(søknadsdata.fravær?.fravær) : [];

    //TODO
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [årstall, setÅrstall] = useState<number | undefined>();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [gyldigTidsrom, setGyldigTidsrom] = useState<DateRange>(
        getTidsromFromÅrstall(getÅrstallFromFravær(fraværDagerFromSøknadsdata, fraværPerioderFromSøknadsdata)),
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const updateÅrstall = useCallback(
        (å: number | undefined) => {
            setÅrstall(å);
            setGyldigTidsrom(getTidsromFromÅrstall(å));
        },
        [setÅrstall],
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getFraværStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    if (!values.fravær) {
                        return undefined;
                    }
                    const fravær = values.fravær;

                    const fraværDager = getAlleFraværDager(fravær);
                    const fraværPerioder = getAlleFraværPerioder(fravær);
                    const harRegistrertFravær = fraværDager.length + fraværPerioder.length > 0;
                    const minDateForFravær = harRegistrertFravær ? gyldigTidsrom.from : getDate1YearAgo();
                    const maxDateForFravær = harRegistrertFravær ? gyldigTidsrom.to : getDateToday();

                    return (
                        <>
                            <FormikValuesObserver
                                onChange={() => {
                                    const nyttÅrstall = getÅrstallFromFravær(fraværDager, fraværPerioder);
                                    if (nyttÅrstall !== årstall) {
                                        updateÅrstall(nyttÅrstall);
                                    }
                                }}
                            />
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormLayout.Guide>
                                    <BodyLong>
                                        <AppText id="step.fravær.info.1" />
                                    </BodyLong>
                                    <BodyLong>
                                        <AppText
                                            id="step.fravær.info.2"
                                            values={{
                                                strong: (msg): React.ReactNode => <strong>{msg}</strong>,
                                            }}
                                        />
                                    </BodyLong>
                                </FormLayout.Guide>
                                <FormLayout.Sections>
                                    {arbeidsforholdliste && arbeidsforholdliste.length > 0 && (
                                        <>
                                            {arbeidsforholdliste.map((forhold: ArbeidforholdSøknadsdata) => {
                                                return (
                                                    <div
                                                        key={forhold.organisasjonsnummer}
                                                        data-testid="arbeidsforhold-liste">
                                                        <FormLayout.Section
                                                            title={forhold.navn || forhold.organisasjonsnummer}
                                                            titleIcon={
                                                                <Office1 role="presentation" aria-hidden={true} />
                                                            }>
                                                            <ArbeidsforholdFraværSpørsmål
                                                                fravær={
                                                                    fravær[
                                                                        getOrganisasjonsnummerKey(
                                                                            forhold.organisasjonsnummer,
                                                                        )
                                                                    ]
                                                                }
                                                                parentFieldName={`${
                                                                    FraværStepFormFields.fravær
                                                                }.${getOrganisasjonsnummerKey(
                                                                    forhold.organisasjonsnummer,
                                                                )}`}
                                                                minDateForFravær={minDateForFravær}
                                                                maxDateForFravær={maxDateForFravær}
                                                                årstall={årstall}
                                                                arbeidsgiverNavn={forhold.navn}
                                                            />
                                                        </FormLayout.Section>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}

                                    <FormLayout.Section title={text('step.fravær.utenlandsopphold.tittel')}>
                                        <FormLayout.Questions>
                                            <YesOrNoQuestion
                                                name={FraværStepFormFields.perioderHarVærtIUtlandet}
                                                legend={text('step.fravær.værtIUtlandet.spm')}
                                                validate={getYesOrNoValidator()}
                                                data-testid="utenlandsopphold"
                                            />

                                            {values.perioderHarVærtIUtlandet === YesOrNo.YES && (
                                                <FormLayout.Panel bleedTop={true}>
                                                    <BostedUtlandListAndDialog<FraværStepFormFields>
                                                        name={FraværStepFormFields.perioderUtenlandsopphold}
                                                        minDate={getDate1YearAgo()}
                                                        maxDate={getDateToday()}
                                                        labels={{
                                                            addLabel: text('step.fravær.værtIUtlandet.leggTilLabel'),
                                                            modalTitle: text('step.fravær.værtIUtlandet.modalTittel'),
                                                            listTitle: text('step.fravær.værtIUtlandet.listTitle'),
                                                            hideListTitle: false,
                                                        }}
                                                        validate={getListValidator({ required: true })}
                                                    />
                                                </FormLayout.Panel>
                                            )}
                                        </FormLayout.Questions>
                                    </FormLayout.Section>
                                </FormLayout.Sections>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default FraværStep;
