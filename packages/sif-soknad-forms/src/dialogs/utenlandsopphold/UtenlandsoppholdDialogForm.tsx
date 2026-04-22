import { Button } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { countryIsMemberOfEøsOrEfta, DateRange, dateUtils, getCountryName } from '@navikt/sif-common-utils';
import { getDateRangeValidator, getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, datePickerUtils, SifInputGroup, useSifValidate, YesOrNo } from '@sif/rhf';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { TidsperiodeFormDialog } from '../tidsperiode/TidsperiodeDialog';
import { TidsperiodeList } from '../tidsperiode/TidsperiodeList';
import { DateTidsperiode } from '../tidsperiode/types';
import {
    Utenlandsopphold,
    UtenlandsoppholdÅrsak,
    UtenlandsoppholdEnkel,
    UtenlandsoppholdInnlagtPeriode,
    UtenlandsoppholdVariant,
} from './types';

export interface UtenlandsoppholdDialogFormConfig {
    variant?: UtenlandsoppholdVariant;
    disabledDateRanges?: DateRange[];
}

interface Props extends UtenlandsoppholdDialogFormConfig {
    formId: string;
    opphold?: Utenlandsopphold;
    alleOpphold?: Utenlandsopphold[];
    variant: UtenlandsoppholdVariant;
    minDate: Date;
    maxDate: Date;
    disabledDateRanges?: DateRange[];
    onValidSubmit: (opphold: Utenlandsopphold) => void;
}

enum UtenlandsoppholdFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
    erSammenMedBarnet = 'erSammenMedBarnet',
    erBarnetInnlagt = 'erBarnetInnlagt',
    barnInnlagtPerioder = 'barnInnlagtPerioder',
    årsak = 'årsak',
}

type UtenlandsoppholdFormValues = {
    [UtenlandsoppholdFormFields.fom]: string;
    [UtenlandsoppholdFormFields.tom]: string;
    [UtenlandsoppholdFormFields.landkode]: string;
    [UtenlandsoppholdFormFields.erSammenMedBarnet]: string;
    [UtenlandsoppholdFormFields.erBarnetInnlagt]: string;
    [UtenlandsoppholdFormFields.barnInnlagtPerioder]: DateTidsperiode[];
    [UtenlandsoppholdFormFields.årsak]: string;
};

const { DateRangePicker, CountrySelect, YesOrNoQuestion, RadioGroup } =
    createSifFormComponents<UtenlandsoppholdFormValues>();

const oppholdToFormValues = (
    opphold: Utenlandsopphold,
    variant: UtenlandsoppholdVariant,
): UtenlandsoppholdFormValues => {
    const base: UtenlandsoppholdFormValues = {
        fom: dateUtils.dateToISODate(opphold.fom),
        tom: dateUtils.dateToISODate(opphold.tom),
        landkode: opphold.landkode,
        erSammenMedBarnet: YesOrNo.UNANSWERED,
        erBarnetInnlagt: YesOrNo.UNANSWERED,
        barnInnlagtPerioder: [],
        årsak: '',
    };

    if (variant === 'enkel' || opphold.type === 'enkel') {
        return base;
    }

    const erSammenMedBarnet = opphold.erSammenMedBarnet ? YesOrNo.YES : YesOrNo.NO;

    if (opphold.type === 'innenfor_eøs') {
        return { ...base, erSammenMedBarnet };
    }

    if (opphold.type === 'utenfor_eøs') {
        const barnInnlagtPerioder = (opphold.barnInnlagtPerioder || []).map((p) => ({
            id: p.id,
            fom: p.fom,
            tom: p.tom,
        }));
        return {
            ...base,
            erSammenMedBarnet,
            erBarnetInnlagt: opphold.erBarnetInnlagt ? YesOrNo.YES : YesOrNo.NO,
            barnInnlagtPerioder,
            årsak: opphold.årsak || '',
        };
    }

    return base;
};

