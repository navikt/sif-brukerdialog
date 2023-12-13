import React from 'react';
import { useIntl } from 'react-intl';
import { dateFormatter, dateToday } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import TidEnkeltdagDialog, { TidEnkeltdagDialogProps } from '../../tid/tid-enkeltdag-dialog/TidEnkeltdagDialog';
import { TidEnkeltdagFormProps } from '../../tid/tid-enkeltdag-dialog/TidEnkeltdagForm';
import { ArbeidsforholdType } from '../../types';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

interface Props extends Omit<TidEnkeltdagDialogProps, 'dialogTitle' | 'formProps'> {
    arbeidsstedNavn: string;
    arbeidsforholdType: ArbeidsforholdType;
    formProps: Omit<TidEnkeltdagFormProps, 'hvorMyeSpørsmålRenderer'>;
}

const ArbeidstidEnkeltdagDialog: React.FunctionComponent<Props> = ({
    isOpen,
    arbeidsforholdType,
    arbeidsstedNavn,
    formProps,
}: Props) => {
    const intl = useIntl();
    const hvorMyeSpørsmålRenderer = (dato: Date): string => {
        const erHistorisk = dayjs(dato).isBefore(dateToday, 'day');
        const intlValues = {
            skalEllerHarJobbet: intlHelper(
                intl,
                erHistorisk ? 'arbeidstidEnkeltdagForm.jobbet' : 'arbeidstidEnkeltdagForm.skalJobbe',
            ),
            hvor: intlHelper(intl, `arbeidstidEnkeltdagForm.som.${arbeidsforholdType}`, { navn: arbeidsstedNavn }),
            når: dateFormatter.dayDateShortMonthYear(dato),
        };
        return intlHelper(intl, 'arbeidstidEnkeltdagForm.tid.spm', intlValues);
    };
    return (
        <TidEnkeltdagDialog
            isOpen={isOpen}
            dialogTitle={intlHelper(intl, 'arbeidstidEnkeltdagDialog.contentTitle')}
            formProps={{ ...formProps, hvorMyeSpørsmålRenderer, maksTid: { hours: 24, minutes: 0 } }}
        />
    );
};

export default ArbeidstidEnkeltdagDialog;
