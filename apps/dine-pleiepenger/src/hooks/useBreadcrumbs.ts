import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { DecoratorBreadcrumb } from '../types/DecoratorBreadcrumb';
import { browserEnv } from '../utils/env';
import { useInnsynsdataContext } from './useInnsynsdataContext';

interface UseBreadcrumbsOptions {
    breadcrumbs: DecoratorBreadcrumb[];
    saksnummer?: string;
}

export const useBreadcrumbs = ({ breadcrumbs, saksnummer }: UseBreadcrumbsOptions): void => {
    const router = useRouter();
    const {
        innsynsdata: { sakerMetadata },
    } = useInnsynsdataContext();

    const harFlereSaker = sakerMetadata.length > 1;
    const inkluderSakCrumb = saksnummer !== undefined;

    useEffect(() => {
        const allBreadcrumbs: DecoratorBreadcrumb[] = [
            { url: browserEnv.NEXT_PUBLIC_MIN_SIDE_URL, title: 'Min side' },
            ...(harFlereSaker ? [{ url: '/', title: 'Dine pleiepengesaker', handleInApp: true }] : []),
            ...(inkluderSakCrumb
                ? [
                      {
                          url: `/sak/${saksnummer}`,
                          title: harFlereSaker ? `Pleiepengesak` : 'Din pleiepengesak for sykt barn',
                          handleInApp: true,
                      },
                  ]
                : []),
            ...breadcrumbs,
        ];

        setBreadcrumbs(allBreadcrumbs);

        const clickHandler = (breadcrumb: { url: string }) => {
            router.push(breadcrumb.url);
        };

        onBreadcrumbClick(clickHandler);
    }, [breadcrumbs, harFlereSaker, router, saksnummer]);
};
