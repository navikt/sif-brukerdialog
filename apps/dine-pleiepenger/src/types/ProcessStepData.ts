export interface ProcessStepData {
    title: string;
    content: React.ReactNode;
    timestamp?: Date;
    completed?: boolean;
    current?: boolean;
    isContinuation?: boolean;
    isLastStep?: boolean;
}
