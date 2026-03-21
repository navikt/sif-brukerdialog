import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { IncludedStep } from '../../types';
import { StepRouteGuard } from '../StepRouteGuard';

type StepId = 'start' | 'barn' | 'oppsummering';

const steps: Array<IncludedStep<StepId>> = [
    { stepId: 'start', stepRoute: 'start', completed: false },
    { stepId: 'barn', stepRoute: 'barn', completed: false },
    { stepId: 'oppsummering', stepRoute: 'oppsummering', completed: false },
];

const LocationDisplay = () => {
    const { pathname } = useLocation();
    return <div data-testid="location">{pathname}</div>;
};

const renderGuard = (pathname: string, props: Partial<Parameters<typeof StepRouteGuard>[0]> = {}) => {
    const merged = {
        steps,
        currentStepId: 'start' as StepId,
        basePath: '/soknad',
        initialPath: '/',
        ...props,
    };
    return render(
        <MemoryRouter initialEntries={[pathname]}>
            <Routes>
                <Route path="/soknad/*" element={<StepRouteGuard {...merged} />}>
                    <Route path="start" element={<LocationDisplay />} />
                    <Route path="barn" element={<LocationDisplay />} />
                    <Route path="oppsummering" element={<LocationDisplay />} />
                </Route>
                <Route path="/" element={<LocationDisplay />} />
            </Routes>
        </MemoryRouter>,
    );
};

describe('StepRouteGuard', () => {
    it('venter på initialisering uten å rendre noe', () => {
        renderGuard('/soknad/barn', { isInitialized: false });
        expect(screen.queryByTestId('location')).toBeNull();
    });

    it('redirecter til initialPath når currentStepId mangler', () => {
        renderGuard('/soknad/barn', { currentStepId: undefined });
        expect(screen.getByTestId('location').textContent).toBe('/');
    });

    it('redirecter til currentStepId når URL-steg ikke er inkludert', () => {
        renderGuard('/soknad/ukjent-steg', { currentStepId: 'barn' });
        expect(screen.getByTestId('location').textContent).toBe('/soknad/barn');
    });

    it('redirecter til første gyldige steg når currentStepId ikke finnes i steps', () => {
        const begrensetSteps: Array<IncludedStep<StepId>> = [
            { stepId: 'oppsummering', stepRoute: 'oppsummering', completed: false },
        ];
        renderGuard('/soknad/ukjent-steg', {
            steps: begrensetSteps,
            currentStepId: 'barn',
        });
        expect(screen.getByTestId('location').textContent).toBe('/soknad/oppsummering');
    });

    it('redirecter til initialPath når steps er tom', () => {
        renderGuard('/soknad/ukjent-steg', { steps: [], currentStepId: 'barn' });
        expect(screen.getByTestId('location').textContent).toBe('/');
    });
});
