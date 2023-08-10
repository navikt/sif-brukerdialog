import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    søkerHarFrilansoppdrag: boolean;
}

const HarHattInntektSomFrilanserSpørsmål: React.FunctionComponent<Props> = ({ søkerHarFrilansoppdrag }) => {
    const intl = useIntl();
    return (
        <ArbFriFormComponents.YesOrNoQuestion
            name={FrilansFormField.harHattInntektSomFrilanser}
            legend={intlHelper(intl, 'frilanser.harDuHattInntekt.spm')}
            validate={getYesOrNoValidator()}
            description={
                <ExpandableInfo
                    title={
                        søkerHarFrilansoppdrag
                            ? intlHelper(intl, 'frilanser.harDuHattInntekt.hvaBetyr.spm')
                            : intlHelper(intl, 'frilanser.hjelpetekst.spm')
                    }>
                    <>
                        {søkerHarFrilansoppdrag && (
                            <>
                                <p>
                                    <FormattedMessage id="frilanser.harDuHattInntekt.hvaBetyr.info.1" />
                                </p>
                            </>
                        )}
                        {!søkerHarFrilansoppdrag && (
                            <>
                                <p>
                                    <FormattedMessage id="frilanser.hjelpetekst.1" />
                                </p>
                            </>
                        )}
                    </>
                </ExpandableInfo>
            }
        />
    );
};

export default HarHattInntektSomFrilanserSpørsmål;
