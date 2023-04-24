import React from 'react';
import * as innerClasses from './app.layout.styles';

export const AppLayout: React.FunctionComponent = (props) => {
  const { children } = props;

  return (
    <div className={innerClasses.root}>
      {children}
    </div>
  );
};
