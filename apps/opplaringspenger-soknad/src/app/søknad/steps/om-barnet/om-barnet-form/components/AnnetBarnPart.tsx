import { Heading } from '@navikt/ds-react';
import React from 'react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { isDevMode } from '@navikt/sif-common-env';
import {
    getTypedFormComponents,
    resetFieldValue,
    resetFieldValues,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
    ValidateDateError,
} from '@navikt/sif-common-validation';
import { getDateToday, prettifyDate } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import InfoForFarVedNyttBarn from './InfoForFarVedNyttBarn';
import { OmBarnetFormText as Text, useOmBarnetFormIntl } from '../omBarnetFormMessages';
import { OmBarnetFormFields, OmBarnetFormValues, RelasjonTilBarnet } from '../types';
import { ÅrsakBarnetManglerIdentitetsnummer } from '../types/ÅrsakBarnetManglerIdentitetsnummer';
import FødselsattestPart from './FødselsattestPart';
import { FormLayout } from '@navikt/sif-common-ui';
import { nYearsAgo } from '../utils/omBarnetFormUtils';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';

interface Props {
    formValues: Partial<OmBarnetFormValues>;
    søkersFødselsnummer: string;
    harRegistrerteBarn: boolean;
    ettersendelseURL: string;
    andreVedlegg: Vedlegg[];
    initialValues: Partial<OmBarnetFormValues>;
}

const { TextField, DatePicker, Checkbox, RadioGroup, Textarea } = getTypedFormComponents<
    OmBarnetFormFields,
    OmBarnetFormValues,
    ValidationError
>();

const AnnetBarnPart: React.FC<Props> = ({
    formValues,
    ettersendelseURL,
    søkersFødselsnummer,
    harRegistrerteBarn,
    andreVedlegg,
    initialValues,
}) => {
    const { text } = useOmBarnetFormIntl();
    const { values, setFieldValue } = useFormikContext<OmBarnetFormValues>();

    const { barnetHarIkkeFnr, årsakManglerIdentitetsnummer } = values;

    return (
        <SkjemagruppeQuestion
            legend={
                harRegistrerteBarn ? (
                    <Heading level="3" size="small" spacing={true}>
                        {text('omBarnetForm.annetBarn.tittel')}
                    </Heading>
                ) : undefined
            }>
            <FormLayout.Questions>
                <TextField
                    label={text('omBarnetForm.fnr.spm')}
                    name={OmBarnetFormFields.barnetsFødselsnummer}
                    validate={
                        barnetHarIkkeFnr
                            ? undefined
                            : getFødselsnummerValidator({
                                  required: true,
                                  allowHnr: isDevMode(),
                                  disallowedValues: [søkersFødselsnummer],
                              })
                    }
                    width="xl"
                    type="tel"
                    maxLength={11}
                    disabled={barnetHarIkkeFnr}
                />
                <FormLayout.QuestionBleedTop>
                    <Checkbox
                        label={text('omBarnetForm.fnr.barnHarIkkeFnr')}
                        name={OmBarnetFormFields.barnetHarIkkeFnr}
                        afterOnChange={(newValue) => {
                            if (newValue) {
                                resetFieldValue(OmBarnetFormFields.barnetsFødselsnummer, setFieldValue, initialValues);
                            } else {
                                resetFieldValues(
                                    [
                                        OmBarnetFormFields.årsakManglerIdentitetsnummer,
                                        OmBarnetFormFields.barnetsFødselsdato,
                                    ],
                                    setFieldValue,
                                    initialValues,
                                );
                            }
                        }}
                    />
                </FormLayout.QuestionBleedTop>
                {barnetHarIkkeFnr && (
                    <RadioGroup
                        legend={text('omBarnetForm.årsakManglerIdentitetsnummer.spm')}
                        name={OmBarnetFormFields.årsakManglerIdentitetsnummer}
                        radios={Object.keys(ÅrsakBarnetManglerIdentitetsnummer).map((årsak, index) => ({
                            label: text(`omBarnetForm.årsakManglerIdentitetsnummer.${årsak}` as any),
                            value: årsak,
                            className:
                                index === Object.keys(ÅrsakBarnetManglerIdentitetsnummer).length - 1
                                    ? 'siste-element'
                                    : undefined,
                        }))}
                        validate={getRequiredFieldValidator()}
                        value={formValues.årsakManglerIdentitetsnummer}
                    />
                )}

                <TextField
                    label={text('omBarnetForm.navn')}
                    name={OmBarnetFormFields.barnetsNavn}
                    validate={getStringValidator({ required: true, maxLength: 50 })}
                    width="xl"
                />

                {barnetHarIkkeFnr && (
                    <DatePicker
                        name={OmBarnetFormFields.barnetsFødselsdato}
                        label={text('omBarnetForm.fødselsdato')}
                        validate={(value) => {
                            const dateError = getDateValidator({
                                required: true,
                                max: getDateToday(),
                            })(value);
                            if (dateError === ValidateDateError.dateIsBeforeMin) {
                                return {
                                    key: dateError,
                                    values: { dato: prettifyDate(nYearsAgo(18)) },
                                };
                            }
                            return dateError;
                        }}
                        minDate={nYearsAgo(18)}
                        maxDate={getDateToday()}
                        dropdownCaption={true}
                    />
                )}

                <RadioGroup
                    legend={text('omBarnetForm.relasjon.spm')}
                    name={OmBarnetFormFields.relasjonTilBarnet}
                    radios={Object.keys(RelasjonTilBarnet).map((relasjon) => ({
                        label: text(`omBarnetForm.relasjonTilBarnet.${relasjon}` as any),
                        value: relasjon,
                    }))}
                    validate={getRequiredFieldValidator()}
                    value={formValues.relasjonTilBarnet}></RadioGroup>

                {formValues.relasjonTilBarnet === RelasjonTilBarnet.FAR && (
                    <FormLayout.QuestionBleedTop>
                        <InfoForFarVedNyttBarn />
                    </FormLayout.QuestionBleedTop>
                )}
                {formValues.relasjonTilBarnet === RelasjonTilBarnet.ANNET && (
                    <Textarea
                        label={text('omBarnetForm.relasjonAnnet.spm')}
                        description={
                            <>
                                <ExpandableInfo title={text('omBarnetForm.relasjonAnnet.info.tittel')}>
                                    <div>
                                        <Text id="omBarnetForm.relasjonAnnet.info.hjelpetekst.1" />
                                    </div>
                                    <p>
                                        <Text id="omBarnetForm.relasjonAnnet.info.hjelpetekst.2" />
                                    </p>
                                </ExpandableInfo>
                            </>
                        }
                        name={OmBarnetFormFields.relasjonTilBarnetBeskrivelse}
                        validate={(value) => {
                            const error = getStringValidator({ required: true, maxLength: 2000 })(value);
                            return error
                                ? {
                                      key: error,
                                      values: { min: 0, maks: 2000 },
                                  }
                                : undefined;
                        }}
                        value={formValues.relasjonTilBarnet || ''}
                        data-testid="opplysninger-om-barnet-relasjonAnnetBeskrivelse"
                    />
                )}
                {barnetHarIkkeFnr &&
                    årsakManglerIdentitetsnummer === ÅrsakBarnetManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET && (
                        <FødselsattestPart
                            fødselsattester={values.fødselsattest || []}
                            ettersendelseURL={ettersendelseURL}
                            andreVedlegg={andreVedlegg}
                        />
                    )}
            </FormLayout.Questions>
        </SkjemagruppeQuestion>
    );
};
export default AnnetBarnPart;
