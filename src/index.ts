
class Validator {
    data: string | number | boolean | undefined | null | void;

    constructor(data: any) {
        this.data = data;
    }
}

class StringValidator extends Validator {
    constructor(data: any) {
        super(data);
        if (typeof data === 'string') {
            console.log(`${data} é string.`);
        } else {
            throw new Error('O tipo está errado');
        }
    }
}

class NumberValidator extends Validator {
    constructor(data: any) {
        super(data);
        if (typeof data === 'number') {
            console.log(`${data} é number`);
        } else {
            throw new Error('O tipo está errado');
        }
    }
}

class BooleanValidator extends Validator {
    constructor(data: any) {
        super(data);
        if (typeof data === 'boolean') {
            console.log(`${data} é boolean`);
        } else {
            throw new Error('O tipo está errado');
        }
    }
}

class EmailInput extends HTMLElement {
    inputEmail: HTMLInputElement;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' }); 
        this.inputEmail = document.createElement('input');
        this.inputEmail.onchange = (event) => this.onChange(event);
        shadow.appendChild(this.inputEmail);
    }

    onChange(event: Event) {
        const obj = new RegexValidator(this.inputEmail.value);
        console.log(`e-mail: ${obj.data}`);
    }
}

class RegexValidator extends StringValidator {
    constructor(data: any) {
        super(data);
        const regexp = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        const emailOk: boolean = regexp.test(data);

        if (emailOk === true) {
            console.log(`O e-mail ${data} é válido.`);
        } else {
            throw new Error('O e-mail não é válido');
        }
    }
}

customElements.define('input-email', EmailInput);
