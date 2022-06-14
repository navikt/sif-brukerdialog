import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorPage from '../soknad-common-pages/ErrorPage';
import SoknadErrorMessages from '../soknad-error-messages/SoknadErrorMessages';

export enum GlobalSoknadApplicationRoutes {
    error = '/feil',
    unavailable = '/utilgjengelig',
    unknownRoute = '*',
}

interface Props {
    contentRoutes: React.ReactNode[];
    errorContentRenderer?: () => JSX.Element;
    unavailableContentRenderer?: () => JSX.Element;
    unknownRouteContentRenderer?: () => JSX.Element;
}

const SoknadApplicationCommonRoutes = ({
    contentRoutes,
    errorContentRenderer,
    unavailableContentRenderer,
    unknownRouteContentRenderer,
}: Props) => {
    return (
        <Switch>
            {...contentRoutes}
            <Route path={GlobalSoknadApplicationRoutes.error} exact={true}>
                <ErrorPage
                    contentRenderer={
                        errorContentRenderer
                            ? errorContentRenderer
                            : () => <SoknadErrorMessages.GeneralApplicationError />
                    }
                />
            </Route>
            <Route path={GlobalSoknadApplicationRoutes.unavailable}>
                <ErrorPage
                    contentRenderer={
                        unavailableContentRenderer
                            ? unavailableContentRenderer
                            : () => <SoknadErrorMessages.GeneralApplicationError />
                    }
                />
            </Route>
            <Route path={GlobalSoknadApplicationRoutes.unknownRoute}>
                <ErrorPage
                    contentRenderer={
                        unknownRouteContentRenderer
                            ? unknownRouteContentRenderer
                            : () => <SoknadErrorMessages.GeneralApplicationError />
                    }
                />
            </Route>
        </Switch>
    );
};

export default SoknadApplicationCommonRoutes;
