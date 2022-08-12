import React from 'react';
import bemUtils from '../../utils/bemUtils';
import './summaryList.scss';

interface Props {
    items: any[];
    bullets?: boolean;
    itemRenderer: (data: any) => React.ReactNode;
}

const bem = bemUtils('summaryList');

const SummaryList = ({ items, itemRenderer, bullets }: Props) => (
    <ul className={bem.classNames(bem.block, bem.modifierConditional('bullet', bullets))}>
        {items.map((item, idx) => (
            <li key={idx} className={bem.element('item')}>
                {itemRenderer(item)}
            </li>
        ))}
    </ul>
);

export default SummaryList;
