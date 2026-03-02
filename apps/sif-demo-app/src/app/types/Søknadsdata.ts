import { StegId } from '../config/stegConfig';

export interface Søknadsdata {
    [StegId.PERSONALIA]?: {
        navn: string;
        harKjæledyr: 'ja' | 'nei';
    };
    [StegId.KJÆLEDYR]?: {
        navn: string;
    };
    [StegId.KONTAKT]?: {
        epost: string;
    };
}
