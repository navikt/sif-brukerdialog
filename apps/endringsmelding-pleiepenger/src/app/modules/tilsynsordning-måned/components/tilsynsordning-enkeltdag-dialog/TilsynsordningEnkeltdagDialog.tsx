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
        | 'introRenderer'
        | 'hvorMyeSpørsmålRenderer'
        | 'beskrivelseRenderer'
        | 'erIkkeIOmsorgstilbudLabelRenderer'
        | 'maksTid'
    >;
}

const datoErHistorisk = (dato: Date): boolean => {
    return dayjs(dato).isBefore(getDateToday(), 'day');
};

const TilsynsordningEnkeltdagDialog = ({ open: isOpen, formProps }: Props) => {
    const { text } = useAppIntl();

    const erBarnetIOmsorgstilbudLabelRenderer = (dato: Date): string => {
        return text(
            datoErHistorisk(dato)
                ? 'tilsynsordningEnkeltdagForm.erBarnetIOmsorgstilbud.spm.historisk'
                : 'tilsynsordningEnkeltdagForm.erBarnetIOmsorgstilbud.spm',
            { dato: dateFormatter.dayDateMonthYear(dato) },
        );
    };
    const hvorMyeSpørsmålRenderer = (dato: Date): string => {
        return text(
            datoErHistorisk(dato)
                ? 'tilsynsordningEnkeltdagForm.tid.spm.historisk'
                : 'tilsynsordningEnkeltdagForm.tid.spm',
            { dato: dateFormatter.dayDateMonthYear(dato) },
        );
    };
    const beskrivelseRenderer = (dato: Date): string => {
        return text(
            datoErHistorisk(dato)
                ? 'tilsynsordningEnkeltdagForm.tid.beskrivelse.historisk'
                : 'tilsynsordningEnkeltdagForm.tid.beskrivelse',
            { dato: dateFormatter.dayDateMonthYear(dato) },
        );
    };
    const erIkkeIOmsorgstilbudLabelRenderer = (dato: Date): string => {
        return text(
            datoErHistorisk(dato)
                ? 'tilsynsordningEnkeltdagForm.tid.erIOmsorgstilbud.historisk'
                : 'tilsynsordningEnkeltdagForm.tid.erIOmsorgstilbud',
            { dato: dateFormatter.dayDateMonthYear(dato) },
        );
    };

    const introRenderer = (): string => {
        return text('tidEnkeltdagForm.intro');
    };

    return (
        <TidEnkeltdagDialog
            open={isOpen}
            dialogTitle={text('tilsynsordningEnkeltdagForm.tittel', {
                dato: dateFormatter.full(formProps.dato),
            })}
            formProps={{
                ...formProps,
                introRenderer,
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
