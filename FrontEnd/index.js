const gallery = document.querySelector('.gallery');
const filter = document.querySelector('.filter');
const sortByAll = document.getElementById('all')


const fetchWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;
}

const fetchCategories = async () => {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    return data;
}

const worksDisplay = async (works) => {
    gallery.innerHTML = works.map(
        (work) => `
            <figure>
                <img src=${work.imageUrl} alt=${work.title}>
                <figcaption>${work.title}</figcaption>
            </figure>
        `
    ).join("");
}

sortByAll.addEventListener('click', async () => {
    const works = await fetchWorks();
    worksDisplay(works)
})

sortByAll.click();

const categoryDisplay = async () => {
    const categories = await fetchCategories();

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];

        const button = document.createElement('button');
        button.id = category.id;
        button.innerHTML = category.name;
        filter.appendChild(button);

        button.addEventListener('click', async () => {
            const works = await fetchWorks();
            const filteredWorks = works.filter((work) => work.categoryId === category.id);
            worksDisplay(filteredWorks);
        });
    }
}

categoryDisplay();