const formValuesToUtenlandsopphold = (
    values: UtenlandsoppholdFormValues,
    variant: UtenlandsoppholdVariant,
    id?: string,
): Utenlandsopphold => {
    const oppholdId = id || crypto.randomUUID();
    const fom = datePickerUtils.parseDatePickerValue(values.fom);
    const tom = datePickerUtils.parseDatePickerValue(values.tom);
    if (!fom || !tom || !values.landkode) {
        throw new Error('Invalid utenlandsopphold values');
    }

    if (variant === 'enkel') {
        const opphold: UtenlandsoppholdEnkel = {
            type: 'enkel',
            id: oppholdId,
            fom,
            tom,
            landkode: values.landkode,
        };
        return opphold;
    }

    const isEøsOrEftaLand = countryIsMemberOfEøsOrEfta(values.landkode);
    const erSammenMedBarnet = values.erSammenMedBarnet === YesOrNo.YES;

    if (isEøsOrEftaLand) {
        return {
            type: 'innenfor_eøs',
            erUtenforEØS: false,
            id: oppholdId,
            fom,
            tom,
            landkode: values.landkode,
            erSammenMedBarnet,
        };
    }

    const erBarnetInnlagt = values.erBarnetInnlagt === YesOrNo.YES;
    const barnInnlagtPerioder: UtenlandsoppholdInnlagtPeriode[] = erBarnetInnlagt
        ? values.barnInnlagtPerioder.map((p) => ({ id: p.id, fom: p.fom, tom: p.tom }))
        : [];

    return {
        type: 'utenfor_eøs',
        erUtenforEØS: true,
        id: oppholdId,
        fom,
        tom,
        landkode: values.landkode,
        erSammenMedBarnet,
        erBarnetInnlagt,
        barnInnlagtPerioder: erBarnetInnlagt ? barnInnlagtPerioder : undefined,
        årsak: erBarnetInnlagt ? (values.årsak as UtenlandsoppholdÅrsak) : undefined,
    };
};

