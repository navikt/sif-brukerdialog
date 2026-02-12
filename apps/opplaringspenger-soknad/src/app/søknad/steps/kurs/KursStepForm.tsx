import { Box } from '@navikt/ds-react';
import {
    FormikInputGroup,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { Enkeltdato, Ferieuttak, UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds/src';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange, getDateRangesBetweenDateRangesWithinDateRange } from '@navikt/sif-common-utils';
import { useMemo } from 'react';

import { Institusjon } from '../../../api/institusjonService';
import { AppText, useAppIntl } from '../../../i18n';
import GodkjentHelseinstitusjonInfo from './info/GodkjentHelseinstitusjonInfo';
import KursdagerFormPart from './parts/kursdager-form-part/KursdagerFormPart';
import { KursdagFormValues } from './parts/kursdager-form-part/KursdagQuestions';
import { KursperiodeFormValues } from './parts/kursperioder-form-part/KursperiodeQuestions';
import KursperioderFormPart from './parts/kursperioder-form-part/KursperioderFormPart';
import EnkeltdagerEllerPerioderQuestion from './questions/EnkeltdagerEllerPerioderQuestion';
import FerieQuestions from './questions/FerieQuestions';
import OpplæringsinstitusjonQuestion from './questions/OpplæringsinstitusjonQuestion';
import ReiseQuestions from './questions/ReiseQuestions';
import UtenlandsoppholdQuestions from './questions/UtenlandsoppholdQuestionst';
import {
    getDateRangesFromKursperiodeFormValues,
    getKursperioderValidator,
    getSøknadsperiodeFromKursperioderFormValues,
} from './utils/kursStepUtils';

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

interface Props {
    values: Partial<KursFormValues>;
    institusjoner: Institusjon[];
    gyldigSøknadsperiode: DateRange;
    isSubmitting: boolean;
    goBack?: () => void;
}

const KursStepForm = ({ values, institusjoner, gyldigSøknadsperiode, isSubmitting, goBack }: Props) => {
    const { intl } = useAppIntl();

    const søknadsperiode = useMemo(
        () => getSøknadsperiodeFromKursperioderFormValues(values.kursperioder),
        [values.kursperioder],
    );

    const kursperioder = useMemo(
        () => getDateRangesFromKursperiodeFormValues(values.kursperioder),
        [values.kursperioder],
    );

    const disabledDateRanges = useMemo(() => {
        if (!søknadsperiode) {
            return [];
        }
        return getDateRangesBetweenDateRangesWithinDateRange(søknadsperiode.from, søknadsperiode.to, kursperioder);
    }, [søknadsperiode, kursperioder]);

    return (
        <>
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
                                    <Box marginBlock="space-4 space-24">
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
                                <Box marginBlock="space-4 space-24">
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
};

export default KursStepForm;
