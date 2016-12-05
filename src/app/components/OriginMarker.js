import React from 'react';
import Star from '../pics/star.svg';

class OriginMarker extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
       <div className="origin-marker">
          <img src={Star} alt="marker" />
       </div>
    );
  }
}

export default OriginMarker;
