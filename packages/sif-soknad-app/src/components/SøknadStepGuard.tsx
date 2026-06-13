import { useSøknadAppContext } from '../context/SøknadAppContext';
import { StepRouteGuard } from './StepRouteGuard';

interface Props {
    /** Basepath for søknadssteg. Skal matche <Route path="..."> i appen. Default: '/soknad' */
    basePath?: string;
    /** Redirect-sti ved ugyldig steg. Default: '/' */
    initialPath?: string;
}

/**
 * Routing-guard for søknadssteg. Plasser som element på layout-ruten som wrapper steg-rutene.
 *
 * Eksempel:
 * ```tsx
 * <Route path="/soknad" element={<SøknadStepGuard basePath="/soknad" />}>
 *   <Route path="startdato" element={<StartdatoForm />} />
 *   <Route path="oppsummering" element={<OppsummeringForm />} />
 * </Route>
 * ```
 */
export const SøknadStepGuard = ({ basePath = '/soknad', initialPath = '/' }: Props) => {
    const { store } = useSøknadAppContext();
    const isInitialized = store((s) => s.isInitialized);
    const currentStepId = store((s) => s.currentStepId);
    const includedSteps = store((s) => s.includedSteps);

    return (
        <StepRouteGuard
            steps={includedSteps}
            currentStepId={currentStepId}
            isInitialized={isInitialized}
            basePath={basePath}
            initialPath={initialPath}
        />
    );
};
