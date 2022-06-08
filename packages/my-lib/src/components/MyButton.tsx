import React from 'react';
import { HTMLAttributes } from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/atoms/block/Block';
import './myButton.scss';

type Props = HTMLAttributes<HTMLButtonElement>;

const MyButton: React.FunctionComponent<Props> = (props) => (
    <>
        <Block padBottom="l">
            <button className="myButton" {...props}>
                {props.children}
            </button>
        </Block>
        c
    </>
);

export default MyButton;
