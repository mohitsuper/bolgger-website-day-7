
function navBar(){
    let menu = document.querySelector(".menu");
    let close = document.querySelector(".close");
    let navMobile = document.querySelector("nav ul");
    menu.addEventListener("click",()=>{
        navMobile.style.left = "0";
    })
    close.addEventListener("click",()=>{
        navMobile.style.left = "100%";
    })
}



function mainData(searchValue = ""){
    let mainData = document.querySelector(".main-data");
    let isValue = false;
    async function BlogImages(id){
        let res = await fetch(`https://dummyjson.com/icon/abc${id}/150`);
        let data = res.url;
        return Promise.resolve(data);
    }

    async function BlogData(){
        let response = await fetch('https://dummyjson.com/posts');
        let data = await response.json();
        for(let item of data.posts){
            let img = await BlogImages(item.id);
            let tagValue = item.tags.find((val)=>val.toLowerCase() == searchValue.toLowerCase());

            let tag = item.tags.map((val)=>{return(`<span class="bg-[#eee] px-2 py-1 mr-2">${val}</span>`)}).join("");

            function SingleCardhtml(){
                return(
                    `<div class="single-card h-[25rem] w-full max-w-md bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
  <!-- Image Section -->
  <div class="h-[50%] w-full">
    <img src="${img}" alt="Post Image" class="h-full w-full object-cover" />
  </div>

  <!-- Text Content -->
  <div class="single-card-text px-4 py-3 space-y-2">
    <h3 class="font-semibold text-lg text-gray-800 truncate">${item.title.substring(0, 40)}...</h3>
    <p class="text-gray-600 text-sm">${item.body.substring(0, 120)}...</p>
    <p class="text-sm text-gray-500">Tags: ${tag}</p>
    
    <a href="view_more.html?id=${item.id}&img=${encodeURIComponent(img)}"
       class="inline-block text-blue-600 text-sm font-medium hover:underline mt-1">
      View More →
    </a>
  </div>
</div>
`
                )
            }
            if(searchValue !=""){

                if(tagValue){
                isValue = true;
                let SingleCard = SingleCardhtml();
                      console.log(SingleCard);
                mainData.innerHTML = SingleCard;
                }
            }
            else{
                let SingleCard = SingleCardhtml();
                  mainData.innerHTML += SingleCard;
            }
        }
        if(searchValue !="" && !isValue){
            mainData.innerHTML = "Data not a Present";
        }
    }
    BlogData();
    
}

function Search(){
    let searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click",()=>{
        let searchInput = document.querySelector(".search-input");
        let searchValue = searchInput.value;
        mainData(searchValue);
    })
}
Search();
mainData();
navBar();