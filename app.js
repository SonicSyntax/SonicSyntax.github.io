const sidebar = document.getElementById("sidebar");

const userData={
    currentSection:null,
    description: null,
};

const updateUserData=(sectionId,description)=>{
    userData.currentSection=sectionId;
    userData.description=description;
}

const btn1 = document.querySelector('.button1');
btn1.addEventListener("click",()=>{
    updateUserData("Kintamieji",["Pavizdys #1","Pavizdys #2","Išraiškos"]);
    sidebar.innerHTML = "<header>Šioje skiltyje</header>";
    for(obj of userData.description){
        const HTML= `<span style="display:block;text-align:center;margin-top:5px;border-left:5px solid gray;background:rgba(255,165,0,0.5);font-weight:800"><a href="#${obj}" style="text-decoration:none;color:black;" href="#">${obj}</a></span>`;
        sidebar.innerHTML+=HTML;
    }
})
