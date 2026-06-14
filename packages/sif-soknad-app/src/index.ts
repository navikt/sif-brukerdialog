// Analytics
export {
    AnalyticsProvider,
    ApplikasjonHendelse,
    CustomAnalyticsEvents,
    useAnalyticsInstance,
} from './analytics/analytics';

// Komponenter
export { AppErrorBoundary } from './components/AppErrorBoundary';
export { SifQueryClientProvider } from './components/SifQueryClientProvider';
export { SøknadAppProvider } from './components/SøknadAppProvider';
export { SøknadKvitteringPage } from './components/SøknadKvitteringPage';
export { SøknadRouter } from './components/SøknadRouter';
export { SøknadStep } from './components/SøknadStep';
export { SøknadStepForm } from './components/SøknadStepForm';
export { SøknadStepGuard } from './components/SøknadStepGuard';
export { SøknadVelkommenPage } from './components/SøknadVelkommenPage';
export { InconsistentFormValuesMessage } from './consistency/InconsistentFormValuesMessage';

// Hooks
export { useAvbryt } from './hooks/useAvbryt';
export { useCheckConsistency } from './hooks/useCheckConsistency';
export { useMellomlagring } from './hooks/useMellomlagring';
export { useSaveSøknadFormValues } from './hooks/useSaveSøknadFormValues';
export { useStartSøknad } from './hooks/useStartSøknad';
export { useSøknadSendt } from './hooks/useSøknadSendt';
export { useStepData } from './hooks/useStepData';
export { useStepNavigation } from './hooks/useStepNavigation';

// Intern kontekst — eksportert for avansert bruk (f.eks. oppsummering, direkte store-aksess)
export { useSøknadAppContext } from './context/SøknadAppContext';

// Typer
export type {
    DialogProps,
    IncludedStep,
    MellomlagringBlob,
    SøknadFrameworkIntlKeys,
    SøknadRouterProps,
    SøknadStepProps,
    StepDefinition,
} from './types';
