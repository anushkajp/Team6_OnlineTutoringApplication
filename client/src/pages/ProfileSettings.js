import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Sidebar from "../components/sidebar";
import LogoutButton from "../components/LogoutButton";
import { fetchFromAPI, sendAPIPatchRequest } from "../services/api";
import Layout from "../components/Layout";

function ProfileSettings(props) {
	const [isEditing, setIsEditing] = useState(false);
	const [renderData, setData] = useState([]);
	const { user } = useContext(UserContext);

	useEffect(() => {
		fetchFromAPI(`${user.accountType}/${user.username}`)
			.then((data) => {
				const render_data = Object.entries(data).map(([key, value]) => ({
					key,
					firstName: value.firstName,
					lastName: value.lastName,
					middleName: value.middleName,
					password: value.password,
					userId: value.userId,
					userName: value.userName,
					courses: value.courses,
					phone: value.phone,
					email: value.email,
					major: value.major,
					hours: value.hours,
					longBio: value.longBio,
				}));
				setData(render_data[0]);
			})
			.catch((error) => {
				setData({
					firstName: "Loading...",
					lastName: "",
					middleName: null,
					password: "Loading...",
					userId: "Loading...",
					userName: "Loading...",
					courses: [],
					phone: "Loading...",
					email: "Loading...",
					major: "Loading...",
					hours: null,
					longBio: null,
				});
				console.log(error);
			});
	}, []);

	const handleSaveClick = (e) => {
		setIsEditing(false);

		sendAPIPatchRequest(`${user.accountType}/${user.username}`, {
			email: e.target.form_email.value,
			phone: e.target.form_phone.value,
			longBio: e.target.form_bio.value,
		})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Layout>
      <div className="settings-container">
      <h2 className="settings-title">Profile Settings</h2>
			<div className="profile-container">
				<div className="profile-image-container">
					<img src="https://picsum.photos/400/400" height={160} width={160} />
          <div className="profile-name">{`${renderData.firstName} ${renderData.lastName}`}</div>
				</div>
				<div className="profile-settings-container">
          <form className="settingsForm" onSubmit={handleSaveClick}>
            <span>
              <label htmlFor="email" className={!isEditing?"disabled":""}>Email</label>
              <input
                type="email"
                name="form_email"
                id="emailInput"
                defaultValue={renderData.email}
                disabled={!isEditing}
              />
            </span>

            <span>
              <label htmlFor="tel" className={!isEditing?"disabled":""}>Phone Number</label>
              <input
                type="tel"
                name="form_phone"
                id="telInput"
                defaultValue={renderData.phone}
                disabled={!isEditing}
              />
            </span>

            <span>
              <label htmlFor="text" className={!isEditing?"disabled":""}>Biography</label>
              <input
                type="text"
                name="form_bio"
                id="bioInput"
                defaultValue={renderData.longBio}
                disabled={!isEditing}
              />
            </span>

            <div className="settings-button-container">
								<button className={`settings-primary-button ${!isEditing?"disabled":""}`} type="submit" disabled={!isEditing}>
									Save Changes
								</button>
								<button className="settings-secondary-button" onClick={(e) => {if (!isEditing) e.preventDefault(); setIsEditing(!isEditing);}}>
									{isEditing ? "Cancel" : "Edit"}
								</button>
						</div>
          </form>
					{/* <div className="profile_details">
						<h3>{renderData.firstName + " " + renderData.lastName}</h3>
						{Object.entries(renderData).map(
							([field, value]) =>
								!excludedFields.includes(field) &&
								value != null && (
									<div key={field}>
										<h4 className="bio_h4">
											<span className="header_text">{field}: </span>
											{Array.isArray(value) ? value.join(", ") : value}
										</h4>
									</div>
								)
						)}
                </div> */}
				</div>
			</div>
			{/* <div className="profile_page">
				<div className="profile_settings">
					<div className="profile_info">
						<div className="profile_photo">
							<img src="https://picsum.photos/400/400" alt="Profile" />
						</div>
						<div className="profile_details">
							<h3>{renderData.firstName + " " + renderData.lastName}</h3>
							{Object.entries(renderData).map(
								([field, value]) =>
									!excludedFields.includes(field) &&
									value != null && (
										<div key={field}>
											<h4 className="bio_h4">
												<span className="header_text">{field}: </span>
												{Array.isArray(value) ? value.join(", ") : value}
											</h4>
										</div>
									)
							)}
						</div>
					</div>
					<div className="editFields">
						<form className="settingsForm">
							<label htmlFor="email">Email:</label>
							{isEditing ? (
								<input
									type="email"
									id="emailInput"
									value={editedEmail}
									onChange={(e) => handleInputChange("editedEmail", e)}
								/>
							) : (
								<span className="readOnly" id="emailDisplay">
									{renderData.email}
								</span>
							)}

							<label htmlFor="phone">Phone:</label>
							{isEditing ? (
								<input
									type="tel"
									id="phoneInput"
									value={editedPhone}
									onChange={(e) => handleInputChange("editedPhone", e)}
								/>
							) : (
								<span className="readOnly" id="phoneDisplay">
									{renderData.phone}
								</span>
							)}

							<label htmlFor="bio">Bio:</label>
							{isEditing ? (
								<input
									type="text"
									id="bioInput"
									value={editedBio}
									onChange={(e) => handleInputChange("editedBio", e)}
								/>
							) : (
								<span className="readOnly" id="bioDisplay">
									{renderData.longBio}
								</span>
							)}

							{isEditing ? (
								<button className="settingsButton" onClick={handleSaveClick}>
									Save
								</button>
							) : (
								<button className="settingsButton" onClick={handleEditClick}>
									Edit
								</button>
							)}
						</form>
					</div>
				</div>
			</div> */}
      </div>
		</Layout>
	);
}

export default ProfileSettings;
