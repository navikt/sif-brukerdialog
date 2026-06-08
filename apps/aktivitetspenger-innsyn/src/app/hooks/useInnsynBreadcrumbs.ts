import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useNavigate } from 'react-router-dom';

import { useAppIntl } from '../i18n';
import { useLenker } from '../lenker';

type DecoratorBreadcrumb = {
    url: string;
    title: string;
    handleInApp?: boolean;
};

export const useInnsynBreadcrumbs = (crumbs: DecoratorBreadcrumb[] = []) => {
    const { text } = useAppIntl();
    const lenker = useLenker();
    const navigate = useNavigate();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: text('breadcrumbs.minSide'), url: lenker.navMinSide },
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
