import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { SøknadFormValues } from '../../types/_SøknadFormValues';
import { UtenlandskNæringSøknadsdata } from '../../types/søknadsdata/_Søknadsdata';

export const extractUtenlandskNæringSøknadsdata = ({
    harUtenlandskNæring,
    utenlandskNæring,
}: Partial<SøknadFormValues>): UtenlandskNæringSøknadsdata => {
    if (harUtenlandskNæring === YesOrNo.YES && utenlandskNæring) {
        return {
            type: 'harUtenlandskNæring',
            utenlandskNæring: utenlandskNæring,
        };
    } else {
        return {
            type: 'harIkkeUtenlandskNæring',
        };
    }
};
