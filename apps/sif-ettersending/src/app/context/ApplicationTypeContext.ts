import { createContext } from 'react';
import { ApplicationType } from '../types/ApplicationType';

interface ApplicationTypeContextType {
    søknadstype?: ApplicationType;
}

export const ApplicationTypeContext = createContext<ApplicationTypeContextType>({
    søknadstype: ApplicationType.ukjent
});
