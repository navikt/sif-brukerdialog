import { Panel, PanelProps } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '../../../utils/bemUtils';
import './responsivePanel.scss';

const bem = bemUtils('responsivePanel');

const ResponsivePanel = ({ className, ...rest }: PanelProps) => (
    <Panel className={bem.classNames(bem.block, className)} {...rest} />
);

export default ResponsivePanel;
