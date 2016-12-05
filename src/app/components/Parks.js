import React from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import { fetchParks } from '../actions/actionCreators';
import ParkMarker from './ParkMarker';
import OriginMarker from './OriginMarker';

const mapState = state => ({
		isFetching: state.parks.isFetching,
		area: state.parks.area,
		parks: state.parks.parks
});


const mapDispatch = {fetchParks};

class Parks extends React.Component {
	constructor(props) {
		super(props);
		this.renderPark = this.renderPark.bind(this);
		this.renderParkMarkers = this.renderParkMarkers.bind(this);

		this.selectPark = this.selectPark.bind(this);

		// simple UI state management 
		this.state = {
			selectedKey: null
		}
	}

	componentWillMount() {
		// this runs right before the <App> is rendered
		const { area, lat, lng } = this.props.location.query;
		this.props.fetchParks(area, lat, lng);
	}

	renderPark(park, key) {
		return (
			<div className={"park " + (this.state.selectedKey === key ? 'park-selected' : '')} key={key} id={key} onClick={() => this.selectPark(key)}>
				<p>
					<strong>{park.name}</strong>
					<br/>
					({park.distance.toFixed(2)}mi)
				</p>
			</div>
		); 
	}
	selectPark(key) {
		this.setState({
			selectedKey: key
		});
	}

	renderParkMarkers(park, key) {
		const coords = park.location.coordinates;
		const lng = coords[0];
		const lat = coords[1];
		return (
		    <ParkMarker 
		    	key={key} 
		    	id={key} 
		    	lat={lat} 
		    	lng={lng} 
		    	name={park.name} 
		    	selected={this.state.selectedKey === key}
		    	/>
		)
	}

	render() {
		const { area, lat, lng } = this.props.location.query;
		const zoom = 15;
		return (
			<div className="container-fluid">
				<div className="row">
						
					<div className="col-sm-4 park-table">
						<h3 className="text-center">
							<strong>{this.props.parks && this.props.parks.length}</strong> parks in walking distance of <br/> { area }
						</h3>
						<hr/>
						<div className="park-items">
						{this.props.isFetching && <h3>Loading!</h3>}
						{this.props.parks && this.props.parks.length > 0 && this.props.parks.map(this.renderPark)}
						</div>
					</div>
					<div className="col-sm-8 map-div">
						<GoogleMap 
							center={[parseFloat(lat), parseFloat(lng)]} 
							zoom={zoom}
							onChildMouseEnter={this.selectPark}
							onChildMouseLeave={() => this.selectPark(null)}
							>
							<OriginMarker lat={lat} lng={lng} />
							{this.props.parks && this.props.parks.length > 0 &&
								this.props.parks.map(this.renderParkMarkers)
							}
						</GoogleMap>
					</div>
					
				</div>
			</div>
		)
	}
}
	

Parks.propTypes = {
	parks: React.PropTypes.array,
	isFetching: React.PropTypes.bool,
	fetchParks: React.PropTypes.func,
	location: React.PropTypes.object
}
export default connect(mapState, mapDispatch)(Parks); 
