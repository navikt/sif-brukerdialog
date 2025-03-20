import { BodyShort } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import { RegistrertBarn } from '@navikt/sif-common-api';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { resetFieldValue, resetFieldValues, SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import RegistrerteBarnListeHeading from '@navikt/sif-common-ui/src/components/registrerte-barn-liste/RegistrerteBarnListeHeading';
import { prettifyDate } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { AppText } from '../../i18n';
import { initialValues, SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import SøknadFormComponents from '../SøknadFormComponents';

interface Props {
    søkersBarn: RegistrertBarn[];
}

const RegistrertBarnPart = ({ søkersBarn }: Props) => {
    const { text } = useAppIntl();
    const {
        values: { søknadenGjelderEtAnnetBarn },
        setFieldValue,
    } = useFormikContext<SøknadFormValues>();

    return (
        <SkjemagruppeQuestion legend="Barn" hideLegend={true}>
            <SøknadFormComponents.RadioGroup
                name={SøknadFormField.barnetSøknadenGjelder}
                legend={
                    <RegistrerteBarnListeHeading level="2" size="xsmall">
                        {text('steg.omBarnet.hvilketBarn.spm')}
                    </RegistrerteBarnListeHeading>
                }
                radios={søkersBarn.map((barn) => {
                    const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
                    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
                    return {
                        value: aktørId,
                        label: (
                            <BodyShort as="div">
                                <div>{barnetsNavn}</div>
                                <div>
                                    <AppText
                                        id="steg.omBarnet.hvilketBarn.født"
                                        values={{ dato: prettifyDate(fødselsdato) }}
                                    />
                                </div>
                            </BodyShort>
                        ),
                        disabled: søknadenGjelderEtAnnetBarn,
                    };
                })}
                validate={søknadenGjelderEtAnnetBarn ? undefined : getRequiredFieldValidator()}
            />
            <FormBlock margin="l">
                <SøknadFormComponents.Checkbox
                    label={text('steg.omBarnet.gjelderAnnetBarn')}
                    name={SøknadFormField.søknadenGjelderEtAnnetBarn}
                    afterOnChange={(newValue) => {
                        if (newValue) {
                            resetFieldValue(SøknadFormField.barnetSøknadenGjelder, setFieldValue, initialValues);
                        } else {
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
                    }}
                />
            </FormBlock>
        </SkjemagruppeQuestion>
    );
};

export default RegistrertBarnPart;
