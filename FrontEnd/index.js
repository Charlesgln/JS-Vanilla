const gallery = document.querySelector('.gallery');
let allworks = [];
let allcategories = [];




const fetchWorks = async () => {
    await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (allworks = data));
    console.log(allworks);

}

const fetchCategories = async () => {
    await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => (allcategories = data));
    
    console.log(allcategories);
}

fetchCategories();


const worksDisplay = async () => {
   await fetchWorks();
   console.log(allworks);
    gallery.innerHTML = allworks.map(
        (work) => 
        `
        <figure>
        <img src=${work.imageUrl} alt=${work.title}>
        <figcaption>${work.title}</figcaption>
        </figure>
        ` 
        )
    .join("") 

}    

worksDisplay();
