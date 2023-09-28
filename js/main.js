var batch = 0;
const items = document.querySelectorAll(".item")
const itemContainer = document.querySelector(".infinite-scroll-container")

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
    })
    // console.log(entries)
}, {
    threshold: .5
})

loadNewItems()
const lastItemObserver = new IntersectionObserver(entries => {
    const lastItem = entries[0]
    if (!lastItem.isIntersecting) return
    loadNewItems()
    lastItemObserver.unobserve(lastItem.target)
    lastItemObserver.observe(document.querySelector(".item:last-child"))
})

lastItemObserver.observe(document.querySelector(".item:last-child"))

function loadNewItems() {
    for(let i = 0; i < 10; i++){
        const item = document.createElement("div")
        item.textContent = "New Item  #" + (batch + i + 1) 
        item.classList.add("item")
        item.style.backgroundColor = generatePastelColor();
        observer.observe(item)
        itemContainer.append(item)
    }
    batch += 10
}

function generatePastelColor() {
    let R = Math.floor((Math.random() * 127) + 127);
    let G = Math.floor((Math.random() * 127) + 127);
    let B = Math.floor((Math.random() * 127) + 127);

    let rgb = (R << 16) + (G << 8) + B;
    return `#${rgb.toString(16)}`;      
}

