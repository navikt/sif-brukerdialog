export interface ConfirmationDialog {
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    content: React.ReactNode;
    okLabel: string;
    cancelLabel: string;
}
