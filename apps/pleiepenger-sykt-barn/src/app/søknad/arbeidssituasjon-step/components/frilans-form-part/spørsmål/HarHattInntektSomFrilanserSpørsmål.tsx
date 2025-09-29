import { useAppIntl } from '@i18n/index';
import { BodyShort } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getYesOrNoValidator } from '@navikt/sif-validation';

import { AppText } from '../../../../../i18n';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    søkerHarFrilansoppdrag: boolean;
    søkerMottarOmsorgsstønad: boolean;
}

const HarHattInntektSomFrilanserSpørsmål = ({ søkerHarFrilansoppdrag, søkerMottarOmsorgsstønad }: Props) => {
    const { text } = useAppIntl();
    return (
        <ArbFriFormComponents.YesOrNoQuestion
            name={FrilansFormField.harHattInntektSomFrilanser}
            legend={text('frilanser.harDuHattInntekt.spm')}
            validate={getYesOrNoValidator()}
            description={
                <>
                    {søkerMottarOmsorgsstønad && (
                        <BodyShort spacing={true}>
                            <AppText id="frilanser.harDuHattInntekt.omsorgsstønad" />
                        </BodyShort>
                    )}

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
                </>
            }
        />
    );
};

export default HarHattInntektSomFrilanserSpørsmål;
