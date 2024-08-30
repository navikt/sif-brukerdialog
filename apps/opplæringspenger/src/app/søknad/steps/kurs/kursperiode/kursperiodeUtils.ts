import { dateToISOString, ISOStringToDate, YesOrNo } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Kursperiode } from '../../../../types/Kursperiode';
import { KursperiodeFormFields, KursperiodeFormValues } from './KursperiodeForm';

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
        beskrivelseReisetidTil: måBesvareBeskrivelseReisetidTil(formValues)
            ? formValues.beskrivelseReisetidTil
            : undefined,
        beskrivelseReisetidHjem: måBesvareBeskrivelseReisetidHjem(formValues)
            ? formValues.beskrivelseReisetidHjem
            : undefined,
    };
};

const mapKursperiodeToFormValues = ({
    periode,
    avreise,
    beskrivelseReisetidHjem,
    beskrivelseReisetidTil,
    hjemkomst,
}: Partial<Kursperiode>): KursperiodeFormValues => {
    return {
        fom: dateToISOString(periode?.from),
        tom: dateToISOString(periode?.to),
        avreise: dateToISOString(avreise),
        hjemkomst: dateToISOString(hjemkomst),
        avreiseSammeDag: avreise ? YesOrNo.NO : periode ? YesOrNo.YES : YesOrNo.UNANSWERED,
        hjemkomstSammeDag: hjemkomst ? YesOrNo.NO : periode ? YesOrNo.YES : YesOrNo.UNANSWERED,
        beskrivelseReisetidHjem,
        beskrivelseReisetidTil,
    };
};

const getDagerMellomAvreiseOgStartdato = ({ fom, avreise }: Partial<KursperiodeFormValues>): number => {
    const startdato = ISOStringToDate(fom);
    const avreisedato = ISOStringToDate(avreise);

    return startdato && avreisedato ? dayjs(startdato).diff(avreisedato, 'days') : 0;
};
const getDagerMellomSluttdatoOgHjemkomst = ({ hjemkomst, tom }: Partial<KursperiodeFormValues>): number => {
    const sluttdato = ISOStringToDate(tom);
    const hjemkomstdato = ISOStringToDate(hjemkomst);

    return sluttdato && hjemkomstdato ? dayjs(hjemkomstdato).diff(sluttdato, 'days') : 0;
};

const måBesvareBeskrivelseReisetidHjem = (values: Partial<KursperiodeFormValues>): boolean => {
    return (
        values[KursperiodeFormFields.hjemkomstSammeDag] === YesOrNo.NO && getDagerMellomSluttdatoOgHjemkomst(values) > 1
    );
};

const måBesvareBeskrivelseReisetidTil = (values: Partial<KursperiodeFormValues>): boolean => {
    return values[KursperiodeFormFields.avreiseSammeDag] === YesOrNo.NO && getDagerMellomAvreiseOgStartdato(values) > 1;
};

const kursperiodeUtils = {
    isValidKursperiode,
    mapKursperiodeToFormValues,
    mapFormValuesToKursperiode,
    getDagerMellomAvreiseOgStartdato,
    getDagerMellomSluttdatoOgHjemkomst,
    måBesvareBeskrivelseReisetidHjem,
    måBesvareBeskrivelseReisetidTil,
};

export default kursperiodeUtils;
