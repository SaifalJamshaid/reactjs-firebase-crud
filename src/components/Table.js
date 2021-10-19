import React, { useState, useEffect } from "react";
import TableForm from "./TableForm";
import firebaseDb from "../firebase";
import "./style.css";
import Button from "./Button";

const Table = () => {
  const [contactObjects, setContactObjects] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [showform, setShowForm] = useState(false);
  console.log("contactObjects", contactObjects);
  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        const arr = [];

        for (const [key, value] of Object.entries(snapshot.val())) {
          arr.push({ ...value, checked: false, id: key });
        }

        setContactObjects(arr);
      } else setContactObjects([]);
    });
  }, []);

  const handleForm = () => {
    setShowForm(true);
  };

  const handleSelectAll = (e) => {
    const arr = contactObjects.map((x) => {
      return { ...x, checked: e.target.checked };
    });

    setContactObjects(arr);
  };

  const handleChecked = (index, e) => {
    const aaarr = contactObjects.map((x, i) => {
      return {
        ...x,
        ...(i === index && { checked: e.target.checked }),
      };
    });
    setContactObjects(aaarr);
  };

  const handleSelectedItems = async (e) => {
    const filterefItems = contactObjects.filter((x) => x.checked);

    for (const element of filterefItems) {
      const resp = await firebaseDb.child(`contacts/${element.id}`).remove();
    }
  };

  const addOrEdit = (obj) => {
    if (currentId === "")
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    else
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.child(`contacts/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <>
      <div className="">
        <div className="">
          <h1 className=""></h1>
        </div>
      </div>
      <div className="table_conatiner">
        <div className="">
          <table className="">
            <thead className="">
              <tr>
                <th>
                  <input onChange={handleSelectAll} type="checkbox" />
                </th>
                <th>Id</th>
                <th>Item</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactObjects.map((obj, index) => {
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
                        className=""
                        onClick={() => {
                          setCurrentId(obj.id);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a
                        className="btn text-danger"
                        onClick={() => {
                          onDelete(obj.id);
                        }}
                      >
                        <i className="far fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
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
                contactObjects,
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
