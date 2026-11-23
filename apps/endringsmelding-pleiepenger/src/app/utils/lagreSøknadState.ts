import { SøknadContextState } from '@app/types';

import { søknadStateEndpoint } from '../api/endpoints/søknadStateEndpoint';

let pågåendeLagring: Promise<unknown> = Promise.resolve();

/** Sletting av mellomlagring må vente på denne, ellers kan en sen lagring gjenopprette kladden */
export const ventPåMellomlagring = () => pågåendeLagring;

export const lagreSøknadState = (state: SøknadContextState) => {
    const {
        versjon,
        søknadsdata,
        søker,
        valgteEndringerInitielt,
        søknadRoute,
        sak,
        søknadSteps,
        søknadStepsVedOppsummering,
        valgteEndringer,
    } = state;
    const lagring = søknadStateEndpoint.update(
        {
            barnAktørId: sak.barn.aktørId,
            søknadsdata,
            versjon,
            harArbeidsgivereIkkeISak: state.sak.harArbeidsgivereIkkeISak,
            søknadRoute,
            valgteEndringer,
            valgteEndringerInitielt,
            søknadSteps,
            søknadStepsVedOppsummering,
            metadata: {
                updatedTimestamp: new Date().toISOString(),
            },
        },
        søker,
    );
    pågåendeLagring = Promise.allSettled([pågåendeLagring, lagring]);
    return lagring;
};
