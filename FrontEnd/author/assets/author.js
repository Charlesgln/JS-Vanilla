const gallery = document.querySelector('.gallery');
const openModal = document.getElementById('projectModal')
const modal1 = document.getElementById('modal1')
const modal2 = document.getElementById('modal2') 
const stopPropAll = document.querySelectorAll('.js-modal-stop')
const editGallery = document.querySelector('.editGallery')
const closeModal = document.querySelectorAll('.closeModal')
const backModal = document.querySelector('.backModal')
const addPicture = document.getElementById('addPicture')
const inputTitle = document.getElementById('title')
const inputValidate = document.getElementById('Validate')
const inputFile = document.getElementById('img')
const select = document.querySelector('select')
const previewImg = document.getElementById('preview')
const hideButtonPicture = document.querySelector('.buttonPicture')
const errorTitle = document.querySelector('.errorTitle')
let allworks = [];


const fetchWorks = async () => {
    await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (allworks = data));   
    
}

const worksDisplay = async () => {
    await fetchWorks();
    for (let i = 0; i < allworks.length; i++) {
      const work = allworks[i];

      const figure = document.createElement("figure")
      
      const image = document.createElement("img")
      image.src = work.imageUrl
      image.alt = work.title
      figure.appendChild(image)

      const figcaption = document.createElement("figcaption")
      figcaption.innerHTML = work.title
      figure.appendChild(figcaption)

      gallery.appendChild(figure)
    }   
  }
  worksDisplay();


  const deleteWork = async (workId, e) => {
    await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('1') 
      },
    }).then((res) => {
      if(!res.ok) {
        console.log("Erreur dans la suppréssion"); 
      }
      else {
        e.preventDefault();
        console.log("C'est bon")
        e.target.parentNode.remove();
      }
    })  
    }

    
    const editDisplay = async () => {
        await fetchWorks();
        for (let i = 0; i < allworks.length; i++) {
          const work = allworks[i];

          const button = document.createElement('button');
          button.id = work.id;
          button.innerHTML = `<i class="fa-solid fa-trash-can" style="pointer-events: none;"></i>`
          button.addEventListener('click', async (e) => {
             await deleteWork(work.id, e)
            ;
            
          })
          
          const card = document.createElement('div')
          card.classList.add("card")
          card.appendChild(button)

          const image = document.createElement('img')
          image.src = work.imageUrl
          image.alt = work.title
          card.appendChild(image)

          const title = document.createElement('h6')
          title.innerHTML = "éditer"
          card.appendChild(title)
          
          editGallery.appendChild(card)     
        }
  
      }
      
      editDisplay();
      
      const stopPropagation = function (e)  {
       e.stopPropagation()
     };

        openModal.addEventListener('click', () => { 
            modal1.style.display= "flex";
            
        })
        
        closeModal.forEach((element) => {
          element.addEventListener('click', () => {
            modal1.style.display = "none";
            modal2.style.display = "none";
          })
        })
        
        
        addPicture.addEventListener('click', () => {
            modal2.style.display= "flex";
        })
        
        
        
        modal1.addEventListener('click', () => {
            modal1.style.display = "none";
            
          })
          
          
          modal2.addEventListener('click', () => {
            modal2.style.display = "none";
            modal1.style.display = "none";
          })
          
        
          stopPropAll.forEach((element) => element.addEventListener('click', stopPropagation))



       backModal.addEventListener('click', () => {
        modal2.style.display = "none";
       })
        


        inputTitle.addEventListener('keypress', () => {
          if (inputTitle.value.length > 4) {
           inputValidate.style.background = "#1D6154"
           inputValidate.style.cursor = "pointer"
           errorTitle.style.display= "none"

        } else {
            inputValidate.style.background = "#a7a7a7"
            inputValidate.style.cursor = "inherit"
            errorTitle.style.display= "block"

          }
        }
        )
        
let reader; 
inputFile.addEventListener('change', () => {
  reader = new FileReader(); 
  const file = inputFile.files[0];
  
  reader.addEventListener('load', () => {
    previewImg.src = reader.result;
    formData.append('image', file); 
  });
  
  if (file) {
    reader.readAsDataURL(file);
    hideButtonPicture.style.visibility = "hidden";
  }
});

const formData = new FormData();
let selectedCategorie = 0;

select.addEventListener('change', function (e) {
  selectedCategorie = e.target.value;
  console.log(selectedCategorie);
});

inputValidate.addEventListener('click', async (event) => {
  event.preventDefault();
  console.log(inputTitle.value.length)
  if (inputTitle.value.length == 0) {
    errorTitle.style.display= "block"
    return
  } else {

    formData.append('title', inputTitle.value);
    formData.append('category', selectedCategorie);
    
    await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {  
        'Authorization': 'Bearer ' + sessionStorage.getItem('1')
      },
      body: formData
    }).catch((error) => {
      console.error('Fetch error:', error)
    });
  }
  });
  
 