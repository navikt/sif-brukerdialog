import { createContext } from 'react';
import { QuestionVisibility } from '@navikt/sif-common-formik-ds';

interface VisibilityContext<FieldName> {
    visibility: QuestionVisibility<FieldName>;
}

export const QuestionVisibilityContext = createContext<VisibilityContext<any> | undefined>(undefined);
