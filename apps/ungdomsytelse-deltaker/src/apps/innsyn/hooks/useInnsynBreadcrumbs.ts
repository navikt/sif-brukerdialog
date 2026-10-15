import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useAppIntl } from '@shared/i18n';
import getLenker from '@shared/utils/lenker';
import { useEffectOnce } from '@sif/hooks';
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
            { title: text('breadcrumbs.minSide'), url: getLenker().minSide },
            { title: text('breadcrumbs.innsyn'), url: '/', handleInApp: true },
            ...crumbs,
        ]);
        onBreadcrumbClick((breadcrumb) => {
            if (breadcrumb.handleInApp) {
                navigate(breadcrumb.url);
            }
        });
    });
};
