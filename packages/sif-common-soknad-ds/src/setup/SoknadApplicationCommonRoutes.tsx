import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import SoknadErrorMessages from '../modules/soknad-error-messages/SoknadErrorMessages';

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
        <Routes>
            {...contentRoutes}
            <Route
                path={GlobalSoknadApplicationRoutes.error}
                element={
                    <ErrorPage
                        contentRenderer={
                            errorContentRenderer
                                ? errorContentRenderer
                                : () => <SoknadErrorMessages.GeneralApplicationError />
                        }
                    />
                }
            />
            <Route
                path={GlobalSoknadApplicationRoutes.unavailable}
                element={
                    <ErrorPage
                        contentRenderer={
                            unavailableContentRenderer
                                ? unavailableContentRenderer
                                : () => <SoknadErrorMessages.ApplicationUnavailable />
                        }
                    />
                }
            />
            <Route
                path={GlobalSoknadApplicationRoutes.unknownRoute}
                element={
                    <ErrorPage
                        contentRenderer={
                            unknownRouteContentRenderer
                                ? unknownRouteContentRenderer
                                : () => <SoknadErrorMessages.UnknownRoute />
                        }
                    />
                }
            />
        </Routes>
    );
};

export default SoknadApplicationCommonRoutes;
