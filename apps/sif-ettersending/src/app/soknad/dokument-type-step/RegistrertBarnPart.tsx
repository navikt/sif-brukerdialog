import { BodyShort } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import RegistrerteBarnListeHeading from '@navikt/sif-common-ui/src/components/registrerte-barn-liste/RegistrerteBarnListeHeading';
import { dateToISODate, prettifyDate } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../i18n';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';

interface Props {
    registrertBarn: RegistrertBarn[];
}

const RegistrertBarnPart = ({ registrertBarn }: Props) => {
    const { text } = useAppIntl();

    const {
        values: { gjelderEtAnnetBarn, dokumentType },
        setFieldValue,
    } = useFormikContext<SoknadFormData>();

    const handleRegistrertBarnAktørIdChange = (value: string) => {
        const valgteBarn = registrertBarn.find((barn) => barn.aktørId === value);

        if (valgteBarn) {
            setFieldValue(SoknadFormField.valgteRegistrertBarn, {
                aktørId: valgteBarn.aktørId,
                barnetsNavn: formatName(valgteBarn.fornavn, valgteBarn.etternavn, valgteBarn.mellomnavn),
                barnetsFødselsdato: dateToISODate(valgteBarn.fødselsdato).toString(),
            });
        }
    };

    const validateRegistrertBarnAktørId = (value: string) => {
        if (gjelderEtAnnetBarn) {
            return undefined;
        }

        return getRequiredFieldValidator()(value)
            ? {
                  key: `validation.registrertBarnAktørId.${dokumentType}.noValue`,
                  keepKeyUnaltered: true,
              }
            : undefined;
    };

    const handleGjelderAnnetBarnCheckboxChange = (newValue: boolean) => {
        if (newValue) {
            setFieldValue(SoknadFormField.registrertBarnAktørId, undefined);
            setFieldValue(SoknadFormField.valgteRegistrertBarn, undefined);
        } else {
            setFieldValue(SoknadFormField.barnetsFødselsnummer, undefined);
        }
    };

    if (registrertBarn.length === 0) {
        return null;
    }

    return (
        <>
            <SoknadFormComponents.RadioGroup
                name={SoknadFormField.registrertBarnAktørId}
                legend={
                    <RegistrerteBarnListeHeading level="2" size="xsmall">
                        {text('step.dokumentType.registrertBarnPart.spm')}
                    </RegistrerteBarnListeHeading>
                }
                description={
                    <p>
                        <AppText id="step.dokumentType.registrertBarnPart.spm.description" />
                    </p>
                }
                radios={registrertBarn.map((barn) => {
                    const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
                    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
                    return {
                        value: aktørId,
                        label: (
                            <BodyShort as="div">
                                <div>{barnetsNavn}</div>
                                <div>
                                    <AppText
                                        id="step.dokumentType.registrertBarnPart.hvilketBarn.født"
                                        values={{ dato: prettifyDate(fødselsdato) }}
                                    />
                                </div>
                            </BodyShort>
                        ),
                        disabled: gjelderEtAnnetBarn,
                    };
                })}
                afterOnChange={handleRegistrertBarnAktørIdChange}
                validate={validateRegistrertBarnAktørId}
            />

            <FormBlock margin="l">
                <SoknadFormComponents.Checkbox
                    label={text('step.dokumentType.gjelderAnnetBarn')}
                    name={SoknadFormField.gjelderEtAnnetBarn}
                    afterOnChange={handleGjelderAnnetBarnCheckboxChange}
                />
            </FormBlock>
        </>
    );
};

export default RegistrertBarnPart;
