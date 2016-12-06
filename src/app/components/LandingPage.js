import React from 'react';
import { Well } from 'React-Bootstrap';

class LandingPage extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="container-fluid">
				<h1 className="text-center header">
					Stash things&mdash;within stashing distance.
				</h1>
				<br/>
				<br/>
				<br/>
				<div className="row">
					<div className="col-sm-offset-3 col-sm-6">
						<Well>
							<div className="row">
								<div className="col-sm-12">
									<form action="">
										<input type="text" className="form-control" />
									</form>
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
