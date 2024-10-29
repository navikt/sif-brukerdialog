import { ISODate } from '@navikt/sif-common-utils';
import {
    RelasjonTilBarnet,
    ÅrsakBarnetManglerIdentitetsnummer,
} from '../../søknad/steps/om-barnet/om-barnet-form/types';

type RegistrertBarnApiData = {
    _type: 'registrertBarn';
    aktørId: string;
    navn: string;
    fødselsdato: ISODate;
};

type AnnetBarnMedFnrApiData = {
    navn: string;
    norskIdentifikator: string;
    relasjonTilBarnet: RelasjonTilBarnet;
    relasjonTilBarnetBeskrivelse?: string;
    _harFødselsnummer: true;
};

type AnnetBarnUtenFnrApiData = {
    navn: string;
    fødselsdato: ISODate;
    årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.NYFØDT | ÅrsakBarnetManglerIdentitetsnummer.ANNET;
    relasjonTilBarnet: RelasjonTilBarnet;
    relasjonTilBarnetBeskrivelse?: string;
    _harFødselsnummer: false;
};

type AnnetBarnUtenFnrUtlandApiData = {
    navn: string;
    fødselsdato: ISODate;
    årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET;
    relasjonTilBarnet: RelasjonTilBarnet;
    relasjonTilBarnetBeskrivelse?: string;
    fødselsattestVedleggUrls?: string[];
    _harFødselsnummer: false;
};

export const isAnnetBarnApiData = (data: any): data is AnnetBarnApiData => {
    return data._type === 'annetBarn';
};
export const isRegistrertBarnApiData = (data: any): data is RegistrertBarnApiData => {
    return data._type === 'registrertBarn';
};

export type AnnetBarnApiData = (AnnetBarnMedFnrApiData | AnnetBarnUtenFnrApiData | AnnetBarnUtenFnrUtlandApiData) & {
    _type: 'annetBarn';
};

export type OmBarnetApiData = RegistrertBarnApiData | AnnetBarnApiData;
