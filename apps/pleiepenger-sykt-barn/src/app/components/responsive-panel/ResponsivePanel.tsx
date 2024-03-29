import { Panel, PanelProps } from '@navikt/ds-react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import classNames from 'classnames';
import './responsivePanel.less';

const bem = bemUtils('responsivePanel');

const ResponsivePanel = ({ className, ...rest }: PanelProps) => (
    <Panel className={classNames(bem.block, className)} {...rest} />
);

export default ResponsivePanel;
