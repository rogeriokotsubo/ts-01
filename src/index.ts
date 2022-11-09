interface APIResponse<T>{
    data : T,
    message : Array<string>
}

interface UserData {
    id: string;
    email: string;
    name: string
}

interface LoginData {
    id: string
}

interface UserBody {
    email: string;
    name: string;
    password: string
}


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
        try {
            const objEmail = new EmailValidator(this.inputEmail.value);
            console.log(`e-mail: ${objEmail.data}`);
        } catch (e) {
            this.inputEmail.value = '';
        }    
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
        try{
            const objPwd = new PwdValidator(this.inputPwd.value);
            console.log(`Pwd: ${objPwd.data}`);
        }catch(e){
            this.inputPwd.value='';
        }    
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

        try {
            const objName = new NameValidator(this.inputName.value);
            console.log(`Name: ${objName.data}`);
        }catch (e) {
            this.inputName.value='';
        }
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


class UserForm extends HTMLElement{
    form : HTMLFormElement;
    userNameField : NameInput;
    emailField : EmailInput;
    pwdField : PwdInput;
    
    constructor(){
        super();
        const shadow = this.attachShadow({ mode: 'open' }); 
        this.form = document.createElement("form");

        this.emailField = new EmailInput();
        this.emailField.inputEmail.required = true;
        this.emailField.inputEmail.placeholder = "Email";

        this.userNameField = new NameInput();
        this.userNameField.inputName.required = true;
        this.userNameField.inputName.placeholder = "Name";

        this.pwdField = new PwdInput();
        this.pwdField.inputPwd.required = true;
        this.pwdField.inputPwd.placeholder = "Password";

        const createStore = document.createElement("button");
        createStore.innerText = "Cadastrar";
        createStore.type = "button";
        createStore.onclick = () => this.onCreate(); 

        const createLogin = document.createElement("button");
        createLogin.innerText = "Login";
        createLogin.type = "button";
        createLogin.onclick = () => this.onLogin();         

        const createUpdate = document.createElement("button");
        createUpdate.innerText = "Login";
        createUpdate.type = "button";
        createUpdate.onclick = () => this.onUpdate();  
        shadow.appendChild(this.form);
    }

    async onCreate(){
        if (!this.emailField.inputEmail.value) return;
        if (!this.userNameField.inputName.value) return;
        if (!this.pwdField.inputPwd.value) return;

        const userData : UserBody = {
            email: this.emailField.inputEmail.value,
            name : this.userNameField.inputName.value,
            password : this.pwdField.inputPwd.value
        }

        const response : APIResponse<UserData> = await fetch('http://localhost:8000/accounts',{
            method: "POST",
            headers: 
            { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(resp => resp.json());
    }

    async onLogin(){
        if (!this.emailField.inputEmail.value) return;
        if (!this.userNameField.inputName.value) return;
        if (!this.pwdField.inputPwd.value) return;

        const userData : UserBody = {
            email: this.emailField.inputEmail.value,
            name : this.userNameField.inputName.value,
            password : ""
        }

        const response : APIResponse<LoginData> = await fetch('http://localhost:8000/accounts/login',{
            method: "POST",
            headers: 
            { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(resp => resp.json());
    }    

    async onUpdate(){
        if (!this.emailField.inputEmail.value) return;
        if (!this.userNameField.inputName.value) return;
        if (!this.pwdField.inputPwd.value) return;

        const userData : UserBody = {
            email: this.emailField.inputEmail.value,
            name : this.userNameField.inputName.value,
            password : this.pwdField.inputPwd.value
        }

        const response : APIResponse<UserData> = await fetch('http://localhost:8000/accounts',{
            method: "PATCH",
            headers: 
            { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(resp => resp.json());
    }    
   
}

customElements.define('input-email',EmailInput);
customElements.define('input-name',NameInput);
customElements.define('input-pwd',PwdInput);

customElements.define('user-form', UserForm);


