import { KursFormFields } from '../KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { FormikTextarea } from '@navikt/sif-common-formik-ds';
import { getListValidator, getStringValidator } from '@navikt/sif-common-formik-ds/src/validation';
import EnkeltdatoListAndDialog from '@navikt/sif-common-forms-ds/src/forms/enkeltdatoer/EnkeltdatoListAndDialog';
import {
    capsFirstCharacter,
    dateFormatter,
    DateRange,
    getDateRangesBetweenDateRangesWithinDateRange,
} from '@navikt/sif-common-utils';
import { Enkeltdato } from '@navikt/sif-common-forms-ds/src';

interface Props {
    kursperioder: DateRange[];
    søknadsperiode: DateRange;
}

const ReisedagerFormPart = ({ kursperioder, søknadsperiode }: Props) => {
    const disabledDateRanges = getDateRangesBetweenDateRangesWithinDateRange(
        søknadsperiode.from,
        søknadsperiode.to,
        kursperioder,
    );
    return (
        <FormLayout.Panel>
            <FormLayout.Questions>
                <EnkeltdatoListAndDialog
                    name={KursFormFields.reisedager}
                    labels={{
                        addLabel: 'Legg til reisedag',
                        modalTitle: 'Reisedager',
                        listTitle: 'Reisedager uten kurs eller opplæring',
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
                    maxLength={250}
                    validate={getStringValidator({
                        required: true,
                        maxLength: 250,
                        minLength: 5,
                    })}
                    description="Fordi du reiser på andre dager enn du har kurs eller opplæring, må du beskrive hvorfor."
                />
            </FormLayout.Questions>
        </FormLayout.Panel>
    );
};

export default ReisedagerFormPart;
