import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { hentYtelseMellomlagring } from '@sif/api/k9-prosessering';

import { useSøknadSendt } from '../../hooks/useSøknadSendt';
import { KVITTERING_PATH } from '../../utils/routeUtils';
import { SøknadRouter } from '../SøknadRouter';
import { SøknadStepGuard } from '../SøknadStepGuard';

vi.mock('@sif/api/k9-prosessering', () => ({
    hentYtelseMellomlagring: vi.fn(),
    oppdaterYtelseMellomlagring: vi.fn().mockResolvedValue(undefined),
    slettYtelseMellomlagring: vi.fn().mockResolvedValue(undefined),
}));

const Location = () => <div data-testid="location">{useLocation().pathname}</div>;

/** Simulerer at bruker havner tilbake på et steg etter innsending (browser back). */
const TilbakeTilSteg = () => {
    const navigate = useNavigate();
    return (
        <button type="button" onClick={() => navigate('/soknad/start')}>
            Tilbake til steg
        </button>
    );
};

const OppsummeringMock = () => {
    const { onSøknadSendt } = useSøknadSendt();
    return (
        <>
            <Location />
            <button type="button" onClick={() => onSøknadSendt()}>
                Send inn
            </button>
        </>
    );
};

const renderApp = (initialPath: string) =>
    render(
        <MemoryRouter initialEntries={[initialPath]}>
            <SøknadRouter
                config={{ start: { route: 'start' } }}
                stepOrder={['start']}
                ytelse="PLEIEPENGER_SYKT_BARN"
                versjon={1}
                applicationTitle="Test"
                kvitteringElement={
                    <>
                        <Location />
                        <div>Søknaden er sendt</div>
                        <TilbakeTilSteg />
                    </>
                }>
                <Routes>
                    <Route path="/" element={<Location />} />
                    <Route path="/soknad" element={<SøknadStepGuard basePath="/soknad" />}>
                        <Route path="start" element={<OppsummeringMock />} />
                    </Route>
                </Routes>
            </SøknadRouter>
        </MemoryRouter>,
    );

describe('Kvitteringsrute', () => {
    beforeEach(() => {
        vi.mocked(hentYtelseMellomlagring).mockResolvedValue({
            versjon: 1,
            resumeStepId: 'start',
            søknadsdata: {},
        });
    });

    it('sender bruker til kvitteringsruten etter innsending', async () => {
        renderApp('/soknad/start');

        await waitFor(() => expect(screen.getByTestId('location').textContent).toBe('/soknad/start'));

        fireEvent.click(screen.getByRole('button', { name: 'Send inn' }));

        await waitFor(() => expect(screen.getByText('Søknaden er sendt')).toBeTruthy());
        expect(screen.getByTestId('location').textContent).toBe(KVITTERING_PATH);
    });

    it('havner aldri innom forsiden i overgangen til kvittering', async () => {
        renderApp('/soknad/start');

        await waitFor(() => expect(screen.getByTestId('location').textContent).toBe('/soknad/start'));

        const besøkte: string[] = [];
        const observer = setInterval(() => {
            const el = screen.queryByTestId('location');
            if (el?.textContent) besøkte.push(el.textContent);
        }, 1);

        fireEvent.click(screen.getByRole('button', { name: 'Send inn' }));
        await waitFor(() => expect(screen.getByText('Søknaden er sendt')).toBeTruthy());
        clearInterval(observer);

        expect(besøkte).not.toContain('/');
    });

    it('sender bruker tilbake til kvittering ved forsøk på å gå tilbake til steg etter innsending', async () => {
        renderApp('/soknad/start');

        await waitFor(() => expect(screen.getByTestId('location').textContent).toBe('/soknad/start'));
        fireEvent.click(screen.getByRole('button', { name: 'Send inn' }));
        await waitFor(() => expect(screen.getByText('Søknaden er sendt')).toBeTruthy());

        fireEvent.click(screen.getByRole('button', { name: 'Tilbake til steg' }));

        await waitFor(() => expect(screen.getByTestId('location').textContent).toBe(KVITTERING_PATH));
        expect(screen.getByText('Søknaden er sendt')).toBeTruthy();
    });

    it('redirecter til forsiden ved direkte URL til kvittering uten innsendt søknad', async () => {
        renderApp(KVITTERING_PATH);

        await waitFor(() => expect(screen.getByTestId('location').textContent).toBe('/'));
        expect(screen.queryByText('Søknaden er sendt')).toBeNull();
    });
});
