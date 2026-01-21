import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Tooltip } from '@navikt/ds-react';
import { isValidationErrorsVisible } from '@navikt/sif-common-formik-ds';
import { Enkeltdato } from '@navikt/sif-common-forms-ds/src';
import EnkeltdatoListAndDialog from '@navikt/sif-common-forms-ds/src/forms/enkeltdatoer/EnkeltdatoListAndDialog';
import { FormLayout } from '@navikt/sif-common-ui';
import { capsFirstCharacter, dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { getStringValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';

import { useAppIntl } from '../../../../../i18n';
import { KursFormComponents, KursFormFields } from '../../KursStepForm';
import { getDatoerUtenforSøknadsperioder, getReisedagerValidator } from '../../utils/kursStepUtils';

interface Props {
    reisedager: Enkeltdato[];
    søknadsperiode: DateRange;
    disabledDateRanges: DateRange[];
    kursperioder: DateRange[];
}

const maksTegnBeskrivelse = 250;

const ReisedagerFormPart = ({ reisedager, søknadsperiode, disabledDateRanges, kursperioder }: Props) => {
    const { text } = useAppIntl();
    const formik = useFormikContext();
    const visFeil = isValidationErrorsVisible(formik);
    const reisedagerUtenforSøknadsperioder = getDatoerUtenforSøknadsperioder(
        reisedager.map((d) => d.dato),
        kursperioder,
    );
    return (
        <FormLayout.Panel>
            <FormLayout.Questions>
                <EnkeltdatoListAndDialog
                    name={KursFormFields.reisedager}
                    labels={{
                        addLabel: text('steg.kurs.reisedagerFormPart.modal.addLabel'),
                        modalTitle: text('steg.kurs.reisedagerFormPart.modal.modalTitle'),
                        listTitle: text('steg.kurs.reisedagerFormPart.modal.listTitle'),
                        modalDescription: text('steg.kurs.reisedagerFormPart.modal.modalDescription'),
                    }}
                    minDate={søknadsperiode.from}
                    maxDate={søknadsperiode.to}
                    disableWeekends={true}
                    labelRenderer={(dato: Enkeltdato) => {
                        const erUtenforSøknadsperiode = reisedagerUtenforSøknadsperioder.includes(dato.dato);
                        if (erUtenforSøknadsperiode && visFeil) {
                            return (
                                <HStack gap="space-8">
                                    {capsFirstCharacter(dateFormatter.dayCompactDate(dato.dato))}
                                    <BodyShort className="text-red-500" as="span">
                                        <Tooltip content="Reisedag er utenfor søknadsperioden">
                                            <ExclamationmarkTriangleFillIcon style={{ color: '#C30000' }} />
                                        </Tooltip>
                                    </BodyShort>
                                </HStack>
                            );
                        }
                        return capsFirstCharacter(dateFormatter.dayCompactDate(dato.dato));
                    }}
                    disabledDateRanges={disabledDateRanges}
                    validate={getReisedagerValidator(kursperioder)}
                />
                <KursFormComponents.Textarea
                    name={KursFormFields.reisedagerBeskrivelse}
                    label={text('steg.kurs.reisedagerFormPart.reisedagerBeskrivelse.label')}
                    maxLength={maksTegnBeskrivelse}
                    validate={(value: any) => {
                        const error = getStringValidator({
                            required: true,
                            maxLength: maksTegnBeskrivelse,
                            minLength: 5,
                            disallowInvalidBackendCharacters: true,
                        })(value);
                        return error
                            ? {
                                  key: error,
                                  values: {
                                      antall: maksTegnBeskrivelse,
                                  },
                              }
                            : undefined;
                    }}
                    description={text('steg.kurs.reisedagerFormPart.reisedagerBeskrivelse.description')}
                />
            </FormLayout.Questions>
        </FormLayout.Panel>
    );
};

export default ReisedagerFormPart;
