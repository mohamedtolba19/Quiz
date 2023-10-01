import {Quiz} from "./Quiz.js"
export class Settings{
  constructor(){
    this.categoryElement = document.getElementById("category");
    this.difficultyElements = document.getElementsByName("difficulty");
    this.NumberOfQuestions = document.getElementById("numberOfQuestions")
    this.strBtn = document.getElementById("strBtn");
    this.strBtn.addEventListener("click",this.getData.bind(this));
    this.alert = document.querySelector(".alert"); 
  }

  async getData(){
   let categoryElementValue  = this.categoryElement.value ;
   let NumberOfQuestionsValue =  this.NumberOfQuestions.value
   let difficultyValue = [...this.difficultyElements].filter((elem)=>{
    return elem.checked == true
   })[0].value
   let apiURl = `https://opentdb.com/api.php?amount=${NumberOfQuestionsValue}&category=${categoryElementValue}&difficulty=${difficultyValue}` ;
  
   if(categoryElementValue!="" && NumberOfQuestionsValue!="" && NumberOfQuestionsValue!=0 &&difficultyValue!=""){
    // this.alert.classList.replace("d-block" , "d-none")
    $("#alert").fadeOut(1000);
    let data = await this.fetchData(apiURl);
    new Quiz(data)
    $("#setting").fadeOut(1000,()=>
    {
      $("#quiz").fadeIn(1000);
    })

   }
   else{
  //  this.alert.classList.replace("d-none" , "d-block")
  $("#alert").fadeIn(1000);
   }

 

  
    
  }

  async fetchData(url){
       let responseData = await fetch(url) ;

      let myResult = await responseData.json();
     return myResult.results
  }

}


 
