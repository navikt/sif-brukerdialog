import { browserEnv } from './env';

export type DecoratorBreadcrumb = {
    url: string;
    title: string;
    analyticsTitle?: string;
    handleInApp?: boolean;
};

export const baseDecoratorBreadcrumbs: DecoratorBreadcrumb[] = [
    { url: browserEnv.NEXT_PUBLIC_MIN_SIDE_URL, title: 'Min side' },
    { url: '/', title: 'Dine pleiepenger', handleInApp: true },
];

export const getAllBreadcrumbs = (newCrumbs: DecoratorBreadcrumb[]) => {
    return [...baseDecoratorBreadcrumbs, ...newCrumbs];
};
