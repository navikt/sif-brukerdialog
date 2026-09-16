import { Bleed, Box, DatePicker, Tag, useDatepicker, VStack } from '@navikt/ds-react';
import { ISODate, ISODateToDate } from '@sif/utils';
import dayjs from 'dayjs';

import { AppText, useAppIntl } from '@app/i18n';

interface Props {
    onDateChange: (date: Date | undefined) => void;
    value: ISODate;
}
export const StartdatoSpørsmål = ({ onDateChange, value }: Props) => {
    const { text } = useAppIntl();
    const { datepickerProps, inputProps } = useDatepicker({
        disableWeekends: false,
        defaultSelected: ISODateToDate(value),
        fromDate: dayjs().subtract(4, 'year').toDate(),
        toDate: dayjs().add(4, 'years').toDate(),
        onDateChange: onDateChange,
    });

    return (
        <Box padding="space-24" borderRadius="8" background="warning-moderate" maxWidth="50rem">
            <VStack gap="space-16">
                <Bleed marginBlock="space-16 space-0" marginInline="space-16 space-0">
                    <Tag variant="strong" size="small" data-color="meta-purple">
                        <AppText id="oppsummeringSteg.startdato.testing" />
                    </Tag>
                </Bleed>
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input
                        {...inputProps}
                        label={text('oppsummeringSteg.startdato.velgStartdato')}
                    />
                </DatePicker>
            </VStack>
        </Box>
    );
};
