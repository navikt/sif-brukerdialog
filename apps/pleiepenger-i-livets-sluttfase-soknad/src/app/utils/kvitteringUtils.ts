import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { KvitteringInfo } from '../types/KvitteringInfo';
import { Søker } from '../types/Søker';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { ISODateToDate } from '@navikt/sif-common-utils';

export type KvitteringApiData = Pick<SøknadApiData, 'arbeidsgivere' | 'fraOgMed' | 'tilOgMed'>;

export const getKvitteringInfoFromApiData = (
    { arbeidsgivere, fraOgMed, tilOgMed }: KvitteringApiData,
    søker: Søker,
): KvitteringInfo | undefined => {
    const arbeidsgivereISøknadsperiode = (arbeidsgivere || [])?.filter(
        (a) => a.arbeidsforhold !== undefined && a.sluttetFørSøknadsperiode !== true,
    );
    if (arbeidsgivereISøknadsperiode.length > 0) {
        const { fornavn, mellomnavn, etternavn } = søker;
        return {
            arbeidsgivere: arbeidsgivereISøknadsperiode,
            fom: ISODateToDate(fraOgMed),
            tom: ISODateToDate(tilOgMed),
            søkernavn: formatName(fornavn, etternavn, mellomnavn),
        };
    }
    return undefined;
};
