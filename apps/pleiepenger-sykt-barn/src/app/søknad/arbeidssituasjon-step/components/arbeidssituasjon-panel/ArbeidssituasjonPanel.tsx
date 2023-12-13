import { Heading } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import ResponsivePanel from '../../../../components/responsive-panel/ResponsivePanel';
import './arbeidssituasjonPanel.less';

interface Props {
    title: string;
    description?: JSX.Element;
    titleIcon?: React.ReactNode;
    children: React.ReactNode;
}

const bem = bemUtils('arbeidssituasjonPanel');
const bemItem = bem.child('title');
const ArbeidssituasjonPanel = ({ title, description, titleIcon, children }: Props) => (
    <ResponsivePanel className={bem.block} style={{ padding: '1rem', paddingBottom: '1.7rem' }} border={true}>
        <div className={bemItem.block}>
            {titleIcon && <div className={bemItem.element('icon')}>{titleIcon}</div>}
            <div className={bemItem.element('text')}>
                <Heading level="3" size="small">
                    {title}
                </Heading>
            </div>
        </div>
        {description !== undefined && <div className={bem.element('description')}>{description}</div>}
        <div className={bem.element('content')}>{children}</div>
    </ResponsivePanel>
);

export default ArbeidssituasjonPanel;
