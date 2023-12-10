import React, { createElement, useState } from "react";
import { _Event, _EventCreateData } from "../../../../utils/types";
import { createEvent } from "../../../../apis/adminApi";
import { useToast } from "../../../../components/toast/useToast";

const NewEvent: React.FC = () => {
  const [formData, setFormData] = useState<_EventCreateData>({
    name: "",
    description: "",
    details: "",
    date: "",
    type: "",
    image: null,
    reg_link: null,
    venue: "",
    gctian_only: false,
    is_reg: true,
    closed: false,
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
    await createEvent(formData, setToastStatus);
  };

  return (
    <div>
      <h3 className="underline start" style={{ marginBottom: "30px" }}>
        Create New Event
      </h3>
      <form onSubmit={handleSubmit} method="post">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Event Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="details" className="form-label">
            details:
          </label>
          <textarea
            id="details"
            className="form-control"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="datetime-local"
            id="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Event Category:
          </label>
          <select
            id="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="cp">Competition</option>
            <option value="tk">Talk</option>
            <option value="sr">Seminar</option>
            <option value="ws">Workshop</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Event Image URL:
          </label>
          <input
            type="text"
            id="image"
            className="form-control"
            value={formData.image || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="venue" className="form-label">
            Event Venue:
          </label>
          <input
            type="text"
            id="venue"
            className="form-control"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex " style={{ gap: "15px" }}>
          <label htmlFor="gctian_only" className="form-label">
            kbmgct STUDENT ONLY?
          </label>
          <div>
            <input
              type="radio"
              id="gctian_only"
              className="form-check-input"
              value="1"
              checked={formData.gctian_only == true}
              onChange={handleChange}
              required
            />
            <label htmlFor="gctian_only" className="form-check-label">
              Yes
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="gctian_only"
              className="form-check-input"
              value="0"
              checked={formData.gctian_only == false}
              onChange={handleChange}
              required
            />
            <label htmlFor="studentOnly" className="form-check-label">
              No
            </label>
          </div>
        </div>
        <div className="mb-3 d-flex" style={{ gap: "15px" }}>
          <label htmlFor="is_reg" className="form-label">
            Open to all?
          </label>
          <div>
            <input
              type="radio"
              id="is_reg"
              className="form-check-input"
              value="0"
              checked={formData.is_reg == false}
              onChange={handleChange}
              required
            />
            <label htmlFor="is_reg" className="form-check-label">
              Yes
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="is_reg"
              className="form-check-input"
              value="1"
              checked={formData.is_reg == true}
              onChange={handleChange}
              required
            />
            <label htmlFor="studentOnly" className="form-check-label">
              No
            </label>
          </div>
        </div>

        <button className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
};

export default NewEvent;
