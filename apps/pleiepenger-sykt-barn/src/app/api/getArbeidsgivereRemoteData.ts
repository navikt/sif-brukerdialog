import apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { dateToISODate, ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { Arbeidsgiver, ArbeidsgiverType } from '../types/Arbeidsgiver';
import appSentryLogger from '../utils/appSentryLogger';
import { relocateToLoginPage } from '../utils/navigationUtils';
import { getArbeidsgiver } from './api';

export type AAregArbeidsgiverRemoteData = {
    organisasjoner?: Array<{
        organisasjonsnummer: string;
        navn: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }>;
    privatarbeidsgiver?: Array<{
        offentligIdent: string;
        navn: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }>;
    frilansoppdrag?: Array<{
        type: string;
        organisasjonsnummer?: string;
        offentligIdent?: string;
        navn?: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }>;
};

const mapAAregArbeidsgiverRemoteDataToArbeidsgiver = (data: AAregArbeidsgiverRemoteData): Arbeidsgiver[] => {
    const arbeidsgivere: Arbeidsgiver[] = [];
    data.organisasjoner?.forEach((a) => {
        arbeidsgivere.push({
            type: ArbeidsgiverType.ORGANISASJON,
            id: a.organisasjonsnummer,
            organisasjonsnummer: a.organisasjonsnummer,
            navn: a.navn || a.organisasjonsnummer,
            ansattFom: a.ansattFom ? ISODateToDate(a.ansattFom) : undefined,
            ansattTom: a.ansattTom ? ISODateToDate(a.ansattTom) : undefined,
        });
    });
    /*
        Privat arbeidsgiver er ikke tatt i bruk, og returnerers ikke fra backend
        data.privatarbeidsgiver?.forEach((a) => {
            arbeidsgivere.push({
                type: ArbeidsgiverType.PRIVATPERSON,
                id: a.offentligIdent,
                offentligIdent: a.offentligIdent,
                navn: a.navn,
                ansattFom: a.ansattFom ? ISODateToDate(a.ansattFom) : undefined,
                ansattTom: a.ansattTom ? ISODateToDate(a.ansattTom) : undefined,
            });
        });
    */
    data.frilansoppdrag?.forEach((a) => {
        arbeidsgivere.push({
            type: ArbeidsgiverType.FRILANSOPPDRAG,
            id: a.offentligIdent || a.organisasjonsnummer || 'ukjent',
            organisasjonsnummer: a.organisasjonsnummer,
            offentligIdent: a.offentligIdent,
            navn: a.navn || 'Frilansoppdrag',
            ansattFom: a.ansattFom ? ISODateToDate(a.ansattFom) : undefined,
            ansattTom: a.ansattTom ? ISODateToDate(a.ansattTom) : undefined,
        });
    });
    return arbeidsgivere;
};

export async function getArbeidsgivereRemoteData(fromDate: Date, toDate: Date): Promise<Arbeidsgiver[]> {
    try {
        const response = await getArbeidsgiver(dateToISODate(fromDate), dateToISODate(toDate));
        const arbeidsgivere = mapAAregArbeidsgiverRemoteDataToArbeidsgiver(response.data);
        return Promise.resolve(arbeidsgivere);
    } catch (error: any) {
        if (apiUtils.isUnauthorized(error)) {
            relocateToLoginPage();
            return [];
        } else {
            appSentryLogger.logApiError(error);
        }
        return Promise.reject(error);
    }
}
