import React from 'react';
import Geosuggest from 'react-geosuggest';
import { Well } from 'React-Bootstrap';

class LandingPage extends React.Component {
	constructor() {
		super();
		this.goToLocation = this.goToLocation.bind(this);
	}

	goToLocation(locationData) {
		const area = locationData.label;
		const lat = locationData.location.lat;
		const lng = locationData.location.lng;

		// this.props.searchParks(label, lat, long);
		this.context.router.push({pathname: '/parks', query: {area, lat, lng}});
	}

	render() {
		return (
			<div className="container-fluid">
				<h1 className="text-center header">
					Public parks&mdash;within walking distance.
				</h1>
				<div className="row">
					<div className="col-sm-offset-3 col-sm-6">
						<Well>
							<div className="row">
								<div className="col-sm-12">
									<Geosuggest placeholder="Where would you like to walk from?"
												onSuggestSelect={this.goToLocation} />
								</div>
							</div>
							
						</Well>
					</div>
				</div>
			</div>
		)
	}
}

LandingPage.contextTypes = {
    router: React.PropTypes.object
  }

export default LandingPage; 
