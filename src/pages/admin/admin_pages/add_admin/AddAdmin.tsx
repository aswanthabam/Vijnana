import React, { useState } from "react";
import { _Event, _EventCreateData } from "../../../../utils/types";
import { useToast } from "../../../../components/toast/useToast";
import { addAdmin } from "../../../../apis/adminApi";

const AddAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { setToastStatus } = useToast();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    console.log(e.target.id, e.target.value);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted!");
    console.log(formData);
    await addAdmin(formData, setToastStatus);
  };

  return (
    <div>
      <h3 className="underline start" style={{ marginBottom: "30px" }}>
        Add A new Administrator
      </h3>
      <form onSubmit={handleSubmit} method="post">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Target Email ID:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary">Add Admin</button>
      </form>
    </div>
  );
};

export default AddAdmin;
