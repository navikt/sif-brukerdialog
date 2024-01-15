import { Alert } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { harFrilansoppdrag } from '../../../utils/frilanserUtils';
import FrilanserFormPart from './frilans-form-parts/FrilanserFormPart';
import StønadsgodtgjørelseFormPart from './frilans-form-parts/StønadsgodtgjørelseFormPart';
import FrilansoppdragInfo from './info/FrilansoppdragInfo';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

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
            <p>
                I tillegg til å jobbe som frilanser, er det andre oppdrag som regnes som frilansoppdrag. Les mer om
                hvilke frilansoppdrag som må oppgis i denne søknaden:
            </p>
            <ExpandableInfo title="Om frilans, honorar, fosterhjemsgodtgjørelse og omsorgsstønad">
                <p>
                    Du er frilanser når du mottar lønn som en vanlig ansatt, <strong>uten</strong> å være ansatt hos den
                    du utfører arbeidet for. Som frilanser betaler du skatt på samme måte som en arbeidstaker, og
                    leverer skattemelding som arbeidstaker.
                </p>
                <p>
                    Du regnes også som frilanser når du mottar <strong>honorar</strong> for et utført oppdrag. Det kan
                    for eksempel være utbetalt honorar i forbindelse med et styreverv i borettslaget, eller som trener
                    for et håndball-lag. Honorar blir også ofte brukt av frie yrker som forfattere, fotografer og
                    kunstnere.
                </p>
                <p>
                    I tillegg er <strong>fosterhjemsgodtgjørelse</strong> og <strong>omsorgsstønad</strong> fra kommunen
                    også regnet som frilansoppdrag.
                </p>
            </ExpandableInfo>
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
