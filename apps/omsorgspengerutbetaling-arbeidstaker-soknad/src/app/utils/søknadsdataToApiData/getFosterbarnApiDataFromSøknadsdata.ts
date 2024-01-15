import { ApiFosterbarn, SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { FosterbarnSøknadsdata } from '../../types/søknadsdata/FosterbarnSøknadsdata';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { Fosterbarn } from '@navikt/sif-common-forms-ds/lib/forms/fosterbarn/types';

export type FosterbarnToApiData = Pick<SøknadApiData, 'fosterbarn'>;

const mapFosterbarnToApiFosterbarn = (fosterbarn: Fosterbarn): ApiFosterbarn => {
    return {
        identitetsnummer: fosterbarn.fødselsnummer,
        // TODO: sjekk om dette er riktig
        navn: formatName(fosterbarn.fornavn || '', fosterbarn.etternavn || ''),
    };
};

export const getFosterbarnApiDataFromSøknadsdata = (
    fosterbarnSøknadsdata: FosterbarnSøknadsdata,
): ApiFosterbarn[] | undefined => {
    if (fosterbarnSøknadsdata === undefined) {
        throw Error('fosterbarnSøknadsdata undefined');
    }

    switch (fosterbarnSøknadsdata.type) {
        case 'harFosterbarn':
            return fosterbarnSøknadsdata.fosterbarn.map((barn) => mapFosterbarnToApiFosterbarn(barn));
        case 'harIkkeFosterbarn':
            return undefined;
    }
};
