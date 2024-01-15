import { ApiFosterbarn, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { DineBarnSøknadsdata } from '../../types/søknadsdata/DineBarnSøknadsdata';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { Fosterbarn } from '@navikt/sif-common-forms-ds/lib/forms/fosterbarn/types';

export type OmBarnaToApiData = Pick<SøknadApiData, 'fosterbarn'>;

const mapFosterbarnToApiFosterbarn = (fosterbarn: Fosterbarn): ApiFosterbarn => {
    return {
        identitetsnummer: fosterbarn.fødselsnummer,
        // TODO: sjekk om dette er riktig
        navn: formatName(fosterbarn.fornavn || '', fosterbarn.etternavn || ''),
    };
};

export const getDineBarnApiDataFromSøknadsdata = (
    dineBarnSøknadsdata: DineBarnSøknadsdata,
): ApiFosterbarn[] | undefined => {
    if (dineBarnSøknadsdata === undefined) {
        throw Error('dineBarnSøknadsdata undefined');
    }

    switch (dineBarnSøknadsdata.type) {
        case 'dineBarnHarFosterbarn':
            return dineBarnSøknadsdata.fosterbarn.map((barn) => mapFosterbarnToApiFosterbarn(barn));
        case 'dineBarnHarIkkeFosterbarn':
            return undefined;
    }
};
