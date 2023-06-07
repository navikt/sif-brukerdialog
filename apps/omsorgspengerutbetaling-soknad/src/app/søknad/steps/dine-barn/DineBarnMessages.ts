import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const dineBarnMessages: MessageFileFormat = {
    nb: {
        'step.dine-barn.nextButtonLabel': 'Fortsett',
        'step.dine-barn.counsellorPanel.avsnitt.1':
            'Når du er selvstendig næringsdrivende eller frilanser, må du som hovedregel selv dekke de 10 første omsorgsdagene du bruker hvert kalenderår. Du kan altså ha rett til utbetaling av omsorgspenger fra den 11. dagen per kalenderår. De 10 første dagene som du skal dekke selv, trenger ikke å tas ut sammenhengende.',
        'step.dine-barn.counsellorPanel.avsnitt.2':
            'Du kan ha rett til utbetaling fra den første dagen når du kun har barn som fyller 13 år i år eller er eldre, og som har kronisk sykdom eller funksjonshemning. Dette gjelder bare når du har søkt og fått ekstra omsorgsdager for barn i denne situasjonen.',

        'step.dine-barn.seksjonsTittel': 'Dine barn',
        'step.dine-barn.født': 'Født {dato}',

        'step.dine-barn.annetBarnListAndDialog.addLabel': 'Legg til barn',
        'step.dine-barn.annetBarnListAndDialog.listTitle': 'Barn du har lagt til',
        'step.dine-barn.annetBarnListAndDialog.modalTitle': 'Legg til barn',

        'step.dine-barn.harFåttEkstraOmsorgsdager.label': 'Ekstra omsorgsdager',
        'step.dine-barn.harFåttEkstraOmsorgsdager.spm':
            'Har du fått ekstra omsorgsdager for barn som har kronisk sykdom eller funksjonshemning?',
        'step.dine-barn.harFåttEkstraOmsorgsdager.spm.ettBarn':
            'Har du fått ekstra omsorgsdager for barnet på grunn av kronisk sykdom eller funksjonshemning?',

        'step.dine-barn.harFåttEkstraOmsorgsdager.nei.alertStripe':
            'Du har ikke rett til å bruke omsorgsdager. Når du kun har barn som er 13 år i år eller eldre, må du ha søkt om og fått ekstra omsorgsdager for å kunne bruke omsorgsdager.',
        'step.dine-barn.utvidetRettFor.spm': 'Kryss av for barn du har fått ekstra omsorgsdager for:',
        'step.dine-barn.utvidetRettFor.info':
            'Du kan ha rett til utbetaling fra NAV fra den første omsorgsdagen du brukte. Dette er fordi du kun har barn som er 13 år i år eller eldre, og som du har fått ekstra omsorgsdager for. Gå videre til neste steg og legg inn dagene du vil søke utbetaling for.',
        'step.dine-barn.utvidetRettFor.info.ettBarn':
            'Du kan ha rett til utbetaling fra NAV fra den første omsorgsdagen du brukte. Dette er fordi du kun har barn som er 13 år i år eller eldre, og som du har fått ekstra omsorgsdager for. Gå videre til neste steg og legg inn dagene du vil søke utbetaling for.',

        'step.dine-barn.bekrefterDektTiDagerSelv.info.titel': 'Omsorgsdager du må dekke selv',
        'step.dine-barn.bekrefterDektTiDagerSelv.info':
            'Når du har barn som har fylt 12 år i år, eller er yngre, må du dekke de 10 første omsorgsdagene du bruker hvert kalenderår. Du kan søke om utbetaling fra NAV fra den 11. dagen.',
        'step.dine-barn.bekrefterDektTiDagerSelv.label':
            'For å gå videre må du bekrefte at du har dekket 10 omsorgsdager i år:',
        'step.dine-barn.bekrefterDektTiDagerSelv': 'Ja, jeg bekrefter at jeg har dekket 10 omsorgsdager i år.',

        'step.dine-barn.info.ingenbarn.1':
            'Vi fant ingen barn registrert på deg. Har du  barn som ikke er registrert her, kan du selv legge inn disse. Dette kan være fosterbarn, eller om du har barn som er fylt 18 år og som har ekstra omsorgsdager på grunn av kronisk sykdom eller funksjonshemning.',
        'step.dine-barn.info.ingenbarn.2': 'Du må registrere minst ett barn for å kunne gå videre i søknaden.',
        'step.dine-barn.info.spm.andreBarn': 'Har du barn som ikke er registrert her?',
        'step.dine-barn.info.spm.flereBarn': 'Har du flere barn som ikke er registrert her?',
        'step.dine-barn.info.spm.text':
            'Hvis du har barn som ikke er registrert her, kan du legge inn disse selv. Det kan for eksempel være fosterbarn.',
        'step.dine-barn.formLeggTilBarn.aldersGrenseInfo': '(Du kan ikke legge til barn som er 19 år eller eldre)',

        'relasjonTilBarnet.mor': 'Mor',
        'relasjonTilBarnet.far': 'Far',
        'relasjonTilBarnet.adoptivforelder': 'Adoptivforelder',
        'relasjonTilBarnet.fosterforelder': 'Fosterforelder',
    },
};
