import { KursFormFields } from './KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { FormikTextarea, isValidationErrorsVisible } from '@navikt/sif-common-formik-ds';
import { getStringValidator } from '@navikt/sif-validation';
import EnkeltdatoListAndDialog from '@navikt/sif-common-forms-ds/src/forms/enkeltdatoer/EnkeltdatoListAndDialog';
import { capsFirstCharacter, dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { Enkeltdato } from '@navikt/sif-common-forms-ds/src';
import { useAppIntl } from '../../../i18n';
import { getDatoerUtenforSøknadsperioder, getReisedagerValidator } from './kursStepUtils';
import { WarningFilled } from '@navikt/ds-icons';
import { BodyShort, HStack, Tooltip } from '@navikt/ds-react';
import { useFormikContext } from 'formik';

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
                    labelRenderer={(dato: Enkeltdato) => {
                        const erUtenforSøknadsperiode = reisedagerUtenforSøknadsperioder.includes(dato.dato);
                        if (erUtenforSøknadsperiode && visFeil) {
                            return (
                                <HStack gap="2">
                                    {capsFirstCharacter(dateFormatter.dayCompactDate(dato.dato))}
                                    <BodyShort className="text-red-500" as="span">
                                        <Tooltip content="Reisedag er utenfor søknadsperioden">
                                            <WarningFilled />
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
                <FormikTextarea
                    name={KursFormFields.reisedagerBeskrivelse}
                    label={text('steg.kurs.reisedagerFormPart.reisedagerBeskrivelse.label')}
                    maxLength={maksTegnBeskrivelse}
                    validate={(value: any) => {
                        const error = getStringValidator({
                            required: true,
                            maxLength: maksTegnBeskrivelse,
                            minLength: 5,
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
