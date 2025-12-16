import React, { useEffect, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import styles from './Profile.module.css';
import MessageButton from '../components/ui/MessageButton';

function Profile() {
  const {userDetails, updateUserDetails, updateUserCredentials, deleteUser} = useProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    telephone: "",
    email: "",
  });

  const [credentialsData, setCredentialsData] = useState({
    previousPassword: "",
    currentPassword: "",
  });

  useEffect(() => {
    if(userDetails) {
        setFormData({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        birthDate: userDetails.birthDate.split("T")[0],
        address: userDetails.address,
        telephone: userDetails.telephone,
        email: userDetails.email,
        updatedAt: new Date().toISOString(),
    })
    }
  }, [userDetails]);

  const [detailsError, setDetailsError] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsSuccess, setDetailsSuccess] = useState("");

  const [credentialError, setCredentialError] = useState("");
  const [credentialLoading, setCredentialLoading] = useState(false);
  const [credentialSuccess, setCredentialSuccess] = useState("");

  const handleDataChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  };

  const handleCredentialsChange = (e) => {
    setCredentialsData({
        ...credentialsData,
        [e.target.name]: e.target.value,
    });
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    setDetailsLoading(true);
    setDetailsError("");
    setDetailsSuccess("");

    const result = await updateUserDetails(formData);

    if(result.success) {
        setDetailsSuccess("User details successfully updated");
    } else {
        setDetailsError(result.error);
    }

    setDetailsLoading(false);
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setCredentialLoading(true);
    setCredentialError("");
    setCredentialSuccess("");

    const result = await updateUserCredentials(credentialsData);

    if(result.success) {
        setCredentialSuccess("User credentials successfully updated");
    } else {
        setCredentialError(result.error);
    }

    setCredentialLoading(false);

    setCredentialsData( () => ({
        previousPassword: "",
        currentPassword: "",
    }));
  };

  return (
    <div className={styles.profile}>

        <div className="profile__details">
            <form onSubmit={handleDataSubmit}>
                <h2>User Details</h2>
                {detailsError && <MessageButton type="error" message={detailsError} func1={setDetailsSuccess} func2={setDetailsError}/>}
                {detailsSuccess && <MessageButton type="success" message={detailsSuccess} func1={setDetailsSuccess} func2={setDetailsError}/>}

                <div className="profile__details-firstName">
                    <label>First Name: </label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleDataChange} required />
                </div>

                <div className="profile__details-lastName">
                    <label>Last Name: </label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleDataChange} required />
                </div>

                <div className="profile__details-birthDate">
                    <label>Birth Date: </label>
                    <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleDataChange} required />
                </div>

                <div className="profile__details-address">
                    <label>Address: </label>
                    <textarea name="address" id="address" value={formData.address} onChange={handleDataChange} required />
                </div>

                <div className="profile__details-telephone">
                    <label>Telephone: </label>
                    <input type="tel" name="telephone" id="telephone" value={formData.telephone} onChange={handleDataChange} required />
                </div>

                <div className="profile__details-email">
                    <label>Email: </label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleDataChange} required />
                </div>

                <div className={styles.update_profile}>
                    <button type="submit">
                        {detailsLoading? "Updating..." : "Update Details"}
                    </button>
                </div>
            </form>
        </div>

        <div className="credentials__details">
            <form onSubmit={handleCredentialsSubmit}>

                <h2>Credential Details</h2>
                {credentialError && <MessageButton type="error" message={credentialError} func1={setCredentialSuccess} func2={setCredentialError}/>}
                {credentialSuccess && <MessageButton type="success" message={credentialSuccess} func1={setCredentialSuccess} func2={setCredentialError}/>}

                <div className="credentials__details-prev-pwd">
                    <label>Previous Password: </label>
                    <input type="password" name="previousPassword" id="previousPassword" value={credentialsData.previousPassword} onChange={handleCredentialsChange} required />
                </div>

                <div className="credentials__details-curr-pwd">
                    <label>Current Password: </label>
                    <input type="password" name="currentPassword" id="currentPassword" value={credentialsData.currentPassword} onChange={handleCredentialsChange} required />
                </div>

                <div className={styles.update_user_credentials}>
                    <button type="submit">
                        {credentialLoading? "Updating..." : "Update Credentials"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Profile;