step = 3;
button = document.getElementById("NewStep");
formulaire = document.getElementById("formulaire");
button.addEventListener("click", function(){
    step +=1
    HTML = "<label for=step"+step+" > Step " +step+ " : </label>"
    HTML2 = "<input type='text' name=steps class='form-control' required=''</input>"
    var container = document.createElement("div")
    container.innerHTML = HTML + HTML2
    formulaire.appendChild(container)
});

