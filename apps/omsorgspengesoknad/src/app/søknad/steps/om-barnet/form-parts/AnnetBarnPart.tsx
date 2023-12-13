import { Heading } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-common-formik-ds/lib/validation';
import { useSøknadContext } from '../../../context/hooks/useSøknadContext';
import { OmBarnetFormFields, OmBarnetFormValues } from '../OmBarnetStep';
import { SøkersRelasjonTilBarnet, SøkersRelasjonTilBarnetKeys } from '../../../../types/SøkersRelasjonTilBarnet';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter, dateToday } from '@navikt/sif-common-utils/lib';
import { getMinDatoForBarnetsFødselsdato, isBarnOver18år } from '../omBarnetStepUtils';

const { TextField, DatePicker, Select } = getTypedFormComponents<
    OmBarnetFormFields,
    OmBarnetFormValues,
    ValidationError
>();

const AnnetBarnpart = () => {
    const {
        state: { søker },
    } = useSøknadContext();
    const intl = useIntl();
    const minDatoForBarnetsFødselsdato = getMinDatoForBarnetsFødselsdato();
    return (
        <>
            <Heading level="2" size="medium">
                <FormattedMessage id="steg.omBarnet.annetBarn.tittel" />
            </Heading>
            <FormBlock>
                <TextField
                    label={intlHelper(intl, 'steg.omBarnet.fnr.spm')}
                    name={OmBarnetFormFields.barnetsFødselsnummer}
                    validate={getFødselsnummerValidator({ required: true, disallowedValues: [søker.fødselsnummer] })}
                    width="xl"
                    type="tel"
                    maxLength={11}
                />
            </FormBlock>
            <FormBlock>
                <TextField
                    label={intlHelper(intl, 'steg.omBarnet.navn')}
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
                    label={intlHelper(intl, 'step.omBarnet.fødselsdato')}
                    validate={(value) => {
                        const dateError = getDateValidator({
                            required: true,
                            max: dateToday,
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
                    maxDate={dateToday}
                    dropdownCaption={true}
                    description={intlHelper(intl, 'step.omBarnet.fødselsdato.info', {
                        minFødselsdato: dateFormatter.full(minDatoForBarnetsFødselsdato),
                    })}
                />
            </FormBlock>
            <FormBlock>
                <Select
                    style={{ maxWidth: '25rem' }}
                    label={intlHelper(intl, 'steg.omBarnet.relasjon')}
                    name={OmBarnetFormFields.søkersRelasjonTilBarnet}
                    validate={getRequiredFieldValidator()}>
                    <option />
                    {Object.keys(SøkersRelasjonTilBarnet).map((key: SøkersRelasjonTilBarnetKeys) => (
                        <option key={key} value={SøkersRelasjonTilBarnet[key]}>
                            {intlHelper(intl, `relasjonTilBarnet.${SøkersRelasjonTilBarnet[key]}`)}
                        </option>
                    ))}
                </Select>
            </FormBlock>
        </>
    );
};

export default AnnetBarnpart;
