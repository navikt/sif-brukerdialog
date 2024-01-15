import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const fraværStepMessages: MessageFileFormat = {
    nb: {
        'step.fravær.stepIndicatorLabel': 'Hvilke dager søker du utbetaling for?',
        'step.fravær.nextButtonLabel': 'Fortsett',
        'step.fravær.info.1':
            'Her legger du inn dager du har hatt fravær fra jobb, fordi du har vært hjemme med omsorgsdager.',
        'step.fravær.info.2':
            'Du skal <strong>kun legge inn dager du ikke har fått utbetalt lønn</strong> fra arbeidsgiveren din.',
        'step.fravær.heledager.spm': 'Har du hatt hele dager med fravær fra jobb?',
        'step.fravær.heledager.perioderModal.label': 'Legg til ny periode med fullt fravær',
        'step.fravær.heledager.perioderModal.title': 'Fravær hele dager',
        'step.fravær.heledager.perioderModal.begrensTilSammeÅrAlertStripeTekst':
            'Du kan søke kun innenfor ett kalenderår om gangen. Hvis du skal søke for flere år, må du sende en søknad for hvert av årene.',
        'step.fravær.delvisdag.spm': 'Har du hatt dager med delvis fravær fra jobb?',
        'step.fravær.delvisdag.dagModal.label': 'Legg til ny dag med delvis fravær',
        'step.fravær.delvisdag.dagModal.title': 'Fravær deler av dag',
        'step.fravær.info.ikkeHelg.tittel': 'Hvorfor kan jeg ikke velge lørdag eller søndag?',
        'step.fravær.info.ikkeHelg.tekst':
            'Du kan kun få utbetalt omsorgspenger for hverdager, selv om du jobber lørdag eller søndag. Derfor kan du ikke legge inn delvis fravær på lørdager eller søndager.',
        'step.fravær.utenlandsopphold.tittel': 'Utenlandsopphold i dagene med fravær',
        'step.fravær.værtIUtlandet.spm': 'Har du vært i utlandet noen av dagene du søker omsorgspenger for?',
        'step.fravær.værtIUtlandet.leggTilLabel': 'Legg til nytt utenlandsopphold',
        'step.fravær.værtIUtlandet.modalTittel': 'Utenlandsopphold',
    },
};
