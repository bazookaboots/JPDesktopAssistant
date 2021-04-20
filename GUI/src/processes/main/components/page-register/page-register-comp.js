const component = `
<style>
.PopUpTitle {
    text-align: center;
    padding: 8px;
}

.PopUpRow {
    padding: 8px;
}

.loginContainer {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: max-content;
    height: max-content;
    background-color: #232325;
    z-index: 3;
}

.card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.747);
    transition: 0.3s;
}
.textInput {
    background-color: #0e0e0f;
    color: lightgray;
    padding: 8px;
    border-radius: 10px;
    width: -webkit-fill-available;
    border-width: 0px;
}

</style>

<!-- REGISTER PAGE  -->
    <div id="signup-container" class="loginContainer card">
        <div class="PopUpTitle">
            <h2>Create an account 🚀</h2>
        </div>
        <div class="PopUpRow">
            <input id="username-register-input" class="textInput" type="text" placeholder="Enter Username" name="username" required />
        </div>
        <div class="PopUpRow">
            <input id="email-register-input" class="textInput" type="text" placeholder="Enter Email Adress" name="email" required />
        </div>
        <div class="PopUpRow">
            <input id="password-register-input" class="textInput" type="password" placeholder="Enter Password" name="password" required />
        </div>
        <div class="PopUpRow">
            <input id="passwordc-register-input" class="textInput" type="password" placeholder="re-Enter Password" name="password" required />
        </div>
        <div class="PopUpRow">
            <button id="btn-register-form" class="formBtn" type="submit">
                Create
            </button>
            <label>
                <input type="checkbox" checked="checked" name="remember" /> Remember
                me
            </label>
        </div>
    </div>

<script>

</script>
`

class RegisterPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('connected')
        this._shadowRoot = this.attachShadow({ mode: 'open' });

        var template = document.createElement('template');
        template.innerHTML = component;
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._shadowRoot.getElementById('signup-container').addEventListener("click", (e) => {
            //console.log("login area clicked");
            e.stopPropagation();
        })

    }
}
customElements.define('page-register', RegisterPage)
module.exports = { RegisterPage: RegisterPage }