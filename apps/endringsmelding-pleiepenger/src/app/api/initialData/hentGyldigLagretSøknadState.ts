import { Arbeidsgiver, K9Sak } from '@app/types';
import { Søker } from '@navikt/sif-common-api';
import { DateRange } from '@navikt/sif-common-utils';

import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from '../endpoints/søknadStateEndpoint';

type Params = {
    søker: Søker;
    k9saker: K9Sak[];
    arbeidsgivere: Arbeidsgiver[];
    tillattEndringsperiode: DateRange;
};

/**
 * Henter mellomlagret søknad og returnerer den kun dersom den fortsatt er gyldig
 * mot dagens saker og arbeidsgivere. Ugyldig mellomlagring slettes, slik at bruker
 * starter på nytt i stedet for å fortsette på et utdatert grunnlag.
 */
export const hentGyldigLagretSøknadState = async ({
    søker,
    k9saker,
    arbeidsgivere,
    tillattEndringsperiode,
}: Params): Promise<SøknadStatePersistence | undefined> => {
    const lagretSøknadState = await søknadStateEndpoint.fetch();

    if (lagretSøknadState === undefined) {
        return undefined;
    }

    const erGyldig = isPersistedSøknadStateValid(
        lagretSøknadState,
        { søker, barnAktørId: lagretSøknadState.barnAktørId },
        k9saker,
        arbeidsgivere,
        tillattEndringsperiode,
    );

    if (!erGyldig) {
        await søknadStateEndpoint.purge();
        return undefined;
    }

    return lagretSøknadState;
};
