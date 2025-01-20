import { KursFormFields } from '../KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { FormikTextarea } from '@navikt/sif-common-formik-ds';
import { getListValidator, getStringValidator } from '@navikt/sif-common-formik-ds/src/validation';
import EnkeltdatoListAndDialog from '@navikt/sif-common-forms-ds/src/forms/enkeltdatoer/EnkeltdatoListAndDialog';
import { capsFirstCharacter, dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { Enkeltdato } from '@navikt/sif-common-forms-ds/src';
import { Box } from '@navikt/ds-react';

interface Props {
    søknadsperiode: DateRange;
    disabledDateRanges: DateRange[];
}

const maksTegnBeskrivelse = 250;

const ReisedagerFormPart = ({ søknadsperiode, disabledDateRanges }: Props) => {
    return (
        <FormLayout.Panel>
            <FormLayout.Questions>
                <EnkeltdatoListAndDialog
                    name={KursFormFields.reisedager}
                    labels={{
                        addLabel: 'Legg til reisedag',
                        modalTitle: 'Reisedager',
                        listTitle: 'Reisedager uten kurs eller opplæring',
                        modalDescription: <Box>Du kan kun velge dager som du har søkt om opplæringspenger.</Box>,
                    }}
                    minDate={søknadsperiode.from}
                    maxDate={søknadsperiode.to}
                    labelRenderer={(dato: Enkeltdato) => capsFirstCharacter(dateFormatter.dayCompactDate(dato.dato))}
                    disabledDateRanges={disabledDateRanges}
                    validate={getListValidator({ required: true })}
                />
                <FormikTextarea
                    name={KursFormFields.reisedagerBeskrivelse}
                    label="Årsak for reisetid"
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
                    description="Fordi du reiser på andre dager enn du har kurs eller opplæring, må du beskrive hvorfor."
                />
            </FormLayout.Questions>
        </FormLayout.Panel>
    );
};

export default ReisedagerFormPart;
