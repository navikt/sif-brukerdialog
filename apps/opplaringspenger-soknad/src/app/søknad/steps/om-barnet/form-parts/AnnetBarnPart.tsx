import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { isDevMode } from '@navikt/sif-common-env';
import {
    getTypedFormComponents,
    resetFieldValue,
    resetFieldValues,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds/src';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
    ValidateDateError,
} from '@navikt/sif-common-formik-ds/src/validation';
import { getDateToday, prettifyDate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../../../i18n';
import { ÅrsakManglerIdentitetsnummer } from '../../../../types/ÅrsakManglerIdentitetsnummer';
import { OmBarnetFormFields, OmBarnetFormValues } from '../OmBarnetStep';
import FødselsattestPart from './FødselsattestPart';
import { BarnRelasjon } from '../../../../types/BarnRelasjon';
import InfoForFarVedNyttBarn from '../info/InfoForFarVedNyttBarn';

interface Props {
    formValues: Partial<OmBarnetFormValues>;
    søkersFødselsnummer: string;
    harRegistrerteBarn: boolean;
    initialValues: Partial<OmBarnetFormValues>;
}

const { TextField, DatePicker, Checkbox, RadioGroup, Textarea } = getTypedFormComponents<
    OmBarnetFormFields,
    OmBarnetFormValues,
    ValidationError
>();

const nYearsAgo = (years: number): Date => {
    return dayjs(getDateToday()).subtract(years, 'y').startOf('year').toDate();
};

const AnnetBarnPart: React.FC<Props> = ({ formValues, søkersFødselsnummer, harRegistrerteBarn, initialValues }) => {
    const { text } = useAppIntl();
    const { values, setFieldValue } = useFormikContext<OmBarnetFormValues>();

    const { barnetHarIkkeFnr, årsakManglerIdentitetsnummer } = values;

    return (
        <Block margin="xl">
            <SkjemagruppeQuestion
                legend={
                    harRegistrerteBarn ? (
                        <Heading level="2" size="small" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                            {text('steg.omBarnet.annetBarn.tittel')}
                        </Heading>
                    ) : undefined
                }>
                <div>
                    <TextField
                        label={text('steg.omBarnet.fnr.spm')}
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
                    <FormBlock margin="l">
                        <Checkbox
                            label={text('steg.omBarnet.fnr.barnHarIkkeFnr')}
                            name={OmBarnetFormFields.barnetHarIkkeFnr}
                            afterOnChange={(newValue) => {
                                if (newValue) {
                                    resetFieldValue(
                                        OmBarnetFormFields.barnetsFødselsnummer,
                                        setFieldValue,
                                        initialValues,
                                    );
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
                    </FormBlock>

                    {barnetHarIkkeFnr && (
                        <FormBlock>
                            <RadioGroup
                                legend={text('steg.omBarnet.årsakManglerIdentitetsnummer.spm')}
                                name={OmBarnetFormFields.årsakManglerIdentitetsnummer}
                                radios={Object.keys(ÅrsakManglerIdentitetsnummer).map((årsak, index) => ({
                                    label: text(`steg.omBarnet.årsakManglerIdentitetsnummer.${årsak}` as any),
                                    value: årsak,
                                    className:
                                        index === Object.keys(ÅrsakManglerIdentitetsnummer).length - 1
                                            ? 'siste-element'
                                            : undefined,
                                }))}
                                validate={getRequiredFieldValidator()}
                                value={formValues.årsakManglerIdentitetsnummer}
                            />
                        </FormBlock>
                    )}
                    <FormBlock>
                        <TextField
                            label={text('steg.omBarnet.navn')}
                            name={OmBarnetFormFields.barnetsNavn}
                            validate={getStringValidator({ required: true, maxLength: 50 })}
                            width="xl"
                        />
                    </FormBlock>
                    {barnetHarIkkeFnr && (
                        <FormBlock>
                            <DatePicker
                                name={OmBarnetFormFields.barnetsFødselsdato}
                                label={text('steg.omBarnet.fødselsdato')}
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
                                title="abc"
                                minDate={nYearsAgo(18)}
                                maxDate={getDateToday()}
                                dropdownCaption={true}
                            />
                        </FormBlock>
                    )}

                    <FormBlock>
                        <RadioGroup
                            legend={text('steg.omBarnet.relasjon.spm')}
                            name={OmBarnetFormFields.relasjonTilBarnet}
                            radios={Object.keys(BarnRelasjon).map((relasjon) => ({
                                label: text(`steg.omBarnet.relasjonTilBarnet.${relasjon}` as any),
                                value: relasjon,
                            }))}
                            validate={getRequiredFieldValidator()}
                            value={formValues.relasjonTilBarnet}></RadioGroup>
                    </FormBlock>
                    {formValues.relasjonTilBarnet === BarnRelasjon.FAR && (
                        <Block margin="m">
                            <InfoForFarVedNyttBarn />
                        </Block>
                    )}
                    {formValues.relasjonTilBarnet === BarnRelasjon.ANNET && (
                        <FormBlock>
                            <Textarea
                                label={text('steg.omBarnet.relasjonAnnet.spm')}
                                description={
                                    <>
                                        <ExpandableInfo title={text('steg.omBarnet.relasjonAnnet.info.tittel')}>
                                            <div>
                                                <AppText id="steg.omBarnet.relasjonAnnet.info.hjelpetekst.1" />
                                            </div>
                                            <p>
                                                <AppText id="steg.omBarnet.relasjonAnnet.info.hjelpetekst.2" />
                                            </p>
                                            <p>
                                                <AppText id="steg.omBarnet.relasjonAnnet.info.hjelpetekst.3" />
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
                        </FormBlock>
                    )}
                    {barnetHarIkkeFnr &&
                        årsakManglerIdentitetsnummer === ÅrsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET && (
                            <FormBlock>
                                <FødselsattestPart fødselsattester={values.fødselsattest || []} />
                            </FormBlock>
                        )}
                </div>
            </SkjemagruppeQuestion>
        </Block>
    );
};
export default AnnetBarnPart;
