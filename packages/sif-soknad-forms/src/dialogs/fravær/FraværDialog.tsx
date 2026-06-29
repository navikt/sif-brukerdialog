import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { FraværDagDialogForm, FraværDagDialogFormConfig } from './FraværDagDialogForm';
import { FraværPeriodeDialogForm, FraværPeriodeDialogFormConfig } from './FraværPeriodeDialogForm';
import { FraværDag, FraværPeriode } from './types';
import { ISODate } from '@sif/utils';

interface FraværPeriodeDialogProps extends FraværPeriodeDialogFormConfig {
    fraværPeriode?: FraværPeriode;
    minDate: ISODate;
    maxDate: ISODate;
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (fraværPeriode: FraværPeriode) => void;
}

interface FraværDagDialogProps extends FraværDagDialogFormConfig {
    fraværDag?: FraværDag;
    minDate: ISODate;
    maxDate: ISODate;
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (fraværDag: FraværDag) => void;
}

export const FraværPeriodeFormDialog = ({
    isOpen,
    fraværPeriode,
    minDate,
    maxDate,
    dateRangesToDisable,
    helgedagerIkkeTillat,
    begrensTilSammeÅr,
    onValidSubmit,
    onCancel,
}: FraværPeriodeDialogProps) => {
    if (!isOpen) return null;

    const formId = 'fraværPeriodeForm';

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onCancel();
            }}
            size="small">
            <Dialog.Popup closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>
                        <SifSoknadFormsText id="@sifSoknadForms.fraværPeriode.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <FraværPeriodeDialogForm
                        formId={formId}
                        fraværPeriode={fraværPeriode}
                        minDate={minDate}
                        maxDate={maxDate}
                        dateRangesToDisable={dateRangesToDisable}
                        helgedagerIkkeTillat={helgedagerIkkeTillat}
                        begrensTilSammeÅr={begrensTilSammeÅr}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.fraværPeriode.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {fraværPeriode ? (
                            <SifSoknadFormsText id="@sifSoknadForms.fraværPeriode.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.fraværPeriode.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};

export const FraværDagFormDialog = ({
    isOpen,
    fraværDag,
    minDate,
    maxDate,
    dateRangesToDisable,
    helgedagerIkkeTillatt,
    maksArbeidstidPerDag,
    onValidSubmit,
    onCancel,
}: FraværDagDialogProps) => {
    if (!isOpen) return null;

    const formId = 'fraværDagForm';

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onCancel();
            }}
            size="small">
            <Dialog.Popup closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>
                        <SifSoknadFormsText id="@sifSoknadForms.fraværDag.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <FraværDagDialogForm
                        formId={formId}
                        fraværDag={fraværDag}
                        minDate={minDate}
                        maxDate={maxDate}
                        dateRangesToDisable={dateRangesToDisable}
                        helgedagerIkkeTillatt={helgedagerIkkeTillatt}
                        maksArbeidstidPerDag={maksArbeidstidPerDag}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.fraværDag.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {fraværDag ? (
                            <SifSoknadFormsText id="@sifSoknadForms.fraværDag.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.fraværDag.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
