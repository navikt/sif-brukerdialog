import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { UtenlandsoppholdIPeriodenSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const extractUtenlandsoppholdIPeriodenSøknadsdata = ({
    skalOppholdeSegIUtlandetIPerioden,
    utenlandsoppholdIPerioden,
}: Partial<SøknadFormValues>): UtenlandsoppholdIPeriodenSøknadsdata | undefined => {
    if (
        skalOppholdeSegIUtlandetIPerioden &&
        skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES &&
        utenlandsoppholdIPerioden
    ) {
        return {
            type: 'skalOppholdeSegIUtlandet',
            skalOppholdeSegIUtlandetIPerioden: true,
            opphold: utenlandsoppholdIPerioden,
        };
    }

    if (skalOppholdeSegIUtlandetIPerioden && skalOppholdeSegIUtlandetIPerioden === YesOrNo.NO) {
        return {
            type: 'skalIkkeOppholdeSegIUtlandet',
            skalOppholdeSegIUtlandetIPerioden: false,
        };
    }

    return undefined;
};
