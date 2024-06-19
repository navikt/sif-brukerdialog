import { browserEnv } from './env';

export type DecoratorBreadcrumb = {
    url: string;
    title: string;
    analyticsTitle?: string;
    handleInApp?: boolean;
};

export const getAllBreadcrumbs = (newCrumbs: DecoratorBreadcrumb[], harFlereSaker: boolean) => {
    const crumbs: DecoratorBreadcrumb[] = [{ url: browserEnv.NEXT_PUBLIC_MIN_SIDE_URL, title: 'Min side' }];
    if (harFlereSaker) {
        crumbs.push({ url: '/', title: 'Dine pleiepenger for sykt barn', handleInApp: true });
    }
    return [...crumbs, ...newCrumbs];
};
