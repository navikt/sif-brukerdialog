import { FormLayout } from '@navikt/sif-common-ui';
import { countryIsMemberOfEøsOrEfta, dateRangesCollide, ISODate } from '@sif/utils';
import {
    getISODateValidator,
    getRequiredFieldValidator,
    getStringValidator,
    getYesOrNoValidator,
} from '@navikt/sif-validation';
import { SifForm, createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { useForm } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { ArbeidUtland, ArbeidUtlandVariant } from '.';
import { arbeidUtlandUtils } from './arbeidUtlandUtils';

interface ArbeidUtlandFormProps {
    formId: string;
    minDate?: ISODate;
    maxDate?: ISODate;
    arbeidssted?: ArbeidUtland;
    alleArbeider?: ArbeidUtland[];
    variant: ArbeidUtlandVariant;
    onValidSubmit: (values: ArbeidUtland) => void;
}

export enum ArbeidUtlandFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
    jobbetIPerioden = 'jobbetIPerioden',
    utenlandskNasjonalId = 'utenlandskNasjonalId',
}

export type ArbeidUtlandFormValues = {
    [ArbeidUtlandFormFields.fom]: string;
    [ArbeidUtlandFormFields.tom]: string;
    [ArbeidUtlandFormFields.landkode]: string;
    [ArbeidUtlandFormFields.jobbetIPerioden]?: YesOrNo;
    [ArbeidUtlandFormFields.utenlandskNasjonalId]?: string;
};

const { DateRangePicker, CountrySelect, TextField, YesOrNoQuestion } =
    createSifFormComponents<ArbeidUtlandFormValues>();

export const ArbeidUtlandDialogForm = ({
    formId,
    minDate,
    maxDate,
    arbeidssted,
    alleArbeider,
    variant,
    onValidSubmit,
}: ArbeidUtlandFormProps) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadForms.arbeidUtlandForm');
    // const [invalidValues, setInvalidValues] = useState<string | undefined>();

    const methods = useForm<ArbeidUtlandFormValues>({
        defaultValues: arbeidssted ? arbeidUtlandUtils.arbeidUtlandToFormValues(arbeidssted) : undefined,
    });

    const utilgjengeligePerioder = (alleArbeider?.filter((b) => b.id !== arbeidssted?.id) || []).map((b) => b.periode);

    const handleValidSubmit = (values: ArbeidUtlandFormValues): void => {
        try {
            const arbeidUtland = arbeidUtlandUtils.formValuesToArbeidUtland(
                values,
                variant,
                sifIntl.locale,
                arbeidssted?.id,
            );
            onValidSubmit(arbeidUtland);
        } catch (error) {
            console.error(error);
        }
    };

    const validateLandkode = validateField(ArbeidUtlandFormFields.landkode, getRequiredFieldValidator());

    const jobbetIPeriodenFormValue = methods.watch(ArbeidUtlandFormFields.jobbetIPerioden);
    const landkodeFormValue = methods.watch(ArbeidUtlandFormFields.landkode);

    const jobbetIPerioden = variant === 'periodeMedJobb' || jobbetIPeriodenFormValue === YesOrNo.YES;

    return (
        <SifForm methods={methods} id={formId} onSubmit={handleValidSubmit}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <CountrySelect
                        name={ArbeidUtlandFormFields.landkode}
                        label={sifIntl.text('@sifSoknadForms.arbeidUtland.form.land.label')}
                        validate={validateLandkode}
                        excludeNorway={true}
                    />
                    <DateRangePicker
                        name="arbeidssted"
                        legend={sifIntl.text('@sifSoknadForms.arbeidUtland.form.tidsperiode.legend')}
                        dropdownCaption={true}
                        validate={validateField('arbeidssted', ({ fromDate, toDate }) => {
                            if (fromDate && toDate && fromDate > toDate) return 'fromDateIsAfterToDate';
                            if (
                                fromDate &&
                                toDate &&
                                utilgjengeligePerioder.some((periode) =>
                                    dateRangesCollide([{ from: fromDate, to: toDate }, periode]),
                                )
                            ) {
                                return 'perioderOverlapper';
                            }
                        })}
                        fromInputProps={{
                            name: ArbeidUtlandFormFields.fom,
                            label: sifIntl.text('@sifSoknadForms.arbeidUtland.form.fom.label'),
                            minDate,
                            maxDate,
                            disabledDateRanges: utilgjengeligePerioder,
                            validate: validateField(
                                ArbeidUtlandFormFields.fom,
                                getISODateValidator({ required: true, min: minDate, max: maxDate }),
                                (errorCode) => {
                                    if (errorCode === 'dateIsBeforeMin' && minDate)
                                        return { dato: sifIntl.date(minDate, 'compact') };
                                    if (errorCode === 'dateIsAfterMax' && maxDate)
                                        return { dato: sifIntl.date(maxDate, 'compact') };
                                },
                            ),
                        }}
                        toInputProps={{
                            name: ArbeidUtlandFormFields.tom,
                            label: sifIntl.text('@sifSoknadForms.arbeidUtland.form.tom.label'),
                            minDate,
                            maxDate,
                            disabledDateRanges: utilgjengeligePerioder,
                            validate: validateField(
                                ArbeidUtlandFormFields.tom,
                                getISODateValidator({ required: true, min: minDate, max: maxDate }),
                                (errorCode) => {
                                    if (errorCode === 'dateIsBeforeMin' && minDate)
                                        return { dato: sifIntl.date(minDate, 'compact') };
                                    if (errorCode === 'dateIsAfterMax' && maxDate)
                                        return { dato: sifIntl.date(maxDate, 'compact') };
                                },
                            ),
                        }}
                    />
                    {variant !== 'periodeMedJobb' && (
                        <YesOrNoQuestion
                            name={ArbeidUtlandFormFields.jobbetIPerioden}
                            legend={sifIntl.text('@sifSoknadForms.arbeidUtland.form.jobbetIPerioden.label')}
                            validate={validateField(ArbeidUtlandFormFields.jobbetIPerioden, getYesOrNoValidator())}
                        />
                    )}

                    {jobbetIPerioden && landkodeFormValue && countryIsMemberOfEøsOrEfta(landkodeFormValue) && (
                        <TextField
                            maxLength={20}
                            style={{ maxWidth: '20rem' }}
                            name={ArbeidUtlandFormFields.utenlandskNasjonalId}
                            label={sifIntl.text('@sifSoknadForms.arbeidUtland.form.utenlandskNasjonalId.label')}
                            validate={validateField(
                                ArbeidUtlandFormFields.utenlandskNasjonalId,
                                getStringValidator({ disallowUnicodeCharacters: true }),
                            )}
                        />
                    )}
                </FormLayout.Questions>
            </FormLayout.Content>
        </SifForm>
    );
};
