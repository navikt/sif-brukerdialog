import { Opplæringsinstitusjon } from '../types/Opplæringsinstitusjon';

export const getOpplæringsinstitusjonFromId = (
    id: string,
    opplæringsinstitusjoner: Opplæringsinstitusjon[],
): Opplæringsinstitusjon | undefined => {
    return opplæringsinstitusjoner.filter((k) => k.uuid === id)[0];
};
