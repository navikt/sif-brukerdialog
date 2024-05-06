import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { AppText } from '../../../../../i18n';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    søkerHarFrilansoppdrag: boolean;
    søkerMottarOmsorgsstønad: boolean;
}

const HarHattInntektSomFrilanserSpørsmål: React.FunctionComponent<Props> = ({
    søkerHarFrilansoppdrag,
    søkerMottarOmsorgsstønad,
}) => {
    const { text } = useAppIntl();
    return (
        <ArbFriFormComponents.YesOrNoQuestion
            name={FrilansFormField.harHattInntektSomFrilanser}
            legend={text('frilanser.harDuHattInntekt.spm')}
            validate={getYesOrNoValidator()}
            description={
                <>
                    {søkerMottarOmsorgsstønad && (
                        <BodyShort spacing={false}>
                            <AppText id="frilanser.harDuHattInntekt.omsorgsstønad" />
                        </BodyShort>
                    )}
                    <Block margin="m">
                        <ExpandableInfo
                            title={
                                søkerHarFrilansoppdrag
                                    ? text('frilanser.harDuHattInntekt.hvaBetyr.spm')
                                    : text('frilanser.hjelpetekst.spm')
                            }>
                            <>
                                {søkerHarFrilansoppdrag && (
                                    <>
                                        <p>
                                            <AppText id="frilanser.harDuHattInntekt.hvaBetyr.info.1" />
                                        </p>
                                        <p>
                                            <AppText id="frilanser.harDuHattInntekt.hvaBetyr.info.2" />
                                        </p>
                                    </>
                                )}
                                {!søkerHarFrilansoppdrag && (
                                    <>
                                        <p>
                                            <AppText id="frilanser.hjelpetekst.1" />
                                        </p>
                                    </>
                                )}
                            </>
                        </ExpandableInfo>
                    </Block>
                </>
            }
        />
    );
};

export default HarHattInntektSomFrilanserSpørsmål;
