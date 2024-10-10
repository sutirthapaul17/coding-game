let codeStack = []; 

// var modal = document.getElementById("myModal");

// localStorage.setItem('gameScore', 0);
let a=document.getElementById("variable1");
let b=document.getElementById("variable2");
let reset=document.getElementById("reset");
let code=document.getElementById("CodeSpace");

// var span = document.getElementsByClassName("close2")[0];

// span.onclick = function() {
//     modal.style.display = "none";
//     document.getElementById("modalIframe").src = ""; // Clear the iframe source
// }

// // Event listener for closing modal when clicking outside of the modal
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//         document.getElementById("modalIframe").src = ""; // Clear the iframe source
//     }
// }

const existingCode1 = 'a = input("")\nb = input("")\nc =a + b\nprint("c")\n'; 
// const existingCode2 = '['a = input("")\n', 'b = input("")\n', 'c =', 'a', ' + ', 'b', '\n', 'print(c)\n']'; 



function allowDrop(event) {
    event.preventDefault(); 
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id); 
}

let score = localStorage.getItem('gameScore') ? parseInt(localStorage.getItem('gameScore')) : 0;
const scoreDisplay = document.getElementById('score');

function goToHome() {
    localStorage.clear();  // Clears all data in localStorage
    sessionStorage.clear();
    // Use relative path to navigate back to home.html
    window.location.href = '../../home.html';
}

let count=0;
function drop(event) {
    event.preventDefault(); 
    const data = event.dataTransfer.getData("text"); 
    const draggedElement = document.getElementById(data);

    let newCode = ""; 

    if (draggedElement.innerText === 'print(int)') {

        const box = document.createElement("input");
        box.type = "text";
        box.placeholder = "Enter number";
        box.id = "numid";
        box.onkeypress = function(event) {
            if (event.key === 'Enter') {
                updatePrintStatement(`print(${box.value})`); 
                box.remove();
            }
        };
        document.getElementById('resultSpace').appendChild(box);
        box.focus(); 
        codeStack.push('print()\n');
    }
    else if (draggedElement.innerText === 'print') {
        
        const inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.placeholder = "Enter your text";
        inputBox.id = "textid";
        inputBox.onkeypress = function(event) {
            if (event.key === 'Enter') {
                updatePrintStatement(`print("${inputBox.value}")`); // Update the print statement
                inputBox.remove(); // Remove the input box
            }
        };
        document.getElementById('resultSpace').appendChild(inputBox);
        inputBox.focus(); // Focus the input box for immediate typing
        codeStack.push('print("")\n'); // Add empty string to print
    }
    
    if (draggedElement.innerText === 'input') {
       
        count++;
        const inputBox = document.createElement("input");
        inputBox.type = "number";
        inputBox.placeholder = "Enter number";
        inputBox.id = "numInput";
        inputBox.onkeypress = function(event) {
            if (event.key === 'Enter') {
                
                if(count==1){
                    // const inputValue = inputBox.value;
                    // a= inputBox.value;
                    updatePrintStatement(`a = input("")`); // Update the input statement
                    // updatePrintStatement(`a = input("${inputBox.value}")`); 
                }else if(count==2){
                    // b= inputBox.value;
                    updatePrintStatement(`b = input("")`); // Update the input statement
                    // updatePrintStatement(`b = input("${inputBox.value}")`);
                }
                
                inputBox.remove(); 
            }
        };
        document.getElementById('resultSpace').appendChild(inputBox);
        inputBox.focus(); 

        if(count==1){
            codeStack.push('a = input("")\n'); 
        }else if(count==2){
            codeStack.push('b = input("")\n');
        }
        
    }
    
    else if(draggedElement.innerText === 'variable'){
        newCode = "c =";
        //codeStack.push(`${newCode};\n`);
    }
    else if(draggedElement.innerText === 'a' ){
        newCode= `a`;
        // newCode= `${a}`;
    }
    else if(draggedElement.innerText === 'b' ){
        newCode= `b`;
        // newCode= `${b}`;
    }
    else if (draggedElement.innerText === '1' || draggedElement.innerText === '2') {
        newCode = draggedElement.innerText; // Add number to code
    }
    else if (draggedElement.innerText === 'add') {
        newCode = " + ";  
    }

    else if (draggedElement.innerText === 'newline') {
        // Display in the result space
        // const newLineElement = document.createElement("div");
        // newLineElement.textContent = '\nprint("\\n")'; // Display "print("\n")"
        // document.getElementById('resultSpace').appendChild(newLineElement);
        
        codeStack.push('\n'); // Push "print("\n")" to the codeStack
    }
    else if (draggedElement.innerText === 'subtract') {
        newCode = " - "; 
    }
    else if (draggedElement.innerText === 'multiply') {
        newCode = " * ";  
    }
        
    if (newCode) {
        codeStack.push(newCode);  
    }
    
    updateResult();
}
function updatePrintStatement(userString) {
    // Update the code in codeStack to reflect the user's input
    codeStack[codeStack.length - 1] = userString + '\n';
    updateResult(); // Update the displayed code
}


function updateResult() {
    // Join the codeStack to display the full code
    document.getElementById('result').textContent = codeStack.join('');
    console.log(codeStack);
    // console.log(count);
}


/*function undoLastAction() {
    
    if (codeStack.length > 0) {
        codeStack.pop(); 
    }
    updateResult();
}*/

// function performAction() {
//     console.log(` Existing code is ${existingCode1}`);
//     console.log(` Generated code is ${codeStack.join('')}`);
//     if (codeStack.join('') == existingCode1) {
//         console.log('Generated code matches existing code!');
//         score += 10;
//         localStorage.setItem('gameScore', score);
//         scoreDisplay.textContent = 'Score: ' + score;
        
//         document.getElementById("modalIframe").src = "modal.html";
//         modal.style.display = "block";

//     } else {
//         console.log('Generated code differs from existing code.');
//     }
  
// }



function performAction() {
    console.log(`Existing code is ${existingCode1}`);
    console.log(`Generated code is ${codeStack.join('')}`);
    
    code.innerHTML="";
    code.innerHTML += `${existingCode1}\n`;
    code.innerHTML +=`${codeStack.join('')}\n`;

    
    if (codeStack.join('') === existingCode1) {
        console.log('Generated code matches existing code!');
        code.innerHTML="Generated code matches existing code!\n";
        score += 10; 
        localStorage.setItem('gameScore', score);  
        scoreDisplay.textContent = 'Score: ' + score;  

    } else {
        console.log('Generated code differs from existing code.');
        code.innerHTML="Generated code differs from existing code!\n";
    }
}

// span.onclick = function() {
//     modal.style.display = "none";
//     document.getElementById("modalIframe").src = ""; // Clear the iframe source
// }

// Event listener for closing modal when clicking outside of the modal
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//         document.getElementById("modalIframe").src = ""; // Clear the iframe source
//     }
// }

function openModal() {
    document.getElementById('tutorialModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('tutorialModal').style.display = 'none';
}

reset.addEventListener('click', () => {
    
    window.location.reload();
    // document.getElementById('resultSpace').textContent = '';
});

window.onload = openModal;
