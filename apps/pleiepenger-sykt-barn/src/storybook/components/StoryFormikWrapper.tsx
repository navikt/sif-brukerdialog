import { BodyLong } from '@navikt/ds-react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { formikValues } from '../data/formikValues';

interface Props {
    parameters?: {
        initialValues?: any;
        maxWidth?: string;
    };
    children: React.ReactNode;
}

export const StoryFormikWrapper: React.FunctionComponent<Props> = (props) => {
    const { children, parameters } = props;
    const { initialValues = formikValues, maxWidth = '800px' } = parameters || {};

    return (
        <TypedFormikWrapper
            initialValues={initialValues}
            onSubmit={(values) => {
                // eslint-disable-next-line no-console
                console.log('StoryFormikProvider', values);
            }}
            renderForm={() => {
                return (
                    <BodyLong size="large" style={{ maxWidth: maxWidth }} as="div">
                        {children}
                    </BodyLong>
                );
            }}
        />
    );
};
