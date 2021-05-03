const component = `
<style> @import "../../global-styles.css"</style>
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
<!-- LOGIN PAGE  -->
        <div id="login-container" class="loginContainer card">
            <div class="PopUpTitle">
                <h2>Log in 👋</h2>
            </div>
            <div class="PopUpRow">
                <input id="email-login-input" class="textInput" type="text" placeholder="Enter Email" name="email" required />
            </div>
            <div class="PopUpRow">
                <input id="password-login-input" class="textInput" type="password" placeholder="Enter Password" name="password" required />
            </div>
            <div class="PopUpRow">
                <button id="btn-login-form" class="formBtn" type="submit">
                    Login
                </button>
                <label>
                    <input type="checkbox" checked="checked" name="remember" /> Remember
                    me
                </label>
            </div>
            <div class="PopUpRow">
                <p id="alert-login" style="color: red;"></p>
            </div>
        </div>

<script>

</script>
`

class LoginPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('connected')
        this._shadowRoot = this.attachShadow({ mode: 'open' });

        var template = document.createElement('template');
        template.innerHTML = component;
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.getElementById('login-container').addEventListener("click", (e) => {
            //console.log("login area clicked");
            e.stopPropagation();
        })
    }
}
customElements.define('page-login', LoginPage)
module.exports = { LoginPage: LoginPage }