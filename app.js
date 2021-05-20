let code = document.getElementById('res');
let submit = document.getElementById('submit');
let url = document.getElementById('url');
let select = document.getElementById('select');
let main = document.getElementById('main');
let paramBox = document.getElementById('paramBox');
paramBox.style.display = "none"
let addedParamsCount = 0;
let create;
// COMFYFUNCS
function getElemfromString(str){
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
}
select.addEventListener("input", () => {
    // console.log(select.value);
    if (select.value == "Create") {
        main.style.display = "none";
        paramBox.style.display = "block"
        create = true;

    } else if (select.value == "GET | Traditional") {
        main.style.display = "block";
        paramBox.style.display = "none"
        create = false;
    }
})

let addParam = document.getElementById('addParam').addEventListener("click", () => {
    // console.log("clicked!!!");
    let params = document.getElementById('params');
    let str = `<div class="row" style="margin-top:10px; margin-bottom:10px">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Parameter ${addedParamsCount + 2}'s key" id="paramKey${addedParamsCount + 2}" aria-label="Placeholder 1's key">
                    </div>  
                    <div class="col">
                        <input type="text" class="form-control" id="paramVal${addedParamsCount + 2}" placeholder="Parameter ${addedParamsCount + 2}'s value" aria-label="Placeholder 1's value">
                    </div>
                    <button type="button" id="rmvParam" class="btn btn-primary remove" style="position:relative; margin:12px;width:40px; top:-12px">-</button>
                </div>`
    let paramElem = getElemfromString(str);
    params.appendChild(paramElem);
    // console.log(paramElem);
    let btns = document.getElementsByClassName('remove');
    for(item of btns) { 
        item.addEventListener('click', e => {
            e.target.parentElement.remove();
        })
    }
    addedParamsCount++;
})

submit.addEventListener("click", async () => {
    if (create){
        code.innerHTML = "Creating your JSON...Please stand by"
        let json = {};
        // console.log(addedParamsCount + 1);
        for (i=0; i<addedParamsCount+1; i++) {
            if (document.getElementById("paramKey" + (i + 1)) != null){
                let key = document.getElementById("paramKey" + (i + 1)).value;
                let val = document.getElementById("paramVal" + (i + 1)).value;
                json[key] = val;
            }
        }
        code.innerHTML = JSON.stringify(json);
        // console.log(`JSON.stringify(json)`);
        Prism.highlightAll()
    }
    else {
        code.innerHTML = "Getting your response...Please stand by"
        let u = url.value;
        const response = await fetch(u);
        const data = await response.json();
        code.innerHTML = JSON.stringify(data);
        // console.log(`JSON.stringify(data)`);
        Prism.highlightAll()
    }
    // console.log(addParam);

})
