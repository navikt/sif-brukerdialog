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
    if (!selvstendig || selvstendig.harHattInntektSomSN === YesOrNo.NO) {
        return {
            erSN: false,
        };
    }

    const arbeidsforhold = selvstendig.arbeidsforhold
        ? extractArbeidsforholdSøknadsdata(selvstendig.arbeidsforhold)
        : undefined;

    const virksomhet = selvstendig.virksomhet;

    const periodeSomSelvstendigISøknadsperiode =
        selvstendig.harHattInntektSomSN === YesOrNo.YES && selvstendig.virksomhet !== undefined
            ? getPeriodeSomSelvstendigInnenforPeriode(søknadsperiode, selvstendig.virksomhet)
            : undefined;

    if (arbeidsforhold && virksomhet && dayjs(virksomhet.fom).isBefore(søknadsperiode.to, 'day')) {
        return {
            erSN: true,
            erSelvstendigISøknadsperiode: periodeSomSelvstendigISøknadsperiode !== undefined,
            periodeSomSelvstendigISøknadsperiode,
            arbeidsforhold,
            virksomhet,
            harFlereVirksomheter: selvstendig.harFlereVirksomheter === YesOrNo.YES,
            startdato: virksomhet.fom,
        };
    }

    return undefined;
};
