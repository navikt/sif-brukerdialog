import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import React from 'react';
import './summaryList.scss';
import classNames from 'classnames';
import { List } from '@navikt/ds-react';

interface Props {
    items: any[];
    bullets?: boolean;
    useAkselList?: boolean;
    itemRenderer: (data: any) => React.ReactNode;
}

const bem = bemUtils('summaryList');

const SummaryList = ({ items, itemRenderer, useAkselList, bullets }: Props) => {
    return useAkselList ? (
        <List>
            {items.map((item, idx) => (
                <List.Item key={idx}>{itemRenderer(item)}</List.Item>
            ))}
        </List>
    ) : (
        <ul className={classNames(bem.block, bem.modifierConditional('bullet', bullets))}>
            {items.map((item, idx) => (
                <li key={idx} className={bem.element('item')}>
                    {itemRenderer(item)}
                </li>
            ))}
        </ul>
    );
};

export default SummaryList;
