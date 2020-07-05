"use strict"

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getArea() {
    let areas = ["ЦАО", "ВАО"];
    return areas[getRandomInt(0, 2)];
}

function getType() {
    let areas = ["Тип 1", "Тип 2"];
    return areas[getRandomInt(0, 2)];
}

function getDistricts() {
    let dst = ["Арбат", "Тверской", "Гольяново"];
    return dst[getRandomInt(0, 3)]
}

let objects = [];

for (let i = 0; i < 200; i++) {
    let obj = {};
    obj.name = `Заведение ${i}`;
    obj.id = i;
    obj.admArea = getArea();
    obj.district = getDistricts()
    obj.address = `Улица Пушкина, дом Колотушкина ${i}`
    obj.typeObject = getType();
    obj.rate = getRandomInt(0, 1000);
    obj.set_1 = getRandomInt(0, 100000);
    obj.set_2 = getRandomInt(0, 100000);
    obj.set_3 = getRandomInt(0, 100000);
    obj.set_4 = getRandomInt(0, 100000);
    obj.set_5 = getRandomInt(0, 100000);
    obj.set_6 = getRandomInt(0, 100000);
    obj.set_7 = getRandomInt(0, 100000);
    obj.set_8 = getRandomInt(0, 100000);
    obj.set_9 = getRandomInt(0, 100000);
    obj.set_10 = getRandomInt(0, 100000);
    objects.push(obj);
}

window.onload = function () {
    cafesParser();
};

async function cafesParser(page) {
    // let url = 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1';
    // let response = await fetch(url);

    let i = 1;
    // if (response.ok) {
    if (i === 1) {
        // let json = await response.json();

        // удалить строку
        let json = objects;
        let pages = json ? json.length / 10 : null;

        if (page === undefined) {
            json = json.slice(0, 10);
            document.querySelector('#cafes').innerHTML = '';
            json.forEach(cafes => document.querySelector('#cafes').innerHTML +=
                '<tr class="border-bottom">\n' +
                '                <th scope="row">' + cafes['name'] + '</th>\n' +
                '                <td>' + cafes['typeObject'] + '</td>\n' +
                '                <td>' + cafes['address'] + '</td>\n' +
                '                <td class="float-right">\n' +
                '                    <button type="submit" class="btn bg-button text-white px-5" id="' + cafes['id'] + '">Выбрать</button>\n' +
                '                </td>\n' +
                '            </tr>'
            );
        } else {
            page = page === '0' ? '0' : page + '1';
            page = parseInt(page);
            json = json.slice(page, page + 10);
            document.querySelector('#cafes').innerHTML = '';
            json.forEach(cafes => document.querySelector('#cafes').innerHTML +=
                '<tr class="border-bottom">\n' +
                '                <th scope="row">' + cafes['name'] + '</th>\n' +
                '                <td>' + cafes['typeObject'] + '</td>\n' +
                '                <td>' + cafes['address'] + '</td>\n' +
                '                <td class="float-right">\n' +
                '                    <button type="submit" class="btn bg-button text-white px-5" id="' + cafes['id'] + '">Выбрать</button>\n' +
                '                </td>\n' +
                '            </tr>'
            );
        }

        let pageNumbers = '';

        for (let i = 0; i < pages; i += 1) {
            pageNumbers += ' <li class="page-item"><a class="page-link text-dark" onClick="openPage(this)" id="' + (i) + '">' + (i + 1) + '</a></li>\n';
        }

        document.querySelector('#pagination').innerHTML = '<ul class="pagination justify-content-center">\n'
            + '<li class="page-item" style="background-color: #DCAD95">\n' +
            '                    <a class="page-link text-dark" href="#" aria-label="Previous">\n' +
            '                        <span aria-hidden="true">&laquo;</span>\n' +
            '                        <span class="sr-only">Previous</span>\n' +
            '                    </a>\n' +
            '                </li>'
            + pageNumbers +
            ' <li class="page-item">\n' +
            '                    <a class="page-link text-dark" href="#" aria-label="Next">\n' +
            '                        <span aria-hidden="true">&raquo;</span>\n' +
            '                        <span class="sr-only">Next</span>\n' +
            '                    </a>\n' +
            '                </li>'
        '</ul>';

    } else {
        alert("Ошибка HTTP: " + response.status);
        document.location.reload(true);
    }
}

function openPage(that) {
    cafesParser(that.id);
}