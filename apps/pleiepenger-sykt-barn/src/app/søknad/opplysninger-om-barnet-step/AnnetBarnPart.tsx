import { useAppIntl } from '@i18n/index';
import { Heading } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { isDevMode } from '@navikt/sif-common-env';
import { resetFieldValue, resetFieldValues, SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { getDateToday, prettifyDate } from '@navikt/sif-common-utils';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    ValidateDateError,
} from '@navikt/sif-validation';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';

import { AppText } from '../../i18n';
import { ÅrsakManglerIdentitetsnummer, BarnRelasjon } from '../../types';
import { initialValues, SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { validateNavn, validateRelasjonTilBarnBeskrivelse } from '../../validation/fieldValidations';
import SøknadFormComponents from '../SøknadFormComponents';
import FødselsattestPart from './FødselsattestPart';
import InfoForFarVedNyttBarn from './info/InfoForFarVedNyttBarn';

interface Props {
    formValues: SøknadFormValues;
    søkersFødselsnummer: string;
    fødselsattester: Vedlegg[];
    harRegistrerteBarn: boolean;
}

const nYearsAgo = (years: number): Date => {
    return dayjs(getDateToday()).subtract(years, 'y').startOf('year').toDate();
};

const AnnetBarnPart = ({ formValues, søkersFødselsnummer, fødselsattester, harRegistrerteBarn }: Props) => {
    const { text } = useAppIntl();
    const {
        values: { barnetHarIkkeFnr, årsakManglerIdentitetsnummer },
        setFieldValue,
    } = useFormikContext<SøknadFormValues>();

    return (
        <SkjemagruppeQuestion
            legend={
                harRegistrerteBarn ? (
                    <Heading level="2" size="small" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                        {text('steg.omBarnet.annetBarn.tittel')}
                    </Heading>
                ) : undefined
            }>
            <FormLayout.Questions>
                <SøknadFormComponents.TextField
                    label={text('steg.omBarnet.fnr.spm')}
                    name={SøknadFormField.barnetsFødselsnummer}
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
                    <SøknadFormComponents.Checkbox
                        label={text('steg.omBarnet.fnr.barnHarIkkeFnr')}
                        name={SøknadFormField.barnetHarIkkeFnr}
                        afterOnChange={(newValue) => {
                            if (newValue) {
                                resetFieldValue(SøknadFormField.barnetsFødselsnummer, setFieldValue, initialValues);
                            } else {
                                resetFieldValues(
                                    [SøknadFormField.årsakManglerIdentitetsnummer, SøknadFormField.barnetsFødselsdato],
                                    setFieldValue,
                                    initialValues,
                                );
                            }
                        }}
                    />
                </FormLayout.QuestionBleedTop>

                {barnetHarIkkeFnr && (
                    <SøknadFormComponents.RadioGroup
                        legend={text('steg.omBarnet.årsakManglerIdentitetsnummer.spm')}
                        name={SøknadFormField.årsakManglerIdentitetsnummer}
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
                )}

                <SøknadFormComponents.TextField
                    label={text('steg.omBarnet.navn')}
                    name={SøknadFormField.barnetsNavn}
                    validate={validateNavn}
                    width="xl"
                />

                {barnetHarIkkeFnr && (
                    <SøknadFormComponents.DatePicker
                        name={SøknadFormField.barnetsFødselsdato}
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
                        title={text('steg.omBarnet.fødselsdato')}
                        minDate={nYearsAgo(18)}
                        maxDate={getDateToday()}
                        dropdownCaption={true}
                    />
                )}

                <SøknadFormComponents.RadioGroup
                    legend={text('steg.omBarnet.relasjon.spm')}
                    name={SøknadFormField.relasjonTilBarnet}
                    radios={Object.keys(BarnRelasjon).map((relasjon) => ({
                        label: text(`barnRelasjon.${relasjon}` as any),
                        value: relasjon,
                    }))}
                    validate={getRequiredFieldValidator()}
                    value={formValues.relasjonTilBarnet}></SøknadFormComponents.RadioGroup>

                {formValues.relasjonTilBarnet === BarnRelasjon.FAR && (
                    <FormLayout.QuestionRelatedMessage>
                        <InfoForFarVedNyttBarn />
                    </FormLayout.QuestionRelatedMessage>
                )}
                {formValues.relasjonTilBarnet === BarnRelasjon.ANNET && (
                    <SøknadFormComponents.Textarea
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
                        name={SøknadFormField.relasjonTilBarnetBeskrivelse}
                        validate={validateRelasjonTilBarnBeskrivelse}
                        value={formValues.relasjonTilBarnet || ''}
                        data-testid="opplysninger-om-barnet-relasjonAnnetBeskrivelse"
                    />
                )}
                {barnetHarIkkeFnr &&
                    årsakManglerIdentitetsnummer === ÅrsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET && (
                        <FødselsattestPart fødselsattester={fødselsattester} />
                    )}
            </FormLayout.Questions>
        </SkjemagruppeQuestion>
    );
};
export default AnnetBarnPart;
