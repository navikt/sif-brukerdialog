import { Bleed, Box, DatePicker, Tag, useDatepicker, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';

interface Props {
    onDateChange: (date: Date | undefined) => void;
}
export const StartdatoSpørsmål = ({ onDateChange }: Props) => {
    const { datepickerProps, inputProps } = useDatepicker({
        disableWeekends: false,
        fromDate: dayjs().subtract(4, 'year').toDate(),
        toDate: dayjs().add(4, 'years').toDate(),
        onDateChange: onDateChange,
    });

    return (
        <Box padding="space-24" borderRadius="8" background="warning-moderate" maxWidth="50rem">
            <VStack gap="space-16">
                <Bleed marginBlock="space-16 space-0" marginInline="space-16 space-0">
                    <Tag variant="strong" size="small" data-color="meta-purple">
                        Kun for testing i Q
                    </Tag>
                </Bleed>
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input {...inputProps} label="Velg startdato som skal gjelde for denne søknaden" />
                </DatePicker>
            </VStack>
        </Box>
    );
};
