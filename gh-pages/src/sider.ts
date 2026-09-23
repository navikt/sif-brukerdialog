export type SideType = 'demo' | 'storybook';

export interface GhPagesSide {
    /** Mappenavn under /sif-brukerdialog/ - må matche steget i .github/workflows/build-gh-pages.yml */
    path: string;
    type: SideType;
    tittel: string;
    beskrivelse: string;
    /** Workspace siden bygges fra */
    workspace: string;
    /** Om siden er deaktivert */
    disabled?: boolean;
}

export const sider: GhPagesSide[] = [
    {
        path: 'ungdomsytelse-deltaker',
        type: 'demo',
        tittel: 'Søknad om ungdomsprogramytelse',
        beskrivelse: 'Demo av søknad for ungdomsprogramytelsen, med mockede data.',
        workspace: 'apps/ungdomsytelse-deltaker',
        disabled: false,
    },
    {
        path: 'ungdomsytelse-veileder',
        type: 'demo',
        tittel: 'Veilederapplikasjon for ungdomsprogramytelsen',
        beskrivelse: 'Demo av veilederapplikasjonen for ungdomsprogramytelsen, med mockede data.',
        workspace: 'apps/ungdomsytelse-deltaker',
        disabled: true,
    },
    {
        path: 'opplaringspenger-soknad',
        type: 'demo',
        tittel: 'Søknad om opplæringspenger',
        beskrivelse: 'Demo av søknad om utbetaling av opplæringspenger, med mockede data.',
        workspace: 'apps/opplaringspenger-soknad',
        disabled: false,
    },
    {
        path: 'endringsmelding-pleiepenger',
        type: 'demo',
        tittel: 'Endringsmelding for pleiepenger sykt barn',
        beskrivelse: 'Demo av endringsmelding for pleiepenger sykt barn, med mockede data.',
        workspace: 'apps/endringsmelding-pleiepenger',
        disabled: false,
    },
    {
        path: 'aktivitetspenger-innsyn',
        type: 'demo',
        tittel: 'Aktivitetspenger innsyn',
        beskrivelse: 'Demo av innsynsløsningen for aktivitetspenger, med mockede data.',
        workspace: 'apps/aktivitetspenger-innsyn',
        disabled: false,
    },
    {
        path: 'storybook',
        type: 'storybook',
        tittel: 'Felles storybook',
        beskrivelse: 'Storybook som viser tekst og noen av komponentene som brukes på tvers i sif.',
        workspace: 'apps/storybook',
        disabled: false,
    },
    {
        path: 'aktivitetspenger-soknad-storybook',
        type: 'storybook',
        tittel: 'Aktivitetspenger søknad',
        beskrivelse: 'Storybook for komponentene i søknad om aktivitetspenger.',
        workspace: 'apps/aktivitetspenger-soknad',
        disabled: false,
    },
    {
        path: 'ungdomsytelse-deltaker-storybook',
        type: 'storybook',
        tittel: 'Ungdomsytelse deltaker',
        beskrivelse: 'Storybook for komponentene i ungdomsytelse-deltaker.',
        workspace: 'apps/ungdomsytelse-deltaker',
        disabled: false,
    },
    {
        path: 'ung-innsyn-storybook',
        type: 'storybook',
        tittel: 'Varsler og oppgaver (ung-innsyn)',
        beskrivelse: 'Storybook for komponentene i ung-innsyn (varsler).',
        workspace: 'packages/ung-innsyn',
        disabled: false,
    },
];
