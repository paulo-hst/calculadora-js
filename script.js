function getHistory(){ // Pega valor da tag <p> do HTML com ID history-value
    return document.querySelector('#history-value').innerText; 
}
function printHistory(num){ // Imprime na tela a partir do javascript
    return document.querySelector('#history-value').innerText = num; 
}

function getOutput(){
    return document.querySelector('#output-value').innerText;
}

function printOutput(num){
    if(num==''){
        document.querySelector('#output-value').innerText = num;
    }else{
        document.querySelector('#output-value').innerText = getFormattedNumber(num);
    }
    
}

// Função que formata os pontos dos números, divididos por 1000. 
function getFormattedNumber(num){
    if(num == "-"){ // se o valor for negativo, retorna vazio.
        return ""
    }

    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
    
}


// Reverter formatação dos pontos para realizar cálculos
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,'')); // substituir o ponto por caractere vazio   
}

// adiciona os operadores no vetor operator
var operator = document.getElementsByClassName('operator') 

// adiciona evento de clique baseado no ID do operador armazenado no vetor
for(var i = 0; i < operator.length; i++){
    operator[i].addEventListener('click', function(){
        if(this.id == 'clear'){ // limpa saida e histórico ao clicar no botão C
            printOutput('');
            printHistory('');
        }
        else if(this.id == 'backspace'){
            var output = reverseNumberFormat(getOutput()).toString(); // remove pontos e transforma valor em String
            if(output){
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
            
        }else{
            var output = getOutput();
            var history = getHistory();
        
            if(output == "" && history != ""){
                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length-1);
                }
            }

            if(output != "" || history != ""){ // Verifica se existe números no display
                // condição?verdadeiro:falso - operador ternário
                output = output == "" ? output:reverseNumberFormat(output);
                history = history+output;

                if(this.id == "="){
                    var result = eval(history);
                    printHistory("");
                    printOutput(result);
                }else{
                    history = history+this.id;
                    printHistory(history);
                    printOutput("");  
                }

            }
        }
    });
}  

var number = document.getElementsByClassName('number')

for(var i = 0; i < number.length; i++){
    number[i].addEventListener('click', function(){
        var output = reverseNumberFormat(getOutput());
        if(output!=NaN){ // Se OUTPUT for um número ...
            output = output + this.id;
            printOutput(output);
        }
    });
}