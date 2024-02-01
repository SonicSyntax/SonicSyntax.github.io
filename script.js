const nextButton = document.getElementById("nextButton");
const pageCountDisplay = document.getElementById("pageCount");

const maxPages = 10;

window.addEventListener("load", function(){
    let pageCountValue = this.localStorage.getItem("pageCount");
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
}
