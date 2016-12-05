import React from 'react';
import { Link } from 'react-router';
import { Navbar } from 'React-Bootstrap';

class Main extends React.Component {
	render() {
		return (
			<div>
				<Navbar collapseOnSelect>
				    <Navbar.Header>
				      <Navbar.Brand>
				        <Link to="/">Parks</Link>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				  </Navbar>
				
				{React.cloneElement(this.props.children, this.props)}
			</div>
		)
	}
}

export default Main; 
