import { useAppIntl } from '@app/i18n';
import { dateFormatter, getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

import TidEnkeltdagDialog, {
    TidEnkeltdagDialogProps,
} from '../../../../components/tid-enkeltdag-dialog/TidEnkeltdagDialog';
import { TidEnkeltdagFormProps } from '../../../../components/tid-enkeltdag-dialog/TidEnkeltdagForm';

interface Props extends Omit<TidEnkeltdagDialogProps, 'dialogTitle' | 'formProps'> {
    formProps: Omit<
        TidEnkeltdagFormProps,
        | 'erBarnetIOmsorgstilbudLabelRenderer'
        | 'hvorMyeSpørsmålRenderer'
        | 'beskrivelseRenderer'
        | 'erIkkeIOmsorgstilbudLabelRenderer'
        | 'maksTid'
    >;
}

const TilsynsordningEnkeltdagDialog = ({ open: isOpen, formProps }: Props) => {
    const { text } = useAppIntl();

    const erBarnetIOmsorgstilbudLabelRenderer = (dato: Date): string => {
        const erHistorisk = dayjs(dato).isBefore(getDateToday(), 'day');
        return text(
            erHistorisk
                ? 'tilsynsordningEnkeltdagForm.erBarnetIOmsorgstilbud.spm.historisk'
                : 'tilsynsordningEnkeltdagForm.erBarnetIOmsorgstilbud.spm',
            { dato: dateFormatter.dayDateMonthYear(dato) },
        );
    };
    const hvorMyeSpørsmålRenderer = (dato: Date): string => {
        const erHistorisk = dayjs(dato).isBefore(getDateToday(), 'day');
        return text(
            erHistorisk ? 'tilsynsordningEnkeltdagForm.tid.spm.historisk' : 'tilsynsordningEnkeltdagForm.tid.spm',
            { dato: dateFormatter.dayDateMonthYear(dato) },
        );
    };
    const beskrivelseRenderer = (dato: Date): string => {
        const erHistorisk = dayjs(dato).isBefore(getDateToday(), 'day');
        return text(
            erHistorisk
                ? 'tilsynsordningEnkeltdagForm.tid.beskrivelse.historisk'
                : 'tilsynsordningEnkeltdagForm.tid.beskrivelse',
            { dato: dateFormatter.dayDateMonthYear(dato) },
        );
    };
    const erIkkeIOmsorgstilbudLabelRenderer = (dato: Date): string => {
        const erHistorisk = dayjs(dato).isBefore(getDateToday(), 'day');
        return text(
            erHistorisk
                ? 'tilsynsordningEnkeltdagForm.tid.erIOmsorgstilbud.historisk'
                : 'tilsynsordningEnkeltdagForm.tid.erIOmsorgstilbud',
            { dato: dateFormatter.dayDateMonthYear(dato) },
        );
    };
    return (
        <TidEnkeltdagDialog
            open={isOpen}
            dialogTitle={text('tilsynsordningEnkeltdagForm.tittel', {
                dato: dateFormatter.full(formProps.dato),
            })}
            formProps={{
                ...formProps,
                hvorMyeSpørsmålRenderer,
                erBarnetIOmsorgstilbudLabelRenderer,
                beskrivelseRenderer,
                erIkkeIOmsorgstilbudLabelRenderer,
                maksTid: { hours: 7, minutes: 30 },
            }}
        />
    );
};

export default TilsynsordningEnkeltdagDialog;
