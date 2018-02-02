import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form,Panel, FormControl,FormGroup,ListGroup,ListGroupItem } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';


const Widget=(props)=>{
return(
	<div className="widget">
    <Panel bsStyle="info">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Weather in <b> {props.city}</b></Panel.Title>
      </Panel.Heading>
      <ListGroup>
          <ListGroupItem>Temperature: <b>{props.data.temperature} °C</b></ListGroupItem>
          <ListGroupItem>Humidity: <b>{props.data.humidity}</b></ListGroupItem>
          <ListGroupItem>Wind: <b>{props.data.windText}</b></ListGroupItem>
          <ListGroupItem>
            <Form inline>
              <FormGroup>
                <FormControl type="text"  id="city" placeholder="city" value={props.inputValue} onChange={props.change}/>
              </FormGroup>{' '}
              <Button bsStyle="primary" type='submit' onClick={props.submit} > 
                {props.isLoading ?<i className='fa fa-spinner fa-spin '></i> : 'Search'}
              </Button>
             </Form>
          </ListGroupItem>
          {props.error? <ListGroupItem>Enter valid place</ListGroupItem>:null}
      </ListGroup>
    </Panel>
  </div>
)
}

Widget.propTypes = {
    data: PropTypes.object.isRequired,
    error: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    inputValue: PropTypes.string.isRequired,
    city:PropTypes.string.isRequired
};
export default Widget