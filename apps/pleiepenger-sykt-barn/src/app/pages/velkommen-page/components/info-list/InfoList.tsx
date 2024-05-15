import React from 'react';
import './infolist.less';

const InfoList: React.FunctionComponent<React.HTMLAttributes<HTMLUListElement> & { className?: string }> = (props) => (
    <ul {...props} className={`infoList ${props.className}`} />
);

export default InfoList;
