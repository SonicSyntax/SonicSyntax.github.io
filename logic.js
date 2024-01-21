let loader = document.getElementById("loader");
const lines = 5;

const colors = ["#ff6f61","#4a90e2"," #ffd700","#8e44ad","#00b894"];

window.addEventListener("load",function(){
    let lineWidth = (parseFloat(getComputedStyle(loader).width) / lines) + "px";

    for(let i = 0;i < lines;i++){
        let line = document.createElement("div");
        line.id = `line${i}`;

        line.style.height = "5px";
        line.style.width = lineWidth;
        line.style.transition = "0.5s";

        if(i in colors){
            line.style.background = colors[i];
        } else{
            line.style.background = "black";
        }

        loader.appendChild(line);

    }

    function animate(){
        for(let i = 0;i < lines;i++){
            setTimeout(function(){
                let line = document.getElementById(`line${i}`);
                line.style.height =  "5px";
                setTimeout(function(){
                    line.style.height = "50px";
                },500);
            },100 * i);
        }
    }

    this.setInterval(function(){
        animate();
    },650);
})
