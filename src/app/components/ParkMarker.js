import React from 'react';
import RedMarker from '../pics/map-marker-red.svg';
import GreenMarker from '../pics/map-marker-green.svg';
import ReactTooltip from 'react-tooltip';

class ParkMarker extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const marker = this.props.$hover || this.props.selected ? GreenMarker : RedMarker;
    
    return (
       <div className={"park-marker " + (this.props.selected ? 'green' : '')} data-tip={this.props.name} ref={this.props.id}>
          <ReactTooltip effect="solid" />
          <img src={marker} alt="marker" />
       </div>
    );
  }
}

export default ParkMarker;
