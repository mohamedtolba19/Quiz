export class Quiz {
  constructor(arr){
    this.arrQustions = arr ;
    this.numOustions = arr.length ;
    document.getElementById("totalAmount").innerHTML = this.numOustions  ;
    this.currentElement = document.getElementById("currentQ");
    this.question = document.getElementById("question");
    this.rowAnswer = document.getElementById("rowAnswer");
    this.nextBtn = document.getElementById("nextBtn") ;
    this.tryBtn = document.getElementById("try") ;
    this.scoreResult = document.getElementById("score") ;
    this.score = 0 ;
    this.currentQustion = 0 ;

    this.nextBtn.addEventListener("click" , this.checkAnswer.bind(this))

   this.showQustion();
  }

  checkAnswer(){
   let correctAnswer = this.arrQustions[this.currentQustion].correct_answer ;
   let allAnswers = Array.from(document.getElementsByName("answer"));
   
   let userAnswer = allAnswers.filter((elem)=>{return elem.checked})[0].value
  
   if(userAnswer == correctAnswer) {
    this.score++
    $("#correct").fadeIn(700, ()=>{
      $("#correct").hide()
    })
   }
   else
   {
    $("#incorrect").fadeIn(700, ()=>{
      $("#incorrect").hide()
    })
   }
   this.currentQustion++
   if(this.currentQustion >= this.numOustions){
    $("#quiz").fadeOut(700, ()=>{
      $("#finish").fadeIn(700,()=>{
     
        this.scoreResult.innerHTML = `${this.score} / ${this.numOustions}` ;
        this.tryBtn.addEventListener("click" , ()=>{
          location.reload()
        })
      })
    })
   }
   else{
    this.showQustion();
   }
  }

  showQustion(){
  this.currentElement.innerHTML = this.currentQustion + 1 ;
  this.question.innerHTML = this.arrQustions[this.currentQustion].question ;
  let allAnswers = [this.arrQustions[this.currentQustion].correct_answer ,...this.arrQustions[this.currentQustion].incorrect_answers ]
  console.log(allAnswers)
  allAnswers = this.shuffle(allAnswers)
  console.log(allAnswers)
  let cartona = "" ;
  console.log(cartona)
  for(let i = 0 ; i<allAnswers.length ; i++){
    cartona += `
    <input  type="radio" value="${allAnswers[i]}" name="answer">
    <label >${allAnswers[i]}</label>
    <br/>
    `
  }
  console.log(cartona)
  this.rowAnswer.innerHTML = cartona
  }
   shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex > 0) {
  
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}