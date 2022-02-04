import { getStorage, setStorage } from "../service/storage.js";
import createElement from "./createElement.js";
import declOfNum from "./declOfNum.js";
import {setStorage, getStorage} from '../service/storage.js';

const createCockpit = (titleText) => {
    const cockpit = createElement('div', {
        className: 'cockpit',
    });
    const title = createElement('h1', {
        className: 'cockpit-title',
        textContent: titleText,
    });
    const button = createElement('button', {
        className: 'cockpit-confirm',
        type: 'submit',
        textContent: 'Подтвердить',
    });

    cockpit.append(title, button);

    return cockpit;

};

const createExit = () => {
    const fuselage = createElement('div', {
        className: 'fuselage exit',
    })
    return fuselage;
};

const createBlockSeat = (n, count, bookingSeat) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const fuselage = createElement('ol', {
        className: 'fuselage',
    });

    for(let i = n; i < count + n; i++){
        const wrapperRow = createElement('li');
        const seats = createElement('ol', {
            className: 'seats',
        });

    const seatsRow = letters.map(letter => {

        const seat = createElement('li', {
            className: 'seat',
    });

    const wrapperCheck = createElement('label');
    const seatValue = `${i}${letter}`

    const check = createElement('input', {
            name: 'seat',
            type: 'checkbox',
            value: seatValue,
            disabled: bookingSeat.includes(seatValue),
        });
        wrapperCheck.append(check);
        seat.append(wrapperCheck);
        return seat;
    })
    seats.append(...seatsRow);
    wrapperRow.append(seats);
    fuselage.append(wrapperRow);
    }

    return fuselage;
}


const createAirplane = (title, tourData) => {
    const scheme = tourData.scheme;
    const bookingSeat = getStorage(tourData.id).map(item => item.seat);

    const choisesSeat = createElement('form', {
        className: 'choises-seat',
    });

    const plane = createElement('fieldset', {
        className: 'plane',
        name: 'plane',
    });

    const cockpit = createCockpit(title);
    
    let n = 1;
   
    const elements = scheme.map((type) => {
        if(type === 'exit'){
            return createExit();
        }

        if( typeof type === 'number'){
            const blockSeat = createBlockSeat(n, type, bookingSeat);
            n = n + type;
            return blockSeat;
        }
    });


   
    plane.append(cockpit, ...elements);
    choisesSeat.append(plane);

    return choisesSeat;

};

const checkSeat = (form, data, id) => {

    const bookingSeat = getStorage(id).map(item => item.seat);

    form.addEventListener('change', () => {
        const formData = new FormData(form);
        const checked = [...formData].map(([, value]) => value);

        if (checked.length === data.length) {
            [...form].forEach(item => {
                if(item.checked === false && item.name === 'seat') {
                    item.disabled = true;
                }
            })
        } else {
            [...form].forEach(item => {
                if (!bookingSeat.includes(item.value)) {
                    item.disabled = false;
                }
             })
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const booked = [...formData].map(([, value]) => value);

        for (let i = 0; i < data.length; i++){
            data[i].seat = booked[i];
        }

        setStorage(id, data);

        form.remove();
        document.body.innerHTML = `
            <h1 class="title">Спасибо! Хорошего полёта!</h1>
            <h2 class="title">${booked[i].length === 1 ? 
            `Ваше место - ${booked}`:
            `Ваши места: ${booked}`}</h2>        
            `
    
    })
};

const airplane = (main, data, tourData) => {
    const title = `Выберите ${declOfNum(data.length, ['место', 'места', 'мест'])}`;
    /*const scheme = ['exit', 11, 'exit', 1, 'exit', 17, 'exit'];*/
    const choiceForm = createAirplane(title, tourData);

    checkSeat(choiceForm, data, tourData.id);

    main.append(choiceForm);
};

export default airplane;