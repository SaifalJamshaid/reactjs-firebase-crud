import React, { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";

const TableForm = (props) => {
  const initialFieldValues = {
    fullName: "",
  };

  const [values, setValues] = useState(initialFieldValues);
  const [showform, setShowForm] = useState(false);


  useEffect(() => {
    if (props.currentId === "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.contactObjects[props.currentId],
      });
  }, [props.currentId, props.contactObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
    props.setShowForm();
  };

  return (
     <form autoComplete="off" onSubmit={handleFormSubmit}>
     <h1>Add/Update Item</h1>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <Input
          className="form-control"
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <Button
          type="submit"
          value={props.currentId === "" ? "Save" : "Update"}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default TableForm;
