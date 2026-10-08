import apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { DateRange, dateToISODate, ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';

import { Arbeidsgiver, ArbeidsgiverType } from '../types/Arbeidsgiver';
import { relocateToLoginPage } from '../utils/navigationUtils';
import { getArbeidsgiver } from './api';
import { AAregOrganisasjon, slåSammenAnsettelsesperioder } from './utils/ansettelsesperiodeUtils';

export type AAregArbeidsgiverRemoteData = {
    organisasjoner?: AAregOrganisasjon[];
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

const mapAAregArbeidsgiverRemoteDataToArbeidsgiver = (
    data: AAregArbeidsgiverRemoteData,
): { arbeidsgivere: Arbeidsgiver[]; harDuplikater: boolean } => {
    const { organisasjoner, harDuplikater } = slåSammenAnsettelsesperioder(data.organisasjoner ?? []);
    const arbeidsgivere: Arbeidsgiver[] = organisasjoner.map((a) => ({
        type: ArbeidsgiverType.ORGANISASJON,
        id: a.organisasjonsnummer,
        organisasjonsnummer: a.organisasjonsnummer,
        navn: a.navn || a.organisasjonsnummer,
        ansattFom: a.ansattFom ? ISODateToDate(a.ansattFom) : undefined,
        ansattTom: a.ansattTom ? ISODateToDate(a.ansattTom) : undefined,
    }));

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
    return { arbeidsgivere, harDuplikater };
};

export async function getArbeidsgivereRemoteData(periode: DateRange): Promise<Arbeidsgiver[]> {
    try {
        const response = await getArbeidsgiver(dateToISODate(periode.from), dateToISODate(periode.to), true);
        const { arbeidsgivere, harDuplikater } = mapAAregArbeidsgiverRemoteDataToArbeidsgiver(response.data);
        if (harDuplikater) {
            appLogger.logInfo('getArbeidsgivere: Organisasjon med flere ansettelsesperioder med opphold mellom seg');
        }
        return Promise.resolve(arbeidsgivere);
    } catch (error: any) {
        if (apiUtils.isUnauthorized(error)) {
            relocateToLoginPage();
            return [];
        } else {
            appLogger.logApiError(error, 'getArbeidsgivereRemoteData');
        }
        return Promise.reject(error);
    }
}
