
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

        const objEmail = new RegexValidator(this.inputEmail.value);
        console.log(`e-mail: ${objEmail.data}`);
    }
}

class PwdInput extends HTMLElement {
    inputPwd: HTMLInputElement;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' }); 
        this.inputPwd = document.createElement('input');
        this.inputPwd.type = 'password';
        this.inputPwd.onchange = (event) => this.onChange(event);
        shadow.appendChild(this.inputPwd);
    }

    onChange(event: Event) {

        const objPwd = new RegexValidator(this.inputPwd.value);
        console.log(`Pwd: ${objPwd.data}`);
    }
}

class NameInput extends HTMLElement {
    inputName: HTMLInputElement;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' }); 
        this.inputName = document.createElement('input');
        this.inputName.onchange = (event) => this.onChange(event);
        shadow.appendChild(this.inputName);
    }

    onChange(event: Event) {

        const objName = new RegexValidator(this.inputName.value);
        console.log(`Name: ${objName.data}`);
    }
}


class RegexValidator extends StringValidator {
    _regexp: RegExp = new RegExp('');
    constructor(data: any) {
        super(data);    
    }

    get regexp() {
        return this._regexp;
    }
}

class EmailValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
        this._regexp = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        const emailOk: boolean = this.regexp.test(data);

        if (emailOk === true) {
            console.log(`O e-mail ${data} é válido.`);
        } else {
            throw new Error('O e-mail não é válido');
        }
    }
}

class PwdValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
        this._regexp = /^\w{1,}$/gim;
        const pwdOk: boolean = this.regexp.test(data);

        if (pwdOk === true) {
            console.log(`A senha ${data} é válida.`);
        } else {
            throw new Error('A senha não é válida');
        }
    }
}

class NameValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
        this._regexp = /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
        const nameOk: boolean = this.regexp.test(data);

        if (nameOk === true) {
            console.log(`O nome ${data} é válido.`);
        } else {
            throw new Error('o Nome não é válido');
        }
    }
}

customElements.define('input-email', EmailInput);
customElements.define('input-pwd', PwdInput);
customElements.define('input-name', NameInput);