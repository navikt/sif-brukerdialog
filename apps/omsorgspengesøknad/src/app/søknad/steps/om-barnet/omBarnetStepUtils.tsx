import React from 'react';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { Søknadsdata, OmBarnetSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmBarnetFormValues } from './OmBarnetStep';
import { FormattedMessage } from 'react-intl';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/lib/utils/yesOrNoUtils';

export const getOmBarnetStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmBarnetFormValues
): OmBarnetFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: OmBarnetFormValues = {
        barnetSøknadenGjelder: undefined,
        søknadenGjelderEtAnnetBarn: undefined,
        barnetsFødselsnummer: '',
        barnetsNavn: '',
        søkersRelasjonTilBarnet: undefined,
        sammeAdresse: YesOrNo.UNANSWERED,
        kroniskEllerFunksjonshemming: YesOrNo.UNANSWERED,
    };

    const { omBarnet } = søknadsdata;
    if (omBarnet) {
        const sammeAdresse = getYesOrNoFromBoolean(omBarnet.sammeAdresse);
        const kroniskEllerFunksjonshemming = getYesOrNoFromBoolean(omBarnet.kroniskEllerFunksjonshemming);

        switch (omBarnet.type) {
            case 'registrertBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: false,
                    barnetSøknadenGjelder: omBarnet.registrertBarn,
                    sammeAdresse,
                    kroniskEllerFunksjonshemming,
                };
            case 'annetBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: true,
                    barnetsFødselsnummer: omBarnet.barnetsFødselsnummer,
                    barnetsNavn: omBarnet.barnetsNavn,
                    søkersRelasjonTilBarnet: omBarnet.søkersRelasjonTilBarnet,
                    sammeAdresse,
                    kroniskEllerFunksjonshemming,
                };
        }
    }
    return defaultValues;
};

export const getOmBarnetSøknadsdataFromFormValues = (values: OmBarnetFormValues): OmBarnetSøknadsdata | undefined => {
    const sammeAdresse = values.sammeAdresse === YesOrNo.YES;
    const kroniskEllerFunksjonshemming = values.kroniskEllerFunksjonshemming === YesOrNo.YES;

    if (values.søknadenGjelderEtAnnetBarn) {
        if (values.søkersRelasjonTilBarnet === undefined) {
            return undefined;
        }
        return {
            type: 'annetBarn',
            søknadenGjelderEtAnnetBarn: true,
            barnetsFødselsnummer: values.barnetsFødselsnummer,
            barnetsNavn: values.barnetsNavn,
            søkersRelasjonTilBarnet: values.søkersRelasjonTilBarnet,
            sammeAdresse,
            kroniskEllerFunksjonshemming,
        };
    }
    if (!values.barnetSøknadenGjelder) {
        return undefined;
    }
    return {
        type: 'registrertBarn',
        registrertBarn: values.barnetSøknadenGjelder,
        sammeAdresse,
        kroniskEllerFunksjonshemming,
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
