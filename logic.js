let loader = document.getElementById("loader");
const lines = 5;

let loaded = false;

const colors = ["#ff6f61","#4a90e2"," #ffd700","#8e44ad","#00b894","#3498db","#e74c3c"];

window.addEventListener("load",function(){
    let lineWidth = (parseFloat(getComputedStyle(loader).width) / lines) + "px";

    for(let i = 0;i < lines;i++){
        let line = document.createElement("div");
        line.id = `line${i}`;

        line.style.height = "5px";
        line.style.width = lineWidth;
        line.style.transition = "0.5s";
        line.style.position = "relative";

        if(i in colors){
            line.style.background = colors[i];
        } else{
            line.style.background = "black";
        }

        loader.appendChild(line);

    }

    function loadAnimation(){
        for(let i = 0;i < lines;i++){
            let line = document.getElementById(`line${i}`);
            loader.style.width = "100%";
            setTimeout(function(){
                line.style.height = lineWidth;
                setTimeout(function(){
                    loader.style.transition = "0.5s";
                    loader.style.gap = "10px";
                    setTimeout(function(){
                        loader.style.gap = "5px";
                    },500);
                },800);
            },100 * i);
        }
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

    let animationInterval = this.setInterval(function(){
        if(!loaded){
            animate();
        } else {
            setTimeout(function(){
                loadAnimation();
                clearInterval(animationInterval);
            },200);
        }
    },650);
})

setTimeout(function(){
    loaded = true;
},5000);
