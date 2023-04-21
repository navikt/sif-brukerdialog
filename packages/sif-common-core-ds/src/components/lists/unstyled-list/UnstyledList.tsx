import React from 'react';
import bemHelper from '../../../utils/bemUtils';
import './unstyledList.scss';

const bem = bemHelper('unstyledList');

interface Props {
    children: React.ReactNode;
}

const UnstyledList = ({ children }: Props) => <ul className={bem.block}>{children}</ul>;

export default UnstyledList;
