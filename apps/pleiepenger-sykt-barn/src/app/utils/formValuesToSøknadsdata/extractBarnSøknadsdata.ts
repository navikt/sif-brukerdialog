import { VelgBarn_AnnetBarnValue } from '@navikt/sif-common-forms-ds';
import { BarnRelasjon, ÅrsakManglerIdentitetsnummer } from '../../types';
import { OmBarnetFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { OmBarnetSøknadsdata } from '../../types/søknadsdata/OmBarnetSøknadsdata';

export const extractBarnSøknadsdata = (values: OmBarnetFormValues): OmBarnetSøknadsdata | undefined => {
    if (values.barnetSøknadenGjelder && values.barnetSøknadenGjelder !== VelgBarn_AnnetBarnValue) {
        return {
            type: 'registrerteBarn',
            aktørId: values.barnetSøknadenGjelder,
        };
    }

    if (values.barnetSøknadenGjelder === '' || values.barnetSøknadenGjelder === VelgBarn_AnnetBarnValue) {
        if (values.barnetsFødselsnummer) {
            return {
                type: 'annetBarn',
                barnetsNavn: values.barnetsNavn,
                barnetsFødselsnummer: values.barnetsFødselsnummer,
                relasjonTilBarnet: values.relasjonTilBarnet,
                relasjonTilBarnetBeskrivelse:
                    values.relasjonTilBarnet === BarnRelasjon.ANNET ? values.relasjonTilBarnetBeskrivelse : undefined,
            };
        } else if (values.barnetsFødselsdato && values.årsakManglerIdentitetsnummer) {
            return {
                type: 'annetBarnUtenFnr',
                barnetsNavn: values.barnetsNavn,
                årsakManglerIdentitetsnummer: values.årsakManglerIdentitetsnummer,
                barnetsFødselsdato: values.barnetsFødselsdato,
                relasjonTilBarnet: values.relasjonTilBarnet,
                relasjonTilBarnetBeskrivelse:
                    values.relasjonTilBarnet === BarnRelasjon.ANNET ? values.relasjonTilBarnetBeskrivelse : undefined,
                fødselsattest:
                    values.årsakManglerIdentitetsnummer === ÅrsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET
                        ? values.fødselsattest
                        : [],
            };
        }
        return undefined;
    }

    return undefined;
};
