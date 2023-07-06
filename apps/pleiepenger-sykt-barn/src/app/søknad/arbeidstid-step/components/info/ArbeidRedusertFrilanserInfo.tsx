import React from 'react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';

interface Props {
    frilansarbeidRedusert: boolean;
    honorararbeidRedusert: boolean;
}

const ArbeidRedusertInfo: React.FunctionComponent<Props> = ({ frilansarbeidRedusert, honorararbeidRedusert }) => {
    return (
        <>
            {frilansarbeidRedusert && !honorararbeidRedusert && (
                <Block margin="l">
                    <FormattedMessage id="arbeidIPeriode.redusert.info.frilans.info.tittel" />
                </Block>
            )}

            {honorararbeidRedusert && !frilansarbeidRedusert && (
                <Block margin="l">
                    <FormattedMessage id="arbeidIPeriode.redusert.info.verv.info.tittel" />
                </Block>
            )}

            {honorararbeidRedusert && frilansarbeidRedusert && (
                <Block margin="l">
                    <FormattedMessage id="arbeidIPeriode.redusert.info.frilansVerv.info.tittel.1" />
                    <ul>
                        <li>
                            <FormattedMessage id="arbeidIPeriode.redusert.info.frilansVerv.info.tittel.2" />
                        </li>

                        <li>
                            <FormattedMessage id="arbeidIPeriode.redusert.info.frilansVerv.info.tittel.4" />
                        </li>
                    </ul>
                </Block>
            )}
        </>
    );
};

export default ArbeidRedusertInfo;
