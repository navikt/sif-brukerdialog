import { useFormikContext } from 'formik';
import { KursFormValues } from '../../KursStep';
import { DateRange } from '@navikt/sif-common-utils';

interface Props {
    gyldigSøknadsperiode: DateRange;
}

export interface EnkeltdagFormValues {
    dato: string;
    timerKurs: number;
    timerReise: number;
}

const EnkeltdagerFormPart = ({ gyldigSøknadsperiode }: Props) => {
    const { values } = useFormikContext<KursFormValues>();
    console.log('values', values, gyldigSøknadsperiode);
    return <div>EnkeltdagFormPart</div>;
};

export default EnkeltdagerFormPart;
