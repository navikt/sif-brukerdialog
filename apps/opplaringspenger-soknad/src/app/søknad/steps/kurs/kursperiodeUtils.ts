import { DateRange, dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { Kursperiode } from '../../../types/Kursperiode';
import { KursperiodeFormValues } from './kursperioder-form-part/KursperiodeQuestions';

const isValidKursperiode = (kursperiode: Partial<Kursperiode>): kursperiode is Kursperiode => {
    return kursperiode.periode?.from !== undefined && kursperiode.periode.to !== undefined;
};

export const getPerioderFromKursperiodeFormValue = (
    formValues: Partial<KursperiodeFormValues>,
):
    | {
          periode: DateRange;
          //   periodeMedReise: DateRange;
      }
    | undefined => {
    const from = ISOStringToDate(formValues.fom);
    const to = ISOStringToDate(formValues.tom);
    // const avreise = ISOStringToDate(formValues.avreise);
    // const hjemkomst = ISOStringToDate(formValues.hjemkomst);

    if (!from || !to) {
        return undefined;
    }
    const periode: DateRange = {
        from,
        to,
    };
    // const periodeMedReise: DateRange =
    //     avreise || hjemkomst
    //         ? {
    //               from: avreise ? dayjs.min(dayjs(from), dayjs(avreise)).toDate() : from,
    //               to: hjemkomst ? dayjs.max(dayjs(to), dayjs(hjemkomst)).toDate() : to,
    //           }
    //         : periode;

    return { periode };
};

const mapFormValuesToKursperiode = (formValues: KursperiodeFormValues, id: string | undefined): Kursperiode => {
    const perioder = getPerioderFromKursperiodeFormValue(formValues);

    if (!perioder) {
        throw new Error('Kan ikke mappe form values til kursperiode: Fom og tom må være satt');
    }

    const { periode } = perioder;

    // const harTaptArbeidstid = formValues.harTaptArbeidstid === YesOrNo.YES;
    return {
        id: id || guid(),
        periode,
        // periodeMedReise,
        // harTaptArbeidstid,
        // avreise: harTaptArbeidstid ? periodeMedReise.from : undefined,
        // hjemkomst: harTaptArbeidstid ? periodeMedReise.to : undefined,
        // beskrivelseReisetid: måBesvareBeskrivelseReisetid(formValues) ? formValues.beskrivelseReisetid : undefined,
    };
};

const mapKursperiodeToFormValues = ({
    periode,
    // avreise,
    // harTaptArbeidstid,
    // beskrivelseReisetid,
    // hjemkomst,
}: Partial<Kursperiode>): KursperiodeFormValues => {
    return {
        fom: dateToISOString(periode?.from),
        tom: dateToISOString(periode?.to),
        // harTaptArbeidstid: harTaptArbeidstid ? YesOrNo.YES : YesOrNo.NO,
        // avreise: harTaptArbeidstid ? dateToISOString(avreise) : undefined,
        // hjemkomst: harTaptArbeidstid ? dateToISOString(hjemkomst) : undefined,
        // beskrivelseReisetid: harTaptArbeidstid ? beskrivelseReisetid : undefined,
    };
};

// const getDagerMellomAvreiseOgStartdato = ({ fom, avreise }: Partial<KursperiodeFormValues>): number => {
//     const startdato = ISOStringToDate(fom);
//     const avreisedato = ISOStringToDate(avreise);

//     // if (!startdato || !avreisedato) {
//     //     throw 'Kan ikke beregen dagerMellomAvreiseOgStartdato pga manglende verdi';
//     // }

//     return startdato && avreisedato ? dayjs(startdato).diff(avreisedato, 'days') : 0;
// };
// const getDagerMellomSluttdatoOgHjemkomst = ({ hjemkomst, tom }: Partial<KursperiodeFormValues>): number => {
//     const sluttdato = ISOStringToDate(tom);
//     const hjemkomstdato = ISOStringToDate(hjemkomst);

//     return sluttdato && hjemkomstdato ? dayjs(hjemkomstdato).diff(sluttdato, 'days') : 0;
// };

// const måBesvareBeskrivelseReisetidHjem = (values: Partial<KursperiodeFormValues>): boolean => {
//     return (
//         values[KursperiodeFormFields.harTaptArbeidstid] === YesOrNo.YES &&
//         getDagerMellomSluttdatoOgHjemkomst(values) >= 1
//     );
// };

// const måBesvareBeskrivelseReisetidTil = (values: Partial<KursperiodeFormValues>): boolean => {
//     return (
//         values[KursperiodeFormFields.harTaptArbeidstid] === YesOrNo.YES && getDagerMellomAvreiseOgStartdato(values) >= 1
//     );
// };

// const måBesvareBeskrivelseReisetid = (values: Partial<KursperiodeFormValues>): boolean => {
//     return måBesvareBeskrivelseReisetidHjem(values) || måBesvareBeskrivelseReisetidTil(values);
// };

const kursperiodeUtils = {
    isValidKursperiode,
    mapKursperiodeToFormValues,
    mapFormValuesToKursperiode,
    // getDagerMellomAvreiseOgStartdato,
    // getDagerMellomSluttdatoOgHjemkomst,
    // måBesvareBeskrivelseReisetidHjem,
    // måBesvareBeskrivelseReisetidTil,
    // måBesvareBeskrivelseReisetid,
};

export default kursperiodeUtils;
