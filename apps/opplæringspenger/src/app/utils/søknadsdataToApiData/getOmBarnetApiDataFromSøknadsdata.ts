import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { OmBarnetApiData } from '../../types/søknadApiData/SøknadApiData';
import { OmBarnetSøknadsdata } from '../../types/søknadsdata/OmBarnetSøknadsdata';
import { dateToISODate } from '@navikt/sif-common-utils';

export const getOmBarnetApiDataFromSøknadsdata = (omBarnet: OmBarnetSøknadsdata): OmBarnetApiData => {
    switch (omBarnet.type) {
        case 'registrertBarn': {
            const { aktørId, fornavn, etternavn, mellomnavn } = omBarnet.registrertBarn;
            return {
                barn: {
                    aktørId,
                    navn: formatName(fornavn, etternavn, mellomnavn),
                    norskIdentifikator: null,
                    fødselsdato: dateToISODate(omBarnet.registrertBarn.fødselsdato),
                },
            };
        }
        case 'annetBarn':
            return {
                barn: {
                    aktørId: null,
                    navn: omBarnet.barnetsNavn,
                    norskIdentifikator: omBarnet.barnetsFødselsnummer,
                    fødselsdato: omBarnet.barnetsFødselsdato,
                },
                relasjonTilBarnet: omBarnet.søkersRelasjonTilBarnet,
            };
    }
};
