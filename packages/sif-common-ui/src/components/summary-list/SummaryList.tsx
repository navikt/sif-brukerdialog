import { List } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import classNames from 'classnames';
import './summaryList.scss';

interface Props<ItemType> {
    items: ItemType[];
    bullets?: boolean;
    useAkselList?: boolean;
    variant?: 'blocks' | 'bullet-blocks';
    itemTitleRenderer?: (data: ItemType) => string;
    itemRenderer: (data: ItemType) => React.ReactNode;
}

const bem = bemUtils('summaryList');

function SummaryList<ItemType = any>({
    items,
    itemRenderer,
    useAkselList,
    itemTitleRenderer,
    variant,
    bullets,
}: Props<ItemType>) {
    return useAkselList || variant !== undefined ? (
        <List>
            {items.map((item, idx) => (
                <List.Item
                    key={idx}
                    title={itemTitleRenderer ? itemTitleRenderer(item) : undefined}
                    className={variant !== undefined ? `sif_navds-form-summary-listItem--${variant}` : undefined}>
                    {itemRenderer(item)}
                </List.Item>
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
}

export default SummaryList;
