import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { KursperiodeFormValues } from './KursperiodeForm';
import { Kursperiode } from '../../../../types/Kursperiode';

const isValidKursperiode = (kursperiode: Partial<Kursperiode>): kursperiode is Kursperiode => {
    return kursperiode.periode?.from !== undefined && kursperiode.periode.to !== undefined;
};

const mapFormValuesToKursperiode = (
    formValues: KursperiodeFormValues,
    id: string | undefined,
): Partial<Kursperiode> => {
    return {
        id: id || guid(),
        periode: {
            from: ISOStringToDate(formValues.fom)!,
            to: ISOStringToDate(formValues.tom)!,
        },
    };
};

const mapKursperiodeToFormValues = ({ periode }: Partial<Kursperiode>): KursperiodeFormValues => {
    return {
        fom: dateToISOString(periode?.from),
        tom: dateToISOString(periode?.to),
    };
};

const kursperiodeUtils = {
    isValidKursperiode,
    mapKursperiodeToFormValues,
    mapFormValuesToKursperiode,
};

export default kursperiodeUtils;
