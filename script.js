async function getData() {
    try {

    
     let dataJson = await fetch('https://raw.githubusercontent.com/Danilovesovic/zadatak_json/master/data.json');
     let data =  await dataJson.json();
    document.body.innerHTML = displayData(data, 'main');
    setClicks();
    console.log(data);
}catch (error) {
    console.error(error);
}
}

getData()

let text = ``;

function displayData(data, className) {
    text += `<ul class="${className}">`;
    data.forEach(mainList => {


        (mainList.children.length > 0) ? text += `<li class="arrow">${mainList.name}` : text +=`<li class="not_active">${mainList.name}</li>`;
        if (mainList.children.length > 0) displayData(mainList.children[0], 'nested');
        text += `</li>`;

    });
    text += `</ul>`
    return text;
    }

    function setClicks() {
        let arrows = document.querySelectorAll('.arrow');
       arrows.forEach(arr => {
            arr.addEventListener('click', function(event) {
                event.stopPropagation();
                if (!event.target.classList.contains('not_active')) {
                    if (event.target.classList.contains('arrow-down')) {
                        let allNested = event.target.querySelectorAll('.nested');
                        allNested.forEach(nest => {
                            nest.classList.remove('active');
                            nest.classList.remove('arrow-down');
                            nest.parentElement.classList.remove('active');
                            nest.parentElement.classList.remove('arrow-down');
                        })
                    } else {

                        this.querySelector('.nested').classList.toggle('active');
                        this.classList.toggle('arrow-down');
                    }
                

                }
            })
        })
    }