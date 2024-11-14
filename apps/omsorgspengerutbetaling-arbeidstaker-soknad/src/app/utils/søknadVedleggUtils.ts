import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { SituasjonFormFields, SituasjonFormValues } from '../søknad/steps/situasjon/SituasjonStep';
import { Utbetalingsårsak } from '../types/ArbeidsforholdTypes';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';

export const getAlleVedleggFraSøknadsdata = (søknadsdata: Søknadsdata) => {
    const bostedVedlegg = søknadsdata.deltBosted?.vedlegg ?? [];
    const legeerklæringer = søknadsdata.legeerklæring?.vedlegg ?? [];
    const situasjonVedlegg: Vedlegg[] = [];

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

export const getAlleVedleggFraSituasjonFormValues = (formValues: Partial<SituasjonFormValues>): Vedlegg[] => {
    const situasjonVedlegg: Vedlegg[] = [];
    const arbeidsforhold = formValues[SituasjonFormFields.arbeidsforhold] || [];
    arbeidsforhold.forEach((a) => {
        if (a.dokumenter && a.utbetalingsårsak === Utbetalingsårsak.konfliktMedArbeidsgiver) {
            situasjonVedlegg.push(...a.dokumenter);
        }
    });

    return situasjonVedlegg;
};
