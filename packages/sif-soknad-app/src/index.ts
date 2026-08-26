// Analytics
export {
    AnalyticsProvider,
    ApplikasjonHendelse,
    CustomAnalyticsEvents,
    useAnalyticsInstance,
} from './analytics/analytics';

// Komponenter
export { AppErrorBoundary } from './components/AppErrorBoundary';
export type { AppIntlConfig, IntlMessageObjectFormat } from './components/AppIntlProvider';
export { AppIntlProvider } from './components/AppIntlProvider';
export { SifQueryClientProvider } from './components/SifQueryClientProvider';
export type { AppStatusConfig, SanityConfig } from './components/SøknadAppProvider';
export { SøknadAppProvider } from './components/SøknadAppProvider';
export { SøknadRouter } from './components/SøknadRouter';
export { SøknadStep } from './components/SøknadStep';
export { SøknadStepForm } from './components/SøknadStepForm';
export { SøknadStepGuard } from './components/SøknadStepGuard';
export { SøknadVelkommenPage } from './components/SøknadVelkommenPage';
export { InconsistentFormValuesMessage } from './consistency/InconsistentFormValuesMessage';
export { SøknadStepFormProvider } from './consistency/SøknadStepFormContext';

// Hooks
export { useAvbryt } from './hooks/useAvbryt';
export { useCheckConsistency } from './hooks/useCheckConsistency';
export { useMellomlagring } from './hooks/useMellomlagring';
export { useSaveSøknadFormValues } from './hooks/useSaveSøknadFormValues';
export { useSøknadSendt } from './hooks/useSøknadSendt';
export { useStartSøknad } from './hooks/useStartSøknad';
export { useStepData } from './hooks/useStepData';
export { useStepNavigation } from './hooks/useStepNavigation';

export { useSøknadsdata } from './hooks/useSøknadsdata';

// Intern kontekst — eksportert for avansert bruk (f.eks. storybook-dekoratører)
export { SøknadAppContext } from './context/SøknadAppContext';
export { useSøknadAppContext } from './context/SøknadAppContext';
export { createSøknadAppStore } from './store/createSøknadAppStore';

// Typer
export type {
    IncludedStep,
    MellomlagringBlob,
    SøknadFrameworkIntlKeys,
    SøknadRouterProps,
    SøknadStepProps,
    StepDefinition,
    StepFormValues,
} from './types';
