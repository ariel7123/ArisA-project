var products = [
    {
        url: "https://i.pcmag.com/imagery/roundups/06o6G8AsNkTfU4iPG42UXTV-66.fit_lim.size_1050x.jpg",
        title: "2024 Legion Tower i9 Gen 14",
        discreption: " Processor: 14th Generation Intel\u00AE Core\u2122 i9-14900KF.\n    Video card: NVIDIA\u00AE GeForce RTX\u2122 4070 Ti SUPER 16GB GDDR6X.\n    RAM: 32 GB DDR5-4000MHz (UDIMM) - (2 x 16 GB).\n    Storage capcity: 1 TB SSD M.2 2280 PCIe Gen4 Performance TLC.",
        price: 60,
        stock: 200
    },
    {
        url: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-skyblue-select-202503?wid=892&hei=820&fmt=jpeg&qlt=90&.v=M2RyY09CWXlTQUp1KzEveHR6VXNxcTQ1bzN1SitYTU83Mm9wbk1xa1lWN2h4SGtCQ2R3aStVaDRhL2VUV1NjdkJkRlpCNVhYU3AwTldRQldlSnpRa0lIV0Fmdk9rUlVsZ3hnNXZ3K3lEVlk",
        title: "MacBook Air 2024",
        discreption: " 10-Core CPU, 8-Core GPU, 16GB Unified Memory, 256GB SSD Storage, footnote",
        price: 959,
        stock: 15
    },
    {
        url: "https://img.ksp.co.il/item/283148/b_1.jpg?v=1699817655",
        title: "Samsung Galaxy Watch6 Classic 47mm",
        discreption: "Processor: Exynos W930 (Dualcore, 5nm) 1.4GHz,\n          Storage & Capcity: 2.0GB RAM + 16GB,\n          Connectivity: BT 5.3/ Wi-Fi 2.4GHz & 5GHz / GPS / NFC",
        price: 254,
        stock: 12
    },
    {
        url: "https://img.ksp.co.il/item/134985/b_1.jpg?v=1613399698",
        title: "2024 Legion Tower 7i Gen 8",
        discreption: "Thomas Kosmela No. 4 - (Afra L'Amour) -\n          A scent of aromatic spices and amber.\n          The perfume has an innovative, airy and sweet scent profile with exceptional environmental effects and\n          long-lasting and long-lasting radiation.",
        price: 86,
        stock: 3
    },
];
//view func
function htmlItem(item, index) {
    {
        return "\n      <div class=\"card cardContainer__item\">\n        <button class=\"btn btn-danger btn-sm deleteCardBtn\" style=\"position:absolute; right:0.5rem; top:0.5rem;\">\n\n        <i class=\"fa-solid fa-trash\"></i>\n        </button>\n        <button onclick=\"handleEdit(" + index + ")\" type=\"button\" class=\"btn btn-primary btn-sm editCardBtn\"  \n        style=\"position:absolute; \n        right:3rem; top:0.5rem;\" \n        data-bs-toggle=\"modal\" \n        data-bs-target=\"#exampleModal\">\n        <i class=\"fa fa-pencil-square fa-lg\" aria-hidden=\"true\"></i>\n        </button>\n      <img src=" + item.url + " class=\"card-img-top\" alt=\"...\"\n        id=\"cardContainerItemImgUrl\">\n      <div class=\"card-body\">\n      <p class=\"card-text\" id=\"cardContainerItemText\">" + item.title + "</p>\n      <p class=\"card-text p-descripttion\" id=\"cardContainerItemdiscreption\">\n      <i class=\"fa-solid fa-file-lines\"></i>" + item.discreption + "</p>\n      <p class=\"card-text\" id=\"cardContainerItemPrice\">\n      <i class=\"fa-solid fa-dollar-sign\"></i>Price :" + item.price + "$</p>\n      <p class=\"card-text\" id=\"cardContainerItemStock\">\n      <i class=\"fa-solid \n      " + (item.stock == "out of stock"
            ? "fa-times-circle text-danger"
            : "fa-check-circle text-success") + "\"></i>In stock :" + item.stock + "</p>\n      </div>\n    </div>\n    ";
    }
}
// function renderItems(item: Product): void {
//   try {
//     const itemRoot = document.getElementById("itemRoot");
//     if (!itemRoot) throw new Error("there is nothing to render");
//     for (let i = 0; i < products.length; i++) {
//       itemRoot.innerHTML += htmlItem(item);
//     }
//     console.log(item.url);
//   } catch (error) {
//     console.log("there is nothis to render", error);
//   }
// }
// Moudle - rearrange the data
function renderItems() {
    try {
        var itemRoot = document.getElementById("itemRoot");
        if (!itemRoot)
            throw new Error("there is nothing to render");
        itemRoot.innerHTML = products
            .map(function (item, index) { return htmlItem(item, index); })
            .join("");
        addDeleteListeners();
    }
    catch (error) {
        console.error("there is nothing to render", error);
    }
}
// Control - but here we use addEvenetListner insted create event in the HTML file
var form = document.getElementById("adminPanel__form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit pressed");
    var formData = new FormData(form);
    var itemToAdd = {
        url: formData.get("photourl"),
        title: formData.get("title"),
        discreption: formData.get("discreption"),
        price: parseInt(formData.get("price")),
        stock: parseInt(formData.get("stock"))
    };
    if (itemToAdd.stock == 0) {
        itemToAdd.stock = "out of stock";
    }
    if (itemToAdd.price == 0 || isNaN(itemToAdd.price)) {
        alert("the price is not valid");
        return;
    }
    products.push(itemToAdd);
    console.log(products);
    // console.log(itemToAdd.price)
    renderItems();
    form.reset();
});
////////////////////////////////
//     delete btn function    //
////////////////////////////////
// delete btn control
function addDeleteListeners() {
    var deleteButtons = document.querySelectorAll(".deleteCardBtn");
    deleteButtons.forEach(function (btn, idx) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            products.splice(idx, 1);
            renderItems();
        });
    });
}
////////////////////////////////
//     edit btn functions    //
////////////////////////////////
var edit = document.getElementById("editForm");
edit.addEventListener("submit", function (event) {
    event.preventDefault();
    var editData = new FormData(edit);
    var index = parseInt(editData.get("index"));
    var itemToEdit = {
        url: editData.get("photourl"),
        title: editData.get("title"),
        discreption: editData.get("discreption"),
        price: parseInt(editData.get("price")),
        stock: parseInt(editData.get("stock"))
    };
    console.log("itemToEdit");
    products[index] = itemToEdit;
    renderItems();
});
function handleEdit(index) {
    console.log(index);
    var productToEdit = products[index];
    document.getElementById("inputUrl").value =
        productToEdit.url;
    document.getElementById("inputTitle").value =
        productToEdit.title;
    document.getElementById("inputDesc").value =
        productToEdit.discreption;
    document.getElementById("inputPrice").value =
        productToEdit.price.toString();
    document.getElementById("inputStock").value =
        productToEdit.stock.toString();
    document.getElementById("editIndex").value =
        index.toString();
}
// Allwayes call the render!
renderItems();
