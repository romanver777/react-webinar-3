import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({page, children}) {

  const cn = bem(page || 'PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('center')}>
        {children}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  page: PropTypes.string,
  children: PropTypes.node
}

export default React.memo(PageLayout);
