import ActionLink from '@navikt/sif-common-core/lib/components/action-link/ActionLink';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getFraværÅrsakTekstKort } from './fraværMessages';
import { FraværÅrsak } from './types';

interface Props {
    title: string;
    årsak?: FraværÅrsak;
    onEdit?: () => void;
}

const FraværListItem: React.FunctionComponent<Props> = ({ title, årsak, onEdit }: Props) => {
    const intl = useIntl();
    return (
        <div style={{ padding: '.5rem 0' }}>
            <div>{onEdit ? <ActionLink onClick={() => onEdit()}>{title}</ActionLink> : { title }}</div>
            {årsak && årsak !== FraværÅrsak.ordinært && (
                <div style={{ marginTop: '.25rem' }}>
                    <FormattedMessage
                        id={`fravær.list.årsak`}
                        values={{ årsak: getFraværÅrsakTekstKort(årsak, intl) }}
                    />
                </div>
            )}
        </div>
    );
};

export default FraværListItem;
