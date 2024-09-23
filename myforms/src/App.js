import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({ emailState: null, passwordState: null });

  const handleEmailChange = ((e) => {
    setFormValues({ ...formValues, email: e.target.value });
  });

  const handlePasswordChange = ((e) => {
    const password = e.target.value;
    setFormValues({ ...formValues, password: password });
    validatePassword(password);
  });

  const handleSelectChange = ((e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  });

  const validatePassword = (password) => {
    if (password.length < 9 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      setValidationStates({ ...validationStates, passwordState: false });
    } else {
      setValidationStates({ ...validationStates, passwordState: true });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setValidationStates({ ...validationStates, emailState: false });
    } else {
      setValidationStates({ ...validationStates, emailState: true });
    }
  };

  const clickSubmit = (() => {
    validateEmail(formValues.email);
    if (validationStates.emailState && validationStates.passwordState) {
      // Call fetch
      alert(JSON.stringify(formValues));
    }
  });

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>

      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} />
          { validationStates.emailState === false && <Form.Text className="text-danger">Email inválido</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} />
          { validationStates.passwordState === false && <Form.Text className="text-danger">La contraseña debe ser al menos 9  caracteres, incluir una letra y un número</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologias web</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;