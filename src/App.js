import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from "moment";
import './App.css';


class DurationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      numOfDays: '',
      startDate: null,
      endDate: null,
      focusedInput: null
   };
    
  }

  //listens on input change to dynamically bind its value
  myChangeHandler = (event) => {
    this.setState({numOfDays: event.target.value});
  }

  // claculates the dates based on entered durations selected date whether it is start or end date
  CalculateDays = (e) => {

    e.preventDefault();

    if(this.state.startDate){
      this.setState({endDate: (this.state.startDate.clone().add(this.state.numOfDays, 'days'))});
    }
    else if (this.state.endDate) {
      this.setState({startDate: (this.state.endDate.clone().subtract(this.state.numOfDays, 'days'))});
     }

  }


  render() {
    //shows the duration if defined
    let numOfDays = '';
    if (this.state.numOfDays) {
      numOfDays = <p>Your Duration: {this.state.numOfDays} Days</p>
    } else {
      numOfDays = '';
    }


    return (
      <form>
        <p>Enter Duration:</p>
        <input
          type="number"
          min="0"
          onChange={this.myChangeHandler}/>
        
          {numOfDays}

          <div>
            <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                minimumNights={0}/>
        </div>

        <button disabled={((!this.state.startDate) && (!this.state.endDate)) || (!this.state.numOfDays)} onClick={this.CalculateDays}>Calculate</button>

      </form>


    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <DurationForm />
      </div>
    );
  }
}

export default App;
