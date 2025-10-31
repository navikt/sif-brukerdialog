import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { DecoratorBreadcrumb, getAllBreadcrumbs } from '../utils/decoratorBreadcrumbs';
import { useInnsynsdataContext } from './useInnsynsdataContext';

interface UseBreadcrumbsOptions {
    breadcrumbs: DecoratorBreadcrumb[];
}

export const useBreadcrumbs = ({ breadcrumbs }: UseBreadcrumbsOptions): void => {
    const router = useRouter();
    const {
        innsynsdata: { saker },
    } = useInnsynsdataContext();
    const harFlereSaker = saker.length > 1;

    useEffect(() => {
        const allBreadcrumbs = getAllBreadcrumbs(breadcrumbs, harFlereSaker);
        setBreadcrumbs(allBreadcrumbs);

        const clickHandler = (breadcrumb: { url: string }) => {
            router.push(breadcrumb.url);
        };

        onBreadcrumbClick(clickHandler);
    }, [breadcrumbs, harFlereSaker, router]);
};
