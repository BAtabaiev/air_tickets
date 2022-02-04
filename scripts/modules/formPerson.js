import createElement from "./createElement";

const createFormPerson = (i) => {
    const form = createElement('form', {
        className: 'person',
    });


    const title = createElement('h2', {
        className: 'person__title',
        textContent: `Пассажир № ${i + 1}`,
    });


    const fieldName = createElement('div', {
        className: 'field',
    });

    const labelName = createElement('label', {
        className:'field__label',
        for: `name${i}`,
        textContent: 'ФИО',
    });

    const inputName = createElement('input', {
        className: 'field__input',
        id: `name${i}`,
        name: 'name',
        type:'text', 
        placeholder:'Введите Ваше ФИО', 
        required:true, 
    });

    fieldName.append(labelName, inputName);

    const fieldTicket = createElement('div', {
        className: 'field',
    });

    const labelTicket = createElement('label', {
        className:'field__label',
        for: `ticket${i}`,
        textContent: 'Введите Номер Вашего билета',
    });

    const inputTicket = createElement('input', {
        className: 'field__input',
        id: `ticket${i}`,
        name: 'ticket',
        type:'text', 
        placeholder:'Номер Вашего билета', 
        required:true, 
    });

    fieldTicket.append(labelTicket, inputTicket);

    const button = createElement('button', {
        className: 'btn-confirm',
        type: 'submit',
        textContent: 'Подтвердить',
        minlength: 10,
        maxlength: 10,
    })

    form.append(title, fieldName, fieldTicket, button);

    return form;
};

const getFormPerson = (count) => {
    const forms = [];

    if (count > 6) count = 6;

    for (let i = 0; i < count; i++) {
        forms.push(createFormPerson(i));
    }

    return forms;
};

export default getFormPerson;

