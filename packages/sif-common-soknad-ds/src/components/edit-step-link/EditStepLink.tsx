import { FormSummary } from '@navikt/ds-react';

interface Props {
    onEdit: () => void;
}

const EditStepLink = ({ onEdit }: Props) => (
    <FormSummary.EditLink
        href="#"
        onClick={(evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            onEdit();
        }}
    />
);

export default EditStepLink;
