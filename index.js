const button = document.getElementById("submit");
const input = document.getElementById("user-input");
const output = document.getElementById("user-output");
const items = document.getElementById("user-items");

button.onclick = function () {
    const template = document.createElement("template");
    let list = [];
    template.innerHTML = input.value;

    for (let i = 0; i < template.content.firstChild.childNodes.length; i++) {
        if (i % 2 === 1) {
            if (template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].childNodes[1] !== undefined) {
                list.push({
                    name: template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].childNodes[1].getAttribute("data-name"),
                    quantity: template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].textContent.trim()
                }
                )
            } else {
                list.push({name: template.content.firstChild.childNodes[i].childNodes[1].childNodes[1].getAttribute("data-name"),
            quantity: template.content.firstChild.childNodes[i].childNodes[1].childNodes[3].childNodes[3].value
                }
                    )
            }

        }
    }
    console.log(list)

    list.forEach(function(item){
        output.innerHTML += `${item.name} x${item.quantity.replace("*", "")}, `
        items.innerHTML += `[item=${item.name}]`
    })
}