//view func
function htmlItem(item) {
    return "\n      <div class=\"card cardContainer__item\">\n      <img src=" + item.url + " class=\"card-img-top\" alt=\"...\"\n        id=\"cardContainerItemImgUrl\">\n      <div class=\"card-body\">\n      <p class=\"card-text\" id=\"cardContainerItemText\">" + item.title + "</p>\n      <p class=\"card-text p-descripttion\" id=\"cardContainerItemdiscreption\">\n      <i class=\"fa-solid fa-file-lines\"></i>" + item.discreption + "</p>\n      <p class=\"card-text\" id=\"cardContainerItemPrice\">\n      <i class=\"fa-solid fa-dollar-sign\"></i>Price :" + item.price + "$</p>\n      <p class=\"card-text\" id=\"cardContainerItemStock\">\n      <i class=\"fa-solid \n      " + (item.stock == "out of stock"
        ? "fa-times-circle text-danger"
        : "fa-check-circle text-success") + "\"></i>In stock :" + item.stock + "</p>\n      </div>\n    </div>\n    ";
}
function renderItems(item) {
    try {
        var itemRoot = document.getElementById("itemRoot");
        if (!itemRoot)
            throw new Error("there is nothing to render");
        itemRoot.innerHTML += htmlItem(item);
        console.log(item.url);
    }
    catch (error) {
        console.log("there is nothis to render", error);
    }
}
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
    console.log(itemToAdd.price);
    renderItems(itemToAdd);
    form.reset();
});
