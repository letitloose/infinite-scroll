const itemList = document.getElementById("item-list");
const loadMoreButton = document.getElementById("load-more");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");
const pageButtonsContainer = document.getElementById("page-buttons");
let currentPage = 1;
let totalPages = 5; // Total number of pages (initially set to 5)
const maxVisiblePages = 5; // Maximum number of visible page buttons

// Function to fetch and append items
function fetchItems(page) {
    // Simulate fetching items from an API or database
    const itemsPerPage = 12; // Number of items to load per page
    const items = [];
    for (let i = 0; i < itemsPerPage; i++) {
        const item = document.createElement("li");
        item.className = "item";
        item.style.backgroundColor = generatePastelColor()
        item.textContent = `Item ${(page - 1) * itemsPerPage + i + 1}`;
        items.push(item);
    }
    return items;
}

function generatePastelColor() {
    let R = Math.floor((Math.random() * 127) + 127);
    let G = Math.floor((Math.random() * 127) + 127);
    let B = Math.floor((Math.random() * 127) + 127);

    let rgb = (R << 16) + (G << 8) + B;
    return `#${rgb.toString(16)}`;      
}

// Function to load a specific page
function loadPage(page) {
    if (page < 1){
        page = 1
    }
    itemList.innerHTML = "";
    const items = fetchItems(page);
    items.forEach(item => itemList.appendChild(item));
    currentPage = page;
    updateActiveButton()
}

function loadPageAndButtons(page) {
    loadPage(page)
    addPageButtons()
}

// Function to update pagination buttons
function updateActiveButton() {
    const pageButtons = document.querySelectorAll(".page-button");
    pageButtons.forEach(button => button.classList.remove("active"));
    const activeButton = document.querySelector(`#page-buttons .page-button[data-page="${currentPage}"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }
}

// Add click event listeners to Next and Previous buttons
prevPageButton.addEventListener("click", () => loadPageAndButtons(currentPage - 1));
nextPageButton.addEventListener("click", () => loadPageAndButtons(currentPage + 1));

// Function to create and add numbered page buttons
function createPageButton(page) {
    const button = document.createElement("button");
    button.className = "page-button";
    button.textContent = page;
    button.setAttribute("data-page", page);
    button.addEventListener("click", () => loadPage(page));
    return button;
}

// Add numbered page buttons
function addPageButtons() {
    const pageButtons = document.getElementById("page-buttons");
    pageButtons.innerHTML = "";

    // Calculate the start and end page numbers for visible buttons
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    // // Ensure that there are enough pages to display maxVisiblePages
    // if (endPage > totalPages) {
    //     endPage = totalPages;
    //     startPage = Math.max(1, endPage - maxVisiblePages + 1);
    // }

    for (let i = startPage; i <= endPage; i++) {
        const button = createPageButton(i);
        if (i === currentPage) {
            button.classList.add("active");
        }
        pageButtons.appendChild(button);
    }
}

// Initial load
loadPage(1);
addPageButtons();

// Function to handle adding more page buttons as needed
// function handlePagination() {
//     if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
//         totalPages += 5; // Add 5 more pages when reaching the end
//         addPageButtons();
//     }
// }

// // Add click event listener to Load More button
// loadMoreButton.addEventListener("click", () => {
//     loadPage(currentPage + 1);
//     handlePagination();
// });