import { BodyLong } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { FormikInputGroup } from '@navikt/sif-common-formik-ds';
import DaySelector from '@navikt/sif-common-ui/src/day-selector/DaySelector';
import { getMonthsInDates, sortDates } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import React from 'react';
import { getTilgjengeligEndringsperiode } from '../../../utils/getTilgjengeligEndringsperiode';
import { TidsromFormFields, TidsromFormValues } from './TidsromStep';

interface Props {}

interface MånedOgDag {
    måned: Date;
    dager: Date[];
}

const DagerMedPleieFormPart: React.FunctionComponent<Props> = () => {
    const periode = getTilgjengeligEndringsperiode();
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
                legend="Hvilke dager skal du være hjemme fra jobb for å gi pleie?"
                validate={(selectedDates: Date[]) => {
                    return selectedDates.length === 0 ? 'ingenDagerValgt' : undefined;
                }}
                description={
                    <Block margin="m">
                        <BodyLong>
                            I kalenderen velger du hvilke dager du skal gi pleie. Husk at det ikke er rett til
                            pleiepenger på dager hvor personen er innlagt på sykehus eller annen institusjon.
                        </BodyLong>
                        <BodyLong>
                            Hvis du skal gi pleie gjennom en hel uke, er det lettest å klikke på ukenummeret.
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
