//Used to add steps when creating a recipe

var step = 3; // to start at step4

button = document.getElementById("NewStep");
formulaire = document.getElementById("formulaire");

button.addEventListener("click", function(){
    step +=1
    var label = "<label for=step"+step+" > Step " +step+ " : </label>"
    var input = "<input type='text' name=steps class='form-control' required=''</input>"
    var container = document.createElement("div")
    container.innerHTML = label + input
    formulaire.appendChild(container)
});

