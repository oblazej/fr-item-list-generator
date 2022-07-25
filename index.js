const userInput = document.getElementById("user-input");
const iconsOutput = document.getElementById("user-output");
const itemsOutput = document.getElementById("user-items");
const radios = ["itemsPerLine", "nameNextToPicturePosition", "quantityNextToPicturePosition", "quantityNextToNamePosition"];
const checkboxes = ["nameNextToPicture", "quantityNextToPicture", "quantityNextToName", "replaceList", "useColumns"];

let settings = {
    itemsPerLine: localStorage.getItem("itemsPerLine") || "5",
    nameNextToPicture: Number(localStorage.getItem("nameNextToPicture")) || 0,
    nameNextToPicturePosition: localStorage.getItem("nameNextToPicturePosition") || "left",
    quantityNextToPicture: Number(localStorage.getItem("quantityNextToPicture")) || 0,
    quantityNextToPicturePosition: localStorage.getItem("quantityNextToPicturePosition") || "left",
    quantityNextToName: !localStorage.getItem("quantityNextToName") ? 1 : Number(localStorage.getItem("quantityNextToName")),
    quantityNextToNamePosition: localStorage.getItem("quantityNextToNamePosition") || "left",
    replaceList: !localStorage.getItem("replaceList") ? 1 : Number(localStorage.getItem("replaceList")),
    useColumns: Number(localStorage.getItem("useColumns")) || 0
}

const templateSettings = {
    classic: {
        itemsPerLine: "5",
        nameNextToPicture: 0,
        quantityNextToPicture: 0,
        quantityNextToName: 1,
        quantityNextToNamePosition: "left",
        useColumns: 0
    },
    columns: {
        itemsPerLine: "2",
        nameNextToPicture: 1,
        quantityNextToPicture: 1,
        quantityNextToPicturePosition: "right",
        quantityNextToName: 0,
        useColumns: 1
    }
}

const createList = () => {
    try {
        if(settings.replaceList) {
            itemsOutput.value = "";
            iconsOutput.value = "";
        }
        const template = document.createElement("template");
        let list = [];
        template.innerHTML = userInput.value;
        userInput.value = "";
    
        for (let i = 0; i < template.content.firstChild.childNodes.length; i++) {
            if (i % 2 === 1) {
                if(template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].childNodes[3]) {
                    list.push({
                        name: template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].getAttribute("data-name"),
                        quantity: template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].childNodes[3].value
                    })
                } else {
                    if(template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].childNodes[1].className === "common-checkbox") {
                        list.push({
                            name: template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].getAttribute("data-name"),
                            quantity: "1"
                        })
                    } else {
                        list.push({
                            name: template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].childNodes[1].getAttribute("data-name"),
                            quantity: template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].textContent.trim().replace("*", "")
                        })
                    }
                }

            }
        }
        console.log(list)
    
        list.forEach(function (item, index) {
            if ((index + 1) % Number(settings.itemsPerLine) === 0 && (index + 1) !== list.length) {
            itemsOutput.value += `${settings.quantityNextToPicture && settings.quantityNextToPicturePosition === "left" ? (item.quantity + "x ") : ""}${settings.nameNextToPicture && settings.nameNextToPicturePosition === "left" ? (" " + item.name + " ") : ""}[item=${item.name}]${settings.nameNextToPicture && settings.nameNextToPicturePosition === "right" ? (" " + item.name + " ") : ""}${settings.quantityNextToPicture && settings.quantityNextToPicturePosition === "right" ? (" x" + item.quantity + " ") : ""}\n`
            } else {
            itemsOutput.value += `${settings.quantityNextToPicture && settings.quantityNextToPicturePosition === "left" ? (item.quantity + "x ") : ""}${settings.nameNextToPicture && settings.nameNextToPicturePosition === "left" ? (" " + item.name + " ") : ""}[item=${item.name}]${settings.nameNextToPicture && settings.nameNextToPicturePosition === "right" ? (" " + item.name + " ") : ""}${settings.quantityNextToPicture && settings.quantityNextToPicturePosition === "right" ? (" x" + item.quantity + " ") : ""}`
            }
            iconsOutput.value += `${settings.quantityNextToName && settings.quantityNextToNamePosition === "left" ? (item.quantity + "x ") : ""}${item.name}${settings.quantityNextToName && settings.quantityNextToNamePosition === "right" ? (" x" + item.quantity) : ""}, `
        })
        itemsOutput.value = itemsOutput.value.replace(/[^\S\r\n]/, ' ').trim();
        iconsOutput.value = iconsOutput.value.replace(/[^\S\r\n]/, ' ').trim();
    } catch {
        console.log("error")
    }

}

const initTemplates = () => {
    const templates = [...document.getElementsByClassName("template")];
    templates.forEach((template) => template.addEventListener("click", () => {
        console.log(templateSettings[template.getAttribute("data-template")])
        settings = {
            ...settings,
            ...templateSettings[template.getAttribute("data-template")]
        }
        saveSettings();
        console.log(settings)
    }))
}

const mapRadiosToFrontend = () => {
    radios.forEach((radio) => document.getElementsByName(radio).forEach((element) => {if(element.value === settings[radio]) element.checked = true;
        element.addEventListener("click", function(e) {settings[radio] = e.target.value;
            localStorage.setItem(radio, settings[radio])})}));
}

const mapCheckboxesToFrontend = () => {
    checkboxes.forEach((checkbox) => {document.getElementsByName(checkbox)[0].checked = Boolean(settings[checkbox]);
    if(!settings[checkbox] && checkbox !== "replaceList" && checkbox !== "useColumns") document.getElementById(checkbox).classList.toggle("hidden"); 
    document.getElementsByName(checkbox)[0].addEventListener("click", function(e) { settings[checkbox] = Number(e.target.checked);
        if(checkbox !== "replaceList" && checkbox !== "useColumns") document.getElementById(checkbox).classList.toggle("hidden");
        localStorage.setItem(checkbox, settings[checkbox])})});
}

const saveSettings = () => {
    radios.forEach((radio) => document.getElementsByName(radio).forEach((element) => {
        localStorage.setItem(radio, settings[radio]);
        if(element.value === settings[radio]) element.checked = true}));
        checkboxes.forEach((checkbox) => {
            localStorage.setItem(checkbox, settings[checkbox]);
            document.getElementsByName(checkbox)[0].checked = Boolean(settings[checkbox]);
            //TODO: fix
            // if(checkbox !== "replaceList" && checkbox !== "useColumns" && document.getElementsByName(checkbox)[0].checked) document.getElementById(checkbox).classList.remove("hidden");
        });
}

const copyToClipboard = (e) => {
    let copyText = document.getElementById(e.target.dataset.text);
    console.log(copyText)
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
  }

const init = () => {
    document.getElementById("create").onclick = createList;
    document.getElementById("user-output-copy").addEventListener("click", copyToClipboard);
    document.getElementById("user-items-copy").addEventListener("click", copyToClipboard);
    mapRadiosToFrontend();
    mapCheckboxesToFrontend();
    initTemplates();
}

init();