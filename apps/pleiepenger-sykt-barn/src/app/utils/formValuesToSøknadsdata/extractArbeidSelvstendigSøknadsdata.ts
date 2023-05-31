import { DateRange, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import dayjs from 'dayjs';
import { ArbeidsforholdType } from '../../local-sif-common-pleiepenger';
import { SelvstendigFormData } from '../../types/SelvstendigFormData';
import { ArbeidSelvstendigSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { extractArbeidsforholdSøknadsdata } from './extractArbeidsforholdSøknadsdata';

export const extractArbeidSelvstendigSøknadsdata = (
    selvstendig: SelvstendigFormData | undefined,
    søknadsperiode: DateRange
): ArbeidSelvstendigSøknadsdata | undefined => {
    if (!selvstendig || selvstendig.harHattInntektSomSN === YesOrNo.NO) {
        return {
            type: 'erIkkeSN',
            erSN: false,
        };
    }

    const arbeidsforhold = selvstendig.arbeidsforhold
        ? extractArbeidsforholdSøknadsdata(selvstendig.arbeidsforhold, ArbeidsforholdType.SELVSTENDIG)
        : undefined;

    const virksomhet = selvstendig.virksomhet;

    if (arbeidsforhold && virksomhet && dayjs(virksomhet.fom).isBefore(søknadsperiode.to, 'day')) {
        return {
            type: 'erSN',
            erSN: true,
            arbeidsforhold,
            virksomhet,
            harFlereVirksomheter: selvstendig.harFlereVirksomheter === YesOrNo.YES,
            startdato: virksomhet.fom,
        };
    }

    return undefined;
};
