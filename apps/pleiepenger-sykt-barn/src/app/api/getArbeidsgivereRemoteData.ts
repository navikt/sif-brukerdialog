import apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { DateRange, dateToISODate, ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';

import { Arbeidsgiver, ArbeidsgiverType } from '../types/Arbeidsgiver';
import { getFeatureToggles } from '../utils/featureToggleUtils';
import { relocateToLoginPage } from '../utils/navigationUtils';
import { getArbeidsgiver } from './api';
import { AAregOrganisasjon, slåSammenAnsettelsesperioder } from './utils/ansettelsesperiodeUtils';

export type Ansettelsesperiode = {
    from?: Date;
    to?: Date;
};

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
    const arbeidsgivere: Arbeidsgiver[] = organisasjoner.map((org) => ({
        type: ArbeidsgiverType.ORGANISASJON,
        id: org.organisasjonsnummer,
        organisasjonsnummer: org.organisasjonsnummer,
        navn: org.navn || org.organisasjonsnummer,
        ansattFom: org.ansattFom ? ISODateToDate(org.ansattFom) : undefined,
        ansattTom: org.ansattTom ? ISODateToDate(org.ansattTom) : undefined,
        ansettelsesperioder: org.ansettelsesperioder ?? undefined,
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
    const hentFlereAnsettelsesperioder = getFeatureToggles().hentFlereAnsettelsesperioder;
    try {
        const response = await getArbeidsgiver(
            dateToISODate(periode.from),
            dateToISODate(periode.to),
            hentFlereAnsettelsesperioder,
        );
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
