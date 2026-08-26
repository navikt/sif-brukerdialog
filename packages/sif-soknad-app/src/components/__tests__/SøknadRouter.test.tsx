import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { hentYtelseMellomlagring } from '@sif/api/k9-prosessering';

import { SøknadRouter } from '../SøknadRouter';

vi.mock('@sif/api/k9-prosessering', () => ({
    hentYtelseMellomlagring: vi.fn(),
    oppdaterYtelseMellomlagring: vi.fn(),
    slettYtelseMellomlagring: vi.fn(),
}));

const LocationDisplay = () => {
    const { pathname } = useLocation();
    return <div data-testid="location">{pathname}</div>;
};

const renderRouter = (initialPath: string) =>
    render(
        <MemoryRouter initialEntries={[initialPath]}>
            <SøknadRouter
                config={{ start: { route: 'start' } }}
                stepOrder={['start']}
                ytelse="PLEIEPENGER_SYKT_BARN"
                versjon={1}
                applicationTitle="Test">
                <Routes>
                    <Route path="/" element={<LocationDisplay />} />
                    <Route path="/soknad/start" element={<LocationDisplay />} />
                </Routes>
            </SøknadRouter>
        </MemoryRouter>,
    );

describe('SøknadRouter', () => {
    beforeEach(() => {
        vi.mocked(hentYtelseMellomlagring).mockResolvedValue({
            versjon: 1,
            resumeStepId: 'start',
            søknadsdata: {},
        });
    });

    it('redirecter fra velkommensiden til mellomlagret steg etter browser-back', async () => {
        renderRouter('/');

        await waitFor(() => expect(screen.getByTestId('location').textContent).toBe('/soknad/start'));
    });
});
