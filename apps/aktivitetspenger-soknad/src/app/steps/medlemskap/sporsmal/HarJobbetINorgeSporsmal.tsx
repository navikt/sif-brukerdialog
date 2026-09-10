import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { BodyLong, ReadMore } from '@navikt/ds-react';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

interface Props {}

export const HarJobbetINorgeSporsmal = ({}: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetINorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetINorge')}
            description={
                <>
                    <ReadMore header="Hva regnes som sammenhengende jobb i Norge?">
                        <BodyLong>
                            Dette er hvis du har jobbet og hatt inntekt i Norge, eller har mottatt ytelser fra norske
                            myndigheter som erstatning for inntekt, for eksempel dagpenger, sykepenger og
                            foreldrepenger.
                        </BodyLong>
                        <BodyLong>Hva om hen har jobbet i 2 år?</BodyLong>
                        {/* {text('medlemskapSteg.readMore.ytelserINorge.tekst')} */}
                    </ReadMore>
                </>
            }
            validate={validateField(MedlemskapFormFields.harJobbetINorge, getYesOrNoValidator())}
        />
    );
};
