import { RegistrertBarn } from '@navikt/sif-common-api';
import { dateToISODate, getDateToday, ISODateToDate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { OmBarnetFormMessageKeys } from '../omBarnetFormMessages';
import { OmBarnetFormValues, RelasjonTilBarnet, ÅrsakBarnetManglerIdentitetsnummer } from '../types';
import { OmBarnetFormSøknadsdata, RelasjonTilBarnetSøknadsdataBase } from '../types/OmBarnetFormSøknadsdata';
import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import { AnnetBarnValue } from '@navikt/sif-common-ui';

export const omBarnetFormDefaultValues: OmBarnetFormValues = {
    barnetSøknadenGjelder: 'undefined',
    barnetsFødselsnummer: '',
    barnetsNavn: '',
    barnetsFødselsdato: '',
    relasjonTilBarnet: undefined,
};

export const getOmBarnetFormInitialValues = (
    søknadsdata?: OmBarnetFormSøknadsdata,
    formValues?: OmBarnetFormValues,
): OmBarnetFormValues => {
    if (formValues) {
        return formValues;
    }

    if (søknadsdata) {
        switch (søknadsdata.type) {
            case 'registrerteBarn':
                return {
                    ...omBarnetFormDefaultValues,
                    barnetSøknadenGjelder: søknadsdata.registrertBarn.aktørId,
                };
            case 'annetBarn':
                return {
                    ...omBarnetFormDefaultValues,
                    barnetSøknadenGjelder: AnnetBarnValue,
                    barnetsFødselsnummer: søknadsdata.barnetsFødselsnummer,
                    barnetsFødselsdato: dateToISODate(søknadsdata.barnetsFødselsdato),
                    barnetsNavn: søknadsdata.barnetsNavn,
                    relasjonTilBarnet: søknadsdata.relasjonTilBarnet,
                    relasjonTilBarnetBeskrivelse:
                        søknadsdata.relasjonTilBarnet === RelasjonTilBarnet.ANNET
                            ? søknadsdata.relasjonTilBarnetBeskrivelse
                            : undefined,
                };
            case 'annetBarnUtenFnr':
                return {
                    ...omBarnetFormDefaultValues,
                    barnetSøknadenGjelder: AnnetBarnValue,
                    barnetHarIkkeFnr: true,
                    årsakManglerIdentitetsnummer: søknadsdata.årsakManglerIdentitetsnummer,
                    barnetsNavn: søknadsdata.barnetsNavn,
                    barnetsFødselsdato: dateToISODate(søknadsdata.barnetsFødselsdato),
                    fødselsattest: søknadsdata.fødselsattest || [],
                    relasjonTilBarnet: søknadsdata.relasjonTilBarnet,
                    relasjonTilBarnetBeskrivelse:
                        søknadsdata.relasjonTilBarnet === RelasjonTilBarnet.ANNET
                            ? søknadsdata.relasjonTilBarnetBeskrivelse
                            : undefined,
                };
        }
    }
    return omBarnetFormDefaultValues;
};

export const getOmBarnetSøknadsdataFromFormValues = (
    values: OmBarnetFormValues,
    registrerteBarn: RegistrertBarn[],
): OmBarnetFormSøknadsdata | undefined => {
    const søknadenGjelderAnnetBarn = values.barnetSøknadenGjelder === AnnetBarnValue;
    const registrertBarn = søknadenGjelderAnnetBarn
        ? undefined
        : registrerteBarn.find((barn) => barn.aktørId === values.barnetSøknadenGjelder);
    if (registrertBarn) {
        return {
            type: 'registrerteBarn',
            registrertBarn,
        };
    }

    if (søknadenGjelderAnnetBarn && values.barnetsNavn && values.relasjonTilBarnet && values.barnetsFødselsdato) {
        const relasjonTilBarnetSøknadsdata: RelasjonTilBarnetSøknadsdataBase = {
            relasjonTilBarnet: values.relasjonTilBarnet,
            relasjonTilBarnetBeskrivelse:
                values.relasjonTilBarnet === RelasjonTilBarnet.ANNET ? values.relasjonTilBarnetBeskrivelse : undefined,
        };
        if (
            (values.barnetHarIkkeFnr === undefined || values.barnetHarIkkeFnr === false) &&
            values.barnetsFødselsnummer
        ) {
            return {
                type: 'annetBarn',
                barnetsNavn: values.barnetsNavn,
                barnetsFødselsdato: ISODateToDate(values.barnetsFødselsdato),
                barnetsFødselsnummer: values.barnetsFødselsnummer,
                ...relasjonTilBarnetSøknadsdata,
            };
        } else if (values.barnetHarIkkeFnr && values.barnetsFødselsdato && values.årsakManglerIdentitetsnummer) {
            return {
                type: 'annetBarnUtenFnr',
                barnetsNavn: values.barnetsNavn,
                årsakManglerIdentitetsnummer: values.årsakManglerIdentitetsnummer,
                barnetsFødselsdato: ISODateToDate(values.barnetsFødselsdato),
                ...relasjonTilBarnetSøknadsdata,
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

export const getBarnetsAlder = (values: OmBarnetFormValues): number | undefined => {
    const fdato = datepickerUtils.getDateFromDateString(values.barnetsFødselsdato);

    if (!fdato) {
        return;
    }
    return dayjs().diff(fdato, 'years');
};
