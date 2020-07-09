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

let json;

async function cafesParser(page = 0) {
    let url = 'http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1?api_key=60388bdf-cd64-4c54-b6e3-bb028aae72f6';
    // let response = await fetch(url);
    // if (response.ok) {
    if (true) {
        // json = await response.json();
        json = objects;

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
            '                    <button type="submit" class="btn bg-button text-white px-5" id="' + cafes['id'] + '" onclick="cafeSelect(this)">Выбрать</button>\n' +
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

function cafeSelect(that) {
    //смотрим, есть ли активный, если да, то снимаем выбор
    let prevActive = document.querySelector('.selectedCafe');
    if (prevActive != null) {
        prevActive.classList.remove('selectedCafe');
        prevActive.innerHTML = ('Выбрать');
    }

    //присваиваем выбраному элементу класс и текст
    that.className += ' selectedCafe';
    that.innerHTML = 'Выбрано!';


    // //если есть кафе, получаем это кафе
    // let cafe = document.querySelector('.selectedCafe');
    // if (cafe) {
    //     for (let i = 0; i < json.length; i++) {
    //         if (json[i].id === parseInt(cafe.id)) {
    //             cafe = json[i];
    //         }
    //     }
    // }
}

function order() {

    //если есть кафе, получаем json этого кафе
    let cafe = document.querySelector('.selectedCafe');
    if (cafe) {
        for (let i = 0; i < json.length; i++) {
            if (json[i].id === parseInt(cafe.id)) {
                cafe = json[i];
            }
        }
    }


    let delivery = 200;
    //получаем значения выбранных позиций меню и дополнительных опций
    let muffin = document.querySelector('#muffin');
    let baget = document.querySelector('#baget');
    let profitrol = document.querySelector('#profitrol');
    let contactless = document.querySelector('#contactless');
    let onlyhot = document.querySelector('#onlyhot');
    let muffins = (muffin.value * muffin.getAttribute('data-price'));
    let bagets = (baget.value * baget.getAttribute('data-price'));
    let profitrols = (profitrol.value * profitrol.getAttribute('data-price'));


    let itogo = muffins + bagets + profitrols + delivery;
    let ifcold = itogo - (itogo * 0.3);

    //очищаем форму заказа
    document.querySelector('.modal-body').innerHTML = '';

    //собираем модальное окно
    document.querySelector('.modal-body').innerHTML = '<h5><strong>Позиции заказа </strong></h5>\n';

    if (profitrol.value > 0) {
        document.querySelector('.modal-body').innerHTML +=
            '                            <div class="mb-3 mt-3 shadow-sm p-3 mb-5 bg-white rounded">\n' +
            '                                <div class="row mt-2">\n' +
            '                                    <div class="col-md-2">\n' +
            '                                        <img width="100" src="img/профитроли.jpg" class="rounded">\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-4">\n' +
            '                                        <h5 class=""><strong> Профитроли</strong></h5>\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-3">\n' +
            '                                        <h6 class=" text-muted"> ' + profitrol.value + 'х ' + profitrol.getAttribute('data-price') + ' ₽</h6>\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-3">\n' +
            '                                        <h5 class="float-right mr-2"><strong>' + profitrols + ' ₽ </strong></h5>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n'
    }
    if (muffin.value > 0) {
        document.querySelector('.modal-body').innerHTML +=
            '                            <div class="mb-3 mt-3 shadow-sm p-3 mb-5 bg-white rounded">\n' +
            '                                <div class="row mt-2">\n' +
            '                                    <div class="col-md-2">\n' +
            '                                        <img width="100" src="img/маффины.jpg" class="rounded">\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-4">\n' +
            '                                        <h5 class=""><strong> Маффины</strong></h5>\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-3">\n' +
            '                                        <h6 class=" text-muted"> ' + muffin.value + 'х ' + muffin.getAttribute('data-price') + ' ₽</h6>\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-3">\n' +
            '                                        <h5 class="float-right mr-2"><strong>' + muffins + ' ₽ </strong></h5>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n'
    }
    if (baget.value > 0) {
        document.querySelector('.modal-body').innerHTML +=
            '                            <div class="mb-3 mt-3 shadow-sm p-3 mb-5 bg-white rounded">\n' +
            '                                <div class="row mt-2">\n' +
            '                                    <div class="col-md-2">\n' +
            '                                        <img width="100" src="img/хлеб.jpg" class="rounded">\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-4">\n' +
            '                                        <h5 class=""><strong> Багет</strong></h5>\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-3">\n' +
            '                                        <h6 class=" text-muted"> ' + baget.value + 'х ' + baget.getAttribute('data-price') + ' ₽</h6>\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-3">\n' +
            '                                        <h5 class="float-right mr-2"><strong>' + bagets + ' ₽ </strong></h5>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n'
    }

    document.querySelector('.modal-body').innerHTML += '\n' +
        '                            <h5><strong>Дополнительные опции </strong></h5>\n' +
        '                            <div class="mb-4 mt-3 border-bottom">\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Бесконтактная доставка:</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class="float-right mr-2"> ' + (contactless.checked ? 'Да' : 'Нет') + '</h6>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Только горячим:</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class="float-right mr-2"> ' + (onlyhot.checked ? 'Да' : 'Нет') + '</h6>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '\n' +
        '                            <h5><strong>Информация о предприятии </strong></h5>\n' +
        '                            <div class="mb-4 mt-3 border-bottom">\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Название</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class="float-right mr-2"> ' + (cafe ? cafe.name : '') + '</h6>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Административный округ</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class="float-right mr-2"> ' + (cafe ? cafe.admArea : '') + '</h6>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Район</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class="float-right mr-2"> ' + (cafe ? cafe.district : '') + '</h6>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Адрес</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class="float-right mr-2 text-muted"> ' + (cafe ? cafe.address : '') + '</h6>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Рейтинг</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class="float-right mr-2"><strong>' + (cafe ? cafe.rate : '') + '</strong></h6>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '\n' +
        '                            <h5><strong>Доставка</strong></h5>\n' +
        '                            <div class="mb-3 mt-4">\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Зона доставки:</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <select class="form-control">\n' +
        '                                            <option>Первая зона</option>\n' +
        '                                        </select>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Адрес доставки:</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <textarea class="form-control" id="exampleFormControlTextarea1"\n' +
        '                                                  rows="3"></textarea>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Стоимость доставки:</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class="float-right mr-2"><strong>200 ₽</strong></h6>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> ФИО получателя:</strong></h6>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <input class="form-control" type="text" placeholder="">\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="row mt-2">\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h6 class=""><strong> Итого</strong></h6><br>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h5 class="float-right mr-2"><strong>' +
        itogo
        + ' ₽</strong></h5>' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>'+
        '                                <div class="row">\n' +
        '                                    <div class="col-md-6">\n' +
        (onlyhot.checked ? ('Если заказ придёт холодным, он будет стоить Вам :') : '') +
        '                                    </div>\n' +
        '                                    <div class="col-md-6">\n' +
        '                                        <h5 class="float-right mr-2"><strong>' +
        '</strong></h5>' +(onlyhot.checked ? ifcold+' ₽' : '') +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>'
    ;


}

function openPage(that) {
    cafesParser(that.id);
}

function orderOk() {
    document.querySelector('#success').classList.remove('hidden');
}


