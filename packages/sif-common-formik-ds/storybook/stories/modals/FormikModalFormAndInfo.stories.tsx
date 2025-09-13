import { Meta, StoryFn } from '@storybook/react-vite';
import FormikModalFormAndInfo from '../../../src/components/formik-modal-form/FormikModalFormAndInfo';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';

const meta: Meta<typeof FormikModalFormAndInfo> = {
    title: 'Modals/FormikModalFormAndInfo',
    component: FormikModalFormAndInfo,
    decorators: [withFormikWrapper],
};

export default meta;

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
