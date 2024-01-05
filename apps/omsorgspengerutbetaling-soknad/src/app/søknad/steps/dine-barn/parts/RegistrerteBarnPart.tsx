import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { FormattedMessage } from 'react-intl';
import { dateFormatter } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { Alert } from '@navikt/ds-react';

interface Props {
    registrerteBarn: RegistrertBarn[];
}

const RegistrerteBarnPart: React.FunctionComponent<Props> = ({ registrerteBarn }) => {
    if (registrerteBarn.length === 0) {
        return (
            <div>
                <Block>
                    <Alert variant="info">Vi fant ikke noen barn registrert på deg.</Alert>
                </Block>
            </div>
        );
    }

    return (
        <Block>
            <ItemList<RegistrertBarn>
                getItemId={(registrerteBarn): string => registrerteBarn.aktørId}
                getItemTitle={(registrerteBarn): string => registrerteBarn.etternavn}
                labelRenderer={(registrerteBarn): React.ReactNode => barnItemLabelRenderer(registrerteBarn)}
                items={registrerteBarn}
            />
        </Block>
    );
};

export default RegistrerteBarnPart;

const barnItemLabelRenderer = (registrertBarn: RegistrertBarn) => {
    return (
        <span className="dineBarn">
            <FormattedMessage
                id="step.dineBarn.født"
                values={{ dato: dateFormatter.compact(registrertBarn.fødselsdato) }}
            />
            <span className="dineBarn__navn">
                {formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn)}
            </span>
        </span>
    );
};
