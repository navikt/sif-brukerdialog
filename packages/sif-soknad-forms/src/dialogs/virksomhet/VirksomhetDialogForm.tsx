import { Alert, Heading } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { getDate3YearsAgo, getDate4YearsAgo, getDateToday } from '@navikt/sif-common-utils';
import {
    getDateRangeValidator,
    getDateValidator,
    getNumberValidator,
    getOrgNumberValidator,
    getRequiredFieldValidator,
    getStringValidator,
    getYesOrNoValidator,
    validationUtils,
} from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { useSifSoknadFormsIntl } from '../../i18n';
import { Næringstype, Virksomhet } from './types';
import {
    erFiskerNæringstype,
    erVirksomhetRegnetSomNyoppstartet,
    formValuesToVirksomhet,
    VirksomhetFormValues,
    virksomhetToFormValues,
} from './virksomhetUtils';

const MAKS_INNTEKT = 10000000;

interface Props {
    formId: string;
    virksomhet?: Virksomhet;
    harFlereVirksomheter?: boolean;
    skipOrgNumValidation?: boolean;
    onValidSubmit: (virksomhet: Virksomhet) => void;
}

const {
    RadioGroup,
    YesOrNoQuestion,
    TextField,
    CountrySelect,
    DateRangePicker,
    Datepicker,
    Checkbox,
    NumberInput,
    Textarea,
} = createSifFormComponents<VirksomhetFormValues>();

