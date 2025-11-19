import { Dokument } from '../types';
import { browserEnv } from './env';

export const getDokumentFrontendUrl = (url: string): string => {
    // Split the URL into an array of segments using ‘/’ as the separator
    const segments = url.split('/');
    // Extract the desired paths from the array and join them together using ‘/’
    const paths = segments.slice(4, 7).join('/');

    return `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/dokument/${paths}`;
};

export const getSøknadDokumentFilnavn = (dokument: Dokument): string => {
    const filnavn = `${encodeURIComponent(dokument.tittel.toLowerCase())}`;
    return `${filnavn}.${dokument.filtype.toLowerCase()}`;
};

export const getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer = (
    soknadID: string,
    organisasjonsnummer: string,
): string => {
    return `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soknad/${soknadID}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`;
};
