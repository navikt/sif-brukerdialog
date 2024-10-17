import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { SituasjonFormFields, SituasjonFormValues } from '../søknad/steps/situasjon/SituasjonStep';
import { Utbetalingsårsak } from '../types/ArbeidsforholdTypes';

export const getAlleVedleggFraSøknadsdata = (søknadsdata: Søknadsdata) => {
    const bostedVedlegg = søknadsdata.deltBosted?.vedlegg ?? [];
    const legeerklæringer = søknadsdata.legeerklæring?.vedlegg ?? [];
    const situasjonVedlegg: Attachment[] = [];

    const { situasjon } = søknadsdata;
    if (situasjon) {
        Object.keys(situasjon).forEach((key) => {
            const s = situasjon[key];
            if (s.type === 'harHattFraværUtenLønnKonfliktMedArbeidsgiver') {
                situasjonVedlegg.push(...s.dokumenter);
            }
        });
    }
    return {
        bostedVedlegg,
        legeerklæringer,
        situasjonVedlegg,
        alleVedlegg: [...bostedVedlegg, ...legeerklæringer, ...situasjonVedlegg],
    };
};

export const getAlleVedleggFraSituasjonFormValues = (formValues: Partial<SituasjonFormValues>): Attachment[] => {
    const situasjonVedlegg: Attachment[] = [];
    const arbeidsforhold = formValues[SituasjonFormFields.arbeidsforhold] || [];
    arbeidsforhold.forEach((a) => {
        if (a.dokumenter && a.utbetalingsårsak === Utbetalingsårsak.konfliktMedArbeidsgiver) {
            situasjonVedlegg.push(...a.dokumenter);
        }
    });

    return situasjonVedlegg;
};
