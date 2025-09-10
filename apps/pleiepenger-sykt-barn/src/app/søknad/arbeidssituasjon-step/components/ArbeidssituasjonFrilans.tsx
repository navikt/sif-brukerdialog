import { Alert, BodyLong, VStack } from '@navikt/ds-react';
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
import { FormLayout } from '@navikt/sif-common-ui';

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
        <VStack gap="6" data-testid="arbeidssituasjonFrilanser">
            <VStack gap="2">
                <BodyLong>
                    <AppText id="steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro" />
                </BodyLong>
                <ExpandableInfo title={text('steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tittel')}>
                    <BodyLong spacing={true}>
                        <AppText
                            id="steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.1"
                            values={{ strong: (txt) => <strong>{txt}</strong> }}
                        />
                    </BodyLong>
                    <BodyLong spacing={true}>
                        <AppText
                            id="steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.2"
                            values={{ strong: (txt) => <strong>{txt}</strong> }}
                        />
                    </BodyLong>
                    <BodyLong spacing={true}>
                        <AppText
                            id="steg.arbeidssituasjon.arbeidssituasjonFrilanser.intro.info.tekst.3"
                            values={{ strong: (txt) => <strong>{txt}</strong> }}
                        />
                    </BodyLong>
                </ExpandableInfo>
            </VStack>

            <FormLayout.Questions>
                {søkerHarFrilansoppdrag && <FrilansoppdragInfo frilansoppdrag={frilansoppdrag} />}

                <FosterhjemsgodtgjørelseFormPart søknadsperiode={søknadsperiode} />

                <OmsorgsstønadFormPart søknadsperiode={søknadsperiode} />

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
            </FormLayout.Questions>
            {visIngenFrilansInformasjon(
                frilansoppdrag,
                omsorgsstønad,
                values.fosterhjemsgodtgjørelse,
                values.frilans,
            ) && (
                <Alert variant="info">
                    <AppText id="frilanser.ingenFrilans.info" />
                </Alert>
            )}
        </VStack>
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
