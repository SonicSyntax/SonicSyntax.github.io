const nextButton = document.getElementById("nextButton");
const pageCountDisplay = document.getElementById("pageCount");
const board = document.getElementById("Background");

const maxPages = 10;

for(let i=-1;i<maxPages;i++){
    let newPage = document.createElement("div");
    newPage.id = `page${i}`;
    newPage.style.background = "#66CCCC";
    newPage.style.position = "absolute";
    newPage.style.width = "98%";
    newPage.style.borderRadius = "5px";
    newPage.style.height = "98%";
    newPage.style.transition = "0.5s";
    newPage.style.border = "5px solid forestgreen";
    newPage.style.zIndex = "-1";
    newPage.style.overflow = "hidden";
    newPage.style.display = "flex";
    newPage.style.justifyContent = "center";
    newPage.style.alignItems = "center";
    newPage.textContent = `Page${i}`;

    let backgroundImage = document.createElement("img");
    backgroundImage.src = `image${i}.png`;
    backgroundImage.style.width = "108%";
    backgroundImage.style.position = "absolute";
    newPage.appendChild(backgroundImage);

    board.appendChild(newPage);
}

window.addEventListener("load", function(){
    let pageCountValue = this.localStorage.getItem("pageCount");
    let pageElement = this.document.getElementById(`page${pageCountValue}`);
    pageElement.style.zIndex = "0";
    if(pageCountValue){
        pageCountDisplay.innerHTML = pageCountValue;
    } else{
        pageCountDisplay.innerHTML = "1";
    }
})

nextButton.onclick = function(){
    let page = parseInt(pageCountDisplay.innerHTML);
    if(page < maxPages){
        pageCountDisplay.innerHTML = ++page;
        localStorage.setItem("pageCount",pageCountDisplay.innerHTML);
    }else{
        pageCountDisplay.innerHTML = "0";
        localStorage.setItem("pageCount",pageCountDisplay.innerHTML);
    }

    if(page == 9){
        let puslapis = document.getElementById("page9");
        puslapis.style.background = "transparent";
        puslapis.style.border = "none";
        puslapis.textContent = "";
    }

    let puslapis = document.getElementById(`page${parseInt(page)}`);
    let praeitasPuslapis = document.getElementById(`page${parseInt(page - 1)}`);
    puslapis.style.transform = "translate(420px,0px)";
    setTimeout(function(){
        praeitasPuslapis.style.background = "#66CCCC";
        praeitasPuslapis.style.transform = "translate(-420px,0px)"
        setTimeout(function(){
            praeitasPuslapis.style.zIndex = "-1";
            praeitasPuslapis.style.transform = "translate(0px,0px)"
        },500)
    },300);
    setTimeout(function(){
        puslapis.style.zIndex = "0";
        setTimeout(function(){
            puslapis.style.transform = "translate(0,0)";
        })
    },500)
    
}
    
const button1 = document.getElementById("window1");

button1.onclick = function(){
    window.open("index2.html");
}
