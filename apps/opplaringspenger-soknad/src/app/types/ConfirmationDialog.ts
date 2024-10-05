export interface ConfirmationDialogType {
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    content: React.ReactNode;
    okLabel: string;
    cancelLabel: string;
}
