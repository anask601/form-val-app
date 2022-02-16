import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// const emailReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     console.log(state, action, "1");
//     console.log(state, action.val, "2");
//     return { value: action.val, isValid: action.val.includes("@") };
//   }
//   if (action.type === "INPUT_BLUR") {
//     console.log(state.value, action.val, action, "3");
//     return { value: state.value, isValid: state.value.includes("@") };
//   }
//   return { value: "", isValid: false };
// };

// const passwordReducer = (state, action) => {
//   console.log(state);
//   if (action.type === "USER_INPUT") {
//     console.log(state, action, "1");
//     console.log(state, action.val, "2");
//     return { value: action.val, isValid: action.val.trim().length > 6 };
//   }
//   if (action.type === "INPUT_BLUR") {
//     console.log(state.value, action.val, action, "3");
//     return { value: state.value, isValid: state.value.trim().length > 6 };
//   }
//   return { value: "", isValid: false };
// };

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // const [emailState, dispatchEmail] = useReducer(emailReducer, {
  //   value: "",
  //   isValid: null,
  // });

  // const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  //   value: "",
  //   isValid: null,
  // });

  useEffect(() => {
    console.log("using useEffect");
    return () => {
      console.log("clean up");
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking hte validation");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    return () => {
      console.log("clean up");
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  };

  // const emailChangeHandler = (event) => {
  //   dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  //   setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  // };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  // const passwordChangeHandler = (event) => {
  //   dispatchPassword({
  //     type: "USER_INPUT",
  //     val: event.target.value,
  //   });

  //   setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  // };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  // const validateEmailHandler = () => {
  //   dispatchEmail({
  //     type: "INPUT_BLUR",
  //   });
  // };

  // const validatePasswordHandler = () => {
  //   dispatchPassword({ type: "INPUT_BLUR" });
  // };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   props.onLogin(emailState.value, passwordState.value);
  // };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
