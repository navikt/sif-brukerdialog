import React, { ReactNode } from 'react';
import './stepButtonRow.scss';

interface Props {
    backButton?: ReactNode;
    nextButton?: ReactNode;
}

const StepButtonRow: React.FunctionComponent<Props> = ({ backButton, nextButton }) => (
    <div className="stepButtonRow">
        {backButton && <div className="back">{backButton}</div>}
        {nextButton && <div className="next">{nextButton}</div>}
    </div>
);

export default StepButtonRow;
