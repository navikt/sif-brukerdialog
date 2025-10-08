import {
    FormikInputGroup,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { Enkeltdato, Ferieuttak, UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds/src';
import { FormLayout } from '@navikt/sif-common-ui';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { getBarnetsFødselsdato, getTillattSøknadsperiode } from '../../../utils/søknadsperiodeUtils';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import GodkjentHelseinstitusjonInfo from './info/GodkjentHelseinstitusjonInfo';
import { KursperiodeFormValues } from './parts/kursperioder-form-part/KursperiodeQuestions';
import {
    getDateRangesFromKursperiodeFormValues,
    getKursperioderValidator,
    getKursStepInitialValues,
    getKursSøknadsdataFromFormValues,
    getSøknadsperiodeFromKursperioderFormValues,
} from './utils/kursStepUtils';
import KursdagerFormPart from './parts/kursdager-form-part/KursdagerFormPart';
import ReiseQuestions from './questions/ReiseQuestions';
import KursperioderFormPart from './parts/kursperioder-form-part/KursperioderFormPart';
import FerieQuestions from './questions/FerieQuestions';
import UtenlandsoppholdQuestions from './questions/UtenlandsoppholdQuestionst';
import { getDateRangesBetweenDateRangesWithinDateRange } from '@navikt/sif-common-utils';
import OpplæringsinstitusjonQuestion from './questions/OpplæringsinstitusjonQuestion';
import EnkeltdagerEllerPerioderQuestion from './questions/EnkeltdagerEllerPerioderQuestion';
import { KursdagFormValues } from './parts/kursdager-form-part/KursdagQuestions';
import { Box } from '@navikt/ds-react';

export enum EnkeltdagEllerPeriode {
    ENKELTDAG = 'ENKELTDAG',
    PERIODE = 'PERIODE',
}

export enum KursFormFields {
    opplæringsinstitusjon = 'opplæringsinstitusjon',
    enkeltdagEllerPeriode = 'enkeltdagEllerPeriode',
    kursperioder = 'kursperioder',
    kursdager = 'kursdager',
    reiserUtenforKursdager = 'reiserUtenforKursdager',
    reisedager = 'reisedager',
    reisedagerBeskrivelse = 'reisedagerBeskrivelse',
    skalTaUtFerieIPerioden = 'skalTaUtFerieIPerioden',
    ferieuttak = 'ferieuttak',
    skalOppholdeSegIUtlandetIPerioden = 'skalOppholdeSegIUtlandetIPerioden',
    utenlandsoppholdIPerioden = 'utenlandsoppholdIPerioden',
}

export interface KursFormValues {
    [KursFormFields.opplæringsinstitusjon]?: string;
    [KursFormFields.enkeltdagEllerPeriode]?: EnkeltdagEllerPeriode;
    [KursFormFields.kursperioder]: Array<Partial<KursperiodeFormValues>>;
    [KursFormFields.kursdager]: Array<Partial<KursdagFormValues>>;
    [KursFormFields.reisedager]?: Enkeltdato[];
    [KursFormFields.reisedagerBeskrivelse]?: string;
    [KursFormFields.skalTaUtFerieIPerioden]?: YesOrNo;
    [KursFormFields.ferieuttak]?: Ferieuttak[];
    [KursFormFields.reiserUtenforKursdager]?: YesOrNo;
    [KursFormFields.skalOppholdeSegIUtlandetIPerioden]?: YesOrNo;
    [KursFormFields.utenlandsoppholdIPerioden]?: UtenlandsoppholdEnkel[];
}

export const KursFormComponents = getTypedFormComponents<KursFormFields, KursFormValues, ValidationError>();

const KursStep = () => {
    const { intl } = useAppIntl();

    const {
        state: { søknadsdata, institusjoner },
    } = useSøknadContext();

    const stepId = StepId.KURS;
    const step = getSøknadStepConfigForStep(stepId, søknadsdata);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values) => {
        const kursSøknadsdata = getKursSøknadsdataFromFormValues(values);
        if (kursSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadKurs(kursSøknadsdata),
                actionsCreator.syncArbeidstidMedKursperioder(kursSøknadsdata),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state });
        },
    );

    const gyldigSøknadsperiode = getTillattSøknadsperiode(getBarnetsFødselsdato(søknadsdata.omBarnet));

    return (
        <SøknadStep stepId={stepId}>
            <KursFormComponents.FormikWrapper
                initialValues={getKursStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    const søknadsperiode = getSøknadsperiodeFromKursperioderFormValues(values.kursperioder);
                    const kursperioder = getDateRangesFromKursperiodeFormValues(values.kursperioder);

                    const disabledDateRanges = søknadsperiode
                        ? getDateRangesBetweenDateRangesWithinDateRange(
                              søknadsperiode.from,
                              søknadsperiode.to,
                              kursperioder,
                          )
                        : [];

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <KursFormComponents.Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'steg.kurs.validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormLayout.Guide>
                                    <AppText id="steg.kurs.counsellorPanel.avsnitt.1" />
                                    <p>
                                        <AppText id="steg.kurs.counsellorPanel.avsnitt.2" />
                                    </p>
                                    <GodkjentHelseinstitusjonInfo />
                                </FormLayout.Guide>

                                <FormLayout.Questions>
                                    <OpplæringsinstitusjonQuestion
                                        initialValue={values[KursFormFields.opplæringsinstitusjon]}
                                        institusjoner={institusjoner}
                                    />

                                    <EnkeltdagerEllerPerioderQuestion />

                                    {/* Perioder med kurs */}
                                    {values.enkeltdagEllerPeriode === EnkeltdagEllerPeriode.PERIODE && (
                                        <>
                                            <FormikInputGroup
                                                id="kursperioder"
                                                legend={<AppText id="steg.kurs.kursperioder.tittel" />}
                                                description={
                                                    <Box marginBlock="1 6">
                                                        <AppText id="steg.kurs.kursperioder.tekst" />
                                                    </Box>
                                                }
                                                name={KursFormFields.kursperioder}
                                                errorPropagation={false}
                                                validate={getKursperioderValidator}>
                                                <KursperioderFormPart gyldigSøknadsperiode={gyldigSøknadsperiode} />
                                            </FormikInputGroup>

                                            <ReiseQuestions
                                                values={values}
                                                gyldigSøknadsperiode={gyldigSøknadsperiode}
                                                søknadsperiode={søknadsperiode}
                                                disabledDateRanges={disabledDateRanges}
                                                kursperioder={kursperioder}
                                            />

                                            <FerieQuestions
                                                values={values}
                                                gyldigSøknadsperiode={gyldigSøknadsperiode}
                                                søknadsperiode={søknadsperiode}
                                                disabledDateRanges={disabledDateRanges}
                                                kursperioder={kursperioder}
                                            />

                                            <UtenlandsoppholdQuestions
                                                values={values}
                                                gyldigSøknadsperiode={gyldigSøknadsperiode}
                                                søknadsperiode={søknadsperiode}
                                                disabledDateRanges={disabledDateRanges}
                                                kursperioder={kursperioder}
                                            />
                                        </>
                                    )}

                                    {/* Enkeltdager med kurs */}
                                    {values.enkeltdagEllerPeriode === EnkeltdagEllerPeriode.ENKELTDAG && (
                                        <FormikInputGroup
                                            id="enkeltdager"
                                            legend={<AppText id="steg.kurs.enkeltdager.tittel" />}
                                            description={
                                                <Box marginBlock="1 6">
                                                    <AppText id="steg.kurs.enkeltdager.tekst" />
                                                </Box>
                                            }
                                            name={KursFormFields.kursdager}
                                            errorPropagation={false}
                                            validate={getKursperioderValidator}>
                                            <KursdagerFormPart gyldigSøknadsperiode={gyldigSøknadsperiode} />
                                        </FormikInputGroup>
                                    )}
                                </FormLayout.Questions>
                            </KursFormComponents.Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default KursStep;
