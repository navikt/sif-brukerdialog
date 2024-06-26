import { Alert } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '../../../../i18n';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';

interface Props {
    registrerteBarn: RegistrertBarn[];
}

const RegistrerteBarnPart: React.FunctionComponent<Props> = ({ registrerteBarn }) => {
    if (registrerteBarn.length === 0) {
        return (
            <div>
                <Block padBottom="l">
                    <Alert variant="info">
                        <AppText id="step.dineBarn.info.ingenbarn" />
                    </Alert>
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
            <AppText id="step.dineBarn.født" values={{ dato: dateFormatter.compact(registrertBarn.fødselsdato) }} />
            <span className="dineBarn__navn">
                {formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn)}
            </span>
        </span>
    );
};
