import React, { useContext } from 'react';
import { QuestionVisibilityContext } from './QuestionVisibilityContext';

interface Props<FormFields> {
    fieldName: FormFields;
    children: React.ReactNode;
}

function QuestionVisibilityBlock<FormFields>({ fieldName, children }: Props<FormFields>) {
    const { visibility } = useContext(QuestionVisibilityContext) || {};
    return visibility && visibility.isVisible(fieldName) ? <>{children}</> : null;
}

export default QuestionVisibilityBlock;
