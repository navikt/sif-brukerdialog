import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { OmBarnetApiData } from '../../types/søknadApiData/SøknadApiData';
import { OmBarnetSøknadsdata } from '../../types/søknadsdata/OmBarnetSøknadsdata';
import { dateToISODate } from '@navikt/sif-common-utils';

export const getOmBarnetApiDataFromSøknadsdata = (omBarnet: OmBarnetSøknadsdata): OmBarnetApiData => {
    const fellesInfo: Pick<
        OmBarnetSøknadsdata,
        'kroniskEllerFunksjonshemming' | 'sammeAdresse' | 'høyereRisikoForFravær' | 'høyereRisikoForFraværBeskrivelse'
    > = {
        kroniskEllerFunksjonshemming: omBarnet.kroniskEllerFunksjonshemming,
        sammeAdresse: omBarnet.sammeAdresse,
        høyereRisikoForFravær: omBarnet.høyereRisikoForFravær,
        høyereRisikoForFraværBeskrivelse: omBarnet.høyereRisikoForFraværBeskrivelse,
    };

    switch (omBarnet.type) {
        case 'registrertBarn': {
            const { aktørId: norskIdentitetsnummer, fornavn, etternavn, mellomnavn } = omBarnet.registrertBarn;
            return {
                ...fellesInfo,
                barn: {
                    norskIdentitetsnummer,
                    navn: formatName(fornavn, etternavn, mellomnavn),
                    fødselsdato: dateToISODate(omBarnet.registrertBarn.fødselsdato),
                },
            };
        }
        case 'annetBarn':
            return {
                ...fellesInfo,
                barn: {
                    navn: omBarnet.barnetsNavn,
                    norskIdentitetsnummer: omBarnet.barnetsFødselsnummer,
                    fødselsdato: omBarnet.barnetsFødselsdato,
                },
                relasjonTilBarnet: omBarnet.søkersRelasjonTilBarnet,
            };
    }
};
