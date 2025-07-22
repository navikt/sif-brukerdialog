import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateToISODate } from '@navikt/sif-common-utils';
import { OmBarnetApiData } from '../../types/søknadApiData/SøknadApiData';
import { OmBarnetFormSøknadsdata, OmBarnetFormSøknadsdata_RegistrertBarn } from '../../types/søknadsdata/Søknadsdata';
import { getVedleggApiData } from '@navikt/sif-common-core-ds/src';

const getRegistrertBarnApiData = (
    omBarnetSøknadsdata: OmBarnetFormSøknadsdata_RegistrertBarn,
    registrerteBarn: RegistrertBarn[],
): OmBarnetApiData => {
    const valgtBarn = registrerteBarn.find(
        (currentBarn) => currentBarn.aktørId === omBarnetSøknadsdata.registrertBarn.aktørId,
    );
    if (valgtBarn === undefined) {
        throw Error('barnChosenFromList undefined');
    }
    return {
        _type: 'registrertBarn',
        aktørId: valgtBarn.aktørId,
        navn: formatName(valgtBarn.fornavn, valgtBarn.etternavn, valgtBarn.mellomnavn),
        fødselsdato: dateToISODate(valgtBarn.fødselsdato),
    };
};

export const getOmBarnetApiDataFromSøknadsdata = (
    registrerteBarn: RegistrertBarn[],
    omBarnetSøknadsdata?: OmBarnetFormSøknadsdata,
): OmBarnetApiData => {
    if (omBarnetSøknadsdata === undefined) {
        throw Error('omBarnetSøknadsdata undefined');
    }

    switch (omBarnetSøknadsdata?.type) {
        case 'registrerteBarn':
            return getRegistrertBarnApiData(omBarnetSøknadsdata, registrerteBarn);
        case 'annetBarn':
            return {
                _type: 'annetBarn',
                _harFødselsnummer: true,
                navn: omBarnetSøknadsdata.barnetsNavn,
                fødselsdato: dateToISODate(omBarnetSøknadsdata.barnetsFødselsdato),
                norskIdentifikator: omBarnetSøknadsdata.barnetsFødselsnummer,
                relasjonTilBarnet: omBarnetSøknadsdata.relasjonTilBarnet,
                relasjonTilBarnetBeskrivelse: omBarnetSøknadsdata.relasjonTilBarnetBeskrivelse,
            };

        case 'annetBarnUtenFnr':
            return {
                _type: 'annetBarn',
                _harFødselsnummer: false,
                navn: omBarnetSøknadsdata.barnetsNavn,
                årsakManglerIdentitetsnummer: omBarnetSøknadsdata.årsakManglerIdentitetsnummer,
                fødselsdato: dateToISODate(omBarnetSøknadsdata.barnetsFødselsdato),
                relasjonTilBarnet: omBarnetSøknadsdata.relasjonTilBarnet,
                relasjonTilBarnetBeskrivelse: omBarnetSøknadsdata.relasjonTilBarnetBeskrivelse,
                fødselsattestVedleggUrls: getVedleggApiData(omBarnetSøknadsdata.fødselsattest),
            };
    }
};
