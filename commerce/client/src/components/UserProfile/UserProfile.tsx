import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/app/store";
import { updateUserProfile } from "../../redux/features/userSlice";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    occupation: user.occupation || "",
    photoUrl: user.photoUrl || "",
    email: user.email || "",
  });
  const [isUserDataEditing, setIsUserDataEditing] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsUserDataEditing(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateUserProfile(formData));
    alert("Profile updated (temporarily)!");
    setIsUserDataEditing(false);
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Discard unsaved changes?");
    if (confirmCancel) {
      setFormData({
        displayName: user.displayName || "",
        occupation: user.occupation || "",
        photoUrl: user.photoUrl || "",
        email: user.email || "",
      });
    }
    setIsUserDataEditing(false);
  };

  return (
    <div className="container my-5 ">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h3 className="card-title text-center text-primary mb-4">
                User Profile
              </h3>

              <div className="text-center mb-4">
                <img
                  src={formData.photoUrl || "https://via.placeholder.com/150"}
                  className="rounded-circle shadow"
                  alt="Profile"
                  width={120}
                  height={120}
                  style={{ objectFit: "cover" }}
                />
                <h3>
                  Name:&nbsp;
                  <span style={{ color: "purple" }}>
                    {formData.displayName}
                  </span>
                </h3>
                <h3>
                  Occupation:&nbsp;
                  <span style={{ color: "purple" }}>{formData.occupation}</span>
                </h3>
                <h3>
                  Email:&nbsp;
                  <span style={{ color: "purple" }}> {formData.email}</span>
                </h3>
              </div>
              <div className="flex-row">
                <div className="form-group mb-3">
                  <label className="form-label fw-bold">Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="form-control"
                    ref={nameInputRef}
                  />
                </div>

                <div className="form-group mb-3 fw-bold">
                  <label className="form-label">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Your Occupation"
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-4 fw-bold">
                  <label className="form-label">Photo URL</label>
                  <input
                    type="text"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    placeholder="Paste photo URL"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4 fw-bold">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="form-control"
                  />
                </div>
              </div>
              {isUserDataEditing && (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary w-50"
                    onClick={handleUpdate}
                  >
                    Save Profile
                  </button>
                  <button
                    className="btn btn-danger w-50"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {!isUserDataEditing && (
                <button
                  className="btn btn-primary w-100 mb-2"
                  onClick={handleUpdate}
                  disabled={true}
                  style={{ backgroundColor: "gray" }}
                >
                  Save Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
