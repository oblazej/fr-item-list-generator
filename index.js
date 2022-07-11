//TODO: settings, save settings in browser, recognize all types of items, recognize errors

const button = document.getElementById("submit");
const input = document.getElementById("user-input");
const output = document.getElementById("user-output");
const items = document.getElementById("user-items");

let settings = {
    itemsPerLine: 5,
    nameNextToPicture: false,
    nameNextToPicturePosition: "left",
    quantityNextToPicture: false,
    quantityNextToPicturePosition: "left",
    quantityNextToName: true,
    replaceList: true
}

button.onclick = function (e) {
    try {
        const template = document.createElement("template");
        let list = [];
        template.innerHTML = input.value;
        input.value = "";
    
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
            output.textContent += `${item.name} x${item.quantity}, `
            items.textContent += `[item=${item.name}]`
        })
    } catch {
        console.log("error")
    }

}