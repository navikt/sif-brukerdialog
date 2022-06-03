/// <reference types="react" />
export declare type StatusIconStatusKey = 'suksess' | 'advarsel' | 'feil';
export interface Props {
    status: StatusIconStatusKey;
    title?: string;
    size?: number;
}
declare const StatusIkon: (props: Props) => JSX.Element;
export default StatusIkon;
