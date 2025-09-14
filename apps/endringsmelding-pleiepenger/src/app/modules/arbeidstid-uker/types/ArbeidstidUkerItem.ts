import { DateRange, Duration, ISODateRange } from '@navikt/sif-common-utils';

export interface ArbeidstidUkerItem {
    id: string;
    kanEndres: boolean;
    kanVelges: boolean;
    isoDateRange: ISODateRange;
    periode: DateRange;
    antallDagerMedArbeidstid: number;
    erKortUke: boolean;
    harFeriedager?: boolean;
    harFjernetFeriedager?: boolean;
    ferie?: {
        dagerMedFerie: Date[];
        dagerMedFjernetFerie: Date[];
    };
    opprinnelig: {
        faktisk?: Duration;
        normalt: Duration;
    };
    endret?: {
        endretProsent?: number;
        faktisk: Duration;
    };
}
