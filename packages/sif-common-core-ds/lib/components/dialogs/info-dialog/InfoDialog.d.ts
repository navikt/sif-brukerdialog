import { ModalProps } from '@navikt/ds-react';
import React from 'react';
import '../dialogs.scss';
declare type Props = {
    children: React.ReactNode;
} & ModalProps;
declare const InfoDialog: ({ children, ...props }: Props) => JSX.Element;
export default InfoDialog;
