import { useNavigate } from 'react-router-dom';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';

type DecoratorBreadcrumb = {
    url: string;
    title: string;
    handleInApp?: boolean;
};

export const useInnsynBreadcrumbs = (crumbs: DecoratorBreadcrumb[] = []) => {
    const navigate = useNavigate();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Din ungdomsprogramytelse', url: '/', handleInApp: true },
            ...crumbs,
        ]);
    });
    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });
};
