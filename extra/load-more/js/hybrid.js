var batch = 0;
const batchSize = 48;
const items = document.querySelectorAll(".item")
const itemContainer = document.querySelector(".infinite-scroll-container")

loadNewItems()

function loadNewItems() {
    for(let i = 0; i < batchSize; i++){
        const item = document.createElement("div")
        item.textContent = "New Item  #" + (batch + i + 1) 
        item.classList.add("item")
        item.style.backgroundColor = generatePastelColor();
        itemContainer.append(item)
    }
    batch += batchSize
}


function loadAnotherPage() {
    const pageBreak = document.createElement("div")
    pageBreak.textContent = "Page #" + (batch/batchSize + 1) 
    pageBreak.style.backgroundColor = 'rgb(' + [245,253,153].join(',') + ')'; 
    itemContainer.append(pageBreak)
    loadNewItems()
}

function generatePastelColor() {
    let R = Math.floor((Math.random() * 127) + 127);
    let G = Math.floor((Math.random() * 127) + 127);
    let B = Math.floor((Math.random() * 127) + 127);

    let rgb = (R << 16) + (G << 8) + B;
    return `#${rgb.toString(16)}`;      
}

