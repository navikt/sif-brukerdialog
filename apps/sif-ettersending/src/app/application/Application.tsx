import * as React from 'react';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import { initialApplicationValues } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';
import ApplicationEssentialsLoader from './ApplicationEssentialsLoader';
import ApplicationFormComponents from './ApplicationFormComponents';
import ApplicationRoutes from './ApplicationRoutes';

const Application = ({ søknadstype }: { søknadstype: ApplicationType }) => (
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

export default Application;
