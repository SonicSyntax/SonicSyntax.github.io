let lines = 5;
const heights = [];
const colors = ["#ff6f61","#4a90e2"," #ffd700","#8e44ad","#00b894","#3498db","#e74c3c","#2ecc71","#f39c12","#9b59b6","#1abc9c"]


function createArray(){
    for(let i = 1;i <= 100;i++){
        heights.push(i);
    }
}

createArray();

window.addEventListener("load", function () {
    const loader = this.document.getElementById("loader");
    let loaderStyle = this.getComputedStyle(loader);

    let lineSize = (parseFloat(loaderStyle.width) / lines) + "px";

    for(let i = 0;i < lines;i++){
        let newLine = this.document.createElement("div");

        newLine.id = `line${i}`;

        newLine.style.width = lineSize;
        newLine.style.height = "50px";
        newLine.style.background = colors[i];
        newLine.style.transition = "0.5s";

        loader.appendChild(newLine);
    }

    function animate1(){
        for (let i = 0; i < lines; i++) {
            setTimeout(function () {
                let line = document.getElementById(`line${i}`);
                let height = heights[i];
        
                line.style.height = (height + 50) + "px";
        
                setTimeout(function(){
                    line.style.height = height + "px";
                }, 500);
            }, 100 * i);
        }
    }

    this.setInterval(function(){
        animate1();
    },800);
    
});
