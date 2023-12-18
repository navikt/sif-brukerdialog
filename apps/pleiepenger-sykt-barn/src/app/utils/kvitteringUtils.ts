import { ISODateToDate } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { KvitteringInfo } from '../types/KvitteringInfo';
import { Søkerdata } from '../types/Søkerdata';
import { SøknadApiData } from '../types/søknad-api-data/SøknadApiData';

export type KvitteringApiData = Pick<SøknadApiData, 'arbeidsgivere' | 'fraOgMed' | 'tilOgMed'>;

export const getKvitteringInfoFromApiData = (
    { arbeidsgivere, fraOgMed, tilOgMed }: KvitteringApiData,
    søkerdata: Søkerdata,
): KvitteringInfo | undefined => {
    const arbeidsgivereISøknadsperiode = (arbeidsgivere || [])?.filter(
        (a) => a.arbeidsforhold !== undefined && a.sluttetFørSøknadsperiode !== true,
    );
    if (arbeidsgivereISøknadsperiode.length > 0) {
        const { fornavn, mellomnavn, etternavn } = søkerdata.søker;
        return {
            arbeidsgivere: arbeidsgivereISøknadsperiode,
            fom: ISODateToDate(fraOgMed),
            tom: ISODateToDate(tilOgMed),
            søkernavn: formatName(fornavn, etternavn, mellomnavn),
        };
    }
    return undefined;
};
