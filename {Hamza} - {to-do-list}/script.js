let input = document.getElementById("inputt");
let rest = document.getElementById("rst");
//let butn = document.getElementById("btn");
let txt = document.getElementById("text");
//create button
// const del =document.createElement("button");
// const mark=document.createElement("button");

addEventListener("click", () => {
  if (input.value == "") {
    // alert("Please fill");
  }
  else {

    let newVar = document.createElement("ul");

    // Create a delete button 
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");

    //create a mark button
    var markbutton = document.createElement("button");
    markbutton.textContent = "Mark"
    markbutton.classList.add("mark-button");

    newVar.textContent = input.value;
    input.value = '';
    // Append the button in ul
    newVar.appendChild(markbutton);
    newVar.appendChild(removeButton);
    txt.appendChild(newVar);

    removeButton.addEventListener("click", () => {
      newVar.remove();
    });

    markbutton.addEventListener("click", () => {
      newVar.classList.add("marked");
    });

    rest.addEventListener("click", () => {
      txt.innerHTML = "";
    });
  }
});






