import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Veilederpanel, { VeilederpanelProps } from 'nav-frontend-veilederpanel';
import bemUtils from '../../utils/bemUtils';
import './guide.less';

type Fargetema = 'normal' | 'info' | 'suksess' | 'advarsel' | 'feilmelding';
interface Props extends VeilederpanelProps {
    children: React.ReactNode;
    fullHeight?: boolean;
    fargetema?: Fargetema;
    /** Endrer til plakat visning dersom under switchToPlakatWidth */
    switchToPlakatOnSmallScreenSize?: boolean;
    /** Default 576 */
    switchToPlakatWidth?: number;
}

const bem = bemUtils('guide');

const Guide = (props: Props) => {
    const {
        fullHeight = false,
        fargetema = 'normal',
        kompakt = true,
        switchToPlakatWidth = 576,
        switchToPlakatOnSmallScreenSize = true,
        ...rest
    } = props;

    const isNarrow = useMediaQuery({
        query: `(max-width: ${switchToPlakatWidth}px)`,
    });

    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('fullHeight', fullHeight),
                bem.modifierConditional('narrow', isNarrow),
                bem.modifier(fargetema)
            )}>
            <Veilederpanel
                {...rest}
                kompakt={kompakt}
                type={switchToPlakatOnSmallScreenSize && isNarrow ? 'plakat' : rest.type}
            />
        </div>
    );
};

export default Guide;
