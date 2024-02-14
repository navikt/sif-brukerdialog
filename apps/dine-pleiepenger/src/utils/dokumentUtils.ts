import { Dokument } from '../server/api-models/DokumenetSchema';
import { InnsendtSøknadDokument } from '../types/InnsendtSøknadDocument';
import { browserEnv } from './env';

export const getDokumentFrontendUrl = (url: string): string => {
    // Split the URL into an array of segments using ‘/’ as the separator
    const segments = url.split('/');
    // Extract the desired paths from the array and join them together using ‘/’
    const paths = segments.slice(4, 7).join('/');

    return `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/dokument/${paths}`;
};

export const getSøknadDokumentFilnavn = (dokument: Dokument | InnsendtSøknadDokument): string => {
    const filnavn = `${encodeURIComponent(dokument.tittel.toLowerCase())}`;
    return `${filnavn}.${dokument.filtype.toLowerCase()}`;
};
