import { useAppIntl } from '@i18n/index';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { resetFieldValues, SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds';
import { AnnetBarnValue, VelgBarnInput } from '@navikt/sif-common-ui';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';
import { initialValues, SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { useEffect } from 'react';

interface Props {
    søkersBarn: RegistrertBarn[];
}

const RegistrertBarnPart = ({ søkersBarn }: Props) => {
    const { text } = useAppIntl();
    const {
        values: { barnetSøknadenGjelder },

        setFieldValue,
    } = useFormikContext<SøknadFormValues>();

    const søknadenGjelderEtAnnetBarn = barnetSøknadenGjelder === AnnetBarnValue;

    useEffect(() => {
        if (barnetSøknadenGjelder !== AnnetBarnValue) {
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
            <VelgBarnInput
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
