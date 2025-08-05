import { Alert } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../../i18n';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { harFrilansoppdrag } from '../../../utils/frilanserUtils';
import FosterhjemsgodtgjørelseFormPart from './fosterhjemsgodtgjørelse-form-part/FosterhjemsgodtgjørelseFormPart';
import FrilanserFormPart from './frilans-form-part/FrilanserFormPart';
import FrilansoppdragInfo from './info/FrilansoppdragInfo';
import OmsorgsstønadFormPart from './omsorgsstønad-form-part/OmsorgsstønadFormPart';
import { FrilansFormValues } from '../../../types/søknad-form-values/FrilansFormValues';
import { Arbeidsgiver } from '../../../types';
import { OmsorgsstønadFormValues } from '../../../types/søknad-form-values/OmsorgsstønadFormValues';
import { FosterhjemsgodtgjørelseFormValues } from '../../../types/søknad-form-values/FosterhjemsgodtgjørelseFormValues';

interface Props {
    søknadsperiode: DateRange;
    søknadsdato: Date;
}

const ArbeidssituasjonFrilans = ({ søknadsperiode, søknadsdato }: Props) => {
    const { text } = useAppIntl();
    const { values } = useFormikContext<SøknadFormValues>();
    const { frilansoppdrag, omsorgsstønad } = values;

    const søkerHarFrilansoppdrag = harFrilansoppdrag(frilansoppdrag);

    return (
        <div data-testid="arbeidssituasjonFrilanser">
            <p>
                <AppText id="steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro" />
            </p>
            <ExpandableInfo title={text('steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tittel')}>
                <p>
                    <AppText
                        id="steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.1"
                        values={{ strong: (txt) => <strong>{txt}</strong> }}
                    />
                </p>
                <p>
                    <AppText
                        id="steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.2"
                        values={{ strong: (txt) => <strong>{txt}</strong> }}
                    />
                </p>
                <p>
                    <AppText
                        id="steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.3"
                        values={{ strong: (txt) => <strong>{txt}</strong> }}
                    />
                </p>
            </ExpandableInfo>

            {søkerHarFrilansoppdrag && <FrilansoppdragInfo frilansoppdrag={frilansoppdrag} />}

            <FormBlock>
                <FosterhjemsgodtgjørelseFormPart søknadsperiode={søknadsperiode} />
            </FormBlock>

            <FormBlock>
                <OmsorgsstønadFormPart søknadsperiode={søknadsperiode} />
            </FormBlock>

            <FormBlock>
                <FrilanserFormPart
                    søknadsperiode={søknadsperiode}
                    søknadsdato={søknadsdato}
                    søkerHarFrilansoppdrag={søkerHarFrilansoppdrag}
                    timerOmsorgsstønad={
                        values.omsorgsstønad.mottarOmsorgsstønad === YesOrNo.YES
                            ? getNumberFromNumberInputValue(values.omsorgsstønad.antallTimer)
                            : undefined
                    }
                />
            </FormBlock>

            {visIngenFrilansInformasjon(
                frilansoppdrag,
                omsorgsstønad,
                values.fosterhjemsgodtgjørelse,
                values.frilans,
            ) && (
                <Block margin="l">
                    <Alert variant="info">
                        <AppText id="frilanser.ingenFrilans.info" />
                    </Alert>
                </Block>
            )}
        </div>
    );
};

const visIngenFrilansInformasjon = (
    frilansoppdrag: Arbeidsgiver[],
    omsorgsstønad: OmsorgsstønadFormValues,
    fosterhjem: FosterhjemsgodtgjørelseFormValues,
    frilans: FrilansFormValues,
): boolean => {
    if (frilansoppdrag.length === 0) {
        return false;
    }
    return (
        frilans.harHattInntektSomFrilanser === YesOrNo.NO &&
        omsorgsstønad.mottarOmsorgsstønad === YesOrNo.NO &&
        fosterhjem.mottarFosterhjemsgodtgjørelse === YesOrNo.NO
    );
};

export default ArbeidssituasjonFrilans;
