import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import SoknadErrorMessages from '../components/soknad-error-messages/SoknadErrorMessages';
import ErrorPage from '../pages/error-page/ErrorPage';

export enum GlobalSoknadApplicationRoutes {
    error = '/feil',
    unavailable = '/utilgjengelig',
    unknownRoute = '*',
}

interface Props {
    contentRoutes: React.ReactNode[];
    onReset?: () => void;
    errorContentRenderer?: () => ReactElement;
    unavailableContentRenderer?: () => ReactElement;
    unknownRouteContentRenderer?: () => ReactElement;
}

const SoknadApplicationCommonRoutes = ({
    contentRoutes,
    onReset,
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
                                : () => <SoknadErrorMessages.UnknownRoute onReset={onReset} />
                        }
                    />
                }
            />
        </Routes>
    );
};

export default SoknadApplicationCommonRoutes;
