import { StegId } from '../config/stegConfig';

export interface Søknadsdata {
    [StegId.PERSONALIA]?: {
        navn: string;
    };
    [StegId.KONTAKT]?: {
        epost: string;
    };
}
