const sidebar = document.getElementById("sidebar");

let userData = {
    currentSection: {
        id: null,
        sidebarButtons: [],
        sidebarButtonTargets: [],
    }
}

const updateSidebar = (section) => {
    const buttonCount = section.sidebarButtons.length;
    sidebar.innerHTML = "<header>Šioje skiltyje</header>";
    for(let i=0;i<buttonCount;i++){
        sidebar.innerHTML+=`<button id="button${i}" style="width:95%;margin-top:10px;background:rgba(0,127,0,0.5);border:none;font-size:18px;"><a style="text-decoration:none;color:#fff;" href="#${section.sidebarButtonTargets[i]}">${section.sidebarButtons[i]}</a></button>`;
    }

    for(let i = 0; i < buttonCount; i++) {
        const newButton = document.getElementById(`button${i}`);
        newButton.addEventListener("click", () => {
            const targetElement = document.getElementById(section.sidebarButtonTargets[i]);
            targetElement.style.background = "rgba(0,0,0,0.1)";targetElement.style.paddingLeft = "10px";
            targetElement.style.transition="0.2s";
            setTimeout(()=>{
                targetElement.style.paddingLeft = "0";targetElement.style.background = "none";
            },500);
        });
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    userData.currentSection.id="section1";
    userData.currentSection.sidebarButtons = ["Pavizdys #1","Pavizdys #2"];
    userData.currentSection.sidebarButtonTargets = ["pavizdys1","pavizdys2"];
    updateSidebar(userData.currentSection);
});
