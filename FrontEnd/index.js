const gallery = document.querySelector('.gallery');
const filter = document.querySelector('.filter');
const sortbyAll = document.getElementById('0');
const sortbyObject = document.getElementById('1');
const sortbyAppartments = document.getElementById('2');
const sortbyHostel = document.getElementById('3');

let allworks = [];

const fetchWorks = async () => {
    await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (allworks = data));   
}
    
    const worksDisplay = async () => {
        await fetchWorks();
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


sortbyAll.addEventListener('click', async () => {
    await fetchWorks();
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
})
    
sortbyObject.addEventListener('click', async () => {
    await fetchWorks();
        gallery.innerHTML = allworks.filter((element) => element.categoryId === 1)
        .map(
            (work) => 
            `
            <figure>
            <img src=${work.imageUrl} alt=${work.title}>
            <figcaption>${work.title}</figcaption>
            </figure>
            ` 
            )
            .join("") 
})

sortbyAppartments.addEventListener('click', async () => {
 await fetchWorks();
   gallery.innerHTML = allworks.filter((element) => element.categoryId === 2)
        .map(
            (work) => 
            `
            <figure>
            <img src=${work.imageUrl} alt=${work.title}>
            <figcaption>${work.title}</figcaption>
            </figure>
            ` 
            )
            .join("") 
})

sortbyHostel.addEventListener('click', async () => {
   await fetchWorks();
   gallery.innerHTML = allworks.filter((element) => element.categoryId === 3)
        .map(
            (work) => 
            `
            <figure>
            <img src=${work.imageUrl} alt=${work.title}>
            <figcaption>${work.title}</figcaption>
            </figure>
            ` 
            )
            .join("") 
})