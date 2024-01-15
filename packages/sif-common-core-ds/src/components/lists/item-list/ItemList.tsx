import React from 'react';
import { guid } from '@navikt/sif-common-utils';
import classNames from 'classnames';
import ActionLink from '../../../atoms/action-link/ActionLink';
import DeleteButton from '../../../atoms/delete-button/DeleteButton';
import bemUtils from '../../../utils/bemUtils';
import './itemList.scss';

interface Props<T> {
    items: T[];
    useTrashcan?: boolean;
    getItemId: (item: T) => string | undefined;
    getItemTitle: (item: T) => string;
    labelRenderer?: (item: T, onEdit?: (item: T) => void) => React.ReactNode;
    iconRender?: (item: T) => React.ReactNode;
    onDelete?: (item: T) => void;
    onEdit?: (item: T) => void;
    deleteRenderer?: (item: T) => React.ReactNode;
}

const bem = bemUtils('itemList');

const bemItem = bem.child('item');

function ItemList<T>({
    items,
    onDelete,
    onEdit,
    labelRenderer,
    iconRender,
    getItemId,
    getItemTitle,
    deleteRenderer,
    useTrashcan = false,
}: Props<T>) {
    return (
        <ol className={classNames(bem.block)}>
            {items.map((item) => {
                const itemTitle = getItemTitle(item);
                return (
                    <li key={getItemId(item) || guid()} className={bemItem.block}>
                        {iconRender && (
                            <span className={bemItem.element('icon')} role="presentation">
                                {iconRender(item)}
                            </span>
                        )}
                        <span className={bemItem.element('label')}>
                            {labelRenderer ? (
                                labelRenderer(item)
                            ) : onEdit ? (
                                <ActionLink onClick={() => onEdit(item)}>{itemTitle}</ActionLink>
                            ) : (
                                itemTitle
                            )}
                        </span>
                        {onDelete && (
                            <span className={bemItem.element('delete')}>
                                <DeleteButton
                                    ariaLabel={`Fjern ${itemTitle}`}
                                    onClick={() => onDelete(item)}
                                    useTrashcan={useTrashcan}
                                />
                            </span>
                        )}
                        {!onDelete && deleteRenderer && deleteRenderer(item)}
                    </li>
                );
            })}
        </ol>
    );
}
export default ItemList;
