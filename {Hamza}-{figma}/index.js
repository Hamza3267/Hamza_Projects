let container = document.getElementById('container');
let btn = document.querySelectorAll('.navbar li');
let newul = document.querySelectorAll('.navv li');

console.log(newul);
let arr = [];
let count = 0;

async function datafetch(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    arr = data.products;
    console.log(arr.length);
    createCards();

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
console.log(arr.length);

function createCards() {
  arr.forEach(product => {
    let card = document.createElement('div');
    card.className = "card";

    let image = document.createElement('img');
    image.src = product.thumbnail;

    let h3 = document.createElement('h3');
    h3.textContent = product.brand;

    let p = document.createElement('p');
    p.textContent = product.description;

    let div = document.createElement('div');
    div.className = "cont";

    let psp = document.createElement('p');
    psp.textContent = `$${product.price}`;

    let pep = document.createElement('p');
    pep.textContent = `${product.rating}*`;

    div.appendChild(psp);
    div.appendChild(pep);
    card.appendChild(image);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(div);
    container.appendChild(card);
  });
}

function reset() {
  container.innerHTML = "";
}
function skip(count) {
  return Math.max(0, count) * 10;
}

btn.forEach((event) => {
  event.addEventListener("click", () => {
    const newvariable = event.textContent;
   
    if (newvariable === 'ALL') {
      reset();
      datafetch('https://dummyjson.com/products?limit=10');
      // datafetch(urll);
    }
    else {
      reset();
      datafetch(`https://dummyjson.com/products/category/${newvariable}`);
    }

  });
 
})
newul.forEach((elem) => {
  elem.addEventListener("click", () => {
    const arrr = elem.textContent;
    console.log(arrr);

    if (arrr == 'Previous') {
      if (count > 0) {
        reset();
        count--;
        let skipp = skip(count);
        datafetch(`https://dummyjson.com/products?limit=10&skip=${skipp}`);
      }
    }
    else if (arrr == '1') {
      reset();
      datafetch('https://dummyjson.com/products?limit=10&skip=0');
    }
    else if (arrr == '2') {
      reset();
      datafetch('https://dummyjson.com/products?limit=10&skip=10');
    }
    else if (arrr == '3') {
      reset();
      datafetch('https://dummyjson.com/products?limit=10&skip=20');
    }
    else {
      
      reset();
      count++;
      let skipp = skip(count);
      datafetch(`https://dummyjson.com/products?limit=10&skip=${skipp}`);
      
    }
  })
})