import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { DecoratorBreadcrumb, getAllBreadcrumbs } from '../utils/decoratorBreadcrumbs';

interface UseBreadcrumbsOptions {
    breadcrumbs: DecoratorBreadcrumb[];
    harFlereSaker: boolean;
}

/**
 * Hook for å sette opp breadcrumbs og håndtere navigering via dekoratøren.
 *
 * @param breadcrumbs - Liste over breadcrumbs som skal vises (ekskludert "Min side" og "Dine pleiepenger" som legges til automatisk)
 * @param harFlereSaker - Om brukeren har flere saker (brukes for å vise/skjemme "Dine pleiepenger"-crumb)
 *
 * @example
 * ```tsx
 * useBreadcrumbs({
 *   breadcrumbs: [
 *     { url: '/sak/123', title: 'Din pleiepengesak for sykt barn', handleInApp: true },
 *     { url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Historikk' }
 *   ],
 *   harFlereSaker: true
 * });
 * ```
 */
export const useBreadcrumbs = ({ breadcrumbs, harFlereSaker }: UseBreadcrumbsOptions): void => {
    const router = useRouter();

    useEffect(() => {
        const allBreadcrumbs = getAllBreadcrumbs(breadcrumbs, harFlereSaker);
        setBreadcrumbs(allBreadcrumbs);

        const clickHandler = (breadcrumb: { url: string }) => {
            router.push(breadcrumb.url);
        };

        onBreadcrumbClick(clickHandler);

        // Cleanup er ikke strengt nødvendig siden onBreadcrumbClick overskriver,
        // men kan legges til hvis det blir behov for det i fremtiden
    }, [breadcrumbs, harFlereSaker, router]);
};
