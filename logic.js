window.addEventListener("load", function () {
    let topBar = document.getElementById("topBar");
    let bodyBgColor = getComputedStyle(document.body).backgroundColor;

    topBar.style.backgroundColor = bodyBgColor;
    topBar.style.zIndex = 10;
});
