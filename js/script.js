"use strict"
window.onload = function() {
    cafesParser();
};

async function cafesParser() {
    let url = 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1';
    let response = await fetch(url);

    if (response.ok) {
        let json = await response.json();
        json = json.slice(0, 10);

        json.forEach(cafes => document.querySelector('#cafes').innerHTML +=
            '<tr class="border-bottom">\n' +
            '                <th scope="row">'+ cafes['name'] +'</th>\n' +
            '                <td>'+ cafes['typeObject'] +'</td>\n' +
            '                <td>'+ cafes['address'] +'</td>\n' +
            '                <td class="float-right">\n' +
            '                    <button type="submit" class="btn bg-button text-white px-5" id="'+ cafes['id'] +'">Выбрать</button>\n' +
            '                </td>\n' +
            '            </tr>'
        );
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}