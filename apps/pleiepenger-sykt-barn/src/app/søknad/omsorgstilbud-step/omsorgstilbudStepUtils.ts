import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-formik-ds/src';
import { getDurationsInDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { OmsorgstilbudFormValues } from '../../types/søknad-form-values/OmsorgtilbudFormValues';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { YesOrNoOrDoNotKnow } from '../../types/YesOrNoOrDoNotKnow';
import { skalBrukerSvarePåBeredskapOgNattevåk } from '../../utils/stepUtils';

export const MIN_ANTALL_DAGER_FOR_FAST_PLAN_I_OMSORGSTILBUD = 6;

export const skalViseSpørsmålOmProsentEllerLiktHverUke = (periode: DateRange): boolean => {
    const antallDager = dayjs(periode.to).diff(periode.from, 'days');
    if (antallDager < MIN_ANTALL_DAGER_FOR_FAST_PLAN_I_OMSORGSTILBUD) {
        return false;
    }
    return true;
};

export const cleanupOmsorgstilbudStep = (values: SøknadFormValues, søknadsperiode: DateRange): SøknadFormValues => {
    const cleanedValues = { ...values };
    const inkluderLiktHverUke = skalViseSpørsmålOmProsentEllerLiktHverUke(søknadsperiode);

    if (cleanedValues.omsorgstilbud) {
        if (
            cleanedValues.omsorgstilbud?.erIOmsorgstilbudFortid !== YesOrNoOrDoNotKnow.YES &&
            cleanedValues.omsorgstilbud?.erIOmsorgstilbudFremtid !== YesOrNoOrDoNotKnow.YES
        ) {
            cleanedValues.omsorgstilbud.enkeltdager = undefined;
            cleanedValues.omsorgstilbud.fasteDager = undefined;
            cleanedValues.omsorgstilbud.erLiktHverUke = undefined;
        } else {
            if (inkluderLiktHverUke === false) {
                cleanedValues.omsorgstilbud.erLiktHverUke = undefined;
            }
            if (cleanedValues.omsorgstilbud.erLiktHverUke === YesOrNo.YES) {
                cleanedValues.omsorgstilbud.enkeltdager = undefined;
            }
            if (cleanedValues.omsorgstilbud.erLiktHverUke === YesOrNo.NO || inkluderLiktHverUke === false) {
                cleanedValues.omsorgstilbud.fasteDager = undefined;
                cleanedValues.omsorgstilbud.enkeltdager = getDurationsInDateRange(
                    cleanedValues.omsorgstilbud.enkeltdager || {},
                    getPeriode(søknadsperiode, cleanedValues.omsorgstilbud),
                );
            }
        }
    }
    if (skalBrukerSvarePåBeredskapOgNattevåk(values) === false) {
        cleanedValues.harNattevåk = YesOrNo.UNANSWERED;
        cleanedValues.harNattevåk_ekstrainfo = undefined;
        cleanedValues.harBeredskap = YesOrNo.UNANSWERED;
        cleanedValues.harBeredskap_ekstrainfo = undefined;
    }

    return cleanedValues;
};

export const getPeriode = (søknadsperiode: DateRange, omsorgstilbud?: OmsorgstilbudFormValues): DateRange => {
    if (
        omsorgstilbud &&
        omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.YES &&
        (omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.NO ||
            omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.DO_NOT_KNOW)
    ) {
        return {
            from: søknadsperiode.from,
            to: dayjs().subtract(1, 'day').toDate(),
        };
    }

    if (
        omsorgstilbud &&
        omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.NO &&
        omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.YES
    ) {
        return {
            from: dayjs().toDate(),
            to: søknadsperiode.to,
        };
    }

    return søknadsperiode;
};

export const visLiktHverUke = (
    periodeFortidFremtid: boolean,
    periodeFortid: boolean,
    periodeFremtid: boolean,
    omsorgstilbud?: OmsorgstilbudFormValues,
): boolean => {
    if (!omsorgstilbud) {
        return false;
    }

    if (
        omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.NO &&
        omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.NO
    ) {
        return false;
    }
    if (
        omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.NO &&
        omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.DO_NOT_KNOW
    ) {
        return false;
    }

    if (
        omsorgstilbud.erIOmsorgstilbudFremtid !== YesOrNoOrDoNotKnow.YES &&
        omsorgstilbud.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.NO
    )
        return false;
    if (
        omsorgstilbud.erIOmsorgstilbudFortid !== YesOrNoOrDoNotKnow.YES &&
        omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.NO
    )
        return false;
    if (
        omsorgstilbud.erIOmsorgstilbudFortid !== YesOrNoOrDoNotKnow.YES &&
        omsorgstilbud.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.DO_NOT_KNOW
    )
        return false;

    if (periodeFortidFremtid && (!omsorgstilbud.erIOmsorgstilbudFortid || !omsorgstilbud.erIOmsorgstilbudFremtid)) {
        return false;
    }

    if (periodeFortid && !omsorgstilbud.erIOmsorgstilbudFortid) {
        return false;
    }

    if (periodeFremtid && !omsorgstilbud.erIOmsorgstilbudFremtid) {
        return false;
    }

    return true;
};

export const getSpmTeksterLiktHverUke = (
    omsorgstilbud?: OmsorgstilbudFormValues,
): 'fortid' | 'fortidFremtidUsiker' | 'fremtid' | 'kunFremtid' | 'kunFremtid' | 'fortidFremtid' => {
    if (
        omsorgstilbud?.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.YES &&
        (omsorgstilbud?.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.NO ||
            omsorgstilbud?.erIOmsorgstilbudFremtid === undefined)
    )
        return 'fortid';

    if (
        omsorgstilbud?.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.YES &&
        omsorgstilbud?.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.DO_NOT_KNOW
    )
        return 'fortidFremtidUsiker';

    if (
        omsorgstilbud?.erIOmsorgstilbudFortid === YesOrNoOrDoNotKnow.NO &&
        omsorgstilbud?.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.YES
    )
        return 'fremtid';

    if (
        omsorgstilbud?.erIOmsorgstilbudFortid === undefined &&
        omsorgstilbud?.erIOmsorgstilbudFremtid === YesOrNoOrDoNotKnow.YES
    )
        return 'kunFremtid';

    return 'fortidFremtid';
};
