import React from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="progress-container">
      <div className="progress" style={{ width: `${value}%` }} />
    </div>
  );
};

export default ProgressBar;
