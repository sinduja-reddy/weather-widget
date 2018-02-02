import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import Widget from './Widget';
import axios from 'axios';

class FetchData extends Component {
  constructor(props){
    super(props);
    this.state={
      city:'',
      data:{},
      inputValue:'',
      isLoading:false,
      error:false
    }
}

componentDidMount(){
    this.fetchData(this.props.location.search);
}

componentWillReceiveProps (nextProps) {
      const { location } = this.props;
      const { location: nextLocation } = nextProps;
      if (nextLocation.search !== location.search) {
        this.fetchData(nextLocation.search);
      }
}


fetchData=(val)=>{
  this.setState({ isLoading: true });
  let parsed=qs.parse(val)
  let parsed_place= parsed.city
  let city = typeof parsed_place==='undefined' ? 'Copenhagen': parsed_place;
  let url= `/api.php?location=${city}&degree=C`
  console.log(url);
  axios.get(url).then(response=>{
      if(response.statusText==='OK'){
        return response.data;
      }else{
      throw new Error('Something went wrong');
      }
    }).then((res)=>{
          // check response contains html tags, if so remove the tags
      if(/<\/?[^>]*>/.test(res)){
        let data=res.replace(/<\/?[^>]+(>|$)/g, "")
        return JSON.parse(data);//converted it into object
    }else{
        return res;
      }
    }).then((res)=>{
      console.log(res)
      if(res.LocationName!=='false'){
      this.setState({
                    data:res.CurrentData,
                    city,
                    isLoading:false
                  })
    }else{
      throw new Error('Something went wrong');
    }
    }).catch(error => this.setState({ error:true, isLoading: false}))
}

handleOnChange=(e)=>{
  let val= e.target.value
  let inputValue=val.toLowerCase().charAt(0).toUpperCase()+val.slice(1)
  this.setState({inputValue})
}

handleSubmit=(e)=>{
  e.preventDefault()
  let place=this.state.inputValue
  this.setState({inputValue:'',error:false})
  this.props.history.push({
      pathname: '/',
      search:`?city=${place}`
    })
}

  
render() {
  return (
      <Widget {...this.state} change={this.handleOnChange} submit={this.handleSubmit}/>
    );
  }
}

export default withRouter(FetchData);
