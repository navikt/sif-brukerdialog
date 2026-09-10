import { BodyLong, Button, Dialog, Box } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { ArbeidUtland, ArbeidUtlandVariant } from '.';
import { ArbeidUtlandDialogForm } from './ArbeidUtlandDialogForm';
import { ISODate } from '@sif/utils';

interface Props {
    minDate?: ISODate;
    maxDate?: ISODate;
    arbeidssted?: ArbeidUtland;
    alleArbeider?: ArbeidUtland[];
    isOpen?: boolean;
    variant: ArbeidUtlandVariant;
    onCancel: () => void;
    onValidSubmit: (arbeidssted: ArbeidUtland) => void;
}

export const ArbeidUtlandFormDialog = ({
    isOpen,
    minDate,
    maxDate,
    arbeidssted,
    alleArbeider,
    variant,
    onValidSubmit,
    onCancel,
}: Props) => {
    const formId = 'arbeidUtlandForm';

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onCancel();
            }}>
            <Dialog.Popup closeOnOutsideClick={false}>
                {variant === 'generell' ? (
                    <Dialog.Header>
                        <Dialog.Title>
                            <SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.tittel.generell" />
                        </Dialog.Title>
                        <Dialog.Description>
                            <Box marginBlock="space-12">
                                <BodyLong>
                                    Oppgi land og periode du har bodd, studert eller jobbet utenfor Norge.
                                </BodyLong>
                                <BodyLong>Ta med alle perioder siden du var 16 år.</BodyLong>
                            </Box>
                        </Dialog.Description>
                    </Dialog.Header>
                ) : (
                    <Dialog.Header>
                        <Dialog.Title>
                            <SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.tittel.periodeMedJobb" />
                        </Dialog.Title>
                        <Dialog.Description>
                            <Box marginBlock="space-12">
                                <BodyLong>
                                    Oppgi land og periode du har jobbet utenfor Norge de fem siste årene.
                                </BodyLong>
                            </Box>
                        </Dialog.Description>
                    </Dialog.Header>
                )}

                <Dialog.Body>
                    <ArbeidUtlandDialogForm
                        alleArbeider={alleArbeider}
                        formId={formId}
                        minDate={minDate}
                        maxDate={maxDate}
                        arbeidssted={arbeidssted}
                        onValidSubmit={onValidSubmit}
                        variant={variant}
                    />
                </Dialog.Body>

                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {arbeidssted ? (
                            <SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
