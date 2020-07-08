"use strict"


window.onload = function () {
    cafesParser();
};

async function cafesParser(page = 0) {
    let url = 'http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1?api_key=60388bdf-cd64-4c54-b6e3-bb028aae72f6';
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();

        let pages = null;

        if (json) {
            pages = Math.round(json.length / 10);
        }
        let pageCounter = parseInt(page);
        if (page === '0') {
            page = '0'
        } else {
            page += 1
        }

        page = parseInt(page);
        json = json.slice(page, page + 10);
        document.querySelector('#cafes').innerHTML = '';
        json.forEach(cafes => document.querySelector('#cafes').innerHTML +=
            '<tr class="mb-3">\n' +
            '                <th scope="row">' + cafes['name'] + '</th>\n' +
            '                <td>' + cafes['typeObject'] + '</td>\n' +
            '                <td>' + cafes['address'] + '</td>\n' +
            '                <td class="float-right">\n' +
            '                    <button type="submit" class="btn bg-button text-white px-5" id="' + cafes['id'] + '">Выбрать</button>\n' +
            '                </td>\n' +
            '            </tr>'
        );


        let pageNumbers = '';

        if (parseInt(pageCounter) !== 0) {
            pageNumbers += ' <li class="page-item"><a class="btn text-muted" onClick="openPage(this)" id="' + (parseInt(pageCounter) - 1) + '">' + (parseInt(pageCounter)) + '</a></li>&nbsp\n';
        }
        if (parseInt(pageCounter) !== (pages-1)) {
            pageNumbers += '<li class="page-item"><a class="btn text-dark" onClick="openPage(this)" id="' + parseInt(pageCounter) + '"><strong>' + parseInt(pageCounter + 1) + '</strong></a></li>&nbsp\n';
            pageNumbers += '<li class="page-item"><a class="btn text-muted" onClick="openPage(this)" id="' + (parseInt(pageCounter) + 1) + '">' + (parseInt(pageCounter) + 2) + '</a></li>&nbsp\n';
            pageNumbers += '<li class="page-item"><a class="btn text-muted" onClick="openPage(this)" id="' + (parseInt(pageCounter) + 2) + '">' + (parseInt(pageCounter) + 3) + '</a></li>&nbsp\n';
            pageNumbers += '<li class="page-item"><span class="btn text-muted">&nbsp ... &nbsp</span></li>\n';
            pageNumbers += '<li class="page-item"><a class="btn text-muted" onClick="openPage(this)" id="' + (parseInt(pages) - 1) + '">' + (parseInt(pages) - 1) + '</a></li>&nbsp\n';
        }
        document.querySelector('#pagination').innerHTML = '<ul class="pagination justify-content-center">\n' + pageNumbers + '</ul>';

    } else {
        alert("Ошибка HTTP: " + response.status);
        document.location.reload(true);
    }
}

function openPage(that) {
    cafesParser(that.id);
}


