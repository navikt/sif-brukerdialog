import React from 'react';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { Søknadsdata, OmBarnetSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmBarnetFormValues } from './OmBarnetStep';
import { FormattedMessage } from 'react-intl';
import { dateFormatter } from '@navikt/sif-common-utils/lib';

export const getOmBarnetStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmBarnetFormValues
): OmBarnetFormValues => {
    if (formValues) {
        return formValues;
    }
    const { registrertBarn, søknadenGjelderEtAnnetBarn } = søknadsdata.omBarnet || {};
    return {
        barnetSøknadenGjelder: registrertBarn,
        søknadenGjelderEtAnnetBarn,
        barnetsFødselsnummer: '',
        barnetsNavn: '',
        søkersRelasjonTilBarnet: undefined,
    };
};

export const getOmBarnetSøknadsdataFromFormValues = (values: OmBarnetFormValues): OmBarnetSøknadsdata => {
    if (values.søknadenGjelderEtAnnetBarn) {
        return {
            registrertBarn: undefined,
            søknadenGjelderEtAnnetBarn: true,
        };
    }
    return {
        registrertBarn: values.barnetSøknadenGjelder,
    };
};

export const mapBarnTilRadioProps = (barn: RegistrertBarn, disabled?: boolean): FormikRadioProp => {
    const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
    return {
        value: aktørId,
        label: (
            <>
                <div>{barnetsNavn}</div>
                <div>
                    <FormattedMessage
                        id="steg.omBarnet.hvilketBarn.født"
                        values={{ dato: dateFormatter.compact(fødselsdato) }}
                    />
                </div>
            </>
        ),
        disabled,
    };
};
