import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateToISODate } from '@navikt/sif-common-utils';
import { omsorgspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { BarnSammeAdresse } from '../../types/BarnSammeAdresse';
import { OmBarnetApiData } from '../../types/søknadApiData/SøknadApiData';
import { OmBarnetSøknadsdata } from '../../types/søknadsdata/OmBarnetSøknadsdata';
import { SøkersRelasjonTilBarnet } from '../../types/SøkersRelasjonTilBarnet';

export const søkersRelasjonTilBarnetToApiValue = (
    relasjon: SøkersRelasjonTilBarnet,
): omsorgspenger.OmsorgspengerKroniskSyktBarnSøknad['relasjonTilBarnet'] => {
    switch (relasjon) {
        case SøkersRelasjonTilBarnet.MOR:
            return 'MOR';
        case SøkersRelasjonTilBarnet.FAR:
            return 'FAR';
        case SøkersRelasjonTilBarnet.ADOPTIVFORELDER:
            return 'ADOPTIVFORELDER';
        case SøkersRelasjonTilBarnet.FOSTERFORELDER:
            return 'FOSTERFORELDER';
    }
};

const barnSammeAdresseToApiValue = (
    sammeAdresse: BarnSammeAdresse,
): omsorgspenger.OmsorgspengerKroniskSyktBarnSøknad['sammeAdresse'] => {
    switch (sammeAdresse) {
        case BarnSammeAdresse.JA:
            return 'JA';
        case BarnSammeAdresse.JA_DELT_BOSTED:
            return 'JA_DELT_BOSTED';
        case BarnSammeAdresse.NEI:
            return 'NEI';
    }
};

export const getOmBarnetApiDataFromSøknadsdata = (omBarnet: OmBarnetSøknadsdata): OmBarnetApiData => {
    const fellesInfo = {
        kroniskEllerFunksjonshemming: omBarnet.kroniskEllerFunksjonshemming,
        sammeAdresse: barnSammeAdresseToApiValue(omBarnet.sammeAdresse),
        høyereRisikoForFravær: omBarnet.høyereRisikoForFravær,
        høyereRisikoForFraværBeskrivelse: omBarnet.høyereRisikoForFraværBeskrivelse,
    };

    switch (omBarnet.type) {
        case 'registrertBarn': {
            const { aktørId, fornavn, etternavn, mellomnavn } = omBarnet.registrertBarn;
            return {
                ...fellesInfo,
                barn: {
                    aktørId,
                    navn: formatName(fornavn, etternavn, mellomnavn),
                    fødselsdato: dateToISODate(omBarnet.registrertBarn.fødselsdato),
                },
            };
        }
        case 'annetBarn':
            return {
                ...fellesInfo,
                barn: {
                    norskIdentifikator: omBarnet.barnetsFødselsnummer,
                    navn: omBarnet.barnetsNavn,
                    fødselsdato: omBarnet.barnetsFødselsdato,
                },
                relasjonTilBarnet: søkersRelasjonTilBarnetToApiValue(omBarnet.søkersRelasjonTilBarnet),
            };
    }
};
