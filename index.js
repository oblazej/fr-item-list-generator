//TODO: settings, save settings in browser, recognize all types of items, recognize errors
const itemsPerLineLSKey = "itemsPerLine";
const nameNextToPictureLSKey = "nameNextToPicture";
const nameNextToPicturePositionLSKey = "nameNextToPicturePosition";
const quantityNextToPictureLSKey = "quantityNextToPicture";
const quantityNextToPicturePositionLSKey = "quantityNextToPicturePosition";
const quantityNextToNameLSKey = "quantityNextToName";
const replaceListLSKey = "replaceList";

const userInput = document.getElementById("user-input");
const iconsOutput = document.getElementById("user-output");
const itemsOutput = document.getElementById("user-items");

let settings = {
    itemsPerLine: localStorage.getItem(itemsPerLineLSKey) || "5",
    nameNextToPicture: Number(localStorage.getItem(nameNextToPictureLSKey)) || 0,
    nameNextToPicturePosition: localStorage.getItem(nameNextToPicturePositionLSKey) || "left",
    quantityNextToPicture: Number(localStorage.getItem(quantityNextToPictureLSKey)) || 0,
    quantityNextToPicturePosition: localStorage.getItem(quantityNextToPicturePositionLSKey) || "left",
    quantityNextToName: Number(localStorage.getItem(quantityNextToNameLSKey)) || 1,
    replaceList: Number(localStorage.getItem(replaceListLSKey)) || 1
}

const createList = () => {
    try {
        const template = document.createElement("template");
        let list = [];
        template.innerHTML = userInput.value;
        userInput.value = "";
    
        for (let i = 0; i < template.content.firstChild.childNodes.length; i++) {
            if (i % 2 === 1) {
                if (template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].childNodes[1] !== undefined) {
                    list.push({
                        name: template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].childNodes[1].getAttribute("data-name"),
                        quantity: template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].textContent.trim().replace("*", "")
                    }
                    )
                } else {
                    if(template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].childNodes[1].className === "common-checkbox") {
                        list.push({
                            name: template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].getAttribute("data-name"),
                            quantity: 1
                        })
                    } else {
                        if(template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].childNodes[1].className === "common-checkbox") {
                            list.push({
                                name: template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].getAttribute("data-name"),
                                quantity: template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].childNodes[3].value
                            })
                    }
                }
                }
    
            }
        }
        console.log(list)
    
        list.forEach(function (item) {
            iconsOutput.textContent += `${item.name} x${item.quantity}, `
            itemsOutput.value += `[item=${item.name}]`
        })
    } catch {
        console.log("error")
    }

}

const changeItemsPerLineSettings = () => {
    document.getElementsByName("line").forEach((element) => element.addEventListener("click", function(e) {settings.itemsPerLine = e.target.value;
        localStorage.setItem(itemsPerLineLSKey, settings.itemsPerLine)}));
    document.getElementsByName("name-next-to-picture")[0].addEventListener("click", function(e) { settings.nameNextToPicture = Number(e.target.checked) 
        localStorage.setItem(nameNextToPictureLSKey, settings.nameNextToPicture)});
    document.getElementsByName("name-position").forEach((element) => element.addEventListener("click", function(e) {settings.nameNextToPicturePosition = e.target.value;
        localStorage.setItem(nameNextToPicturePositionLSKey, settings.nameNextToPicturePosition)}) )
}

const mapSettingsToFrontend = () => {
    document.getElementsByName("line").forEach((element) => {if(element.value === settings.itemsPerLine) element.checked = true});
    document.getElementsByName("name-next-to-picture")[0].checked = Boolean(settings.nameNextToPicture);
    document.getElementsByName("name-position").forEach((element) => {if(element.value === settings.nameNextToPicturePosition) element.checked = true});
    document.getElementsByName("quantity")[0].checked = Boolean(settings.quantityNextToPicture);
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
    mapSettingsToFrontend();
    changeItemsPerLineSettings();
}

init();