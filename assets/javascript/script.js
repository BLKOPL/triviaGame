// Declare global variables
var triviaArr = ["q1", "q2", "q3", "q4", "q5"];
var triviaObj = {
  q1: { question: "The script tag must be placed in", choices: ["Head", "Head & Body", "Title & Head", "all of the mentioned"], answer: 2, correct_txt:'If the script tag is placed after the body tag, then, it will not be evaluated at all. Also, it is always recommended and effective to use the script snippet in the <head> tag.'},
  q2: { question: "When there is an indefinite or an infinity value during an arithmetic value computation, javascript", choices: ["Prints an exception error", "Prints an overflow error", "Displays infinity", "Prints the value as such"], answer: 3, correct_txt:'When the result of a numeric operation is larger than the largest representable number (overflow), the result is a special infinity value, which JavaScript prints as Infinity. Similarly, when a negative value becomes larger than the    largest representable negative number, the result is negative infinity, printed as -Infinity. The infinite values behave as you would expect: adding, subtracting, multiplying, or dividing them by anything results in an infinite value (possibly with the sign reversed.'},
  q3: { question: "The statement a===b refers to", choices: ["Both a and b are equal in value, type and reference address", "Both a and b are equal in value", "Both a and b are equal in value and type", "There is no such statement"], answer: 3, correct_txt:'a==b returns a true if a and b refer to the same objec ,so they are equal, else it returns a false.'},
  q4: { question: "The JavaScript’s syntax calling ( or executing ) a function or method is called", choices: ["Primary Expression", "Functional Expression", "Invocative Expression", "Property Acess Expression"], answer: 3, correct_txt:'An invocation expression is JavaScript’s syntax for calling (or executing) a function or method) It starts with a function expression that identifies the function to be called.'},
  q5: { question: "One of the special feature of an interpreter in reference with the for loop is that", choices: ["Before each iteration, the interpreter evaluates the variable expression and assigns the name of the property", "The iterations can be infinite when an interpreter is used", "The body of the loop is executed only once", "All of the mentioned"], answer: 1, correct_txt:'Before each iteration, the interpreter evaluates the variable expression and assigns the name of the property (a string value) to it.'},
  q6: { question: "JavaScript is a _______________ language", choices: ["Object-Oriented", "High-level", "Assembly-language", "Object-Based"], answer: 4, correct_txt:'JavaScript is not a full-blown OOP (Object-Oriented Programming) language, such as Java or PHP, but it is an object-based language.'},
  q7: { question: " When an empty statement is encountered, a JavaScript interpreter", choices: ["Ignores the statement", "Prompts to complete the statement", "hrows an error", "Throws an exception"], answer: 1, correct_txt:'The JavaScript interpreter takes no action when it executes an empty statement. The empty statement is occasionally useful when you want to create a loop that has an empty body.'}
};


var current_q = -1;
var time = 30;
var question;
var choices;
var answer;
var correct_txt;
var intervalId;
var score = {'correct':0, 'wrong':0, 'unanswered':0};


$(document).ready(function(){
  // Display trivia question when click start
  $("#start-btn").on("click", function(){
    $(this).hide();
    $("#trivia-view").show();
    startTriviaGame();
  });

  $("#restart-btn").on("click", function(){
    startTriviaGame();
  });

});

function startTriviaGame(){
  current_q = -1;
  question = null;
  choices = null;
  answer = null;
  correct_txt = null;
  intervalId = null;
  score = {'correct':0, 'wrong':0, 'unanswered':0};

  displayQuestion();
}

function displayQuestion(){
  current_q++;

  // Check if player answered every question
  if(current_q == triviaArr.length){
    stop();
    showSummary();
    return false;
  }

  $("#time-remaining").html("");
  $('#trivia-body').show();
  $('#trivia-result-correct').hide();
  $('#trivia-result-wrong').hide();
  $('#trivia-summary').hide();

  var questionSelected = triviaArr[current_q];
  question = triviaObj[questionSelected].question;
  choices = triviaObj[questionSelected].choices;
  answer = triviaObj[questionSelected].answer;
  correct_txt = triviaObj[questionSelected].correct_txt;

  console.log("current_q:", current_q);
  console.log("questionSelected:", questionSelected);
  console.log("question:", question);
  console.log("answer:", answer);

  time = 30;
  $("#time-remaining").html("<h4>Time Remaining:  " + time + " seconds</h4>");
  $("#question").html("<h4>" + question + "</h4>");
  $(".choices").html('');

  for(var i = 0; i < choices.length; i++){
    var list = $('<p class="choice">');
    list.attr("id","choice-" + (i+1));
    list.attr("choice",(i+1));
    list.text(choices[i]);
    $(".choices").append(list);
  }

  // Bind event to answer
  $('.choices p.choice').on('click', answerClick);
  runTime();
}

function answerClick(evt){
  var selected_ans = $(this).attr('choice');
  console.log('Answer selected', selected_ans);
  stop();

  // Compare answer to choice selected
  if(selected_ans == answer){
    score.correct++;
    showResult(true);
  }
  else{
    score.wrong++;
    showResult(false);
  }
}

function showResult(is_correct){
  $('#trivia-body').hide();

  if(is_correct){
    $('#trivia-result-correct div').html(correct_txt);
    $('#trivia-result-correct').show();
  }
  else{
    $('#trivia-result-wrong span.correct_answer').html(choices[answer-1]);
    $('#trivia-result-wrong div').html(correct_txt);
    $('#trivia-result-wrong').show();
  }

  setTimeout(displayQuestion, 5000);
}

function showSummary(){
  $("#time-remaining").html("");
  $('#trivia-body').hide();
  $('#trivia-result-correct').hide();
  $('#trivia-result-wrong').hide();
  $('#trivia-summary').show();

  $('#trivia-summary span.correct').html(score.correct);
  $('#trivia-summary span.wrong').html(score.wrong);
  $('#trivia-summary span.timeout').html(score.unanswered);
}

function getTriviaQuestion(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function stop() {
  clearInterval(intervalId);
}

function runTime() {
  intervalId = setInterval(timeDecrement, 1000);
}

function timeDecrement() {
  if (time > 0){
    time--;
    $("#time-remaining").html("<h4>Time Remaining:  " + time + " seconds</h4>");

  }
  else {
    score.unanswered++;
    stop();
    $("#time-remaining").html("<h4>Out of Time !!!</h4>");
    showResult(false);
  }
}
