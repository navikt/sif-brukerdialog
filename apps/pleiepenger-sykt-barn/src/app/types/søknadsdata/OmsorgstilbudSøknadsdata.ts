import { DateDurationMap, DurationWeekdays } from '@navikt/sif-common-utils';
import { YesOrNoOrDoNotKnow } from '../YesOrNoOrDoNotKnow';

export interface ErIOmsorgstilbudFremtidUsikkerSøknadsdata {
    type: 'erIOmsorgstilbudFremtidUsikker';
    erIOmsorgstilbudFortid?: YesOrNoOrDoNotKnow.NO;
}

export interface ErIOmsorgstilbudFasteDagerSøknadsdata {
    type: 'erIOmsorgstilbudFasteDager';
    erIOmsorgstilbudFortid?: YesOrNoOrDoNotKnow;
    erIOmsorgstilbudFremtid?: YesOrNoOrDoNotKnow;
    fasteDager: DurationWeekdays;
}

export interface ErIOmsorgstilbudEnkeltDagerSøknadsdata {
    type: 'erIOmsorgstilbudEnkeltDager';
    erIOmsorgstilbudFortid?: YesOrNoOrDoNotKnow;
    erIOmsorgstilbudFremtid?: YesOrNoOrDoNotKnow;
    enkeltdager: DateDurationMap;
}

export type OmsorgstilbudSøknadsdata =
    | ErIOmsorgstilbudFremtidUsikkerSøknadsdata
    | ErIOmsorgstilbudFasteDagerSøknadsdata
    | ErIOmsorgstilbudEnkeltDagerSøknadsdata;
