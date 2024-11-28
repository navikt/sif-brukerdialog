import { DateRange } from '@navikt/sif-common-formik-ds';
import { Kursperiode } from '../../../../types/Kursperiode';

interface Props {
    kursperioder?: Array<Partial<Kursperiode>>;
    gyldigSøknadsperiode: DateRange;
}

const KursperioderFormPart = ({ kursperioder = [] }: Props) => {
    return <>Kursperioder: {kursperioder.length}</>;
};

export default KursperioderFormPart;
