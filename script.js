const container = document.getElementById("container");
const lines = 5;
let heights = [];
let colors = ["#87CEEB","#98FF98","#E6E6FA","#7FFFD4","#CCCCFF"];

for(let i = 50;i < lines;i++){
    heights.push(i + "px");
}

for(let i = 0;i < lines;i++){
    let lineWidth = parseFloat(getComputedStyle(container).width) / lines + "px";
    let lineHeight = parseFloat(getComputedStyle(container).height) / 2 + "px";
    const lineStyle = {
        width: lineWidth,
        height: lineHeight,
        background: colors[i],
        transition: "0.5s",
        border: "1px solid rgba(0,0,0,0.1)",
    };
    const line = document.createElement("div");
    line.id = `line${i}`;
    container.appendChild(line);
    Object.assign(line.style,lineStyle);
}

function Animate(){
    for(let i=0;i<lines;i++){
        let line = document.getElementById(`line${i}`);
        let currentHeight = parseFloat(getComputedStyle(line).height);
        setTimeout(function(){
            line.style.height = "25px";
            setTimeout(function(){
                line.style.height = "70px";
            },450);
        },i * 100);
    }
}
setInterval(Animate,880);
