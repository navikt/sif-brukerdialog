import { RegistrertBarn, Søker } from '@sif/api/k9-brukerdialog-prosessering';
import { formatName } from '@sif/utils';

import { SøknadApiData } from '../types/SoknadApiData';
import { Søknadsdata } from '../types/Soknadsdata';
import { SøknadStepId } from '../types/SoknadStepId';

interface SoknadsdataToSoknadDTOParams {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
    språk: string;
}

export const soknadsdataToSoknadDTO = ({
    søker,
    registrerteBarn,
    søknadsdata,
    språk,
}: SoknadsdataToSoknadDTOParams): SøknadApiData | undefined => {
    const harFerdigeMockSteg =
        søknadsdata[SøknadStepId.OM_OMSORGEN_FOR_BARN] !== undefined &&
        søknadsdata[SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG] !== undefined;

    if (!harFerdigeMockSteg || registrerteBarn.length === 0) {
        return undefined;
    }

    return {
        søkerNorskIdent: søker.fødselsnummer,
        språk,
        harForståttRettigheterOgPlikter: søknadsdata.harForståttRettigheterOgPlikter === true,
        harBekreftetOpplysninger: true,
        barn: registrerteBarn.map((barn) => ({
            aktørId: barn.aktørId,
            navn: formatName(barn),
            fødselsdato: barn.fødselsdato,
            type: 'FRA_OPPSLAG',
            tidspunktForAleneomsorg: 'TIDLIGERE',
        })),
    };
};
