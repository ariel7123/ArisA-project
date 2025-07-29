interface Product {
  url: string;
  title: string;
  discreption: string;
  price: number;
  stock: any;
}

const products: Product[] = [
  {
    url: "https://i.pcmag.com/imagery/roundups/06o6G8AsNkTfU4iPG42UXTV-66.fit_lim.size_1050x.jpg",
    title: "2024 Legion Tower i9 Gen 14",
    discreption: ` Processor: 14th Generation Intel® Core™ i9-14900KF.
    Video card: NVIDIA® GeForce RTX™ 4070 Ti SUPER 16GB GDDR6X.
    RAM: 32 GB DDR5-4000MHz (UDIMM) - (2 x 16 GB).
    Storage capcity: 1 TB SSD M.2 2280 PCIe Gen4 Performance TLC.`,
    price: 60,
    stock: 200,
  },
  {
    url: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-skyblue-select-202503?wid=892&hei=820&fmt=jpeg&qlt=90&.v=M2RyY09CWXlTQUp1KzEveHR6VXNxcTQ1bzN1SitYTU83Mm9wbk1xa1lWN2h4SGtCQ2R3aStVaDRhL2VUV1NjdkJkRlpCNVhYU3AwTldRQldlSnpRa0lIV0Fmdk9rUlVsZ3hnNXZ3K3lEVlk",
    title: "MacBook Air 2024",
    discreption: ` 10-Core CPU, 8-Core GPU, 16GB Unified Memory, 256GB SSD Storage, footnote`,
    price: 959,
    stock: 15,
  },
  {
    url: "https://img.ksp.co.il/item/283148/b_1.jpg?v=1699817655",
    title: "Samsung Galaxy Watch6 Classic 47mm",
    discreption: `Processor: Exynos W930 (Dualcore, 5nm) 1.4GHz,
          Storage & Capcity: 2.0GB RAM + 16GB,
          Connectivity: BT 5.3/ Wi-Fi 2.4GHz & 5GHz / GPS / NFC`,
    price: 254,
    stock: 12,
  },
  {
    url: "https://img.ksp.co.il/item/134985/b_1.jpg?v=1613399698",
    title: "2024 Legion Tower 7i Gen 8",
    discreption: `Thomas Kosmela No. 4 - (Afra L'Amour) -
          A scent of aromatic spices and amber.
          The perfume has an innovative, airy and sweet scent profile with exceptional environmental effects and
          long-lasting and long-lasting radiation.`,
    price: 86,
    stock: 3,
  },
];

//view func
function htmlItem(item: Product): string {
  {
    return `
      <div class="card cardContainer__item">
        <button class="btn btn-danger btn-sm deleteCardBtn" style="position:absolute; right:0.5rem; top:0.5rem;">
        <i class="fa-solid fa-trash"></i>
        </button>
        <img src=${item.url} class="card-img-top" alt="..."
        id="cardContainerItemImgUrl">
      <div class="card-body">
      <p class="card-text" id="cardContainerItemText">${item.title}</p>
      <p class="card-text p-descripttion" id="cardContainerItemdiscreption">
      <i class="fa-solid fa-file-lines"></i>${item.discreption}</p>
      <p class="card-text" id="cardContainerItemPrice">
      <i class="fa-solid fa-dollar-sign"></i>Price :${item.price}$</p>
      <p class="card-text" id="cardContainerItemStock">
      <i class="fa-solid 
      ${
        item.stock == "out of stock"
          ? "fa-times-circle text-danger"
          : "fa-check-circle text-success"
      }"></i>In stock :${item.stock}</p>
      </div>
    </div>
    `;
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
function renderItems(): void {
  try {
    const itemRoot = document.getElementById("itemRoot");
    if (!itemRoot) throw new Error("there is nothing to render");

    itemRoot.innerHTML = products.map(htmlItem).join("");
    addDeleteListeners()
  } catch (error) {
    console.error("there is nothing to render", error);
  }
}

// Control - but here we use addEvenetListner insted create event in the HTML file


const form = document.getElementById("adminPanel__form") as HTMLFormElement;
form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  console.log("submit pressed");
  
  const formData = new FormData(form);
  
  const itemToAdd: Product = {
    url: formData.get("photourl") as string,
    title: formData.get("title") as string,
    discreption: formData.get("discreption") as string,
    price: parseInt(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string),
  };

  if (itemToAdd.stock == 0) {
    itemToAdd.stock = "out of stock";
  }
  if(itemToAdd.price == 0 || isNaN(itemToAdd.price)){
    alert("the price is not valid")
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
  const deleteButtons = document.querySelectorAll(".deleteCardBtn")
  
  deleteButtons.forEach((btn, idx) => {
    btn.addEventListener("click", (e: Event) => {
      e.preventDefault()
      products.splice(idx, 1)
      renderItems();
    });
    
  });
}

////////////////////////////////
//     Theme btn function     //
////////////////////////////////

document.addEventListener("DOMContentLoaded", () =>{
  const themeToggleBtn = document.getElementById("themeToggleBtn")
  const body = document.body

  if (localStorage.getItem("theme") === "dark"){
    body.classList.toggle("dark-theme");
    (themeToggleBtn?.firstElementChild as HTMLElement).className = "fa-solid fa-sun";
  }

  themeToggleBtn?.addEventListener("click", () => {
    body.classList.toggle("dark-theme")

    if (body.classList.contains("dark-theme")) {
      (themeToggleBtn.firstElementChild as HTMLElement).className = "fa-solid fa-sun"
      localStorage.setItem("theme", "dark")
    } else {
      (themeToggleBtn.firstElementChild as HTMLElement).className = "fa-solid fa-moon"
      localStorage.setItem("theme", "light")
    }
  })
})



// Allwayes call the render!
renderItems();