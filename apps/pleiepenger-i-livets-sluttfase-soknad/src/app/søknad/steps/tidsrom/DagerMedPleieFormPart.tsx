import { Alert, BodyLong } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
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
                legend="Hvilke dager skal du være borte fra jobb for å pleie?"
                validate={(selectedDates: Date[]) => {
                    return selectedDates.length === 0 ? 'ingenDagerValgt' : undefined;
                }}
                description={
                    <Block margin="m">
                        <BodyLong>
                            Velg dagene som du skal være borte fra jobb for å pleie i kalenderen nedenfor. Du kan klikke
                            på et ukenummer for å velge alle eller ingen av dagene i den uken. Du kan ikke velge lørdag
                            eller søndag.
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

                {/* <Alert variant="info" inline={true}>
                    {selectedDates.length === 0 ? (
                        <>Ingen dager valgt</>
                    ) : (
                        <ExpandableInfo
                            title={
                                selectedDates.length === 1
                                    ? `Vis hvilken dag som er valgt`
                                    : `Vis liste over hvilke ${selectedDates.length} ${selectedDates.length} dager som er valgt`
                            }>
                            <ValgteDagerMedPleie dagerMedPleie={selectedDates} />
                        </ExpandableInfo>
                    )}
                </Alert> */}
                {selectedDates.length > 60 && (
                    <div>
                        <Block margin="l">
                            <Alert variant="info">Skal vi si noe om at bruker har valgt over 60 dager?</Alert>
                        </Block>
                    </div>
                )}
            </FormikInputGroup>
        </>
    );
};

export default DagerMedPleieFormPart;
