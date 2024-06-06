const checkBoxInput = document.querySelectorAll(".custom-checkbox");
const inputElements = document.querySelectorAll('.goal-input');

const errorLabel = document.querySelector('.error-label');

const progressBar = document.querySelector('.progress-bar');
const progressLabel = document.querySelector('.progress-label')

const progressValue = document.querySelector('.progress-value');
const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
]
let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let NoOfGoalsCompleted = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width = `${(NoOfGoalsCompleted/inputElements.length)*100}%`;
progressValue.firstElementChild.innerText = `${NoOfGoalsCompleted}/${inputElements.length} completed`
progressLabel.innerText = allQuotes[NoOfGoalsCompleted]



checkBoxInput.forEach((checkBox) => {
  checkBox.addEventListener('click', (e) => {
    const allFieldsFilled = [...inputElements].every((input) => {
      return input.value;
    })

    if(allFieldsFilled) {
      checkBox.parentElement.classList.toggle('completed');
      const inputId = checkBox.nextElementSibling.id;
      allGoals[inputId].completed =!allGoals[inputId].completed;
      localStorage.setItem('allGoals', JSON.stringify(allGoals));
      allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
      NoOfGoalsCompleted = Object.values(allGoals).filter((goal) => goal.completed).length;
      console.log(`${NoOfGoalsCompleted.length/3 * 100}`+'%');
      progressValue.style.width = `${(NoOfGoalsCompleted/inputElements.length)*100}%`;
      progressValue.firstElementChild.innerText = `${NoOfGoalsCompleted}/${inputElements.length} completed`
      progressLabel.innerText = allQuotes[NoOfGoalsCompleted]
    }
    else {
      progressBar.classList.add('show-error');
    }

  });
});

inputElements.forEach((input) => {
  console.log(allGoals[input.id]);
  input.value = allGoals[input.id] ? allGoals[input.id].name : "";
  if(allGoals[input.id] && allGoals[input.id].completed){
    input.parentElement.classList.add('completed');
  }
  console.log(input.nextElementSibling);
  input.addEventListener('focus', () => {
    progressBar.classList.remove('show-error');
  })

  input.addEventListener('input', (e) => {

    if(allGoals[input.id] && allGoals[input.id].completed){
      input.value = allGoals[input.id].name;
      return;
    }

    if(allGoals[input.id]){
      allGoals[input.id].name = input.value;
    }
    else{
      allGoals[input.id] = {
        name: input.value,
        completed: false
      }
    }


  
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  })
})

