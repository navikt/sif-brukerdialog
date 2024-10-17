import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { VirksomhetApiData } from '@navikt/sif-common-forms-ds/src/forms/virksomhet/types';
import { durationToDecimalDuration, ISODurationToDuration, summarizeDurations } from '@navikt/sif-common-utils';
import { isEqual } from 'lodash';
import { StepID } from '../types/StepID';
import { OmsorgstilbudApiData, SøknadApiData, TimerFasteDagerApiData } from '../types/søknad-api-data/SøknadApiData';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { søkerKunHelgedager } from '../utils/formValuesUtils';
import { AppIntlShape } from '../i18n';
import { getAttachmentsApiData } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';

export const apiVedleggIsInvalid = (apiVedlegg: string[], vedlegg: Attachment[]) => {
    const apiVedleggFromSøknadsdata = vedlegg ? getAttachmentsApiData(vedlegg) : [];
    return !isEqual(apiVedleggFromSøknadsdata.sort(), apiVedlegg.sort());
};
export interface ApiValidationError {
    stepId: StepID;
    skjemaelementId: string;
    feilmelding: string;
}
export const isVirksomhetRegnskapsførerTelefonnummerValid = (virksomhet: VirksomhetApiData) => {
    const { regnskapsfører } = virksomhet;
    if (regnskapsfører) {
        return /^[\w+\s()]+$/.test(regnskapsfører.telefon);
    }
    return true;
};

const isUkedagerValid = (ukedager?: TimerFasteDagerApiData) => {
    if (ukedager === undefined) {
        return false;
    }
    const ukedagerArray = [
        ukedager.mandag ? ISODurationToDuration(ukedager.mandag) : undefined,
        ukedager.tirsdag ? ISODurationToDuration(ukedager.tirsdag) : undefined,
        ukedager.onsdag ? ISODurationToDuration(ukedager.onsdag) : undefined,
        ukedager.torsdag ? ISODurationToDuration(ukedager.torsdag) : undefined,
        ukedager.fredag ? ISODurationToDuration(ukedager.fredag) : undefined,
    ];

    const hoursInTotal = durationToDecimalDuration(summarizeDurations(ukedagerArray));

    if (hoursInTotal === 0 || hoursInTotal > 37.5) {
        return false;
    }
    return true;
};

export const isOmsorgstilbudApiDataValid = (omsorgstilbud: OmsorgstilbudApiData): boolean => {
    if (omsorgstilbud) {
        const { enkeltdager, ukedager, erLiktHverUke } = omsorgstilbud;

        if (erLiktHverUke && isUkedagerValid(ukedager) !== true) {
            return false;
        }
        if (erLiktHverUke === false && (enkeltdager === undefined || enkeltdager.length === 0)) {
            return false;
        }
    }
    return true;
};

export const validateApiValues = (
    values: SøknadApiData,
    formValues: SøknadFormValues,
    { text }: AppIntlShape,
): ApiValidationError[] | undefined => {
    const errors: ApiValidationError[] = [];
    try {
        if (apiVedleggIsInvalid(values.vedlegg, formValues.legeerklæring)) {
            errors.push({
                skjemaelementId: 'vedlegg',
                feilmelding: text('steg.oppsummering.validering.manglerVedlegg'),
                stepId: StepID.LEGEERKLÆRING,
            });
        }

        if (apiVedleggIsInvalid(values.fødselsattestVedleggUrls, formValues.fødselsattest)) {
            errors.push({
                skjemaelementId: 'fødselsattest',
                feilmelding: text('steg.oppsummering.validering.fødselsattest'),
                stepId: StepID.OPPLYSNINGER_OM_BARNET,
            });
        }

        if (søkerKunHelgedager(values.fraOgMed, values.tilOgMed)) {
            errors.push({
                skjemaelementId: 'tidsrom',
                feilmelding: text('steg.oppsummering.validering.tidsromKunHelg'),
                stepId: StepID.TIDSROM,
            });
        }

        if (values.omsorgstilbud && isOmsorgstilbudApiDataValid(values.omsorgstilbud) === false) {
            errors.push({
                skjemaelementId: 'omsorgstilbud',
                feilmelding: text('steg.oppsummering.validering.omsorgstilbud.ugyldig'),
                stepId: StepID.OMSORGSTILBUD,
            });
        }

        if (
            values.nattevåk &&
            values.nattevåk.tilleggsinformasjon &&
            values.nattevåk.tilleggsinformasjon.length > 1000
        ) {
            errors.push({
                skjemaelementId: 'omsorgstilbud',
                feilmelding: text('steg.oppsummering.validering.omsorgstilbud.nattevåkBeskrivelseForLang'),
                stepId: StepID.OMSORGSTILBUD,
            });
        }

        if (
            values.beredskap &&
            values.beredskap.tilleggsinformasjon &&
            values.beredskap.tilleggsinformasjon.length > 1000
        ) {
            errors.push({
                skjemaelementId: 'omsorgstilbud',
                feilmelding: text('steg.oppsummering.validering.omsorgstilbud.beredskapBeskrivelseForLang'),
                stepId: StepID.OMSORGSTILBUD,
            });
        }

        if (values.selvstendigNæringsdrivende.harInntektSomSelvstendig === true) {
            const inntekt = values.selvstendigNæringsdrivende.virksomhet.næringsinntekt;
            if (inntekt !== undefined && inntekt > 10000000) {
                errors.push({
                    skjemaelementId: 'arbeidssituasjon',
                    feilmelding: text('steg.oppsummering.validering.arbeidssituasjon.sn.forHøyInntekt'),
                    stepId: StepID.ARBEIDSSITUASJON,
                });
            }
            const varigEndringInntekt = values.selvstendigNæringsdrivende.virksomhet.varigEndring?.inntektEtterEndring;
            if (varigEndringInntekt !== undefined && varigEndringInntekt > 10000000) {
                errors.push({
                    skjemaelementId: 'arbeidssituasjon',
                    feilmelding: text('steg.oppsummering.validering.arbeidssituasjon.sn.forHøyInntekt'),
                    stepId: StepID.ARBEIDSSITUASJON,
                });
            }
        }
    } catch {
        /* empty */
    }

    return errors.length > 0 ? errors : undefined;
};
