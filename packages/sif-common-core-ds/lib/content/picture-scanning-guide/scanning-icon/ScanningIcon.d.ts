/// <reference types="react" />
interface ScanProps {
    title?: string;
    height?: number;
}
declare type ScanIconStatusKey = 'good' | 'keystone' | 'horizontal' | 'shadow';
export interface Props extends ScanProps {
    status: ScanIconStatusKey;
}
declare const ScanningIkon: (props: Props) => JSX.Element;
export default ScanningIkon;
