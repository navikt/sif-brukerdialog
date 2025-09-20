import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useAppIntl } from '@shared/i18n';
import { useNavigate } from 'react-router-dom';

type DecoratorBreadcrumb = {
    url: string;
    title: string;
    handleInApp?: boolean;
};

export const useInnsynBreadcrumbs = (crumbs: DecoratorBreadcrumb[] = []) => {
    const { text } = useAppIntl();
    const navigate = useNavigate();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: text('breadcrumbs.minSide'), url: '/min-side' },
            { title: text('breadcrumbs.innsyn'), url: '/', handleInApp: true },
            ...crumbs,
        ]);
    });
    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });
};
