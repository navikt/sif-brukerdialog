import { KursFormFields } from './KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { FormikTextarea } from '@navikt/sif-common-formik-ds';
import { getListValidator, getStringValidator } from '@navikt/sif-common-formik-ds/src/validation';
import EnkeltdatoListAndDialog from '@navikt/sif-common-forms-ds/src/forms/enkeltdatoer/EnkeltdatoListAndDialog';
import { capsFirstCharacter, dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { Enkeltdato } from '@navikt/sif-common-forms-ds/src';
import { useAppIntl } from '../../../i18n';
import { erAlleReisedagerInnenforSøknadsperioder } from './kursStepUtils';

interface Props {
    søknadsperiode: DateRange;
    disabledDateRanges: DateRange[];
    kursperioder: DateRange[];
}

const maksTegnBeskrivelse = 250;

const ReisedagerFormPart = ({ søknadsperiode, disabledDateRanges, kursperioder }: Props) => {
    const { text } = useAppIntl();
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
                    labelRenderer={(dato: Enkeltdato) => capsFirstCharacter(dateFormatter.dayCompactDate(dato.dato))}
                    disabledDateRanges={disabledDateRanges}
                    validate={(reisedager: Date[]) => {
                        const error = getListValidator({ required: true })(reisedager);
                        if (error) {
                            return error;
                        }
                        /** Kontroller om datoer er innenfor søknadsperioder */
                        if (erAlleReisedagerInnenforSøknadsperioder(reisedager, kursperioder)) {
                            return 'reisedagUtenforKursperiode';
                        }
                        return undefined;
                    }}
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
