import React from 'react';
import { StatusIconStatusKey } from './status-icon/StatusIcon';
interface Props {
    image: React.ReactNode;
    status: StatusIconStatusKey;
    statusText: string;
    description: string;
}
declare const PictureScanningExample: ({ image, status, statusText, description }: Props) => JSX.Element;
export default PictureScanningExample;
