import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { SelvstendigFormData } from '../../types/_SelvstendigFormData';
import { ArbeidssituasjonSelvstendigSøknadsdata } from '../../types/søknadsdata/_ArbeidssituasjonSelvstendigSøknadsdata';
import { getPeriodeSomSelvstendigInnenforPeriode } from '../selvstendigUtils';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';

export const extractArbeidssituasjonSelvstendigSøknadsdata = (
    søknadsperiode: DateRange,
    selvstendig: SelvstendigFormData
): ArbeidssituasjonSelvstendigSøknadsdata | undefined => {
    if (!selvstendig || selvstendig.harHattInntektSomSN === YesOrNo.UNANSWERED) {
        return undefined;
    }

    if (!selvstendig || selvstendig.harHattInntektSomSN === YesOrNo.NO) {
        return {
            erSN: false,
        };
    }

    const periodeSomSelvstendigISøknadsperiode =
        selvstendig.harHattInntektSomSN === YesOrNo.YES && selvstendig.virksomhet !== undefined
            ? getPeriodeSomSelvstendigInnenforPeriode(søknadsperiode, selvstendig.virksomhet)
            : undefined;

    const virksomhet = selvstendig.virksomhet;
    const normalarbeidstid = extractNormalarbeidstid(selvstendig.arbeidsforhold?.normalarbeidstid);

    if (virksomhet && normalarbeidstid && dayjs(virksomhet.fom).isBefore(søknadsperiode.to, 'day')) {
        return {
            erSN: true,
            periodeSomSelvstendigISøknadsperiode,
            virksomhet,
            harFlereVirksomheter: selvstendig.harFlereVirksomheter === YesOrNo.YES,
            normalarbeidstid,
        };
    }

    return undefined;
};
