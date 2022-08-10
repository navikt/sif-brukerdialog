import React from 'react';
import { Element } from 'nav-frontend-typografi';
import bemUtils from '../../utils/bemUtils';
import StatusIkon, { StatusIconStatusKey } from './status-icon/StatusIcon';

interface Props {
    image: React.ReactNode;
    status: StatusIconStatusKey;
    statusText: string;
    description: string;
}

const bem = bemUtils('pictureScanningGuide').child('example');

const PictureScanningExample = ({ image, status, statusText, description }: Props) => (
    <div className={bem.block}>
        <div className={bem.element('image')}>{image}</div>
        <Element tag="div" className={bem.element('title')}>
            <span className={bem.element('statusIcon')} role="presentation">
                <StatusIkon status={status} />
            </span>
            {statusText}
        </Element>
        <div className={bem.element('description')}>{description}</div>
    </div>
);

export default PictureScanningExample;
