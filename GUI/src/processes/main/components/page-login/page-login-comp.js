const component = `
<style>

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

    }
}
customElements.define('page-login', LoginPage)
module.exports = { LoginPage: LoginPage }