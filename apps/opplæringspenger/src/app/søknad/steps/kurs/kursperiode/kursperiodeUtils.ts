import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { dateRangeUtils, guid, ISODateToDate } from '@navikt/sif-common-utils';
import { KursperiodeFormValues } from './KursperiodeForm';
import { Kursperiode } from '../../../../types/Kursperiode';

const isValidKursperiode = (kursperiode: Partial<Kursperiode>): kursperiode is Kursperiode => {
    return kursperiode.periode?.from !== undefined && kursperiode.periode.to !== undefined;
};

const mapFormValuesToKursperiode = (
    formValues: KursperiodeFormValues,
    id: string | undefined,
): Partial<Kursperiode> => {
    const from = ISOStringToDate(formValues.fom);
    const to = ISOStringToDate(formValues.tom);
    const avreise = ISOStringToDate(formValues.avreise);
    const hjemkomst = ISOStringToDate(formValues.hjemkomst);

    if (!from || !to) {
        throw new Error('Kan ikke mappe form values til kursperiode: Fom og tom må være satt');
    }

    return {
        id: id || guid(),
        periode: {
            from,
            to,
        },
        avreise,
        hjemkomst,
        begrunnelseReisetidTil: måBesvareBegrunnelseReisetidTil(formValues)
            ? formValues.begrunnelseReisetidTil
            : undefined,
        begrunnelseReisetidHjem: måBesvareBegrunnelseReisetidHjem(formValues)
            ? formValues.begrunnelseReisetidHjem
            : undefined,
    };
};

const mapKursperiodeToFormValues = ({
    periode,
    avreise,
    begrunnelseReisetidHjem,
    begrunnelseReisetidTil,
    hjemkomst,
}: Partial<Kursperiode>): KursperiodeFormValues => {
    return {
        fom: dateToISOString(periode?.from),
        tom: dateToISOString(periode?.to),
        avreise: dateToISOString(avreise),
        hjemkomst: dateToISOString(hjemkomst),
        begrunnelseReisetidHjem,
        begrunnelseReisetidTil,
    };
};

const getDagerMellomAvreiseOgStartdato = ({ fom, avreise }: Partial<KursperiodeFormValues>): number => {
    const startdato = ISODateToDate(fom || '');
    const avreisedato = ISODateToDate(avreise || '');

    return startdato && avreisedato
        ? dateRangeUtils.getNumberOfDaysInDateRange({ from: avreisedato, to: startdato })
        : 0;
};
const getDagerMellomSluttdatoOgHjemkomst = ({ hjemkomst, tom }: Partial<KursperiodeFormValues>): number => {
    const sluttdato = ISODateToDate(tom || '');
    const hjemkomstdato = ISODateToDate(hjemkomst || '');

    return sluttdato && hjemkomstdato
        ? dateRangeUtils.getNumberOfDaysInDateRange({ from: sluttdato, to: hjemkomstdato })
        : 0;
};

const måBesvareBegrunnelseReisetidHjem = (values: Partial<KursperiodeFormValues>): boolean => {
    return getDagerMellomAvreiseOgStartdato(values) > 1;
};

const måBesvareBegrunnelseReisetidTil = (values: Partial<KursperiodeFormValues>): boolean => {
    return getDagerMellomSluttdatoOgHjemkomst(values) > 1;
};

const kursperiodeUtils = {
    isValidKursperiode,
    mapKursperiodeToFormValues,
    mapFormValuesToKursperiode,
    getDagerMellomAvreiseOgStartdato,
    getDagerMellomSluttdatoOgHjemkomst,
    måBesvareBegrunnelseReisetidHjem,
    måBesvareBegrunnelsebegrunnelseReisetidTil: måBesvareBegrunnelseReisetidTil,
};

export default kursperiodeUtils;
