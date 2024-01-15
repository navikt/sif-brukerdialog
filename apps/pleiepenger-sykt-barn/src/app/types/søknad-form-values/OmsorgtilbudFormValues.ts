import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { DateDurationMap, DurationWeekdays } from '@navikt/sif-common-utils';
import { YesOrNoOrDoNotKnow } from '../YesOrNoOrDoNotKnow';

export interface OmsorgstilbudFormValues {
    erIOmsorgstilbudFortid?: YesOrNoOrDoNotKnow;
    erIOmsorgstilbudFremtid?: YesOrNoOrDoNotKnow;
    erLiktHverUke?: YesOrNo;
    fasteDager?: DurationWeekdays;
    enkeltdager?: DateDurationMap;
}
