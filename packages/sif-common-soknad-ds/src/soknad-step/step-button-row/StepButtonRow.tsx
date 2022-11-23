import React, { ReactNode } from 'react';
import './stepButtonRow.scss';

interface Props {
    backButton?: ReactNode;
    nextButton?: ReactNode;
    reversedButtonDOMOrder?: boolean;
}

const StepButtonRow: React.FunctionComponent<Props> = ({ backButton, nextButton, reversedButtonDOMOrder = true }) => (
    <div className={`stepButtonRow ${reversedButtonDOMOrder ? 'stepButtonRow--reversed' : ''}`}>
        {reversedButtonDOMOrder ? (
            <>
                {nextButton && <div className="stepButtonRow__next">{nextButton}</div>}
                {backButton && <div className="stepButtonRow__back">{backButton}</div>}
            </>
        ) : (
            <>
                {backButton && <div className="stepButtonRow__back">{backButton}</div>}
                {nextButton && <div className="stepButtonRow__next">{nextButton}</div>}
            </>
        )}
    </div>
);

export default StepButtonRow;
