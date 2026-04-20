import { Button } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { countryIsMemberOfEøsOrEfta, DateRange, dateUtils, getCountryName } from '@navikt/sif-common-utils';
import { getDateRangeValidator, getRequiredFieldValidator, getYesOrNoValidator, validationUtils } from '@navikt/sif-validation';
import { createSifFormComponents, YesOrNo } from '@sif/rhf';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { TidsperiodeFormDialog } from '../tidsperiode/TidsperiodeDialog';
import { DateTidsperiode } from '../tidsperiode/types';
import { TidsperiodeList } from '../tidsperiode/TidsperiodeList';
import { Utenlandsopphold, UtenlandsoppholdEnkel, UtenlandsoppholdInnlagtPeriode, UtenlandsoppholdÅrsak, UtenlandsoppholdVariant } from './types';

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

const oppholdToFormValues = (opphold: Utenlandsopphold, variant: UtenlandsoppholdVariant): UtenlandsoppholdFormValues => {
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
    const fom = validationUtils.getDateFromDateString(values.fom);
    const tom = validationUtils.getDateFromDateString(values.tom);
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
    const intl = useSifSoknadFormsIntl();

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

    const { control, getValues } = methods;
    const { fields: periodeFields, append: appendPeriode, remove: removePeriode, update: updatePeriode } = useFieldArray({
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

    const showInnlagtQuestion = variant === 'utvidet' && erSammenMedBarnet === YesOrNo.YES && landkode && !isEøsOrEftaLand;
    const showInnlagtPerioderQuestion = Boolean(
        showInnlagtQuestion && erBarnetInnlagt === YesOrNo.YES && fom && tom,
    );
    const showÅrsakQuestion = showInnlagtPerioderQuestion;
    const showErSammenMedBarnetQuestion = variant === 'utvidet' && Boolean(landkode);

    const [innlagtPeriodeDialogIsOpen, setInnlagtPeriodeDialogIsOpen] = useState(false);
    const [periodeUnderRedigering, setPeriodeUnderRedigering] = useState<DateTidsperiode | undefined>(undefined);

    const handleValidSubmit = (values: UtenlandsoppholdFormValues): void => {
        onValidSubmit(formValuesToUtenlandsopphold(values, variant, opphold?.id));
    };

    const barnInnlagtTidsperioder: DateTidsperiode[] = periodeFields as DateTidsperiode[];

    const handleAddPeriode = (periode: DateTidsperiode): void => {
        appendPeriode(periode);
        setInnlagtPeriodeDialogIsOpen(false);
        setPeriodeUnderRedigering(undefined);
    };

    const handleEditPeriode = (periode: DateTidsperiode): void => {
        const index = barnInnlagtTidsperioder.findIndex((p) => p.id === periode.id);
        if (index >= 0) {
            updatePeriode(index, periode);
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

    const fromDate = validationUtils.getDateFromDateString(fom);
    const toDate = validationUtils.getDateFromDateString(tom);

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
                            legend={intl.text('@sifSoknadForms.utenlandsopphold.form.tidsperiode.legend')}
                            fromInputProps={{
                                name: UtenlandsoppholdFormFields.fom,
                                label: intl.text('@sifSoknadForms.utenlandsopphold.form.fom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges: [...andreOpphold, ...disabledDateRanges],
                                validate: (value) =>
                                    getDateRangeValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                        toDate: validationUtils.getDateFromDateString(getValues(UtenlandsoppholdFormFields.tom)),
                                    }).validateFromDate(value),
                            }}
                            toInputProps={{
                                name: UtenlandsoppholdFormFields.tom,
                                label: intl.text('@sifSoknadForms.utenlandsopphold.form.tom.label'),
                                minDate,
                                maxDate,
                                disabledDateRanges: [...andreOpphold, ...disabledDateRanges],
                                validate: (value) =>
                                    getDateRangeValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                        fromDate: validationUtils.getDateFromDateString(getValues(UtenlandsoppholdFormFields.fom)),
                                    }).validateToDate(value),
                            }}
                        />

                        <CountrySelect
                            name={UtenlandsoppholdFormFields.landkode}
                            label={intl.text('@sifSoknadForms.utenlandsopphold.form.land.label')}
                            validate={(value) => getRequiredFieldValidator()(value)}
                        />

                        {showErSammenMedBarnetQuestion && (
                            <YesOrNoQuestion
                                name={UtenlandsoppholdFormFields.erSammenMedBarnet}
                                legend={intl.text('@sifSoknadForms.utenlandsopphold.form.erSammenMedBarnet.legend', {
                                    land: getCountryName(landkode, intl.locale),
                                })}
                                validate={(value) => getYesOrNoValidator()(value)}
                            />
                        )}

                        {showInnlagtQuestion && (
                            <YesOrNoQuestion
                                name={UtenlandsoppholdFormFields.erBarnetInnlagt}
                                legend={intl.text('@sifSoknadForms.utenlandsopphold.form.erBarnetInnlagt.legend', {
                                    land: getCountryName(landkode, intl.locale),
                                })}
                                validate={(value) => getYesOrNoValidator()(value)}
                            />
                        )}

                        {showInnlagtPerioderQuestion && (
                            <div>
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
                                    {intl.text('@sifSoknadForms.utenlandsopphold.form.barnInnlagtPerioder.leggTil')}
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
                            </div>
                        )}

                        {showÅrsakQuestion && (
                            <RadioGroup
                                name={UtenlandsoppholdFormFields.årsak}
                                legend={intl.text('@sifSoknadForms.utenlandsopphold.form.årsak.legend', {
                                    land: getCountryName(landkode, intl.locale),
                                })}
                                radios={[
                                    {
                                        value: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE,
                                        label: intl.text(
                                            `@sifSoknadForms.utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE}`,
                                        ),
                                    },
                                    {
                                        value: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_ANNET_LAND,
                                        label: intl.text(
                                            `@sifSoknadForms.utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.INNLAGT_DEKKET_ANNET_LAND}`,
                                        ),
                                    },
                                    {
                                        value: UtenlandsoppholdÅrsak.ANNET,
                                        label: intl.text(
                                            `@sifSoknadForms.utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.ANNET}`,
                                        ),
                                    },
                                ]}
                                validate={(value) => getRequiredFieldValidator()(value)}
                            />
                        )}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
