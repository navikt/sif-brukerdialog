import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { dateFormatter } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { Alert, BodyShort, VStack } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';

interface Props {
    registrerteBarn: RegistrertBarn[];
}

const RegistrerteBarnPart: React.FunctionComponent<Props> = ({ registrerteBarn }) => {
    if (registrerteBarn.length === 0) {
        return (
            <div>
                <Block padBottom="l">
                    <Alert variant="info">
                        <AppText id="step.dineBarn.registrerteBarn.ingenFunnet" />
                    </Alert>
                </Block>
            </div>
        );
    }

    return (
        <VStack gap="2">
            <BodyShort spacing={true}>
                <AppText id="step.dineBarn.registrerteBarn.tekst" />
            </BodyShort>

            <ItemList<RegistrertBarn>
                getItemId={(registrerteBarn): string => registrerteBarn.aktørId}
                getItemTitle={(registrerteBarn): string => registrerteBarn.etternavn}
                labelRenderer={(registrerteBarn): React.ReactNode => barnItemLabelRenderer(registrerteBarn)}
                items={registrerteBarn}
            />
        </VStack>
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
