import { OmBarnetApiData } from '../../types/søknadApiData/SøknadApiData';
import { OmBarnetSøknadsdata } from '../../types/søknadsdata/OmBarnetSøknadsdata';

export const getOmBarnetApiDataFromSøknadsdata = (omBarnet: OmBarnetSøknadsdata): OmBarnetApiData => {
    const fellesInfo: Pick<OmBarnetSøknadsdata, 'kroniskEllerFunksjonshemming' | 'sammeAdresse'> = {
        kroniskEllerFunksjonshemming: omBarnet.kroniskEllerFunksjonshemming,
        sammeAdresse: omBarnet.sammeAdresse,
    };

    switch (omBarnet.type) {
        case 'registrertBarn':
            const aktørId = omBarnet.registrertBarn.aktørId;
            return {
                ...fellesInfo,
                barn: {
                    aktørId,
                    navn: null,
                    norskIdentifikator: null,
                },
            };
        case 'annetBarn':
            return {
                ...fellesInfo,
                barn: {
                    aktørId: null,
                    navn: omBarnet.barnetsNavn,
                    norskIdentifikator: omBarnet.barnetsFødselsnummer,
                },
                relasjonTilBarnet: omBarnet.søkersRelasjonTilBarnet,
            };
    }
};
