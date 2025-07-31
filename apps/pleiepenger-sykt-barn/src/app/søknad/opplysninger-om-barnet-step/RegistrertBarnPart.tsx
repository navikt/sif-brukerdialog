import { useEffect } from 'react';
import { useAppIntl } from '@i18n/index';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { resetFieldValues, SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds';
import { VelgBarn_AnnetBarnValue, VelgBarnFormPart } from '@navikt/sif-common-forms-ds';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';
import { initialValues, SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';

interface Props {
    søkersBarn: RegistrertBarn[];
}

const RegistrertBarnPart = ({ søkersBarn }: Props) => {
    const { text } = useAppIntl();
    const {
        values: { barnetSøknadenGjelder },

        setFieldValue,
    } = useFormikContext<SøknadFormValues>();

    const søknadenGjelderEtAnnetBarn = barnetSøknadenGjelder === VelgBarn_AnnetBarnValue;

    useEffect(() => {
        if (barnetSøknadenGjelder !== VelgBarn_AnnetBarnValue) {
            resetFieldValues(
                [
                    SøknadFormField.barnetsFødselsnummer,
                    SøknadFormField.barnetsFødselsdato,
                    SøknadFormField.barnetsNavn,
                    SøknadFormField.årsakManglerIdentitetsnummer,
                    SøknadFormField.barnetHarIkkeFnr,
                    SøknadFormField.relasjonTilBarnet,
                ],
                setFieldValue,
                initialValues,
            );
        }
    }, [søknadenGjelderEtAnnetBarn, barnetSøknadenGjelder]);

    return (
        <SkjemagruppeQuestion legend="Barn" hideLegend={true}>
            <VelgBarnFormPart
                name={SøknadFormField.barnetSøknadenGjelder}
                legend={text('steg.omBarnet.hvilketBarn.spm')}
                registrerteBarn={søkersBarn}
                validate={getRequiredFieldValidator()}
                inkluderAnnetBarn={true}
            />
        </SkjemagruppeQuestion>
    );
};

export default RegistrertBarnPart;
