import { ProcessStepData } from '../process/ProcessStep';
import { Søknadstype } from '../../server/api-models/Søknadstype';
import { Søknadshendelse, SøknadshendelseType } from '../../types/Søknadshendelse';
import { Søknad } from '../../server/api-models/SøknadSchema';
import SøknadStatusContent from './parts/SøknadStatusContent';
import EndringsmeldingStatusContent from './parts/EndringsmeldingStatusContent';
import FerdigBehandletStatusContent from './parts/FerdigBehandletStatusContent';
import { Msg, TextFn as TextFn } from '../../i18n';

export const getProcessStepFromMottattSøknad = (
    text: TextFn,
    søknad: Søknad,
    current: boolean,
): ProcessStepData | undefined => {
    switch (søknad.søknadstype) {
        case Søknadstype.SØKNAD:
            return {
                title: text('statusISak.mottattSøknad.tittel'),
                timestamp: søknad.k9FormatSøknad.mottattDato,
                content: <SøknadStatusContent søknad={søknad} />,
                completed: true,
                current,
                isLastStep: false,
            };
        case Søknadstype.ENDRINGSMELDING:
            return {
                title: text('statusISak.mottattEndringsmelding.tittel'),
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

export const getProcessStepsFraSøknadshendelser = (text: TextFn, hendelser: Søknadshendelse[]): ProcessStepData[] => {
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
                    return getProcessStepFromMottattSøknad(text, hendelse.søknad, erGjeldendeHendelse);

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
                        title: text('statusISak.ferdigBehandlet.tittel'),
                        content: <FerdigBehandletStatusContent />,
                        completed: true,
                        isLastStep: true,
                        current: erGjeldendeHendelse,
                        timestamp: hendelse.dato,
                    };

                case SøknadshendelseType.FORVENTET_SVAR:
                    return {
                        title: text('statusISak.forventetSvar.tittel'),
                        content: <Msg id="statusISak.forventetSvar.info" />,
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
