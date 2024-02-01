const search = document.getElementById('search');
const button = document.getElementById('search-btn');

(async function allTags() {
    const res = await fetch('https://www.tronalddump.io/tag');
    const jsonRes = await res.json();

    const tags_ele = document.getElementById('tags');

    const tagsList = jsonRes._embedded.tag.map(eachTag => {
        const li_tag = document.createElement('li');
        const a_tag = document.createElement('a');
        a_tag.innerText = eachTag.value;
        li_tag.appendChild(a_tag);
        tags_ele.appendChild(li_tag);
    })

    const tags = document.getElementsByTagName('a');
    for (let i = 0; i < tags.length; i++) {
        tags[i].addEventListener('click', () => {
            console.log(tags[i].textContent);
            const tag_url = `https://www.tronalddump.io/search/quote?tag=${tags[i].textContent}`;
            searchAction(tag_url);
        });
    }
})()

searchAction = async (api_url) => {
    const response = await fetch(api_url);
    const resJson = await response.json();

    const quotes = document.getElementById('quotes');

    const quotesData = resJson._embedded.quotes;

    let itemsPerPage = 5;
    let pageNumber = 1;

    function renderQuotes(pageNumber) {
        quotes.innerHTML = '';

        firstIndex = (pageNumber - 1) * itemsPerPage;
        lastIndex = firstIndex + itemsPerPage; 

        paginatedData = quotesData.slice(firstIndex, lastIndex);

        let quotesList = paginatedData.map(quote => {
            blockquote = document.createElement('blockquote');
            blockquote.classList.add('quote-card');
    
            paragraph = document.createElement('p');
            paragraph.textContent = quote.value;
            blockquote.appendChild(paragraph);
    
            cite = document.createElement('cite');
            cite.textContent = new Date(quote.appeared_at);
            blockquote.appendChild(cite);
    
            quotes.appendChild(blockquote);
        });

    }

    function renderPaginator() {
                
        const paginator = document.getElementById("paginator");

        paginator.innerHTML = "";
    
        totalPages = Math.ceil(quotesData.length / itemsPerPage);
        
        console.log('totalPages = ', totalPages);
        if (totalPages > 1) {

                prevBtn = document.createElement("button");
                prevBtn.innerText = "Previous";
                prevBtn.type = "button";
                prevBtn.id = "prev";
                prevBtn.classList.add("btn", "btn-light", "mx-1", "mt-4"); 
                prevBtn.addEventListener("click", () => {
                    pageNumber--;
                    // pageNumber = pageNumber > 0 ? pageNumber : totalPages;
                    if (pageNumber === 1) {
                        prevBtn.disabled = true;
                        nxtBtn.disabled = false;
                    }
                    document.querySelectorAll(".btn").forEach(button => {
                        button.classList.remove("btn-brown");
                        button.classList.add("btn-light");
                    });

                    prevBtn.classList.add("btn", "btn-brown");
                    prevBtn.classList.remove("btn-light");
                    renderQuotes(pageNumber); 
                });
                paginator.appendChild(prevBtn);
         


          
                nxtBtn = document.createElement("button");
                nxtBtn.innerText = "Next";
                nxtBtn.type = "button";
                nxtBtn.id = "next";
                nxtBtn.classList.add("btn", "btn-light", "mx-1", "mt-4"); 

                nxtBtn.addEventListener("click", () => {
                    pageNumber++;
                    // pageNumber = pageNumber > totalPages ? pageNumber % totalPages : pageNumber;
                    if (pageNumber >= totalPages) {
                        nxtBtn.disabled = true;
                        prevBtn.disabled = false;
                    }
                    document.querySelectorAll(".btn").forEach(button => {
                        button.classList.remove("btn-brown");
                        button.classList.add("btn-light");
                    });

                    nxtBtn.classList.add("btn", "btn-brown");
                    nxtBtn.classList.remove("btn-light");
                    renderQuotes(pageNumber);
                });
                paginator.appendChild(nxtBtn);
          
        }
    }


    renderQuotes(pageNumber);
    renderPaginator();

}

button.addEventListener('pointerdown', () => {
    const trump_url = `https://www.tronalddump.io/search/quote?query=${search.value}`;
    searchAction(trump_url)
});

const searchBox = document.querySelector('.searchBox');
searchBox.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        const trump_url = `https://www.tronalddump.io/search/quote?query=${search.value}`;
        searchAction(trump_url);
    }
});