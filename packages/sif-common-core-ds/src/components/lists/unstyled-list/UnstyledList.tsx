import './unstyledList.scss';

import React from 'react';

import bemHelper from '../../../utils/bemUtils';

const bem = bemHelper('unstyledList');

interface Props {
    children: React.ReactNode;
}

const UnstyledList = ({ children }: Props) => <ul className={bem.block}>{children}</ul>;

export default UnstyledList;
