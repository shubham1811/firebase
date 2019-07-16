import React, { Component } from 'react';
var firebase = require('firebase');
var uuid= require('uuid');
var config = {
  apiKey: "AIzaSyAmFuqH9Ekwdu3lfU1wHl8nqWIZkzncJOc",
  authDomain: "usurvey-981aa.firebaseapp.com",
  databaseURL: "https://usurvey-981aa.firebaseio.com",
  projectId: "usurvey-981aa",
  storageBucket: "usurvey-981aa.appspot.com",
  messagingSenderId: "92639042308"
};
firebase.initializeApp(config);
class Usurvey extends Component {
  nameSubmit(event)
  {
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function(){
      console.log(this.state)
    });
  }
  answerSelected(event)
  {
    var answers = this.state.answers;
    if(event.target.name=== 'answer1')
    {
      answers.answer1 = event.target.value;
    }
    else if(event.target.name=== 'answer2')
    {
      answers.answer2 = event.target.value;
    }
    if(event.target.name=== 'answer3')
    {
      answers.answer3 = event.target.value;
    }
    this.setState({answers:answers},function(){
      console.log(this.state);
    });
  }
  questionSubmit()
  {
    firebase.database().ref('usurvey/'+this.state.uid).set({
      studentName :this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted:true})
  }
  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName:'',
      answers: {
        answer1:'',
        answer2:'',
        answer3:''
      },
      isSubmitted: false
      };
      this.nameSubmit=this.nameSubmit.bind(this);
      this.answerSelected=this.answerSelected.bind(this);
      this.questionSubmit=this.questionSubmit.bind(this);
  }
  render(){
    var studentName;
    var questions;
    if(this.state.studentName === '' && this.state.isSubmitted === false)
    {
      studentName = <div>
      <h1> Enter the name please </h1>
      <form onSubmit={this.nameSubmit}>
          <input className="namy"  type="text" placeholder="Enter The Name Please" ref="name"/>
      </form>
      </div>;
      questions=''
    }
    if (this.state.studentName !=='' && this.state.isSubmitted===false) {
      studentName = <h1>Welcome to U-Survey, {this.state.studentName} </h1>;
      questions = <div>
        <h2>here are some question : </h2>
          <form onSubmit={this.questionSubmit}>
            <div className="card">
              <label> what kind of courses you like the most:</label><br/>
              <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} /> technology
              <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} /> Design
              <input type="radio" name="answer1" value="marketing" onChange={this.answerSelected} /> marketing
            </div>
            <div className="card">
              <label> You are a:</label><br/>
              <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} /> Student
              <input type="radio" name="answer2" value="Learner" onChange={this.answerSelected} /> Learner
              <input type="radio" name="answer2" value="Teacher" onChange={this.answerSelected} /> Teacher
            </div>
            <div className="card">
              <label>Is online study helpful</label><br/>
              <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} /> Yes
              <input type="radio" name="answer3" value="No" onChange={this.answerSelected} /> No
              <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected} /> Maybe
            </div>
            <input className="feedback-button" type="submit" value="submit"/>
          </form>
        </div>
        }
        if (this.state.isSubmitted === true) {
          studentName=<h1>Thanks, {this.state.studentName}</h1>
    }
    return(
      <div>
          {studentName}
          ------------------------------------------------------------------------------------------------------
          {questions}
      </div>
    );
  }
}
export default Usurvey;
