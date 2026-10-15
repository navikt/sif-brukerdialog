import { hentYtelseMellomlagring, slettYtelseMellomlagring } from '@sif/api/k9-brukerdialog-prosessering';
import { createGrunnlagHash } from '@sif/utils';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SøknadProvider } from '../SoknadProvider';

vi.mock('@sif/api/k9-brukerdialog-prosessering', () => ({
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
            <SøknadProvider
                config={{ start: { route: 'start' } }}
                stepOrder={['start']}
                ytelse="PLEIEPENGER_SYKT_BARN"
                versjon={1}
                applicationTitle="Test"
                kvitteringElement={<div>Kvittering</div>}>
                <Routes>
                    <Route path="/" element={<LocationDisplay />} />
                    <Route path="/soknad/start" element={<LocationDisplay />} />
                </Routes>
            </SøknadProvider>
        </MemoryRouter>,
    );

describe('SøknadProvider', () => {
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

describe('SøknadProvider — mellomlagringGrunnlag', () => {
    const renderMedGrunnlag = (grunnlag?: Record<string, unknown>) =>
        render(
            <MemoryRouter initialEntries={['/']}>
                <SøknadProvider
                    config={{ start: { route: 'start' } }}
                    stepOrder={['start']}
                    ytelse="PLEIEPENGER_SYKT_BARN"
                    versjon={1}
                    applicationTitle="Test"
                    mellomlagringGrunnlag={grunnlag}
                    kvitteringElement={<div>Kvittering</div>}>
                    <Routes>
                        <Route path="/" element={<LocationDisplay />} />
                        <Route path="/soknad/start" element={<LocationDisplay />} />
                    </Routes>
                </SøknadProvider>
            </MemoryRouter>,
        );

    beforeEach(() => {
        vi.mocked(slettYtelseMellomlagring)
            .mockReset()
            .mockResolvedValue(undefined as never);
    });

    it('gjenopptar når grunnlaget er uendret', async () => {
        vi.mocked(hentYtelseMellomlagring).mockResolvedValue({
            versjon: 1,
            resumeStepId: 'start',
            søknadsdata: {},
            grunnlagHash: await createGrunnlagHash({ antallBarn: 1 }),
        });
        renderMedGrunnlag({ antallBarn: 1 });

        await waitFor(() => expect(screen.getByTestId('location').textContent).toBe('/soknad/start'));
        expect(slettYtelseMellomlagring).not.toHaveBeenCalled();
    });

    it('forkaster og sletter mellomlagring når grunnlaget er endret', async () => {
        vi.mocked(hentYtelseMellomlagring).mockResolvedValue({
            versjon: 1,
            resumeStepId: 'start',
            søknadsdata: {},
            grunnlagHash: await createGrunnlagHash({ antallBarn: 0 }),
        });
        renderMedGrunnlag({ antallBarn: 1 });

        await waitFor(() => expect(slettYtelseMellomlagring).toHaveBeenCalled());
        expect(screen.getByTestId('location').textContent).toBe('/');
    });

    it('forkaster og sletter mellomlagring med hash når appen ikke lenger sender grunnlag', async () => {
        vi.mocked(hentYtelseMellomlagring).mockResolvedValue({
            versjon: 1,
            resumeStepId: 'start',
            søknadsdata: {},
            grunnlagHash: await createGrunnlagHash({ antallBarn: 1 }),
        });
        renderMedGrunnlag();

        await waitFor(() => expect(slettYtelseMellomlagring).toHaveBeenCalled());
        expect(screen.getByTestId('location').textContent).toBe('/');
    });

    it('forkaster mellomlagring uten hash når appen sender grunnlag', async () => {
        vi.mocked(hentYtelseMellomlagring).mockResolvedValue({ versjon: 1, resumeStepId: 'start', søknadsdata: {} });
        renderMedGrunnlag({ antallBarn: 1 });

        await waitFor(() => expect(slettYtelseMellomlagring).toHaveBeenCalled());
        expect(screen.getByTestId('location').textContent).toBe('/');
    });
});
