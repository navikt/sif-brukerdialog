import { FormattedMessage, useIntl } from 'react-intl';
import { dateToISODate, prettifyDate } from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { BodyShort } from '@navikt/ds-react';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { useFormikContext } from 'formik';

interface Props {
    registrertBarn: RegistrertBarn[];
}

const RegistrertBarnPart = ({ registrertBarn }: Props) => {
    const intl = useIntl();
    const {
        values: { legeerklæringGjelderEtAnnetBarn },
        setFieldValue,
    } = useFormikContext<SoknadFormData>();

    return (
        <>
            {registrertBarn.length > 0 && (
                <>
                    <SoknadFormComponents.RadioGroup
                        name={SoknadFormField.registrertBarnAktørId}
                        legend={intlHelper(intl, 'step.beskrivelse_pp.registrertBarnPart.spm')}
                        radios={registrertBarn.map((barn) => {
                            const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
                            const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
                            return {
                                value: aktørId,
                                key: aktørId,
                                label: (
                                    <BodyShort as="div">
                                        <div>{barnetsNavn}</div>
                                        <div>
                                            <FormattedMessage
                                                id="step.beskrivelse_pp.registrertBarnPart.hvilketBarn.født"
                                                values={{ dato: prettifyDate(fødselsdato) }}
                                            />
                                        </div>
                                    </BodyShort>
                                ),
                                disabled: legeerklæringGjelderEtAnnetBarn,
                            };
                        })}
                        afterOnChange={(value) => {
                            const valgteBarn = registrertBarn.find((barn) => barn.aktørId === value);
                            if (valgteBarn) {
                                setFieldValue(SoknadFormField.valgteRegistrertBarn, {
                                    aktørId: valgteBarn.aktørId,
                                    barnetsNavn: formatName(
                                        valgteBarn.fornavn,
                                        valgteBarn.etternavn,
                                        valgteBarn.mellomnavn,
                                    ),
                                    barnetsFødselsdato: dateToISODate(valgteBarn.fødselsdato).toString(),
                                });
                            }
                        }}
                        validate={legeerklæringGjelderEtAnnetBarn ? undefined : getRequiredFieldValidator()}
                    />

                    <FormBlock margin="l">
                        <SoknadFormComponents.Checkbox
                            label={intlHelper(intl, 'step.beskrivelse_pp.gjelderAnnetBarn')}
                            name={SoknadFormField.legeerklæringGjelderEtAnnetBarn}
                            afterOnChange={(newValue) => {
                                if (newValue) {
                                    setFieldValue(SoknadFormField.registrertBarnAktørId, undefined);
                                    setFieldValue(SoknadFormField.valgteRegistrertBarn, undefined);
                                } else {
                                    setFieldValue(SoknadFormField.barnetsFødselsnummer, undefined);
                                }
                            }}
                        />
                    </FormBlock>
                </>
            )}
        </>
    );
};

export default RegistrertBarnPart;