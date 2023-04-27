import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const appMessages: MessageFileFormat = {
    nb: {
        'application.title': 'Søknad om ekstra omsorgsdager ved aleneomsorg for barn',
        'application.bannerTitle': 'Søknad om ekstra omsorgsdager ved aleneomsorg for barn',

        'application.loadError.title': 'Noe gikk galt ...',
        'application.loadError.message':
            'Beklager, her har det dessverre skjedd en feil. Dersom feilen fortsetter, prøv igjen litt senere.',

        'page.error.pageTitle': 'Noe gikk galt ...',
        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre, må du svare på alle spørsmålene ovenfor',

        'page.ikkeTilgang.sidetittel': 'Søknad om å bli regnet som alene om omsorgen for barn',
        'page.ikkeTilgang.tekst':
            'Du har ikke tilgang til denne siden. Dersom du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',

        'avbrytSøknadDialog.avbrytSøknadLabel': 'Ja, avbryt søknad',
        'avbrytSøknadDialog.fortsettSøknadLabel': 'Nei',
        'avbrytSøknadDialog.intro':
            'Det du har fylt ut i søknaden blir slettet, og du kommer tilbake til velkomstsiden.',
        'avbrytSøknadDialog.spørsmål': 'Ønsker du å slette søknaden?',
        'avbrytSøknadDialog.tittel': 'Avbryt og slett søknad',

        'fortsettSøknadSenereDialog.avbrytSøknadLabel': 'Ja, fortsett senere',
        'fortsettSøknadSenereDialog.fortsettSøknadLabel': 'Nei',
        'fortsettSøknadSenereDialog.intro':
            'Vi lagrer det du har fylt ut i 72 timer. Når du vil fortsette, starter du bare søknaden på nytt.',
        'fortsettSøknadSenereDialog.spørsmål': 'Vil du avslutte nå og fortsette senere?',
        'fortsettSøknadSenereDialog.tittel': 'Avslutt og fortsett senere',

        'steg.footer.avbryt': 'Avbryt og slett søknad',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        arbeidstaker: 'arbeidstaker',

        'validationText.mindre_5_bokstaver': 'Du må skrive minst 5 tegn',
        'validationText.mer_1000_bokstaver': 'Du kan skrive max 1000 tegn',
        'validationText.barn_ikke_registrert': 'Du må legge til minst ett barn for å fortsette',

        Fødselsnummer: 'Fødselsnummer',

        'backlink.label': 'Tilbake',

        hvaBetyrDette: 'Hva betyr dette?',

        lesMerOmFastBostedOgSamvær: 'Les mer om fast bosted og samvær',

        'step.velkommen.button.start': 'Fortsett',

        'step.om-barn.fødselsnummer': 'Fødselsnummer',
        'step.om-barn.nextButtonLabel': 'Fortsett',
        'step.om-barn.hvorMangeBarn.spm': 'Hvor mange felles barn har dere? Inkludert eventuelle fosterbarn',
        'step.om-barn.hvorforSpører.svar':
            'Vi trenger å vite alderen på barn for å kunne beregne hvor mange omsorgsdager du kan ha rett på og hvor lenge du har rett til å bruke omsorgsdager.',

        'step.om-omsorgen-for-barn.pageTitle': 'Om aleneomsorg for barn',
        'step.omOmsorgenForBarn.pageTitle': 'Om aleneomsorg for barn',
        'step.om-omsorgen-for-barn.stepTitle': 'Om aleneomsorg for barn',
        'step.omOmsorgenForBarn.stepTitle': 'Om aleneomsorg for barn',
        'step.om-omsorgen-for-barn.stepIntro.1':
            'Når det gjelder omsorgsdager er du alene om omsorgen når barnet bor fast hos deg, og du ikke bor med den andre forelderen. Det kan for eksempel være på grunn av samlivsbrudd, at du er blitt enke/enkemann, eller at du er alene med et donorbarn.',
        'step.om-omsorgen-for-barn.stepIntro.2': 'At barnet bor fast hos deg vil si at',
        'step.om-omsorgen-for-barn.stepIntro.2.list.item.1': 'barnet har folkeregistrert adresse hos deg, og',
        'step.om-omsorgen-for-barn.stepIntro.2.list.item.2':
            'du og den andre forelderen ikke har avtale om delt bosted.',

        'step.om-omsorgen-for-barn.dineBarn.seksjonsTittel': 'Dine barn',

        'step.om-omsorgen-for-barn.info.spm.andreBarn': 'Har du barn som ikke er registrert her?',
        'step.om-omsorgen-for-barn.info.spm.flereBarn': 'Har du flere barn som ikke er registrert her?',
        'step.om-omsorgen-for-barn.info.spm.text':
            'Hvis du har barn som ikke er registrert her, kan du legge inn disse selv. Det kan for eksempel være fosterbarn.',

        'step.om-omsorgen-for-barn.annetBarnListAndDialog.addLabel': 'Legg til barn',
        'step.om-omsorgen-for-barn.annetBarnListAndDialog.listTitle': 'Barn du har lagt til',
        'step.om-omsorgen-for-barn.annetBarnListAndDialog.modalTitle': 'Legg til barn',
        'step.om-omsorgen-for-barn.formLeggTilBarn.aldersGrenseInfo':
            '(Du kan ikke legge til barn som er 19 år i år eller eldre)',

        'step.om-omsorgen-for-barn.aleneomsorg.seksjonsTittel': 'Aleneomsorg',
        'step.om-omsorgen-for-barn.form.spm.hvilkeAvBarnaAleneomsorg': 'Kryss av for barn du er alene om omsorgen for:',

        'step.om-omsorgen-for-barn.deltBosted.seksjonsTittel': 'Delt bosted',
        'step.om-omsorgen-for-barn.deltBosted.spm': 'Har du avtale om delt bosted for barnet?',
        'step.om-omsorgen-for-barn.deltBosted.flereBarn.spm': 'Har du avtale om delt bosted for noen av barna?',
        'step.om-omsorgen-for-barn.deltBosted.description.tittel': 'Hva er avtale om delt bosted?',
        'step.om-omsorgen-for-barn.deltBosted.description':
            'Avtale om delt bosted er en juridisk avtale i henhold til barneloven §36 og betyr at barnet har fast bosted hos begge foreldrene. Hvis det er avtalt delt bosted er ingen av foreldrene alene om omsorgen for barnet, men begge har rett til ordinære omsorgsdager.',
        'step.om-omsorgen-for-barn.deltBosted': 'Kryss av for hvilke barn du har delt bosted for:',

        'step.om-omsorgen-for-barn.form.født': 'Født',
        'step.om-omsorgen-for-barn.alleBarnMedDeltBosted':
            'Hvis du og den andre forelderen har en avtale om delt bosted, bor barnet fast hos dere begge. I disse tilfellene kan ingen av dere få ekstra dager på grunn av aleneomsorg, men dere har begge rett til ordinære omsorgsdager.',
        'step.om-omsorgen-for-barn.ingenbarn': 'Du må ha minst ett barn for å kunne gå videre.',
        'step.om-omsorgen-for-barn.nextButtonLabel': 'Fortsett',

        'step.tidspunktForAleneomsorg.pageTitle': 'Tidspunkt for aleneomsorg',
        'step.tidspunktForAleneomsorg.stepTitle': 'Tidspunkt for aleneomsorg',

        'step.tidspunkt-for-aleneomsorg.stepIntro':
            'Nå trenger vi å vite når du ble alene om omsorgen for barn. Hvis du ble alene om omsorgen tidligere enn i fjor trenger vi ikke å vite konkret dato.',
        'step.tidspunkt-for-aleneomsorg.info': 'Oppgi tidspunkt for når du ble alene om omsorgen',
        'step.tidspunkt-for-aleneomsorg.spm': 'Hvilket år ble du alene om omsorgen for {navn}?',
        'step.tidspunkt-for-aleneomsorg.radioPanelGroupLabel.siste2årene': 'I {yearAgo} eller {yearNow}',
        'step.tidspunkt-for-aleneomsorg.radioPanelGroupLabel.tidligere': 'I {twoYearsAgo} eller tidligere',
        'step.tidspunkt-for-aleneomsorg.siste2årene.dato.spm': 'Hvilken dato ble du alene om omsorgen for {navn}?',
        'step.tidspunkt-for-aleneomsorg.nextButtonLabel': 'Fortsett',

        'step.oppsummering.pageTitle': 'Oppsummering',
        'step.oppsummering.stepTitle': 'Oppsummering',
        'step.oppsummering.nextButtonLabel': 'Send søknad',
        'step.oppsummering.info':
            'Les gjennom oppsummeringen og sjekk at alt er riktig før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',

        'step.oppsummering.søker.header': 'Om deg',
        'step.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',
        'step.oppsummering.deres-felles-barn.header': 'Barn',
        'step.oppsummering.deres-felles-barn.barn': 'Barn',
        'step.oppsummering.dineBarn.listItem.FOSTERBARN': '(Barnet er mitt fosterbarn).',

        'step.oppsummering.om-omsorgen-for-barn.barnList.tittle': 'Barn du er alene om omsorgen for',
        'step.oppsummering.om-omsorgen-for-barn.harOmsorgFor.tidspunktForAleneomsorg':
            'Tidspunkt for aleneomsorg: {dato}',
        'step.oppsummering.om-omsorgen-for-barn.harOmsorgFor.tidspunktForAleneomsorg.tidligere':
            'Du ble alene om omsorgen for over 2 år siden.',

        'step.oppsummering.bekrefterOpplysninger':
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgsdager.',

        'step.oppsummering.sendMelding.feilmelding.førsteGang':
            'Det oppstod en feil under innsending. Vennligst prøv på nytt.',
        'step.oppsummering.sendMelding.feilmelding.andreGang':
            'Det oppstod fortsatt en feil under innsending. Vennligst vent litt og prøv på nytt.',

        'samtykke.tekst': 'Jeg bekrefter at jeg har lest og forstått',
        'samtykke.harIkkeGodkjentVilkår': 'Du må godkjenne vilkårene',
        'samtykke.harForståttLabel': 'For å gå videre må du bekrefte at du har lest og forstått {plikterLink}.',
        'samtykke.harForståttLabel.lenketekst': 'dine plikter',
        'fieldvalidation.mottakersFnrErSøkersFnr': 'Du har tastet inn ditt eget fødselsnummer',

        'validation.harForståttRettigheterOgPlikter.notChecked':
            'Du må bekrefte at du har lest og forstått dine plikter.',
        'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene du har gitt er riktige.',
        'validation.avtaleOmDeltBosted.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om har du avtale om delt bosted.',
        'validation.harAvtaleOmDeltBostedFor.listIsEmpty':
            'Du må krysse av for barn du har delt bosted for eller svare «Nei» på spørsmålet ovenfor.',
        'validation.harAleneomsorgFor.listIsEmpty': 'Du må krysse av for barn du er alene om omsorgen for.',
        'validation.tidspunktForAleneomsorg.noValue': 'Du må oppgi hvilket år du ble alene om omsorgen for barnet.',
        'validation.tidspunktForAleneomsorg.dato.dateHasNoValue':
            'Du må oppgi hvilken dato du ble alene om omsorgen for barnet.',
        'validation.tidspunktForAleneomsorg.dato.dateIsAfterMax': 'Du må oppgi dagensdato eller tidligere.',
        'validation.tidspunktForAleneomsorg.dato.dateIsBeforeMin':
            'Du kan ikke oppgi dato tidligere enn to år fra dagensår.',
        'validation.tidspunktForAleneomsorg.dato.dateHasInvalidFormat':
            'Datoen når du ble du alene om omsorgen for barnet er ugyldig. Gyldig format er dd.mm.åååå.',
    },
};
