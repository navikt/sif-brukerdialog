import { dateToISOString, ISOStringToDate, YesOrNo } from '@navikt/sif-common-formik-ds';
import { dateRangeUtils, guid } from '@navikt/sif-common-utils';
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
        avreiseSammeDag: avreise ? YesOrNo.NO : periode ? YesOrNo.YES : YesOrNo.UNANSWERED,
        hjemkomstSammeDag: hjemkomst ? YesOrNo.NO : periode ? YesOrNo.YES : YesOrNo.UNANSWERED,
        begrunnelseReisetidHjem,
        begrunnelseReisetidTil,
    };
};

const getDagerMellomAvreiseOgStartdato = ({ fom, avreise }: Partial<KursperiodeFormValues>): number => {
    const startdato = ISOStringToDate(fom);
    const avreisedato = ISOStringToDate(avreise);

    return startdato && avreisedato
        ? dateRangeUtils.getNumberOfDaysInDateRange({ from: avreisedato, to: startdato })
        : 0;
};
const getDagerMellomSluttdatoOgHjemkomst = ({ hjemkomst, tom }: Partial<KursperiodeFormValues>): number => {
    const sluttdato = ISOStringToDate(tom);
    const hjemkomstdato = ISOStringToDate(hjemkomst);

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
    måBesvareBegrunnelseReisetidTil,
};

export default kursperiodeUtils;
