import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import FormSection from '../../../components/form-section/FormSection';
import { FrilansFormField } from '../../../types/FrilansFormData';
import { FrilanserSøknadsdata } from '../../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import ArbeiderIPeriodenSpørsmål from './arbeider-i-perioden-spørsmål/ArbeiderIPeriodenSpørsmål';
import HonorararbeidIPeriodenSpørsmål from './arbeider-i-perioden-spørsmål/HonorararbeidIPeriodenSpørsmål';

interface Props {
    frilanser: FrilanserSøknadsdata;
}

const ArbeidstidFrilanser: React.FunctionComponent<Props> = ({ frilanser }) => {
    const intl = useIntl();

    if (frilanser.harInntektSomFrilanser === false || frilanser.misterInntektSomFrilanserIPeriode === false) {
        return null;
    }

    return (
        <FormSection title={intlHelper(intl, 'arbeidIPeriode.FrilansLabel')}>
            <>
                <div data-testid="arbeidIPerioden_frilanser">
                    {frilanser.frilansarbeid && (
                        <FormBlock>
                            <ArbeiderIPeriodenSpørsmål
                                fieldName={FrilansFormField.frilansarbeid_arbeiderIPeriodenSvar as any}
                                hvor={`som frilanser`}
                                validationKey="validation.arbeidIPeriode.frilanser"
                            />
                        </FormBlock>
                    )}
                    {frilanser.honorararbeid && (
                        <FormBlock>
                            <HonorararbeidIPeriodenSpørsmål
                                fieldName={FrilansFormField.honorararbeid_arbeiderIPeriodenSvar as any}
                            />
                        </FormBlock>
                    )}
                </div>
            </>
        </FormSection>
    );
};

export default ArbeidstidFrilanser;
