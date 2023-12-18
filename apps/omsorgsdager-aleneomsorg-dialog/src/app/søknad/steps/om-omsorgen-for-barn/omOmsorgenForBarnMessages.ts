import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const omOmsorgenForBarnMessages: MessageFileFormat = {
    nb: {
        'step.omOmsorgenForBarn.dineBarn.seksjonsTittel': 'Dine barn',

        'step.omOmsorgenForBarn.info.spm.andreBarn': 'Har du barn som ikke er registrert her?',
        'step.omOmsorgenForBarn.info.spm.flereBarn': 'Har du flere barn som ikke er registrert her?',
        'step.omOmsorgenForBarn.info.spm.text':
            'Hvis du har barn som ikke er registrert her, kan du legge inn disse selv. Det kan for eksempel være fosterbarn.',

        'step.omOmsorgenForBarn.annetBarnListAndDialog.addLabel': 'Legg til barn',
        'step.omOmsorgenForBarn.annetBarnListAndDialog.listTitle': 'Barn du har lagt til',
        'step.omOmsorgenForBarn.annetBarnListAndDialog.modalTitle': 'Legg til barn',
        'step.omOmsorgenForBarn.formLeggTilBarn.aldersGrenseInfo':
            '(Du kan ikke legge til barn som er 19 år i år eller eldre)',

        'step.omOmsorgenForBarn.aleneomsorg.seksjonsTittel': 'Aleneomsorg',
        'step.omOmsorgenForBarn.form.spm.hvilkeAvBarnaAleneomsorg': 'Kryss av for barn du er alene om omsorgen for:',

        'step.omOmsorgenForBarn.deltBosted.seksjonsTittel': 'Delt fast bosted',
        'step.omOmsorgenForBarn.deltBosted.spm': 'Har du avtale om delt fast bosted for barnet?',
        'step.omOmsorgenForBarn.deltBosted.flereBarn.spm': 'Har du avtale om delt fast bosted for noen av barna?',
        'step.omOmsorgenForBarn.deltBosted.description.tittel': 'Hva er avtale om delt fast bosted?',
        'step.omOmsorgenForBarn.deltBosted.description':
            'Avtale om delt fast bosted er en juridisk avtale i henhold til barneloven §36 og betyr at barnet har fast bosted hos begge foreldrene. Hvis det er avtalt delt fast bosted er ingen av foreldrene alene om omsorgen for barnet, men begge har rett til ordinære omsorgsdager.',
        'step.omOmsorgenForBarn.deltBosted': 'Kryss av for hvilke barn du har delt fast bosted for:',

        'step.omOmsorgenForBarn.form.født': 'Født {dato}',
        'step.omOmsorgenForBarn.form.fødtNavn': 'Født {dato} {navn}',

        'step.omOmsorgenForBarn.alleBarnMedDeltBosted':
            'Hvis du og den andre forelderen har en avtale om delt fast bosted, bor barnet fast hos dere begge. I disse tilfellene kan ingen av dere få ekstra dager på grunn av aleneomsorg, men dere har begge rett til ordinære omsorgsdager.',
        'step.omOmsorgenForBarn.ingenbarn': 'Du må ha minst ett barn for å kunne gå videre.',
        'step.omOmsorgenForBarn.nextButtonLabel': 'Fortsett',

        'validation.avtaleOmDeltBosted.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om har du avtale om delt fast bosted.',
        'validation.harAvtaleOmDeltBostedFor.listIsEmpty':
            'Du må krysse av for barn du har delt fast bosted for eller svare «Nei» på spørsmålet ovenfor.',
        'validation.harAleneomsorgFor.listIsEmpty': 'Du må krysse av for barn du er alene om omsorgen for.',
    },
};
