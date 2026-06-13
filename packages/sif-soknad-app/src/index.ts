// Komponenter
export { SøknadRouter } from './components/SøknadRouter';
export { SøknadStep } from './components/SøknadStep';
export { SøknadStepGuard } from './components/SøknadStepGuard';

// Hooks
export { useAvbryt } from './hooks/useAvbryt';
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
