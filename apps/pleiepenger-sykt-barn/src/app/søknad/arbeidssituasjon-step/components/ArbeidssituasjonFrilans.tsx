import { BodyLong, VStack } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';

import { AppText, useAppIntl } from '../../../i18n';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { harFrilansoppdrag } from '../../../utils/frilanserUtils';
import FosterhjemsgodtgjørelseFormPart from './fosterhjemsgodtgjørelse-form-part/FosterhjemsgodtgjørelseFormPart';
import FrilanserFormPart from './frilans-form-part/FrilanserFormPart';
import FrilansoppdragInfo from './info/FrilansoppdragInfo';
import OmsorgsstønadFormPart from './omsorgsstønad-form-part/OmsorgsstønadFormPart';

interface Props {
    søknadsperiode: DateRange;
    søknadsdato: Date;
}

const ArbeidssituasjonFrilans = ({ søknadsperiode, søknadsdato }: Props) => {
    const { text } = useAppIntl();
    const { values } = useFormikContext<SøknadFormValues>();
    const { frilansoppdrag } = values;

    const søkerHarFrilansoppdrag = harFrilansoppdrag(frilansoppdrag);

    return (
        <VStack gap="space-24" data-testid="arbeidssituasjonFrilanser">
            <VStack gap="space-8">
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
        </VStack>
    );
};

export default ArbeidssituasjonFrilans;
