import { YesOrNo } from '@navikt/sif-common-core-ds/src/types';
import { ArbeidsgiverType, TimerEllerProsent } from '../../app/types';
import { SøknadFormValues } from '../../app/types/søknad-form-values/SøknadFormValues';
import { ArbeiderIPeriodenSvar } from '../../app/local-sif-common-pleiepenger';
import { YesOrNoOrDoNotKnow } from '../../app/types/YesOrNoOrDoNotKnow';
import { Frilanstype } from '../../app/types/søknad-form-values/FrilansFormValues';

export const formikValues: SøknadFormValues = {
    periodeFra: '2024-05-01',
    periodeTil: '2024-05-26',
    barnetsNavn: '',
    barnetsFødselsnummer: '',
    barnetSøknadenGjelder: '2811762539343',
    harForståttRettigheterOgPlikter: true,
    harBekreftetOpplysninger: true,
    søknadenGjelderEtAnnetBarn: false,
    barnetHarIkkeFnr: false,
    fødselsattest: [],
    legeerklæring: [],
    ansatt_arbeidsforhold: [
        {
            arbeidsgiver: {
                type: ArbeidsgiverType.ORGANISASJON,
                id: '947064649',
                organisasjonsnummer: '947064649',
                navn: 'SJOKKERENDE ELEKTRIKER',
                ansattFom: new Date('2002-04-20T00:00:00.000Z'),
            },
            erAnsatt: YesOrNo.YES,
            normalarbeidstid: {
                timerPerUke: '20',
            },
            arbeidIPeriode: {
                arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
            },
        },
    ],
    harBoddUtenforNorgeSiste12Mnd: YesOrNo.NO,
    utenlandsoppholdSiste12Mnd: [],
    skalBoUtenforNorgeNeste12Mnd: YesOrNo.NO,
    utenlandsoppholdNeste12Mnd: [],
    skalOppholdeSegIUtlandetIPerioden: YesOrNo.NO,
    utenlandsoppholdIPerioden: [],
    skalTaUtFerieIPerioden: YesOrNo.NO,
    ferieuttakIPerioden: [],
    omsorgstilbud: {
        erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.YES,
        erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.YES,
        erLiktHverUke: YesOrNo.YES,
        fasteDager: {
            monday: {
                hours: '2',
                minutes: '0',
            },
            wednesday: {
                hours: '2',
                minutes: '0',
            },
        },
    },
    harNattevåk: YesOrNo.NO,
    harBeredskap: YesOrNo.NO,
    frilans: {
        harHattInntektSomFrilanser: YesOrNo.YES,
        frilanstype: Frilanstype.HONORAR,
        misterHonorar: YesOrNo.YES,
        startetFørSisteTreHeleMåneder: YesOrNo.YES,
        erFortsattFrilanser: YesOrNo.YES,
        arbeidsforhold: {
            normalarbeidstid: {
                timerPerUke: '10',
            },
            arbeidIPeriode: {
                arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                erLiktHverUke: YesOrNo.YES,
                timerEllerProsent: TimerEllerProsent.PROSENT,
                prosentAvNormalt: '50',
            },
        },
    },
    stønadGodtgjørelse: {
        mottarStønadGodtgjørelse: YesOrNo.NO,
    },
    selvstendig: {
        harHattInntektSomSN: YesOrNo.NO,
    },
    frilansoppdrag: [],
    harOpptjeningUtland: YesOrNo.NO,
    opptjeningUtland: [],
    harUtenlandskNæring: YesOrNo.NO,
    utenlandskNæring: [],
};
