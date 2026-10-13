import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { IncludedStep } from '../../types';
import { StepRouteGuard } from '../StepRouteGuard';

const steps: IncludedStep[] = [
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
        resumeStepId: 'start',
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

    it('redirecter til initialPath når resumeStepId mangler', () => {
        renderGuard('/soknad/barn', { resumeStepId: undefined });
        expect(screen.getByTestId('location').textContent).toBe('/');
    });

    it('redirecter til resumeStepId når URL-steg ikke er inkludert', () => {
        const stepsWithStart: IncludedStep[] = [
            { stepId: 'start', stepRoute: 'start', completed: true },
            { stepId: 'barn', stepRoute: 'barn', completed: false },
            { stepId: 'oppsummering', stepRoute: 'oppsummering', completed: false },
        ];
        renderGuard('/soknad/ukjent-steg', { steps: stepsWithStart, resumeStepId: 'barn' });
        expect(screen.getByTestId('location').textContent).toBe('/soknad/barn');
    });

    it('redirecter til første gyldige steg når resumeStepId ikke finnes i steps', () => {
        const begrensetSteps: IncludedStep[] = [
            { stepId: 'oppsummering', stepRoute: 'oppsummering', completed: false },
        ];
        renderGuard('/soknad/ukjent-steg', {
            steps: begrensetSteps,
            resumeStepId: 'barn',
        });
        expect(screen.getByTestId('location').textContent).toBe('/soknad/oppsummering');
    });

    it('redirecter til initialPath når steps er tom', () => {
        renderGuard('/soknad/ukjent-steg', { steps: [], resumeStepId: 'barn' });
        expect(screen.getByTestId('location').textContent).toBe('/');
    });

    it('redirecter til første ufullstendige steg når et forutgående steg ikke er completed', () => {
        const stepsWithIncomplete: IncludedStep[] = [
            { stepId: 'start', stepRoute: 'start', completed: false },
            { stepId: 'barn', stepRoute: 'barn', completed: false },
            { stepId: 'oppsummering', stepRoute: 'oppsummering', completed: false },
        ];
        renderGuard('/soknad/oppsummering', { steps: stepsWithIncomplete, resumeStepId: 'oppsummering' });
        expect(screen.getByTestId('location').textContent).toBe('/soknad/start');
    });

    it('redirecter til første ufullstendige blant forutgående steg', () => {
        const stepsWithPartial: IncludedStep[] = [
            { stepId: 'start', stepRoute: 'start', completed: true },
            { stepId: 'barn', stepRoute: 'barn', completed: false },
            { stepId: 'oppsummering', stepRoute: 'oppsummering', completed: false },
        ];
        renderGuard('/soknad/oppsummering', { steps: stepsWithPartial, resumeStepId: 'oppsummering' });
        expect(screen.getByTestId('location').textContent).toBe('/soknad/barn');
    });

    it('rendrer outlet når alle forutgående steg er completed', () => {
        const stepsAllComplete: IncludedStep[] = [
            { stepId: 'start', stepRoute: 'start', completed: true },
            { stepId: 'barn', stepRoute: 'barn', completed: true },
            { stepId: 'oppsummering', stepRoute: 'oppsummering', completed: false },
        ];
        renderGuard('/soknad/oppsummering', { steps: stepsAllComplete, resumeStepId: 'oppsummering' });
        expect(screen.getByTestId('location').textContent).toBe('/soknad/oppsummering');
    });
});
