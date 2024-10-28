import { RegistrertBarn } from '@navikt/sif-common-api';
import { getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { OmBarnetFormMessageKeys } from '../omBarnetFormMessages';
import { OmBarnetFormValues, RelasjonTilBarnet } from '../types';
import { OmBarnetFormSøknadsdata } from '../types/OmBarnetFormSøknadsdata';
import { ÅrsakBarnetManglerIdentitetsnummer } from '../types/ÅrsakManglerIdentitetsnummer';

export const getOmBarnetFormInitialValues = (
    søknadsdata?: OmBarnetFormSøknadsdata,
    formValues?: OmBarnetFormValues,
): OmBarnetFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: OmBarnetFormValues = {
        barnetSøknadenGjelder: undefined,
        søknadenGjelderEtAnnetBarn: undefined,
        barnetsFødselsnummer: '',
        barnetsNavn: '',
        barnetsFødselsdato: '',
        relasjonTilBarnet: undefined,
    };

    if (søknadsdata) {
        switch (søknadsdata.type) {
            case 'registrerteBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: false,
                    barnetSøknadenGjelder: søknadsdata.aktørId,
                };
            case 'annetBarn':
                return {
                    ...defaultValues,
                    søknadenGjelderEtAnnetBarn: true,
                    barnetsFødselsnummer: søknadsdata.barnetsFødselsnummer,
                    barnetsNavn: søknadsdata.barnetsNavn,
                    relasjonTilBarnet: søknadsdata.relasjonTilBarnet,
                    relasjonTilBarnetBeskrivelse: søknadsdata.relasjonTilBarnetBeskrivelse,
                };
            case 'annetBarnUtenFnr':
                return {
                    ...defaultValues,
                    barnetHarIkkeFnr: true,
                    årsakManglerIdentitetsnummer: søknadsdata.årsakManglerIdentitetsnummer,
                    søknadenGjelderEtAnnetBarn: true,
                    barnetsNavn: søknadsdata.barnetsNavn,
                    barnetsFødselsdato: søknadsdata.barnetsFødselsdato,
                    relasjonTilBarnet: søknadsdata.relasjonTilBarnet,
                    fødselsattest: søknadsdata.fødselsattest || [],
                    relasjonTilBarnetBeskrivelse: søknadsdata.relasjonTilBarnetBeskrivelse,
                };
        }
    }
    return defaultValues;
};

export const getOmBarnetSøknadsdataFromFormValues = (
    values: OmBarnetFormValues,
    registrerteBarn: RegistrertBarn[],
): OmBarnetFormSøknadsdata | undefined => {
    if (values.barnetSøknadenGjelder) {
        return {
            type: 'registrerteBarn',
            aktørId: values.barnetSøknadenGjelder,
            registrertBarn: registrerteBarn.find((barn) => barn.aktørId === values.barnetSøknadenGjelder)!,
        };
    }

    if (!values.barnetSøknadenGjelder) {
        if (values.barnetsFødselsnummer) {
            return {
                type: 'annetBarn',
                barnetsNavn: values.barnetsNavn,
                barnetsFødselsnummer: values.barnetsFødselsnummer,
                relasjonTilBarnet: values.relasjonTilBarnet,
                relasjonTilBarnetBeskrivelse:
                    values.relasjonTilBarnet === RelasjonTilBarnet.ANNET
                        ? values.relasjonTilBarnetBeskrivelse
                        : undefined,
            };
        } else if (values.barnetsFødselsdato && values.årsakManglerIdentitetsnummer) {
            return {
                type: 'annetBarnUtenFnr',
                barnetsNavn: values.barnetsNavn,
                årsakManglerIdentitetsnummer: values.årsakManglerIdentitetsnummer,
                barnetsFødselsdato: values.barnetsFødselsdato,
                relasjonTilBarnet: values.relasjonTilBarnet,
                relasjonTilBarnetBeskrivelse:
                    values.relasjonTilBarnet === RelasjonTilBarnet.ANNET
                        ? values.relasjonTilBarnetBeskrivelse
                        : undefined,
                fødselsattest:
                    values.årsakManglerIdentitetsnummer === ÅrsakBarnetManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET
                        ? values.fødselsattest || []
                        : [],
            };
        }
        return undefined;
    }

    return undefined;
};

export const getRelasjonTilBarnetIntlKey = (relasjonTilBarnet: RelasjonTilBarnet): OmBarnetFormMessageKeys => {
    switch (relasjonTilBarnet) {
        case RelasjonTilBarnet.MOR:
            return 'omBarnetForm.relasjonTilBarnet.MOR';
        case RelasjonTilBarnet.FAR:
            return 'omBarnetForm.relasjonTilBarnet.FAR';
        case RelasjonTilBarnet.FOSTERFORELDER:
            return 'omBarnetForm.relasjonTilBarnet.FOSTERFORELDER';
        case RelasjonTilBarnet.MEDMOR:
            return 'omBarnetForm.relasjonTilBarnet.MEDMOR';
        case RelasjonTilBarnet.ANNET:
            return 'omBarnetForm.relasjonTilBarnet.ANNET';
    }
};

export const nYearsAgo = (years: number): Date => {
    return dayjs(getDateToday()).subtract(years, 'y').startOf('year').toDate();
};
