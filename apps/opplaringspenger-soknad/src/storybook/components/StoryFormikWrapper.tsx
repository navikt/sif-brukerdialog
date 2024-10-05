import { BodyLong } from '@navikt/ds-react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';

interface Props {
    parameters?: {
        formik?: any;
        includeButtons?: boolean;
        maxWidth?: string;
    };
    children: React.ReactNode;
}
export const StoryFormikWrapper: React.FunctionComponent<Props> = (props) => {
    const { children, parameters } = props;
    const { formik, maxWidth = '800px', includeButtons = true } = parameters || {};
    const initialValues = formik?.initialValues || {};
    return (
        <TypedFormikWrapper
            initialValues={initialValues}
            onSubmit={(values) => {
                // eslint-disable-next-line no-console
                console.log('StoryFormikProvider', values);
            }}
            renderForm={() => {
                return (
                    <TypedFormikForm includeButtons={includeButtons}>
                        <BodyLong size="large" style={{ maxWidth: maxWidth }}>
                            {children}
                        </BodyLong>
                    </TypedFormikForm>
                );
            }}
        />
    );
};
