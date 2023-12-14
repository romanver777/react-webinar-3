import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function SideLayout({children, side, padding, border}) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({side, padding, border})}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium']),
  border: PropTypes.oneOf(['bottom']),
}

SideLayout.defaultProps = {};

export default memo(SideLayout);
