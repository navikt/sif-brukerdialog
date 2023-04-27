import React from 'react';
import bemUtils from '../../utils/bemUtils';
import './tiles.scss';

const bem = bemUtils('tiles');

interface Props {
    columns?: 1 | 2 | 3 | 'flex';
    children: React.ReactNode;
}
const Tiles = ({ columns = 3, children }: Props) => (
    <div className={bem.classNames(bem.block, bem.modifier(`columns-${columns}`))}>
        {React.Children.map(children, (child) => (
            <div className={bem.element('tile')}>{child}</div>
        ))}
    </div>
);

export default Tiles;
