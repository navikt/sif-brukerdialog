import React from 'react';
import { AppMessageKeys, AppText } from '../../../i18n';
import { DineBarnSøknadsdata, DineBarnSøknadsdataType } from '../../../types/søknadsdata/DineBarnSøknadsdata';

interface Props {
    dineBarn?: DineBarnSøknadsdata;
}

const getIntlMessageKey = (type?: DineBarnSøknadsdataType): AppMessageKeys | undefined => {
    switch (type) {
        case DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKT_BARN_OVER_13:
            return 'step.fravaer.dager.info.UTVIDET_RETT_PGA_SYKT_BARN_OVER_13';
        case DineBarnSøknadsdataType.UTVIDET_RETT_PGA_ANTALL_BARN:
        case DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKDOM_ELLER_ALENEOMSORG:
            return 'step.fravaer.dager.info';
        case DineBarnSøknadsdataType.HAR_IKKE_RETT_STOPPES:
        default:
            return undefined;
    }
};

const OmsorgsdagerInfo: React.FunctionComponent<Props> = ({ dineBarn }) => {
    const key = getIntlMessageKey(dineBarn?.type);
    return key ? <AppText id={key} /> : null;
};

export default OmsorgsdagerInfo;
