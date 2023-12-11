import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({lang, head, footer, children}) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('center')}>
        {React.Children.map(children, (child) => React.cloneElement(child, {lang}))}
      </div>
      <div className={cn('footer')}>
        {footer}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node
}

export default memo(PageLayout);
