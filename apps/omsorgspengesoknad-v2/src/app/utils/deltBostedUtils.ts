import { BarnSammeAdresse } from '../types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '../types/SøkersRelasjonTilBarnet';
import { Søknadsdata } from '../types/Soknadsdata';
import { SøknadStepId } from '../types/SoknadStepId';

export const inkluderDeltBostedStep = (omBarnet: Søknadsdata[SøknadStepId.OM_BARNET]): boolean => {
    if (!omBarnet) {
        return false;
    }

    switch (omBarnet.type) {
        case 'registrertBarn':
            return omBarnet.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED;
        case 'annetBarn':
            return (
                omBarnet.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED &&
                omBarnet.søkersRelasjonTilBarnet !== SøkersRelasjonTilBarnet.FOSTERFORELDER
            );
    }
};
