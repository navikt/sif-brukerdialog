import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikModalFormAndInfo from '../../../src/components/formik-modal-form/FormikModalFormAndInfo';

export default {
    title: 'Modals/FormikModalFormAndInfo',
    component: FormikModalFormAndInfo,
    decorators: [withFormikWrapper],
} as Meta<typeof FormikModalFormAndInfo>;

enum FormFieldNames {
    person = 'person',
}

interface ItemType {
    name: string;
}

const Template: StoryFn<typeof FormikModalFormAndInfo> = () => (
    <FormikModalFormAndInfo<FormFieldNames, ItemType, any>
        name={FormFieldNames.person}
        renderDeleteButton={true}
        wrapInfoInPanel={true}
        labels={{
            addLabel: 'Legg til',
            editLabel: 'Endre',
            infoTitle: 'Tittel',
            modalTitle: 'Tittel på modal',
            deleteLabel: 'Slett',
        }}
        dialogWidth="narrow"
        renderEditButtons={true}
        formRenderer={({ data }) => <div>MockForm - &quot;{data?.name}&quot;</div>}
        infoRenderer={({ data }) => <p>{data.name}</p>}
    />
);

export const Default = Template.bind({});
Default.args = {
    label: 'FormikModalFormAndInfo',
};
Default.parameters = {
    formik: {
        initialValues: {
            person: {
                name: 'Enter name',
            },
        },
    },
};
