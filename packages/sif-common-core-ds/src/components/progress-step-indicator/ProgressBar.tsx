import React from 'react';

interface Props {
    percentage: number;
}

const ProgressBar: React.FunctionComponent<Props> = ({ percentage }) => (
    <div className="progressBar">
        <div className="progressBar__progress" style={{ width: `${percentage}%` }} />
    </div>
);

export default ProgressBar;
