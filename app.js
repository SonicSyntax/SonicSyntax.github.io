const sidebar = document.getElementById("sidebar");
const button1 = document.getElementById("button1");

const userData = {
    currentSection: "Kintamieji",
}

const sections = [
    {
        id: "Kintamieji",
        button_text: ["Pavizdys #1","Pavizdys #2"],
        button_href: ["pavizdys1","pavizdys2"],
    }
];

const updateSidebar = (section) => {
    userData.currentSection = section.id;
    sidebar.innerHTML = "<header>Šioje skiltyje</header>";

    const buttonCount = section.button_text.length;
    for(let i=0;i<buttonCount;i++){
        sidebar.innerHTML += `<button><a href="#${section.button_href[i]}">${section.button_text[i]}</a></button>`;
    }
}

window.addEventListener("load",updateSidebar(sections[0]));
button1.onclick=updateSidebar(sections[0]);
