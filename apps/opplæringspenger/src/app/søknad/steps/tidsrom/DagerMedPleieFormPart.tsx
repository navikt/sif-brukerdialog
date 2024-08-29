import { BodyLong } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { FormikInputGroup } from '@navikt/sif-common-formik-ds';
import { DaySelector } from '@navikt/sif-common-ui';
import { getMonthsInDates, sortDates } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { getTilgjengeligSøknadsperiode } from '../../../utils/getTilgjengeligSøknadsperiode';
import { TidsromFormFields, TidsromFormValues } from './TidsromStep';
import { AppText } from '../../../i18n';

interface MånedOgDag {
    måned: Date;
    dager: Date[];
}

const DagerMedPleieFormPart = () => {
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
                legend="Hvilke dager skal du ha opplæring?"
                validate={(sd: Date[]) => {
                    return sd.length === 0 ? 'ingenDagerValgt' : undefined;
                }}
                description={
                    <Block margin="m">
                        <BodyLong>
                            <AppText id="dagerMedPleie.info.1" />
                        </BodyLong>
                    </Block>
                }>
                <div>
                    <Block margin="l">
                        <DaySelector
                            dateRange={periode}
                            selectedDates={selectedDates}
                            onChange={handleOnChange}
                            reverseOrder={true}
                        />
                    </Block>
                </div>
            </FormikInputGroup>
        </>
    );
};

export default DagerMedPleieFormPart;
