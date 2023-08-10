import { Alert } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { harFrilansoppdrag } from '../../../utils/frilanserUtils';
import FrilanserFormPart from './frilans-form-parts/FrilanserFormPart';
import StønadsgodtgjørelseFormPart from './frilans-form-parts/StønadsgodtgjørelseFormPart';
import FrilansoppdragInfo from './info/FrilansoppdragInfo';

interface Props {
    søknadsperiode: DateRange;
    søknadsdato: Date;
}

const ArbeidssituasjonFrilans = ({ søknadsperiode, søknadsdato }: Props) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const { frilansoppdrag, stønadGodtgjørelse } = values;

    const søkerHarFrilansoppdrag = harFrilansoppdrag(frilansoppdrag);

    return (
        <div data-testid="arbeidssituasjonFrilanser">
            {søkerHarFrilansoppdrag && <FrilansoppdragInfo frilansoppdrag={frilansoppdrag} />}
            <FormBlock>
                <StønadsgodtgjørelseFormPart søknadsperiode={søknadsperiode} />
            </FormBlock>

            <FormBlock>
                <FrilanserFormPart
                    søknadsperiode={søknadsperiode}
                    søknadsdato={søknadsdato}
                    søkerHarFrilansoppdrag={søkerHarFrilansoppdrag}
                />
            </FormBlock>

            {frilansoppdrag.length > 0 &&
                values.frilans.harHattInntektSomFrilanser === YesOrNo.NO &&
                stønadGodtgjørelse.mottarStønadGodtgjørelse === YesOrNo.NO && (
                    <Block margin="l">
                        <Alert variant="info">
                            <FormattedMessage id={'frilanser.ingenFrilans.info'} />
                        </Alert>
                    </Block>
                )}
        </div>
    );
};

export default ArbeidssituasjonFrilans;
