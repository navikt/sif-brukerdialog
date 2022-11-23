import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikModalFormAndInfo from '../../../src/components/formik-modal-form/FormikModalFormAndInfo';

export default {
    title: 'Modals/FormikModalFormAndInfo',
    component: FormikModalFormAndInfo,
    decorators: [withFormik],
} as ComponentMeta<typeof FormikModalFormAndInfo>;

enum FormFieldNames {
    person = 'person',
}

interface ItemType {
    name: string;
}

const Template: ComponentStory<typeof FormikModalFormAndInfo> = () => (
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
