import './itemListDarkside.css';

import { guid } from '@navikt/sif-common-utils';
import React from 'react';

import { useSifSoknadUiIntl } from '../../i18n';
import ActionLink from '../action-link/ActionLink';
import DeleteButton from '../delete-button/DeleteButton';

interface Props<T> {
    items: T[];
    useTrashcan?: boolean;
    getItemId: (item: T) => string;
    getItemTitle: (item: T) => string;
    labelRenderer?: (item: T, onEdit?: (item: T) => void) => React.ReactNode;
    iconRender?: (item: T) => React.ReactNode;
    onDelete?: (item: T) => void;
    onEdit?: (item: T) => void;
    deleteRenderer?: (item: T) => React.ReactNode;
}

function ItemListDarkside<T>({
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
    const { text } = useSifSoknadUiIntl();

    return (
        <ol className="itemListDarkside">
            {items.map((item) => {
                const itemTitle = getItemTitle(item);
                return (
                    <li key={getItemId(item) || guid()} className="itemListDarkside__item">
                        {iconRender && (
                            <span className="itemListDarkside__item__icon" role="presentation">
                                {iconRender(item)}
                            </span>
                        )}
                        <span className="itemListDarkside__item__label">
                            {labelRenderer ? (
                                labelRenderer(item, onEdit)
                            ) : onEdit ? (
                                <ActionLink onClick={() => onEdit(item)}>{itemTitle}</ActionLink>
                            ) : (
                                itemTitle
                            )}
                        </span>
                        {onDelete && (
                            <span className="itemListDarkside__item__delete">
                                <DeleteButton
                                    ariaLabel={text('@sifSoknadUi.itemListDarkside.deleteAriaLabel', {
                                        itemTitle,
                                    })}
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
export default ItemListDarkside;
