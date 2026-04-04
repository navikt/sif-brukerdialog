import { dateToISODate } from '@navikt/sif-common-utils';
import { Søker } from '@sif/api/k9-prosessering';

import { SøknadStepId } from '../setup/config/SoknadStepId';
import { BarnSammeAdresse } from '../types/BarnSammeAdresse';
import { SøknadApiData } from '../types/SoknadApiData';
import { Søknadsdata } from '../types/Soknadsdata';

interface Params {
    søker: Søker;
    søknadsdata: Søknadsdata;
    språk: string;
}

export const søknadsdataToSøknadDTO = ({
    søker,
    søknadsdata,
    språk,
}: Params): Omit<SøknadApiData, 'harBekreftetOpplysninger'> | undefined => {
    const omBarnet = søknadsdata[SøknadStepId.OM_BARNET];
    const legeerklæring = søknadsdata[SøknadStepId.LEGEERKLÆRING]?.vedlegg.map((vedlegg) => vedlegg.id) ?? [];
    const samværsavtale = søknadsdata[SøknadStepId.DELT_BOSTED]?.samværsavtale.map((vedlegg) => vedlegg.id) ?? [];

    if (!omBarnet) return undefined;

    let barn: SøknadApiData['barn'];
    let relasjonTilBarnet: SøknadApiData['relasjonTilBarnet'];

    if (omBarnet.type === 'registrertBarn') {
        const rb = omBarnet.registrertBarn;
        barn = {
            aktørId: rb.aktørId,
            navn: [rb.fornavn, rb.mellomnavn, rb.etternavn].filter(Boolean).join(' '),
            fødselsdato: dateToISODate(rb.fødselsdato),
        };
    } else {
        barn = {
            navn: omBarnet.barnetsNavn,
            norskIdentifikator: omBarnet.barnetsFødselsnummer,
            fødselsdato: omBarnet.barnetsFødselsdato,
        };
        relasjonTilBarnet = omBarnet.søkersRelasjonTilBarnet;
    }

    return {
        språk,
        barn,
        legeerklæring,
        samværsavtale: omBarnet.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED ? samværsavtale : undefined,
        relasjonTilBarnet,
        kroniskEllerFunksjonshemming: omBarnet.kroniskEllerFunksjonshemming,
        søkerNorskIdent: søker.fødselsnummer,
        harForståttRettigheterOgPlikter: søknadsdata.harForståttRettigheterOgPlikter === true,
        sammeAdresse: omBarnet.sammeAdresse,
        høyereRisikoForFravær: omBarnet.høyereRisikoForFravær,
        høyereRisikoForFraværBeskrivelse: omBarnet.høyereRisikoForFraværBeskrivelse,
    };
};
