import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateToISODate } from '@navikt/sif-common-utils';
import { OmBarnetApiData } from '../../types/søknadApiData/SøknadApiData';
import { OmBarnetSøknadsdata } from '../../types/søknadsdata/OmBarnetSøknadsdata';

export const getOmBarnetApiDataFromSøknadsdata = (omBarnet: OmBarnetSøknadsdata): OmBarnetApiData => {
    switch (omBarnet.type) {
        case 'registrerteBarn': {
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
                },
                relasjonTilBarnet: omBarnet.relasjonTilBarnet,
            };
        case 'annetBarnUtenFnr':
            return {
                barn: {
                    aktørId: null,
                    navn: omBarnet.barnetsNavn,
                    norskIdentifikator: null,
                    fødselsdato: omBarnet.barnetsFødselsdato,
                },
                relasjonTilBarnet: omBarnet.relasjonTilBarnet,
            };
    }
};
