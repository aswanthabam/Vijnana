import React, { useEffect, useState } from "react";
import {
  _AboutVijnana,
  _Event,
  _EventCreateData,
} from "../../../../utils/types";
import { getAboutVijnana } from "../../../../apis/eventApi";
import { useLoader } from "../../../../components/toploader/useLoader";

const AboutVijnana: React.FC = () => {
  const [formData, setFormData] = useState<_AboutVijnana>({
    name: "",
    start: "",
    end: "",
    about: "",
    contact: "",
    email: "",
  });
  const { addLoader } = useLoader();
  useEffect(() => {
    getAboutVijnana(addLoader).then((res) => {
      res && setFormData(res);
    });
  }, []);
  return (
    <div>
      <h3 className="underline start" style={{ marginBottom: "30px" }}>
        About Vijana
      </h3>
      <code>{"" + formData}</code>
      <h1>EDIT NOT IMPLEMENTED</h1>
      {/* <form onSubmit={handleSubmit} method="post">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name of event:
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
          <label htmlFor="title" className="form-label">
            Start Date:
          </label>
          <input
            id="start"
            className="form-control"
            type="datetime-local"
            value={formData.start}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            End Date:
          </label>
          <input
            id="end"
            className="form-control"
            type="datetime-local"
            value={formData.end}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            About Event:
          </label>
          <textarea
            id="about"
            className="form-control"
            value={formData.about}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Contact :
          </label>
          <input
            id="contact"
            className="form-control"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Email:
          </label>
          <textarea
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary">Save About</button>
      </form> */}
    </div>
  );
};

export default AboutVijnana;
