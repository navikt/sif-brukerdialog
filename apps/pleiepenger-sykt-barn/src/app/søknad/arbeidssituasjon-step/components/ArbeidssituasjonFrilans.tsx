import { Alert } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../../i18n';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { harFrilansoppdrag } from '../../../utils/frilanserUtils';
import FosterhjemsgodtgjørelseFormPart from './fosterhjemsgodtgjørelse-form-part/FosterhjemsgodtgjørelseFormPart';
import FrilanserFormPart from './frilans-form-part/FrilanserFormPart';
import FrilansoppdragInfo from './info/FrilansoppdragInfo';
import OmsorgsstønadFormPart from './omsorgsstønad-form-part/OmsorgsstønadFormPart';
import { Arbeidsgiver } from '../../../types';

interface Props {
    søknadsperiode: DateRange;
    søknadsdato: Date;
    arbeidsgivere: Arbeidsgiver[];
}

const ArbeidssituasjonFrilans = ({ søknadsperiode, søknadsdato, arbeidsgivere }: Props) => {
    const { text } = useAppIntl();
    const { values } = useFormikContext<SøknadFormValues>();
    const { frilansoppdrag, omsorgsstønad } = values;

    const søkerHarFrilansoppdrag = harFrilansoppdrag(frilansoppdrag);

    return (
        <div data-testid="arbeidssituasjonFrilanser">
            <p>
                <AppText id={'steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro'} />
            </p>
            <ExpandableInfo title={text('steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tittel')}>
                <p>
                    <AppText
                        id={'steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.1'}
                        values={{ strong: (txt) => <strong>{txt}</strong> }}
                    />
                </p>
                <p>
                    <AppText
                        id={'steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.2'}
                        values={{ strong: (txt) => <strong>{txt}</strong> }}
                    />
                </p>
                <p>
                    <AppText
                        id={'steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.3'}
                        values={{ strong: (txt) => <strong>{txt}</strong> }}
                    />
                </p>
            </ExpandableInfo>
            {søkerHarFrilansoppdrag && <FrilansoppdragInfo frilansoppdrag={frilansoppdrag} />}
            <FormBlock>
                <FosterhjemsgodtgjørelseFormPart arbeidsgivere={arbeidsgivere} søknadsperiode={søknadsperiode} />
            </FormBlock>
            <FormBlock>
                <OmsorgsstønadFormPart søknadsperiode={søknadsperiode} />
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
                omsorgsstønad.mottarOmsorgsstønad === YesOrNo.NO && (
                    <Block margin="l">
                        <Alert variant="info">
                            <AppText id={'frilanser.ingenFrilans.info'} />
                        </Alert>
                    </Block>
                )}
        </div>
    );
};

export default ArbeidssituasjonFrilans;
