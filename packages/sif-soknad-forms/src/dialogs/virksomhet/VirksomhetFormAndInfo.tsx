import { ModalFormAndInfo, ModalFormAndInfoLabels } from '../../components';
import { Virksomhet } from './types';
import { VirksomhetFormDialog } from './VirksomhetDialog';
import { VirksomhetSummary } from './VirksomhetSummary';

interface Props {
    virksomhet?: Virksomhet;
    harFlereVirksomheter?: boolean;
    skipOrgNumValidation?: boolean;
    labels: ModalFormAndInfoLabels;
    addButtonId?: string;
    onChange: (virksomhet: Virksomhet | undefined) => void;
}

export const VirksomhetFormAndInfo = ({
    virksomhet,
    harFlereVirksomheter,
    skipOrgNumValidation,
    labels,
    addButtonId,
    onChange,
}: Props) => {
    return (
        <ModalFormAndInfo
            data={virksomhet}
            labels={labels}
            addButtonId={addButtonId}
            renderEditButtons={true}
            onChange={onChange}
            infoRenderer={({ data }) => (
                <VirksomhetSummary virksomhet={data} harFlereVirksomheter={harFlereVirksomheter} />
            )}
            dialogRenderer={({ data, isOpen, onSubmit, onCancel }) => (
                <VirksomhetFormDialog
                    virksomhet={data}
                    harFlereVirksomheter={harFlereVirksomheter}
                    skipOrgNumValidation={skipOrgNumValidation}
                    isOpen={isOpen}
                    onValidSubmit={onSubmit}
                    onCancel={onCancel}
                />
            )}
        />
    );
};
