"use strict"


window.onload = function () {
    cafesParser();
};

let json;

async function cafesParser(page = 0) {
    let url = 'http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1?api_key=60388bdf-cd64-4c54-b6e3-bb028aae72f6';
    let response = await fetch(url);
    if (response.ok) {

        json = await response.json();

        // отрисовываем фильтры

        // лезем в json и собираем у всех административные округа, районы и типы
        let adminOkrugs = [], districts = [], types = [], sales = [];
        for (let i = 0; i < (json.length - 1); i++) {
            adminOkrugs[i] = json[i].admArea;
            districts[i] = json[i].district;
            types[i] = json[i].typeObject;
        }

        //выбираем только уникальные значения JS-методом Set
        let uniqueAdminOkrugs = [...new Set(adminOkrugs)];
        let uniqueDistricts = [...new Set(districts)];
        let uniqueTypes = [...new Set(types)];

        //удаляем значения с null
        uniqueAdminOkrugs = uniqueAdminOkrugs.filter(Boolean);
        uniqueDistricts = uniqueDistricts.filter(Boolean);
        uniqueTypes = uniqueTypes.filter(Boolean);


        //заполняем переменные строками option с уникальными значениями
        let adminOkrugSelect, districtSelect, typesSelect;
        for (let i = 0; i < uniqueAdminOkrugs.length - 1; i++) {
            adminOkrugSelect += '<option>' + uniqueAdminOkrugs[i] + '</option>\n';
        }
        //находим выпадающее меню по id и вставляем значения
        document.querySelector('#adminOkrug').innerHTML = adminOkrugSelect;

        for (let i = 0; i < uniqueDistricts.length; i++) {
            districtSelect += '<option>' + uniqueDistricts[i] + '</option>\n';
        }
        //находим выпадающее меню по id и вставляем значения
        document.querySelector('#district').innerHTML = districtSelect;

        for (let i = 0; i < uniqueTypes.length; i++) {
            typesSelect += '<option>' + uniqueTypes[i] + '</option>\n';
        }
        //находим выпадающее меню по id и вставляем значения
        document.querySelector('#type').innerHTML = typesSelect;


        let pages = null;

        //если вернулся json - высчитываем кол-во страниц
        if (json) {
            pages = Math.round(json.length / 10);
        }

        //если передали номер страницы, то отрисовываем в соответствии с номером
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
            '<tr class="m-3">\n' +
            '                <th scope="row">' + cafes['name'] + '</th>\n' +
            '                <td>' + cafes['typeObject'] + '</td>\n' +
            '                <td>' + cafes['address'] + '</td>\n' +
            '                <td class="float-right">\n' +
            '                    <button type="submit" class="btn bg-button text-white px-5" id="' + cafes['id'] + '">Выбрать</button>\n' +
            '                </td>\n' +
            '            </tr>'
        );


        //создаем пагинацию
        let pageNumbers = '';

        if (parseInt(pageCounter) !== 0) {
            pageNumbers += ' <li class="page-item"><a class="btn text-muted" onClick="openPage(this)" id="' + (parseInt(pageCounter) - 1) + '">' + (parseInt(pageCounter)) + '</a></li>&nbsp\n';
        }
        if (parseInt(pageCounter) !== (pages - 1)) {
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


