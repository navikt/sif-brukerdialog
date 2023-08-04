import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { SøknadFormValues } from '../../types/_SøknadFormValues';
import { OpptjeningUtlandSøknadsdata } from '../../types/søknadsdata/_Søknadsdata';

export const extractOpptjeningUtlandSøknadsdata = ({
    harOpptjeningUtland,
    opptjeningUtland,
}: Partial<SøknadFormValues>): OpptjeningUtlandSøknadsdata => {
    if (harOpptjeningUtland === YesOrNo.YES && opptjeningUtland) {
        return {
            type: 'harOpptjeningUtland',
            opptjeningUtland: opptjeningUtland,
        };
    } else {
        return {
            type: 'harIkkeOpptjeningUtland',
        };
    }
};
