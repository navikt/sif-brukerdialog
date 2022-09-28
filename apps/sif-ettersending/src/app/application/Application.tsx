import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import { initialApplicationValues } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';
import ApplicationEssentialsLoader from './ApplicationEssentialsLoader';
import ApplicationFormComponents from './ApplicationFormComponents';
import ApplicationRoutes from './ApplicationRoutes';

const getSøknadstypeFromYtelse = (param?: string): ApplicationType | undefined => {
    switch (param) {
        case 'omsorgspenger':
            return ApplicationType.omsorgspenger;
        case 'ekstraomsorgsdager':
            return ApplicationType.ekstraomsorgsdager;
        case 'utbetaling':
            return ApplicationType.utbetaling;
        case 'utbetalingarbeidstaker':
            return ApplicationType.utbetalingarbeidstaker;
        case 'regnetsomalene':
            return ApplicationType.regnetsomalene;
        case 'deling':
            return ApplicationType.deling;
        case 'pleiepenger':
            return ApplicationType.pleiepengerBarn;
        case 'pleiepenger-livets-sluttfase':
            return ApplicationType.pleiepengerLivetsSluttfase;
    }
    return undefined;
};
const Application = () => {
    const { ytelse } = useParams();
    const søknadstype = getSøknadstypeFromYtelse(ytelse);
    if (!søknadstype) {
        return <>ugyldig path</>;
    }
    return (
        <ApplicationTypeContext.Provider value={{ søknadstype }}>
            <ApplicationEssentialsLoader
                søknadstype={søknadstype}
                contentLoadedRenderer={() => (
                    <ApplicationFormComponents.FormikWrapper
                        initialValues={initialApplicationValues}
                        onSubmit={() => null}
                        renderForm={() => <ApplicationRoutes />}
                    />
                )}
            />
        </ApplicationTypeContext.Provider>
    );
};

export default Application;
