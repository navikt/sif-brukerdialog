export type SideType = 'demo' | 'storybook';

export interface GhPagesSide {
    /** Mappenavn under /sif-brukerdialog/ - må matche steget i .github/workflows/build-gh-pages.yml */
    path: string;
    type: SideType;
    tittel: string;
    beskrivelse: string;
    /** Workspace siden bygges fra */
    workspace: string;
}

export const sider: GhPagesSide[] = [
    {
        path: 'ungdomsytelse-deltaker',
        type: 'demo',
        tittel: 'Søknad om deltakelse i ungdomsprogram',
        beskrivelse: 'Demo av deltakerflyten for ungdomsytelsen, med mockede data.',
        workspace: 'apps/ungdomsytelse-deltaker',
    },
    {
        path: 'opplaringspenger-soknad',
        type: 'demo',
        tittel: 'Søknad om opplæringspenger',
        beskrivelse: 'Demo av søknad om utbetaling av opplæringspenger, med mockede data.',
        workspace: 'apps/opplaringspenger-soknad',
    },
    {
        path: 'endringsmelding-pleiepenger',
        type: 'demo',
        tittel: 'Endringsmelding for pleiepenger sykt barn',
        beskrivelse: 'Demo av endringsmelding for pleiepenger sykt barn, med mockede data.',
        workspace: 'apps/endringsmelding-pleiepenger',
    },
    {
        path: 'aktivitetspenger-innsyn',
        type: 'demo',
        tittel: 'Aktivitetspenger innsyn',
        beskrivelse: 'Demo av innsynsløsningen for aktivitetspenger, med mockede data.',
        workspace: 'apps/aktivitetspenger-innsyn',
    },
    {
        path: 'storybook',
        type: 'storybook',
        tittel: 'Felles storybook',
        beskrivelse: 'Storybook som viser noen av komponentene som brukes på tvers av sif universet.',
        workspace: 'apps/storybook',
    },
    {
        path: 'aktivitetspenger-soknad-storybook',
        type: 'storybook',
        tittel: 'Aktivitetspenger søknad',
        beskrivelse: 'Storybook for komponentene i søknad om aktivitetspenger.',
        workspace: 'apps/aktivitetspenger-soknad',
    },
    {
        path: 'ungdomsytelse-deltaker-storybook',
        type: 'storybook',
        tittel: 'Ungdomsytelse deltaker',
        beskrivelse: 'Storybook for komponentene i deltakerløsningen for ungdomsytelsen.',
        workspace: 'apps/ungdomsytelse-deltaker',
    },
    {
        path: 'ung-innsyn-storybook',
        type: 'storybook',
        tittel: 'Ung innsyn',
        beskrivelse: 'Storybook for komponentene i den delte innsynspakken for ungdomsytelsen.',
        workspace: 'packages/ung-innsyn',
    },
];
