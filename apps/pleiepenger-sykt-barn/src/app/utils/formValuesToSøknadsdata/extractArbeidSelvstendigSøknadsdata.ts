import { DateRange, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import dayjs from 'dayjs';
import { SelvstendigFormData } from '../../types/SelvstendigFormData';
import { ArbeidSelvstendigSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getPeriodeSomSelvstendigInnenforPeriode } from '../selvstendigUtils';
import { extractArbeidsforholdSøknadsdata } from './extractArbeidsforholdSøknadsdata';

export const extractArbeidSelvstendigSøknadsdata = (
    selvstendig: SelvstendigFormData | undefined,
    søknadsperiode: DateRange
): ArbeidSelvstendigSøknadsdata | undefined => {
    if (!selvstendig || selvstendig.harHattInntektSomSN === YesOrNo.UNANSWERED) {
        return undefined;
    }

    if (!selvstendig || selvstendig.harHattInntektSomSN === YesOrNo.NO) {
        return {
            erSN: false,
        };
    }

    const aktivPeriode =
        selvstendig.harHattInntektSomSN === YesOrNo.YES && selvstendig.virksomhet !== undefined
            ? getPeriodeSomSelvstendigInnenforPeriode(søknadsperiode, selvstendig.virksomhet)
            : undefined;

    const arbeidsforhold =
        selvstendig.arbeidsforhold && aktivPeriode
            ? extractArbeidsforholdSøknadsdata(selvstendig.arbeidsforhold, aktivPeriode)
            : undefined;

    const virksomhet = selvstendig.virksomhet;

    if (arbeidsforhold && virksomhet && dayjs(virksomhet.fom).isBefore(søknadsperiode.to, 'day')) {
        return {
            erSN: true,
            erSelvstendigISøknadsperiode: aktivPeriode !== undefined,
            periodeSomSelvstendigISøknadsperiode: aktivPeriode,
            arbeidsforhold,
            virksomhet,
            harFlereVirksomheter: selvstendig.harFlereVirksomheter === YesOrNo.YES,
            startdato: virksomhet.fom,
        };
    }

    return undefined;
};