export const VirksomhetDialogForm = ({
    formId,
    virksomhet,
    harFlereVirksomheter,
    skipOrgNumValidation,
    onValidSubmit,
}: Props) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { validateField } = useSifValidate('@sifSoknadFormsVirksomhetForm');
    const methods = useForm<VirksomhetFormValues>({
        defaultValues: virksomhet ? virksomhetToFormValues(virksomhet) : undefined,
    });

    const { watch, setValue } = methods;
    const næringstype = watch('næringstype') as Næringstype | undefined;
    const navnPåVirksomheten = watch('navnPåVirksomheten') || 'virksomheten';
    const registrertINorge = watch('registrertINorge') as YesOrNo | undefined;
    const erPågående = useWatch({ control: methods.control, name: 'erPågående' });
    const harRegnskapsfører = watch('harRegnskapsfører') as YesOrNo | undefined;
    const harBlittYrkesaktiv = watch('harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene') as YesOrNo | undefined;
    const hattVarigEndring = watch('hattVarigEndringAvNæringsinntektSiste4Kalenderår') as YesOrNo | undefined;
    const fomString = watch('fom');
    const fomDate = validationUtils.getDateFromDateString(fomString);

    const maxDate = getDateToday();
    const registrertSomNorsk = registrertINorge === YesOrNo.YES;
    const registrertSomUtenlandsk = registrertINorge === YesOrNo.NO;
    const registreringBesvart = registrertSomNorsk || registrertSomUtenlandsk;
    const erNyoppstartet = fomDate ? erVirksomhetRegnetSomNyoppstartet(fomDate) : undefined;
    const isFisker = erFiskerNæringstype(næringstype);

    useEffect(() => {
        if (erPågående) {
            setValue('tom', '');
        }
    }, [erPågående, setValue]);

    const handleValidSubmit = (values: VirksomhetFormValues): void => {
        onValidSubmit(formValuesToVirksomhet(values, virksomhet?.id));
    };

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
                        <RadioGroup
                            name="næringstype"
                            legend={sifIntl.text('@sifSoknadForms.virksomhet.form.næringstype.legend')}
                            radios={[
                                {
                                    value: Næringstype.FISKE,
                                    label: sifIntl.text(
                                        `@sifSoknadForms.virksomhet.form.næringstype.${Næringstype.FISKE}`,
                                    ),
                                },
                                {
                                    value: Næringstype.JORDBRUK_SKOGBRUK,
                                    label: sifIntl.text(
                                        `@sifSoknadForms.virksomhet.form.næringstype.${Næringstype.JORDBRUK_SKOGBRUK}`,
                                    ),
                                },
                                {
                                    value: Næringstype.DAGMAMMA,
                                    label: sifIntl.text(
                                        `@sifSoknadForms.virksomhet.form.næringstype.${Næringstype.DAGMAMMA}`,
                                    ),
                                },
                                {
                                    value: Næringstype.ANNEN,
                                    label: sifIntl.text(
                                        `@sifSoknadForms.virksomhet.form.næringstype.${Næringstype.ANNEN}`,
                                    ),
                                },
                            ]}
                            validate={validateField('næringstype', getRequiredFieldValidator())}
                        />

                        {isFisker && (
                            <YesOrNoQuestion
                                name="fiskerErPåBladB"
                                legend={sifIntl.text('@sifSoknadForms.virksomhet.form.fiskerErPåBladB.legend')}
                                validate={validateField('fiskerErPåBladB', getYesOrNoValidator())}
                            />
                        )}

                        <TextField
                            name="navnPåVirksomheten"
                            label={sifIntl.text('@sifSoknadForms.virksomhet.form.navnPåVirksomheten.label')}
                            maxLength={50}
                            validate={validateField(
                                'navnPåVirksomheten',
                                getStringValidator({ required: true, disallowUnicodeCharacters: true }),
                            )}
                        />

                        <YesOrNoQuestion
                            name="registrertINorge"
                            legend={sifIntl.text('@sifSoknadForms.virksomhet.form.registrertINorge.legend', {
                                navn: navnPåVirksomheten,
                            })}
                            validate={validateField('registrertINorge', getYesOrNoValidator())}
                        />

                        {registrertSomUtenlandsk && (
                            <CountrySelect
                                name="registrertILand"
                                label={sifIntl.text('@sifSoknadForms.virksomhet.form.registrertILand.label', {
                                    navn: navnPåVirksomheten,
                                })}
                                validate={validateField('registrertILand', getRequiredFieldValidator())}
                            />
                        )}

                        {registrertSomNorsk && (
                            <TextField
                                name="organisasjonsnummer"
                                label={sifIntl.text('@sifSoknadForms.virksomhet.form.organisasjonsnummer.label')}
                                style={{ maxWidth: '10rem' }}
                                maxLength={9}
                                validate={
                                    skipOrgNumValidation
                                        ? undefined
                                        : validateField(
                                              'organisasjonsnummer',
                                              getOrgNumberValidator({ required: true }),
                                          )
                                }
                            />
                        )}

                        {registreringBesvart && (
                            <>
                                <DateRangePicker
                                    name="virksomhetPeriode"
                                    legend={sifIntl.text('@sifSoknadForms.virksomhet.form.tidsperiode.legend', {
                                        navn: navnPåVirksomheten,
                                    })}
                                    fromInputProps={{
                                        name: 'fom',
                                        label: sifIntl.text('@sifSoknadForms.virksomhet.form.fom.label'),
                                        maxDate,
                                        validate: validateField(
                                            'fom',
                                            (value) =>
                                                getDateRangeValidator({
                                                    required: true,
                                                    max: maxDate,
                                                    toDate: validationUtils.getDateFromDateString(
                                                        methods.getValues('tom'),
                                                    ),
                                                }).validateFromDate(value),
                                            (errorCode) => {
                                                if (errorCode === 'dateIsAfterMax')
                                                    return { dato: sifIntl.date(maxDate, 'compact') };
                                            },
                                        ),
                                    }}
                                    toInputProps={{
                                        name: 'tom',
                                        label: sifIntl.text('@sifSoknadForms.virksomhet.form.tom.label'),
                                        maxDate,
                                        inputDisabled: erPågående,
                                        validate: erPågående
                                            ? undefined
                                            : validateField(
                                                  'tom',
                                                  (value) =>
                                                      getDateRangeValidator({
                                                          required: true,
                                                          max: maxDate,
                                                          fromDate: validationUtils.getDateFromDateString(
                                                              methods.getValues('fom'),
                                                          ),
                                                      }).validateToDate(value),
                                                  (errorCode) => {
                                                      if (errorCode === 'dateIsAfterMax')
                                                          return { dato: sifIntl.date(maxDate, 'compact') };
                                                  },
                                              ),
                                    }}
                                />
                                <FormLayout.QuestionBleedTop>
                                    <Checkbox name="erPågående">
                                        {sifIntl.text('@sifSoknadForms.virksomhet.form.erPågående.label')}
                                    </Checkbox>
                                </FormLayout.QuestionBleedTop>
                            </>
                        )}

                        {fomDate && (
                            <>
                                {harFlereVirksomheter && erNyoppstartet !== undefined && (
                                    <div>
                                        {erNyoppstartet ? (
                                            <>
                                                <Heading level="2" size="small">
                                                    {sifIntl.text(
                                                        '@sifSoknadForms.virksomhet.form.næringsinntekt.flereVirksomheter.header',
                                                    )}
                                                </Heading>
                                                <p>
                                                    {sifIntl.text(
                                                        '@sifSoknadForms.virksomhet.form.næringsinntekt.flereVirksomheter.info',
                                                    )}
                                                </p>
                                            </>
                                        ) : null}
                                    </div>
                                )}

                                {erNyoppstartet === true && (
                                    <>
                                        <NumberInput
                                            name="næringsinntekt"
                                            label={
                                                harFlereVirksomheter
                                                    ? sifIntl.text(
                                                          '@sifSoknadForms.virksomhet.form.næringsinntekt.flereVirksomheter.label',
                                                      )
                                                    : sifIntl.text(
                                                          '@sifSoknadForms.virksomhet.form.næringsinntekt.label',
                                                      )
                                            }
                                            integerValue={true}
                                            maxLength={10}
                                            style={{ maxWidth: '10rem' }}
                                            validate={validateField(
                                                'næringsinntekt',
                                                getNumberValidator({
                                                    required: true,
                                                    min: 0,
                                                    max: MAKS_INNTEKT,
                                                    allowDecimals: false,
                                                }),
                                            )}
                                        />

                                        <YesOrNoQuestion
                                            name="harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"
                                            legend={sifIntl.text(
                                                '@sifSoknadForms.virksomhet.form.harBlittYrkesaktiv.legend',
                                            )}
                                            validate={validateField(
                                                'harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene',
                                                getYesOrNoValidator(),
                                            )}
                                        />

                                        {harBlittYrkesaktiv === YesOrNo.YES && (
                                            <Datepicker
                                                name="blittYrkesaktivDato"
                                                label={sifIntl.text(
                                                    '@sifSoknadForms.virksomhet.form.blittYrkesaktivDato.label',
                                                )}
                                                minDate={getDate3YearsAgo()}
                                                maxDate={maxDate}
                                                validate={validateField(
                                                    'blittYrkesaktivDato',
                                                    getDateValidator({
                                                        required: true,
                                                        max: maxDate,
                                                        min: getDate3YearsAgo(),
                                                    }),
                                                    (errorCode) => {
                                                        if (errorCode === 'dateIsBeforeMin')
                                                            return {
                                                                dato: sifIntl.date(getDate3YearsAgo(), 'compact'),
                                                            };
                                                        if (errorCode === 'dateIsAfterMax')
                                                            return { dato: sifIntl.date(maxDate, 'compact') };
                                                    },
                                                )}
                                            />
                                        )}
                                    </>
                                )}

                                {erNyoppstartet === false && (
                                    <>
                                        <YesOrNoQuestion
                                            name="hattVarigEndringAvNæringsinntektSiste4Kalenderår"
                                            legend={sifIntl.text('@sifSoknadForms.virksomhet.form.varigEndring.legend')}
                                            validate={validateField(
                                                'hattVarigEndringAvNæringsinntektSiste4Kalenderår',
                                                getYesOrNoValidator(),
                                            )}
                                        />

                                        {hattVarigEndring === YesOrNo.YES && (
                                            <FormLayout.Panel>
                                                <FormLayout.Questions>
                                                    <Datepicker
                                                        name="varigEndringINæringsinntekt_dato"
                                                        label={sifIntl.text(
                                                            '@sifSoknadForms.virksomhet.form.varigEndring.dato.label',
                                                        )}
                                                        minDate={getDate4YearsAgo()}
                                                        maxDate={maxDate}
                                                        validate={validateField(
                                                            'varigEndringINæringsinntekt_dato',
                                                            getDateValidator({
                                                                required: true,
                                                                min: getDate4YearsAgo(),
                                                                max: maxDate,
                                                            }),
                                                            (errorCode) => {
                                                                if (errorCode === 'dateIsBeforeMin')
                                                                    return {
                                                                        dato: sifIntl.date(
                                                                            getDate4YearsAgo(),
                                                                            'compact',
                                                                        ),
                                                                    };
                                                                if (errorCode === 'dateIsAfterMax')
                                                                    return {
                                                                        dato: sifIntl.date(maxDate, 'compact'),
                                                                    };
                                                            },
                                                        )}
                                                    />
                                                    <NumberInput
                                                        name="varigEndringINæringsinntekt_inntektEtterEndring"
                                                        label={sifIntl.text(
                                                            '@sifSoknadForms.virksomhet.form.varigEndring.inntekt.label',
                                                        )}
                                                        integerValue={true}
                                                        maxLength={10}
                                                        style={{ maxWidth: '10rem' }}
                                                        validate={validateField(
                                                            'varigEndringINæringsinntekt_inntektEtterEndring',
                                                            getNumberValidator({
                                                                required: true,
                                                                min: 0,
                                                                max: MAKS_INNTEKT,
                                                                allowDecimals: false,
                                                            }),
                                                        )}
                                                    />
                                                    <Textarea
                                                        name="varigEndringINæringsinntekt_forklaring"
                                                        label={sifIntl.text(
                                                            '@sifSoknadForms.virksomhet.form.varigEndring.forklaring.label',
                                                        )}
                                                        maxLength={1000}
                                                        validate={validateField(
                                                            'varigEndringINæringsinntekt_forklaring',
                                                            getStringValidator({
                                                                required: true,
                                                                minLength: 5,
                                                                maxLength: 1000,
                                                            }),
                                                            (errorCode) => {
                                                                if (errorCode === 'stringIsTooLong')
                                                                    return { maks: 1000 };
                                                                if (errorCode === 'stringIsTooShort') return { min: 5 };
                                                            },
                                                        )}
                                                    />
                                                </FormLayout.Questions>
                                            </FormLayout.Panel>
                                        )}
                                    </>
                                )}

                                {registrertSomNorsk && (
                                    <>
                                        <YesOrNoQuestion
                                            name="harRegnskapsfører"
                                            legend={sifIntl.text(
                                                '@sifSoknadForms.virksomhet.form.harRegnskapsfører.legend',
                                            )}
                                            validate={validateField('harRegnskapsfører', getYesOrNoValidator())}
                                        />

                                        {harRegnskapsfører === YesOrNo.YES && (
                                            <FormLayout.Panel bleedTop={true}>
                                                <FormLayout.Questions>
                                                    <TextField
                                                        name="regnskapsfører_navn"
                                                        label={sifIntl.text(
                                                            '@sifSoknadForms.virksomhet.form.regnskapsfører_navn.label',
                                                        )}
                                                        maxLength={50}
                                                        validate={validateField(
                                                            'regnskapsfører_navn',
                                                            getStringValidator({
                                                                required: true,
                                                                minLength: 2,
                                                                maxLength: 50,
                                                                disallowUnicodeCharacters: true,
                                                            }),
                                                            (errorCode) => {
                                                                if (errorCode === 'stringIsTooLong')
                                                                    return { maks: 50 };
                                                                if (errorCode === 'stringIsTooShort') return { min: 2 };
                                                            },
                                                        )}
                                                    />
                                                    <TextField
                                                        name="regnskapsfører_telefon"
                                                        label={sifIntl.text(
                                                            '@sifSoknadForms.virksomhet.form.regnskapsfører_telefon.label',
                                                        )}
                                                        maxLength={15}
                                                        validate={validateField(
                                                            'regnskapsfører_telefon',
                                                            getStringValidator({
                                                                required: true,
                                                                minLength: 5,
                                                                maxLength: 15,
                                                                formatRegExp: /^[0-9+ ]+$/,
                                                                disallowUnicodeCharacters: true,
                                                            }),
                                                            (errorCode) => {
                                                                if (errorCode === 'stringIsTooLong')
                                                                    return { maks: 15 };
                                                                if (errorCode === 'stringIsTooShort') return { min: 5 };
                                                            },
                                                        )}
                                                    />
                                                </FormLayout.Questions>
                                            </FormLayout.Panel>
                                        )}

                                        {harRegnskapsfører === YesOrNo.YES && (
                                            <Alert variant="info">
                                                {sifIntl.text(
                                                    '@sifSoknadForms.virksomhet.form.veileder_innhenter_info',
                                                )}
                                            </Alert>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </form>
        </FormProvider>
    );
};
