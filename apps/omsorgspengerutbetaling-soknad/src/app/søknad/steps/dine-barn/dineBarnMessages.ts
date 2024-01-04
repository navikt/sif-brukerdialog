import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const dineBarnMessages: MessageFileFormat = {
    nb: {
        'step.dineBarn.nextButtonLabel': 'Fortsett',
        'step.dineBarn.intro.1':
            'Når du ser selvstendig næringsdrivende eller frilanser, må du som hovedregel selv dekke de 10 første omsorgsdagene du bruker hvert kalenderår. Du kan altså ha rett til utbetaling av omsorgspenger fra den 11. dagen per kalenderår. ',
        'step.dineBarn.intro.info.tittel': 'Hvem har rett på omsorgspenger fra 1. fraværsdag?',
        'step.dineBarn.intro.info.tekst': '[TODO]',

        'step.dineBarn.seksjonsTittel': 'Dine barn',
        'step.dineBarn.født': 'Født {dato}',

        'step.dineBarn.annetBarnListAndDialog.addLabel': 'Legg til barn',
        'step.dineBarn.annetBarnListAndDialog.listTitle': 'Har du barn som ikke er registrert her?',
        'step.dineBarn.annetBarnListAndDialog.modalTitle': 'Legg til barn',

        'step.dineBarn.utvidetRettSykdom.spm':
            'Har du søkt om eller fått ekstra omsorgsdager fordi du har barn som er kronisk sykt, funksjonshemmet eller langvarig sykt?',
        'step.dineBarn.utvidetRettSykdom.spm.ettBarn':
            'Har du søkt om eller fått ekstra omsorgsdager fordi barnet er kronisk sykt, funksjonshemmet eller langvarig sykt?',

        'step.dineBarn.utvidetRettAleneomsorg.spm':
            'Har du søkt om ekstra omsorgsdager fordi du er alene om omsorgen for ett eller flere barn?',

        'step.dineBarn.utvidetRettSykdom.nei.alertStripe':
            'Når du kun har barn som er 13 år i år eller eldre, må du ha søkt om eller fått ekstra omsorgsdager for å kunne søke om utbetaling.',
        'step.dineBarn.utvidetRettFor.spm': 'Velg barn du har søkt om eller fått ekstra omsorgsdager for:',
        'step.dineBarn.utvidetRettFor.info':
            'Du kan ha rett til utbetaling fra NAV fra den første omsorgsdagen du brukte. Dette er fordi du kun har barn som er 13 år i år eller eldre, og som du har søkt om eller fått ekstra omsorgsdager for. Fortsett til neste steg for å legge inn dagene du søker om utbetaling for.',
        'step.dineBarn.utvidetRettFor.info.ettBarn':
            'Du kan ha rett til utbetaling fra NAV fra den første omsorgsdagen du brukte. Dette er fordi du kun har barn som er 13 år i år eller eldre, og som du har søkt om eller fått ekstra omsorgsdager for. Fortsett til neste steg for å legge inn dagene du søker om utbetaling for.',

        'step.dineBarn.bekrefterDektTiDagerSelv.info.titel': 'Omsorgsdager du må dekke selv',
        'step.dineBarn.bekrefterDektTiDagerSelv.spm': 'Har du dekket de 10 første omsorgsdagene i år?',

        'step.dineBarn.info.ingenbarn.1':
            'Vi fant ingen barn registrert på deg. Har du  barn som ikke er registrert her, kan du selv legge inn disse. Dette kan være fosterbarn, eller om du har barn som er fylt 18 år og som har ekstra omsorgsdager på grunn av kronisk sykdom eller funksjonshemning.',
        'step.dineBarn.info.ingenbarn.2': 'Du må registrere minst ett barn for å kunne gå videre i søknaden.',

        'step.dineBarn.info.spm.text':
            'Hvis du har barn som ikke er registrert her, kan du legge inn disse selv. Det kan for eksempel være fosterbarn.',
        'step.dineBarn.formLeggTilBarn.aldersGrenseInfo': '(Du kan ikke legge til barn som er 19 år eller eldre)',

        'relasjonTilBarnet.mor': 'Mor',
        'relasjonTilBarnet.far': 'Far',
        'relasjonTilBarnet.adoptivforelder': 'Adoptivforelder',
        'relasjonTilBarnet.fosterforelder': 'Fosterforelder',
    },
};
