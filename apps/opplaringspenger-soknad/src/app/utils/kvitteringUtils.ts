import { Søker } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { KvitteringInfo } from '../types/KvitteringInfo';
import { SøknadApiData } from '../types/søknadApiData/SøknadApiData';

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
