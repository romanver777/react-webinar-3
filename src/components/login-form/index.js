import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm({ t, error, onLogin }) {
  const cn = bem("LoginForm");

  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const onChangeLogin = (e) => setLogin(e.target.value.trim());
  const onChangePass = (e) => setPass(e.target.value.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(login, pass);
  };

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>{t("user.login")}</h3>
      <form className={cn("form")} onSubmit={handleSubmit}>
        <div className={cn("item", cn("login"))}>
          <label className={cn("loginLabel")}>{t("form.login")}</label>
          <input
            type="text"
            className={cn("inputLogin")}
            value={login}
            onChange={onChangeLogin}
          />
        </div>
        <div className={cn("item", cn("pass"))}>
          <label className={cn("passLabel")}>{t("form.pass")}</label>
          <input
            type="password"
            className={cn("inputPass")}
            value={pass}
            onChange={onChangePass}
          />
        </div>
        {error && <div className={cn("error")}>{error}</div>}
        <button type="submit" disabled={!login || !pass}>
          {t("form.loginBtn")}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  error: PropTypes.string,
  onLogin: PropTypes.func,
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  t: (text) => text,
  onLogin: () => {},
};

export default memo(LoginForm);
