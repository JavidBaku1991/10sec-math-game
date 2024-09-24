$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 9;
  var score = 0;
  var scores=[0];


 
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    var highScore=Math.max(...scores);
     $('#high-score').text(highScore);
    console.log(highScore);

    $('#score').text(score);
  };
  
  var startGame = function () {
    if (timeLeft <= 0) {
        updateTimeLeft(10 - timeLeft); 
        scores.push(score);
        console.log(scores);
        updateScore(-score); 
    }
    
    if (!interval) {
        interval = setInterval(function () {
            updateTimeLeft(-1);
            if (timeLeft === 0) {
                clearInterval(interval);
                interval = undefined;
            }
        }, 1000);
    }
};



  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    var operators = ['+', '-', '*'];
    
    var randomOperator = operators[Math.floor(Math.random() * operators.length)];

    switch(randomOperator) {
        case '+':
            question.answer = num1 + num2;
            break;
        case '-':
            question.answer = num1 - num2;
            break;
        case '*':
            question.answer = num1 * num2;
            break;
     
    }

    question.equation = String(num1) + " " + randomOperator + " " + String(num2);
    
    return question;
};

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  
  renderNewQuestion();
});