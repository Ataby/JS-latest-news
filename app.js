//---------------------------------
//ASYNC - AWAIT
//---------------------------------
//ECMASCRIPT 2017 ILE JS'YE EKLENMISTIR. ASLINDA PROMISE YAPISININ BASITLESTIRILMIS HALIDIR

//FONKSIYONU ASYNC HALE GETIRMEK ICIN ONUNE 'ASYNC' EKLENIR.

//BIR ASYNC FONKIYON ICERISINDE 'AWAIT' ILE BELIRTILEN ISTEGIN CALISMASI BEKLENIR.

//DIZILIS OLARAK SENKRON MANTIK GIBI OLSA DA ASYNC CALISIR

//AWAIT, PROMISE TEMELINDE OLAN FONK. ONUNE GETIRILEREK O SATIRDAKI KODUN DURDURULMASINI SAGLAR. ISTENILEN ISTEK GERCEKLESTIRILIP SONUCUN DONDURULMESI ILE KODUN CALISMASI DEVAM EDER.

//SET.TIMEOUT, SET.INTERVAL GIBI METHOD'LAR MICRO KUYRUGUNA ATILIYOR.

//SIRASIYLA  CALL.STACK MICRO MACRO KUYRUKLARI UYGULANIYOR.

//AMAC PARALEL PROCESSING'I DESTEKLEMEK, ISLEMI ARKAPLANA ATABILMEK

//PROMISE => NETWORK UZERINDEN BUYUK VERILERI CEKME, ARKA PLANDA BU ISLEMLER ICIN KULLANDIGIMIZ OBJECT YAPISI

//NEWS API KEY : 1b37851c03ec4fe7b013e985e0d7cc3a

// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

let isError =false;
const trNews = async function (){
    const apiKey = '1b37851c03ec4fe7b013e985e0d7cc3a';
    //NORMALDE .ENV DOOSYASINA API KEY KONULUR VE GITHUB'A GONDERILMEZ.
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey='+apiKey;

    try {
        const response = await fetch(url);
        if(!response.ok){
            isError=true;
            throw new Error(`sometihng went wrong ${response.status}`);
        }
        const data = await response.json();
        printDOM(data.articles);
        
    } catch (error) {
        console.log(error)
    }


}
const printDOM =(news)=>{
    //OBJE ARRAY'ı ICERISINDE VERILERIMIZ VAR.
    const newsList = document.querySelector("#news-list");
    if(isError){
        newsList.innerHTML+="News can not be fetched";
        return; // = IF ICINE GIRERSEN AŞAĞIYA INMEDEN ÇIK
    }
    
    news.forEach((item)=>{
        const {title,description,publishedAt,urlToImage,author,url}=item;
        newsList.innerHTML+=`
        <div class="col-md-6 col-lg-4 col-xxl-3 justify-content-center">    
            <div class="card">
                <img src="${urlToImage}" class="card-img-top" alt="...">
                <div class="card-body bg-light">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text ">${description}</p>
                    <p class="card-text "><small class="text-body-secondary">${publishedAt}--${author}</small></p>
                    <a href="${url}" target="_blank" class="btn btn-primary">DETAILS</a>
                </div>
            </div>
        </div>`

        // newsList.innerHTML+=
        //     `<div class="card mb-3">
        //         <img src="${urlToImage}" class="card-img-top" alt="${title}">
        //         <div class="card-body">
        //             <h5 class="card-title">${title}</h5>
        //             <p class="card-text ">${description}</p>
        //             <p class="card-text"><small class="text-body-secondary">${publishedAt}--${author}</small></p>
        //             <a href="${url}" class="btn btn-primary">DETAILS</a>
        //         </div>
        //     </div>`
        
        console.log(item);
    })
    
    }

window.addEventListener("load", trNews());