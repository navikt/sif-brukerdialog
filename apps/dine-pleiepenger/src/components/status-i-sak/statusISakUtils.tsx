import { ProcessStepData } from '../process/ProcessStep';
import { Søknadstype } from '../../server/api-models/Søknadstype';
import { Søknadshendelse, SøknadshendelseType } from '../../types/Søknadshendelse';
import { Søknad } from '../../server/api-models/SøknadSchema';
import SøknadStatusContent from './parts/SøknadStatusContent';
import EndringsmeldingStatusContent from './parts/EndringsmeldingStatusContent';
import FerdigBehandletStatusContent from './parts/FerdigBehandletStatusContent';

// export const getAksjonspunkterTekst = (aksjonspunkter: Aksjonspunkt[]): string => {
//     const årsaker = aksjonspunkter.map((a) => a.venteårsak).flat();
//     if (årsaker.includes(Venteårsak.MEDISINSK_DOKUMENTASJON)) {
//         return 'Saken er satt på vent fordi vi mangler legeerklæring';
//     }
//     if (årsaker.includes(Venteårsak.INNTEKTSMELDING)) {
//         return 'Saken er satt på vent fordi vi mangler inntektsmelding';
//     }
//     return `Saken er satt på vent fordi vi mangler informajson`;
// };

export const getProcessStepFromMottattSøknad = (søknad: Søknad, current: boolean): ProcessStepData | undefined => {
    switch (søknad.søknadstype) {
        case Søknadstype.SØKNAD:
            return {
                title: 'Vi har fått din søknad om pleiepenger for sykt barn',
                timestamp: søknad.k9FormatSøknad.mottattDato,
                content: <SøknadStatusContent søknad={søknad} />,
                completed: true,
                current,
                isLastStep: false,
            };
        case Søknadstype.ENDRINGSMELDING:
            return {
                title: 'Vi har fått din endringsmelding',
                timestamp: søknad.k9FormatSøknad.mottattDato,
                content: <EndringsmeldingStatusContent søknad={søknad} />,
                completed: true,
                current,
                isLastStep: false,
            };
        case Søknadstype.UKJENT:
            return undefined;
    }
};

export const getProcessStepsFraSøknadshendelser = (hendelser: Søknadshendelse[]): ProcessStepData[] => {
    /** Aksjonspunkt skal ikke vises enda */
    const hendelserSomSkalVises = hendelser.filter((h) => h.type !== SøknadshendelseType.AKSJONSPUNKT);

    const antall = hendelserSomSkalVises.length;
    const erFerdigBehandlet = hendelserSomSkalVises[antall - 1].type === SøknadshendelseType.FERDIG_BEHANDLET;

    return hendelserSomSkalVises
        .map((hendelse, index): ProcessStepData | undefined => {
            /** Gjeldende hendelse er per må alltid siste hendelse før ferdig behandlet, eller ferdig behandlet */
            const erGjeldendeHendelse = erFerdigBehandlet ? index === antall - 1 : index === antall - 2;

            switch (hendelse.type) {
                case SøknadshendelseType.MOTTATT_SØKNAD:
                    return getProcessStepFromMottattSøknad(hendelse.søknad, erGjeldendeHendelse);

                case SøknadshendelseType.AKSJONSPUNKT:
                    return {
                        title: hendelse.venteårsak,
                        completed: false,
                        current: true,
                        content: '',
                        timestamp: hendelse.dato,
                    };

                case SøknadshendelseType.FERDIG_BEHANDLET:
                    return {
                        title: 'Søknad er ferdig behandlet',
                        content: <FerdigBehandletStatusContent />,
                        completed: true,
                        isLastStep: true,
                        current: erGjeldendeHendelse,
                        timestamp: hendelse.dato,
                    };

                case SøknadshendelseType.FORVENTET_SVAR:
                    return {
                        title: 'Søknaden er ferdig behandlet',
                        content: (
                            <>
                                Inntektsmelding fra arbeidsgiver og legeerklæring må være sendt inn for at vi kan
                                behandle saken.
                            </>
                        ),
                        completed: false,
                        isLastStep: true,
                        timestamp: hendelse.dato,
                    };
                case SøknadshendelseType.UKJENT:
                    return undefined;
            }
        })
        .filter((h) => h !== undefined) as ProcessStepData[];
};
