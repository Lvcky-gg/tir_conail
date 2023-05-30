import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


import validateInput from "../../utils/validateInput";

function LoginFormModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const validationErrors = useSelector(
    (state) => state.session.validationErrors
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { closeModal, setOnModalClose } = useModal();
  const [inputValidate, setInputValidate] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInput({ email, password });

    if (errors.length) {
      setInputValidate(errors);
    } else {
      setInputValidate([]);
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    // Login successful?
    if (user) {
      closeModal();
    }
    // clean errors if modal closed
    const clearErrorMessages = () => {
      dispatch(clearErrors());
    };
    setOnModalClose(clearErrorMessages);
  }, [user, closeModal, setOnModalClose, dispatch]);

  return (
    <div className="modalLogin">
      <form onSubmit={handleSubmit} className="loginForm">
=-
        <div>
          <label>Username or Password</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </div>
        <div>
          <button
            type="submit"
            id="specificButtonSize"
            className="specificButton"
          >
            Log In
          </button>
        </div>
      </form>
      <ul className="modal-form-list-err">
        {inputValidate &&
          inputValidate.map((error, idx) => (
            <li key={idx}>
              <span style={{ color: "red", padding: "5px" }}>
                <i className="fas fa-exclamation-circle"></i>
              </span>
              {error}
            </li>
          ))}
        {validationErrors &&
          validationErrors.map((error, idx) => (
            <li className="centerLogin" key={idx}>
              <span style={{ color: "red", padding: "5px" }}>
                <i className="fas fa-exclamation-circle"></i>
              </span>
              {error}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LoginFormModal;