import React, { useState, useEffect } from "react";
import TableForm from "./TableForm";
import firebaseDb from "../firebase";
import "./style.css";
import Button from "./Button";

const Table = () => {
  const [enteredItems, setEnteredItems] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [showform, setShowForm] = useState(false);

  useEffect(() => {
    firebaseDb.child("items").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        const arr = [];

        for (const [key, value] of Object.entries(snapshot.val())) {
          arr.push({ ...value, checked: false, id: key });
        }

        setEnteredItems(arr);
      } else setEnteredItems([]);
    });
  }, []);

  const handleForm = () => {
    setShowForm(true);
  };

  const handleSelectAll = (e) => {
    const arr = enteredItems.map((x) => {
      return { ...x, checked: e.target.checked };
    });

    setEnteredItems(arr);
  };

  const handleChecked = (index, e) => {
    const aaarr = enteredItems.map((x, i) => {
      return {
        ...x,
        ...(i === index && { checked: e.target.checked }),
      };
    });
    setEnteredItems(aaarr);
  };

  const handleSelectedItems = async (e) => {
    const filterefItems = enteredItems.filter((x) => x.checked);

    for (const element of filterefItems) {
      const resp = await firebaseDb.child(`items/${element.id}`).remove();
    }
  };

  const addOrEdit = (obj) => {
    if (currentId === "")
      firebaseDb.child("items").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    else
      firebaseDb.child(`items/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.child(`items/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <>
      <div className=""></div>
      <div className="table_conatiner">
        <div>
          <h1> Items List </h1>
          <table>
            <thead>
              <tr>
                <th>
                  <input onChange={handleSelectAll} type="checkbox" />
                  <span>Select All</span>
                </th>
                <th>Id</th>
                <th>Item</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enteredItems.map((obj, index) => {
                return (
                  <tr key={`${index}-${obj.checked}`}>
                    <td>
                      <input
                        checked={obj.checked}
                        type="checkbox"
                        onChange={(e) => handleChecked(index, e)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{obj.fullName}</td>
                    <td>
                      <a
                        onClick={() => {
                          setShowForm(true);
                          setCurrentId(obj.id);
                        }}
                      >
                        Edit
                      </a>
                      &nbsp;
                      <a
                        onClick={() => {
                          onDelete(obj.id);
                        }}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='table_buttons'>
            <Button onClick={handleForm}>Add New Item</Button>
            <Button onClick={handleSelectedItems}>Delete Selected Item</Button>
          </div>
        </div>
        <div className="">
          {showform && (
            <TableForm
              {...{
                addOrEdit,
                currentId,
                enteredItems,
                setShowForm: () => setShowForm(false),
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
