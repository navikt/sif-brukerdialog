import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { SøknadFormValues } from '../../types/_SøknadFormValues';
import { FerieuttakIPeriodenSøknadsdata } from '../../types/søknadsdata/_Søknadsdata';

export const extractFerieuttakIPeriodenSøknadsdata = ({
    skalTaUtFerieIPerioden,
    ferieuttakIPerioden,
}: Partial<SøknadFormValues>): FerieuttakIPeriodenSøknadsdata | undefined => {
    if (skalTaUtFerieIPerioden && skalTaUtFerieIPerioden === YesOrNo.YES && ferieuttakIPerioden) {
        return {
            type: 'skalTaUtFerieSøknadsdata',
            skalTaUtFerieIPerioden: true,
            ferieuttak: ferieuttakIPerioden,
        };
    }

    if (skalTaUtFerieIPerioden && skalTaUtFerieIPerioden === YesOrNo.NO) {
        return {
            type: 'skalIkkeTaUtFerieSøknadsdata',
            skalTaUtFerieIPerioden: false,
        };
    }

    return undefined;
};
