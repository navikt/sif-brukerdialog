import { BodyShort } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { resetFieldValue, resetFieldValues, SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { prettifyDate } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { AppText } from '../../i18n';
import { RegistrerteBarn } from '../../types';
import { initialValues, SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import SøknadFormComponents from '../SøknadFormComponents';

interface Props {
    søkersBarn: RegistrerteBarn[];
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
                legend={text('steg.omBarnet.hvilketBarn.spm')}
                description={
                    <ExpandableInfo title={text('steg.omBarnet.hvilketBarn.description.tittel')}>
                        <p>
                            <AppText id={'steg.omBarnet.hvilketBarn.description.info.1'} />
                        </p>
                        <p>
                            <AppText id={'steg.omBarnet.hvilketBarn.description.info.2'} />
                        </p>
                        <p>
                            <AppText id={'steg.omBarnet.hvilketBarn.description.info.3'} />
                        </p>
                    </ExpandableInfo>
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
