const buttonIds = ["btn1"];
buttonIds.forEach(btn => {
    const button = document.getElementById(`${btn}`);
    button.onmousedown =()=>{
        const targetInput = document.getElementById(getComputedStyle(button).getPropertyValue("--target"));
        const termTarget = document.getElementById(getComputedStyle(targetInput).getPropertyValue("--target"));
        const answerTarget = document.getElementById(getComputedStyle(termTarget).getPropertyValue("--answerTarget"));
        const string = termTarget.innerText;
        answerTarget.innerText = (string.replace("x",`(${targetInput.value})`));
        const finalAnswerElement = document.getElementById(getComputedStyle(button).getPropertyValue("--answerTarget"));
        const result = eval((string.replace("x",`(${targetInput.value})`)).replace(/(\d+)\s*\(/g, '$1*('));
        finalAnswerElement.innerText = result;
    }
});
