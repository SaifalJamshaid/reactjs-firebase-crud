import React, { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import "./style.css";

const TableForm = (props) => {
  const initialFieldValues = {
    item: "",
  };

  const [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.enteredItems.find((x) => x.id === props.currentId),
      });
  }, [props.currentId, props.enteredItems]);

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
    <form onSubmit={handleFormSubmit}>
      <h1>Add/Update Item</h1>
      <div className="input_container">
        <label>Item</label>
        <Input
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="btn_container">
        <Button type="submit">
          {props.currentId === "" ? "Save" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default TableForm;
