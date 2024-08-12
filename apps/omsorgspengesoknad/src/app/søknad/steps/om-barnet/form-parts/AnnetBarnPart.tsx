import { Heading } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-common-formik-ds/src/validation';
import { dateFormatter, getDateToday } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../../i18n';
import { SøkersRelasjonTilBarnet } from '../../../../types/SøkersRelasjonTilBarnet';
import { useSøknadContext } from '../../../context/hooks/useSøknadContext';
import { OmBarnetFormFields, OmBarnetFormValues } from '../OmBarnetStep';
import { getMinDatoForBarnetsFødselsdato, isBarnOver18år } from '../omBarnetStepUtils';
import { isDevMode } from '@navikt/sif-common-core-ds/src/utils/envUtils';

const { TextField, DatePicker, Select } = getTypedFormComponents<
    OmBarnetFormFields,
    OmBarnetFormValues,
    ValidationError
>();

const AnnetBarnpart = () => {
    const {
        state: { søker },
    } = useSøknadContext();

    const { text } = useAppIntl();
    const minDatoForBarnetsFødselsdato = getMinDatoForBarnetsFødselsdato();

    return (
        <>
            <Heading level="2" size="medium">
                <AppText id="steg.omBarnet.annetBarn.tittel" />
            </Heading>
            <FormBlock>
                <TextField
                    label={text('steg.omBarnet.fnr.spm')}
                    name={OmBarnetFormFields.barnetsFødselsnummer}
                    validate={getFødselsnummerValidator({
                        required: true,
                        allowHnr: isDevMode,
                        disallowedValues: [søker.fødselsnummer],
                    })}
                    width="xl"
                    type="tel"
                    maxLength={11}
                />
            </FormBlock>
            <FormBlock>
                <TextField
                    label={text('steg.omBarnet.navn')}
                    name={OmBarnetFormFields.barnetsNavn}
                    width="xl"
                    validate={(value) => {
                        const error = getStringValidator({ required: true, maxLength: 50 })(value);
                        return error ? { key: error, values: { maks: 50 } } : undefined;
                    }}
                />
            </FormBlock>
            <FormBlock>
                <DatePicker
                    name={OmBarnetFormFields.barnetsFødselsdato}
                    label={text('steg.omBarnet.fødselsdato')}
                    validate={(value) => {
                        const dateError = getDateValidator({
                            required: true,
                            max: getDateToday(),
                        })(value);
                        if (dateError) {
                            return dateError;
                        }
                        if (isBarnOver18år(value)) {
                            return {
                                key: 'barnOver18år',
                            };
                        }
                        return undefined;
                    }}
                    minDate={minDatoForBarnetsFødselsdato}
                    maxDate={getDateToday()}
                    dropdownCaption={true}
                    description={text('steg.omBarnet.fødselsdato.info', {
                        minFødselsdato: dateFormatter.full(minDatoForBarnetsFødselsdato),
                    })}
                />
            </FormBlock>
            <FormBlock>
                <Select
                    style={{ maxWidth: '25rem' }}
                    label={text('steg.omBarnet.relasjon')}
                    name={OmBarnetFormFields.søkersRelasjonTilBarnet}
                    validate={getRequiredFieldValidator()}>
                    <option />
                    <option value={SøkersRelasjonTilBarnet.MOR}>
                        <AppText id="steg.omBarnet.relasjonTilBarnet.mor" />
                    </option>
                    <option value={SøkersRelasjonTilBarnet.FAR}>
                        <AppText id="steg.omBarnet.relasjonTilBarnet.far" />
                    </option>
                    <option value={SøkersRelasjonTilBarnet.ADOPTIVFORELDER}>
                        <AppText id="steg.omBarnet.relasjonTilBarnet.adoptivforelder" />
                    </option>
                    <option value={SøkersRelasjonTilBarnet.FOSTERFORELDER}>
                        <AppText id="steg.omBarnet.relasjonTilBarnet.fosterforelder" />
                    </option>
                </Select>
            </FormBlock>
        </>
    );
};

export default AnnetBarnpart;
