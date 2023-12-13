import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const fraværStepMessages: MessageFileFormat = {
    nb: {
        'step.fravaer.counsellorpanel.content':
            'I de fleste tilfeller må man som selvstendig næringsdrivende og frilanser betale de 10 første dager med omsorgspenger i året selv.',
        'step.fravaer.dager_med_fullt_fravært.label': 'Dager med fullt fravær',
        'step.fravaer.dager_med_fullt_fravært.info': 'TODO',
        'step.fravaer.dager_med_delvis_fravært.label': 'Dager med delvis fravær',
        'step.fravaer.dager_med_delvis_fravært.info': 'TODO',
        'step.fravaer.har_du_oppholdt_deg_i_utlandet_for_dager_du_soker_ok.spm':
            'Har du vært i utlandet noen av dagene du søker omsorgspenger for?',

        'step.fravaer.info.1':
            'Du kan få utbetalt omsorgspenger for bruk av omsorgsdager i opptil tre måneder tilbake i tid, regnet fra måneden før NAV mottok søknad fra deg.',
        'step.fravaer.info.2':
            'Du kan kun søke om utbetaling fra ett og samme år. Det betyr at hvis du skal søke om utbetaling for {forrigeÅr} i tillegg til {inneværendeÅr}, må du sende to søknader.',

        'step.fravaer.spm.harPerioderMedFravær': 'Har du hatt hele dager med fravær fra jobb?',
        'step.fravaer.dager.tittel': 'Omsorgsdager du søker utbetaling for',
        'step.fravaer.dager.info':
            'Her skal du legge inn dagene du søker utbetaling for. Basert på svarene du har gitt i søknaden, kan du søke utbetaling fra den 11. omsorgsdagen du brukte.',
        'step.fravaer.dager.info.harBarnMedUtvidetRett':
            'Her skal du legge inn dagene du søker utbetaling for. Basert på svarene du har gitt i søknaden, kan du søke utbetaling fra den første omsorgsdagen du brukte.',
        'step.fravaer.harPerioderMedFravær.listTitle': 'Dager med fullt fravær fra jobb',
        'step.fravaer.harPerioderMedFravær.addLabel': 'Legg til dager med fullt fravær fra jobb',
        'step.fravaer.harPerioderMedFravær.modalTitle': 'Dager med fullt fravær fra jobb',
        'fravær.form.periode.tittel': 'Dager du søker utbetaling for',
        'step.fravaer.info.ikkeHelg.tittel': 'Hvorfor kan jeg ikke velge lørdag eller søndag?',
        'step.fravaer.info.ikkeHelg.tekst':
            'Du kan kun få utbetalt omsorgspenger for hverdager, selv om du jobber lørdag eller søndag. Derfor kan du ikke velge lørdag eller søndag som start- eller sluttdato i perioden du legger inn.',
        'step.fravaer.spm.harDagerMedDelvisFravær': 'Har du hatt dager med delvis fravær fra jobb?',

        'step.fravaer.harDagerMedDelvisFravær.listTitle': 'Dager med delvis fravær fra jobb',
        'step.fravaer.harDagerMedDelvisFravær.addLabel': 'Legg til dag med delvis fravær fra jobb',
        'step.fravaer.harDagerMedDelvisFravær.modalTitle': 'Dag med delvis fravær fra jobb',
        'step.fravaer.måVelgeSituasjon': 'Du må velge én av situasjonene over.',
        'step.fravaer.utenlandsopphold.tittel': 'Utenlandsopphold i dagene med fravær',
        'step.fravaer.utenlandsopphold.addLabel': 'Legg til utenlandsopphold',
        'step.fravaer.utenlandsopphold.modalTitle': 'Utenlandsopphold',

        'fravær.antallTimer': 'Antall timer',
        'fravær.time': 'time',
        'fravær.timer': 'timer',
        'fravær.timer.label': 'Timer',
        'fravær.delvis.fjern.fjernDag': 'Fjern dag med delvis fravær ({dato}, {timer})',
        'fravær.delvis.fjern.fjernDagUtenTimer': 'Fjern dag med delvis fravær ({dato}, antall timer ikke valgt)',
        'fravær.delvis.fjern.fjernTimer': 'Fjern dag med delvis fravær (dato ikke valgt, {timer} valgt)',
        'fravær.delvis.fjern.fjernUtenDagOgTimer': 'Fjern dag med delvis fravær (dato og antall timer ikke valgt)',
        'list.fjernKnapp': 'Fjern',
    },
};
