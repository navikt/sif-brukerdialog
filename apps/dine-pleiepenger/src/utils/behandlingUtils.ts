enum HendelseType {
    'MOTTATT_SØKNAD' = 'MOTTATT_SØKNAD',
    'AKSJONSPUNKT' = 'AKSJONSPUNKT',
    'FERDIG_BEHANDLET' = 'FERDIG_BEHANDLET',
}

interface Hendelse {
    type: HendelseType;
    dato: Date;
}

interface SøknadMottattHendelse extends Hendelse {
    type: HendelseType.MOTTATT_SØKNAD;
}
interface SøknadAksjonspunktHendelse extends Hendelse {
    type: HendelseType.AKSJONSPUNKT;
}
interface SøknadFerdigBehandletHendelse extends Hendelse {
    type: HendelseType.FERDIG_BEHANDLET;
}

export type BehandlingHendelse = SøknadMottattHendelse | SøknadFerdigBehandletHendelse | SøknadAksjonspunktHendelse;
