import { ArbeidIPeriodeSøknadsdata, Søknadsdata } from '../../app/types/søknadsdata/Søknadsdata';
import { YesOrNoOrDoNotKnow } from '../../app/types/YesOrNoOrDoNotKnow';
import { ArbeidIPeriodeType } from '../../app/types/ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../../app/types/RedusertArbeidstidType';
import { Frilanstype } from '../../app/types/søknad-form-values/FrilansFormValues';
import {
    ArbeidssituasjonAnsattSøknadsdata,
    ArbeidssituasjonAnsattType,
} from '../../app/types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidsgiverType } from '../../app/types/Arbeidsgiver';
import { ArbeidssituasjonArbeidsgivereSøknadsdata } from '../../app/types/søknadsdata/ArbeidssituasjonSøknadsdata';

const arbeidssituasjonAnsatt: ArbeidssituasjonAnsattSøknadsdata = {
    type: ArbeidssituasjonAnsattType.pågående,
    index: 0,
    normalarbeidstid: {
        timerPerUkeISnitt: 20,
    },
    arbeidsgiver: {
        type: ArbeidsgiverType.ORGANISASJON,
        id: '947064649',
        organisasjonsnummer: '947064649',
        navn: 'SJOKKERENDE ELEKTRIKER',
        ansattFom: new Date('2002-04-20T00:00:00.000Z'),
    },
    periodeSomAnsattISøknadsperiode: {
        from: new Date('2024-05-01T00:00:00.000Z'),
        to: new Date('2024-05-26T00:00:00.000Z'),
    },
};

const arbeidssituasjonArbeidsgivere: ArbeidssituasjonArbeidsgivereSøknadsdata = new Map();
arbeidssituasjonArbeidsgivere.set('947064649', arbeidssituasjonAnsatt);

const arbeidstidArbeidsgivere: Map<string, ArbeidIPeriodeSøknadsdata> = new Map();
arbeidstidArbeidsgivere.set('947064649', {
    type: ArbeidIPeriodeType.arbeiderIkke,
});

export const søknadsdata: Søknadsdata = {
    isInitialized: true,
    harForståttRettigheterOgPlikter: true,
    søknadsperiode: {
        from: new Date('2024-05-01T00:00:00.000Z'),
        to: new Date('2024-05-26T00:00:00.000Z'),
    },
    barn: {
        type: 'registrerteBarn',
        aktørId: '2811762539343',
    },
    utenlandsoppholdIPerioden: {
        type: 'skalIkkeOppholdeSegIUtlandet',
        skalOppholdeSegIUtlandetIPerioden: false,
    },
    ferieuttakIPerioden: {
        type: 'skalIkkeTaUtFerieSøknadsdata',
        skalTaUtFerieIPerioden: false,
    },
    arbeidssituasjon: {
        arbeidsgivere: arbeidssituasjonArbeidsgivere,
        frilans: {
            type: Frilanstype.HONORAR,
            harInntektSomFrilanser: true,
            misterInntektSomFrilanser: true,
            misterHonorar: true,
            erFortsattFrilanser: true,
            startetFørSisteTreHeleMåneder: true,
            startdato: new Date('2024-01-30T23:00:00.000Z'),
            periodeSomFrilanserISøknadsperiode: {
                from: new Date('2024-05-01T00:00:00.000Z'),
                to: new Date('2024-05-26T00:00:00.000Z'),
            },
            normalarbeidstid: {
                timerPerUkeISnitt: 10,
            },
        },
        selvstendig: {
            erSN: false,
        },
        opptjeningUtland: {
            type: 'harIkkeOpptjeningUtland',
        },
        utenlandskNæring: {
            type: 'harIkkeUtenlandskNæring',
        },
    },
    arbeidstidIPerioden: {
        arbeidsgivere: arbeidstidArbeidsgivere,
        frilans: {
            type: ArbeidIPeriodeType.arbeiderRedusert,
            redusertArbeid: {
                type: RedusertArbeidstidType.prosentAvNormalt,
                prosentAvNormalt: 50,
            },
        },
    },
    stønadGodtgjørelse: {
        mottarStønadGodtgjørelse: false,
    },
    omsorgstibud: {
        type: 'erIOmsorgstilbudFasteDager',
        erIOmsorgstilbudFortid: YesOrNoOrDoNotKnow.YES,
        erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.YES,
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
    nattevåk: {
        type: 'harIkkeNattevåk',
        harNattevåk: false,
    },
    beredskap: {
        type: 'harIkkeBeredskap',
        harBeredskap: false,
    },
    medlemskap: {
        type: 'harIkkeBoddSkalIkkeBo',
        harBoddUtenforNorgeSiste12Mnd: false,
        skalBoUtenforNorgeNeste12Mnd: false,
    },
    legeerklæring: [],
};
