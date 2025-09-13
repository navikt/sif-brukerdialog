import { Box } from '@navikt/ds-react';
import { FormikInputGroup } from '@navikt/sif-common-formik-ds';
import { DaySelector } from '@navikt/sif-common-ui';
import { getMonthsInDates, sortDates } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../../i18n';
import { getTilgjengeligSøknadsperiode } from '../../../utils/getTilgjengeligSøknadsperiode';
import { TidsromFormFields, TidsromFormValues } from './TidsromStep';

interface MånedOgDag {
    måned: Date;
    dager: Date[];
}

const DagerMedPleieFormPart = () => {
    const { text } = useAppIntl();
    const periode = getTilgjengeligSøknadsperiode();
    const { setFieldValue, values } = useFormikContext<TidsromFormValues>();

    const handleOnChange = (selectedDates: Date[]) => {
        setFieldValue(TidsromFormFields.dagerMedPleie, selectedDates.sort(sortDates));
    };

    const selectedDates = values[TidsromFormFields.dagerMedPleie] || [];
    const månederMedValgteDatoer = getMonthsInDates(selectedDates);
    const månederOgDager: MånedOgDag[] = [];
    månederMedValgteDatoer.forEach((måned) => {
        månederOgDager.push({
            måned,
            dager: selectedDates.filter((d) => dayjs(d).isSame(måned, 'month')),
        });
    });

    return (
        <>
            <FormikInputGroup
                name={TidsromFormFields.dagerMedPleie}
                legend={text('steg.tidsrom.dagerMedPleie.spm')}
                validate={(sd: Date[]) => {
                    return sd.length === 0 ? 'ingenDagerValgt' : undefined;
                }}
                description={
                    <Box paddingBlock="2">
                        <AppText id="dagerMedPleie.info.1" />
                    </Box>
                }>
                <Box paddingBlock="2 0">
                    <DaySelector
                        dateRange={periode}
                        selectedDates={selectedDates}
                        onChange={handleOnChange}
                        reverseOrder={true}
                    />
                </Box>
            </FormikInputGroup>
        </>
    );
};

export default DagerMedPleieFormPart;