export const UtenlandsoppholdDialogForm = ({
    formId,
    opphold,
    alleOpphold = [],
    variant,
    minDate,
    maxDate,
    disabledDateRanges = [],
    onValidSubmit,
}: Props) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.utenlandsoppholdForm');

    const defaultValues: UtenlandsoppholdFormValues = {
        fom: '',
        tom: '',
        landkode: '',
        erSammenMedBarnet: YesOrNo.UNANSWERED,
        erBarnetInnlagt: YesOrNo.UNANSWERED,
        barnInnlagtPerioder: [],
        årsak: '',
    };

    const methods = useForm<UtenlandsoppholdFormValues>({
        defaultValues: opphold ? oppholdToFormValues(opphold, variant) : defaultValues,
    });

    const { control, getValues, clearErrors, setError } = methods;
    const {
        fields: periodeFields,
        append: appendPeriode,
        remove: removePeriode,
        update: updatePeriode,
    } = useFieldArray({
        control,
        name: UtenlandsoppholdFormFields.barnInnlagtPerioder,
    });

    const [fom, tom, landkode, erSammenMedBarnet, erBarnetInnlagt] = useWatch({
        control,
        name: [
            UtenlandsoppholdFormFields.fom,
            UtenlandsoppholdFormFields.tom,
            UtenlandsoppholdFormFields.landkode,
            UtenlandsoppholdFormFields.erSammenMedBarnet,
            UtenlandsoppholdFormFields.erBarnetInnlagt,
        ],
    });

    const andreOpphold = alleOpphold.filter((o) => o.id !== opphold?.id).map((o) => ({ from: o.fom, to: o.tom }));

    const isEøsOrEftaLand = landkode ? countryIsMemberOfEøsOrEfta(landkode) : undefined;

    const showInnlagtQuestion =
        variant === 'utvidet' && erSammenMedBarnet === YesOrNo.YES && landkode && !isEøsOrEftaLand;
    const showInnlagtPerioderQuestion = Boolean(showInnlagtQuestion && erBarnetInnlagt === YesOrNo.YES && fom && tom);
    const showÅrsakQuestion = showInnlagtPerioderQuestion;
    const showErSammenMedBarnetQuestion = variant === 'utvidet' && Boolean(landkode);

    const [innlagtPeriodeDialogIsOpen, setInnlagtPeriodeDialogIsOpen] = useState(false);
    const [periodeUnderRedigering, setPeriodeUnderRedigering] = useState<DateTidsperiode | undefined>(undefined);

    useEffect(() => {
        if (!showInnlagtPerioderQuestion) {
            clearErrors(UtenlandsoppholdFormFields.barnInnlagtPerioder);
        }
    }, [clearErrors, showInnlagtPerioderQuestion]);

    const handleValidSubmit = (values: UtenlandsoppholdFormValues): void => {
        if (showInnlagtPerioderQuestion && values.barnInnlagtPerioder.length === 0) {
            setError(UtenlandsoppholdFormFields.barnInnlagtPerioder, {
                type: 'required',
                message: sifIntl.text('@sifSoknadForms.utenlandsoppholdForm.validation.barnInnlagtPerioder.noValue'),
            });
            return;
        }

        clearErrors(UtenlandsoppholdFormFields.barnInnlagtPerioder);
        onValidSubmit(formValuesToUtenlandsopphold(values, variant, opphold?.id));
    };

    const barnInnlagtTidsperioder: DateTidsperiode[] = periodeFields as DateTidsperiode[];

    const handleAddPeriode = (periode: DateTidsperiode): void => {
        appendPeriode(periode);
        clearErrors(UtenlandsoppholdFormFields.barnInnlagtPerioder);
        setInnlagtPeriodeDialogIsOpen(false);
        setPeriodeUnderRedigering(undefined);
    };

    const handleEditPeriode = (periode: DateTidsperiode): void => {
        const index = barnInnlagtTidsperioder.findIndex((p) => p.id === periode.id);
        if (index >= 0) {
            updatePeriode(index, periode);
            clearErrors(UtenlandsoppholdFormFields.barnInnlagtPerioder);
        }
        setInnlagtPeriodeDialogIsOpen(false);
        setPeriodeUnderRedigering(undefined);
    };

    const handleDeletePeriode = (periode: DateTidsperiode): void => {
        const index = barnInnlagtTidsperioder.findIndex((p) => p.id === periode.id);
        if (index >= 0) {
            removePeriode(index);
        }
    };

    const fromDate = datePickerUtils.parseDatePickerValue(fom);
    const toDate = datePickerUtils.parseDatePickerValue(tom);

    return (
        <FormProvider {...methods}>
            <form
                id={formId}
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    methods.handleSubmit(handleValidSubmit)();
                }}
                noValidate>
                <FormLayout.Content>
                    <FormLayout.Questions>
                        <DateRangePicker
                            name="utenlandsoppholdPeriode"
                            legend={sifIntl.text('@sifSoknadForms.utenlandsopphold.form.tidsperiode.legend')}
                            fromInputProps={{
                                name: UtenlandsoppholdFormFields.fom,
                                label: sifIntl.text('@sifSoknadForms.utenlandsopphold.form.fom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges: [...andreOpphold, ...disabledDateRanges],
                                validate: validateField(
                                    UtenlandsoppholdFormFields.fom,
                                    (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            toDate: datePickerUtils.parseDatePickerValue(
                                                getValues(UtenlandsoppholdFormFields.tom),
                                            ),
                                        }).validateFromDate(value),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin')
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax')
                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                            toInputProps={{
                                name: UtenlandsoppholdFormFields.tom,
                                label: sifIntl.text('@sifSoknadForms.utenlandsopphold.form.tom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges: [...andreOpphold, ...disabledDateRanges],
                                validate: validateField(
                                    UtenlandsoppholdFormFields.tom,
                                    (value) =>
                                        getDateRangeValidator({
                                            required: true,
                                            min: minDate,
                                            max: maxDate,
                                            fromDate: datePickerUtils.parseDatePickerValue(
                                                getValues(UtenlandsoppholdFormFields.fom),
                                            ),
                                        }).validateToDate(value),
                                    (errorCode) => {
                                        if (errorCode === 'dateIsBeforeMin')
                                            return { dato: sifIntl.date(minDate, 'compact') };
                                        if (errorCode === 'dateIsAfterMax')
                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                    },
                                ),
                            }}
                        />

                        <CountrySelect
                            name={UtenlandsoppholdFormFields.landkode}
                            label={sifIntl.text('@sifSoknadForms.utenlandsopphold.form.land.label')}
                            validate={validateField(UtenlandsoppholdFormFields.landkode, getRequiredFieldValidator())}
                        />

                        {showErSammenMedBarnetQuestion && (
                            <YesOrNoQuestion
                                name={UtenlandsoppholdFormFields.erSammenMedBarnet}
                                legend={sifIntl.text('@sifSoknadForms.utenlandsopphold.form.erSammenMedBarnet.legend', {
                                    land: getCountryName(landkode, sifIntl.locale),
                                })}
                                validate={validateField(
                                    UtenlandsoppholdFormFields.erSammenMedBarnet,
                                    getYesOrNoValidator(),
                                )}
                            />
                        )}

                        {showInnlagtQuestion && (
                            <YesOrNoQuestion
                                name={UtenlandsoppholdFormFields.erBarnetInnlagt}
                                legend={sifIntl.text('@sifSoknadForms.utenlandsopphold.form.erBarnetInnlagt.legend', {
                                    land: getCountryName(landkode, sifIntl.locale),
                                })}
                                validate={validateField(
                                    UtenlandsoppholdFormFields.erBarnetInnlagt,
                                    getYesOrNoValidator(),
                                )}
                            />
                        )}

                        {showInnlagtPerioderQuestion && (
                            <SifInputGroup<UtenlandsoppholdFormValues>
                                name={UtenlandsoppholdFormFields.barnInnlagtPerioder}
                                legend={sifIntl.text(
                                    '@sifSoknadForms.utenlandsopphold.form.barnInnlagtPerioder.legend',
                                )}>
                                <TidsperiodeList
                                    tidsperioder={barnInnlagtTidsperioder}
                                    onEdit={(periode) => {
                                        setPeriodeUnderRedigering(periode);
                                        setInnlagtPeriodeDialogIsOpen(true);
                                    }}
                                    onDelete={handleDeletePeriode}
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="small"
                                    onClick={() => {
                                        setPeriodeUnderRedigering(undefined);
                                        setInnlagtPeriodeDialogIsOpen(true);
                                    }}>
                                    {sifIntl.text('@sifSoknadForms.utenlandsopphold.form.barnInnlagtPerioder.leggTil')}
                                </Button>
                                <TidsperiodeFormDialog
                                    isOpen={innlagtPeriodeDialogIsOpen}
                                    tidsperiode={periodeUnderRedigering}
                                    alleTidsperioder={barnInnlagtTidsperioder}
                                    minDate={fromDate}
                                    maxDate={toDate}
                                    onCancel={() => {
                                        setInnlagtPeriodeDialogIsOpen(false);
                                        setPeriodeUnderRedigering(undefined);
                                    }}
                                    onValidSubmit={(periode) => {
                                        if (periodeUnderRedigering) {
                                            handleEditPeriode(periode);
                                        } else {
                                            handleAddPeriode(periode);
                                        }
                                    }}
                                />
                            </SifInputGroup>
                        )}

                        {showÅrsakQuestion && (
                            <RadioGroup
                                name={UtenlandsoppholdFormFields.årsak}
                                legend={sifIntl.text('@sifSoknadForms.utenlandsopphold.form.årsak.legend', {
                                    land: getCountryName(landkode, sifIntl.locale),
                                })}
                                radios={[
                                    {
                                        value: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE,
                                        label: sifIntl.text(
                                            `@sifSoknadForms.utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE}`,
                                        ),
                                    },
                                    {
                                        value: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_ANNET_LAND,
                                        label: sifIntl.text(
                                            `@sifSoknadForms.utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.INNLAGT_DEKKET_ANNET_LAND}`,
                                        ),
                                    },
                                    {
                                        value: UtenlandsoppholdÅrsak.ANNET,
                                        label: sifIntl.text(
                                            `@sifSoknadForms.utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.ANNET}`,
                                        ),
                                    },
                                ]}
                                validate={validateField(UtenlandsoppholdFormFields.årsak, getRequiredFieldValidator())}
                            />
                        )}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
