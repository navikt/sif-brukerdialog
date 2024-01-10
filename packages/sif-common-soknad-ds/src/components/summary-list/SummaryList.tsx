import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import React from 'react';
import './summaryList.scss';

interface Props {
    items: any[];
    bullets?: boolean;
    itemRenderer: (data: any) => React.ReactNode;
}

const bem = bemUtils('summaryList');

const SummaryList: React.FunctionComponent<Props> = ({ items, itemRenderer, bullets }) => (
    <ul className={bem.classNames(bem.block, bem.modifierConditional('bullet', bullets))}>
        {items.map((item, idx) => (
            <li key={idx} className={bem.element('item')}>
                {itemRenderer(item)}
            </li>
        ))}
    </ul>
);

export default SummaryList;
