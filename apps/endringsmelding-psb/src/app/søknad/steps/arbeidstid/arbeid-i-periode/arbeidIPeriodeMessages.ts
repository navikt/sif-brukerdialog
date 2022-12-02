import { IntlShape } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

const arbeidIPeriodeMessages = {
    nb: {
        'arbeidIPeriode.tittel': `Periode med jobb - {arbeidsstedNavn}`,
        'arbeidIPeriode.submitButtonLabel': 'Ok',
        'arbeidIPeriode.cancelButtonLabel': 'Avbryt',
        'arbeidIPeriode.periode.tittel': 'Velg hvilken periode ønsker du å endre',
        'arbeidIPeriode.fraOgMed.label': 'Fra og med',
        'arbeidIPeriode.tilOgMed.label': 'Til og med',
        'arbeidIPeriode.erLiktHverUke.spm': 'Jobber du like mye hver uke {hvor} i perioden?',
        'arbeidIPeriode.erLiktHverUke.prosent.spm': 'Jobber du like mye hver uke {hvor} i perioden?',
        'arbeidIPeriode.erLiktHverUke.timer.spm': 'Jobber du like mange timer hver uke {hvor} i perioden?',
        'arbeidIPeriode.erLiktHverUke.ja': 'Ja',
        'arbeidIPeriode.erLiktHverUke.nei': 'Nei, det varierer',
        'arbeidIPeriode.arbeiderIPerioden.JA': 'Ja',
        'arbeidIPeriode.arbeiderIPerioden.NEI': 'Nei',
        'arbeidIPeriode.timerEllerProsent.spm': 'Hvordan vil du oppgi hvor mye du jobber {hvor}?',
        'arbeidIPeriode.iDag.utledet': 'timer i uka',
        'arbeidIPeriode.timerEllerProsent.timer': 'I timer',
        'arbeidIPeriode.timerEllerProsent.prosent': 'I prosent',
        'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',
        'arbeidIPeriode.prosentAvNormalt.delvisUker.spm': 'Hvor mange prosent jobber du {hvor} i søknadsperioden?',
        'arbeidIPeriode.timerAvNormalt.delvisUker.spm':
            'Hvor mange timer jobber du hver hele uke {hvor} i søknadsperioden?',
        'arbeidIPeriode.prosentAvNormalt.spm': 'Hvor mange prosent jobber du {hvor} i søknadsperioden?',
        'arbeidIPeriode.timerAvNormalt.spm': 'Hvor mange timer jobber du hver uke {hvor} i søknadsperioden?',
        'arbeidIPeriode.ulikeUkerGruppe.timer.spm': 'Hvor mange timer jobber du {hvor} i perioden?',
        'arbeidIPeriode.ulikeUkerGruppe.prosent.spm': 'Hvor mange prosent jobber du {hvor} i perioden?',
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
