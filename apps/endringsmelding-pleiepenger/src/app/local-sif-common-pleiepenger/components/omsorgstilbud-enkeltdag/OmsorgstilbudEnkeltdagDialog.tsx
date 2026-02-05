import { dateFormatter, getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

import { useAppIntl } from '../../../i18n';
import TidEnkeltdagDialog, { TidEnkeltdagDialogProps } from '../tid-enkeltdag-dialog/TidEnkeltdagDialog';
import { TidEnkeltdagFormProps } from '../tid-enkeltdag-dialog/TidEnkeltdagForm';

interface Props extends Omit<TidEnkeltdagDialogProps, 'dialogTitle' | 'formProps'> {
    formProps: Omit<TidEnkeltdagFormProps, 'hvorMyeSpørsmålRenderer' | 'maksTid'>;
}

const OmsorgstilbudEnkeltdagDialog = ({ open: isOpen, formProps }: Props) => {
    const { text } = useAppIntl();

    const hvorMyeSpørsmålRenderer = (dato: Date): string => {
        const erHistorisk = dayjs(dato).isBefore(getDateToday(), 'day');
        return text(
            erHistorisk ? 'omsorgstilbudEnkeltdagForm.tid.spm.historisk' : 'omsorgstilbudEnkeltdagForm.tid.spm',
            { dato: dateFormatter.dayDateMonthYear(dato) },
        );
    };
    return (
        <TidEnkeltdagDialog
            open={isOpen}
            dialogTitle={text('omsorgstilbudEnkeltdagForm.tittel', {
                dato: dateFormatter.full(formProps.dato),
            })}
            formProps={{ ...formProps, hvorMyeSpørsmålRenderer, maksTid: { hours: 7, minutes: 30 } }}
        />
    );
};

export default OmsorgstilbudEnkeltdagDialog;
