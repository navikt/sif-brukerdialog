import { Søknadsdata } from '../../../types/Søknadsdata';
import { StegID } from '../../søknadStegConfig';

export const getNesteSteg = (fraSteg: StegID, søknad: Søknadsdata): StegID => {
    switch (fraSteg) {
        case StegID.PLEIETRENGENDE:
            return StegID.ARBEID;
        case StegID.ARBEID:
            return StegID.ARBEID;
    }
    return StegID.ARBEID;
};
