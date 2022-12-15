import { IntlShape } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

const arbeidIPeriodeMessages = {
    nb: {
        'arbeidIPeriode.tittel': `Periode med jobb - {arbeidsstedNavn}`,
        'arbeidIPeriode.submitButtonLabel': 'Ok',
        'arbeidIPeriode.cancelButtonLabel': 'Avbryt',
        'arbeidIPeriode.periode.tittel': 'Velg hvilke uker du ønsker du å endre',
        'arbeidIPeriode.fraOgMed.label': 'Fra uke',
        'arbeidIPeriode.tilOgMed.label': 'Til og med uke',
        'arbeidIPeriode.arbeiderIPerioden.JA': 'Ja',
        'arbeidIPeriode.arbeiderIPerioden.NEI': 'Nei',
        'arbeidIPeriode.timerEllerProsent.spm': 'Hvordan vil du oppgi hvor mye du jobber?',
        'arbeidIPeriode.iDag.utledet': 'timer i uka',
        'arbeidIPeriode.timerEllerProsent.timer': 'I timer',
        'arbeidIPeriode.timerEllerProsent.prosent': 'I prosent',
        'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
        'arbeidIPeriode.prosentAvNormalt.spm': 'Hvor mange prosent av normalt {timerNormalt} jobber du denne uken?',
        'arbeidIPeriode.timerAvNormalt.spm': 'Hvor mange timer jobber i denne uken?',
        'arbeidIPeriode.uke.ukenummer': 'Uke {ukenummer}',
        'arbeidIPeriode.uke.ukedatoer': '{ukedatoer}',
    },
};

const arbeidIPeriodeIntlValuesMessages = {
    nb: {
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.harJobbet': 'har jobbet',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe': 'skal jobbe',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt': `hos {arbeidsstedNavn}`,
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser': 'som frilanser',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN': 'som selvstendig næringsdrivende',
        'arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden': `i perioden {fra} til {til}`,
    },
};

export const arbeidstidPeriodeMessages = {
    nb: {
        ...arbeidIPeriodeMessages.nb,
        ...arbeidIPeriodeIntlValuesMessages.nb,
        'arbeidstidPeriodeDialog.contentLabel': 'Registrer jobb for en periode',
        'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timer}}',
        'arbeidstidPeriode.timer.ikkeTall': `{timer} timer`,
    },
};

type ArbeidstidPeriodeMessagesType = keyof typeof arbeidstidPeriodeMessages.nb;

export const getArbeidstidPeriodeIntl = (intl: IntlShape) => typedIntlHelper<ArbeidstidPeriodeMessagesType>(intl);
