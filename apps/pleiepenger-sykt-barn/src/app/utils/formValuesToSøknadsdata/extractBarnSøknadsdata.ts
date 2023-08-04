import { BarnRelasjon, ÅrsakManglerIdentitetsnummer } from '../../types';
import { OmBarnetFormData } from '../../types/_SøknadFormValues';
import { OmBarnetSøknadsdata } from '../../types/søknadsdata/_OmBarnetSøknadsdata';

export const extractBarnSøknadsdata = (values: OmBarnetFormData): OmBarnetSøknadsdata | undefined => {
    if (values.barnetSøknadenGjelder) {
        return {
            type: 'registrerteBarn',
            aktørId: values.barnetSøknadenGjelder,
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
