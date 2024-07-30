import { useState } from "react";

const AccountDeletion = () => {
  const [formData, setFormData] = useState({
    email: "",
    reason: "",
    otp: "",
    otpSent: false,
  });
  const { email, reason, otp, otpSent } = formData;
  const [apiStatus, setApiStatus] = useState({});
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const generateOTP = async () => {
    try {
      const body = JSON.stringify({
        email,
      });
      console.log(body);

      const requestOptions = {
        method: "POST",
        headers,
        body,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/send-otp`,
        requestOptions
      ).then((response) => response.json());
      setApiStatus(response);
      setFormData((prev) => ({ ...prev, otpSent: true }));
    } catch (e) {
      console.log(e);
      setApiStatus({
        success: false,
        message: "Some error occurred while sending the OTP",
      });
    }
  };

  const deleteAccount = async () => {
    try {
      const body = JSON.stringify({
        email,
        reason,
        otp,
      });

      const requestOptions = {
        method: "POST",
        headers,
        body,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/delete-account`,
        requestOptions
      ).then((response) => response.json());
      setApiStatus(response);
      setFormData((prev) => ({
        ...prev,
        email: "",
        reason: "",
        otpSent: false,
        otp: "",
      }));
    } catch (e) {
      console.log(e);
      setApiStatus({
        success: false,
        message: "Some error occurred while sending the OTP",
      });
      setFormData((prev) => ({
        ...prev,
        otpSent: false,
        otp: "",
      }));
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    otpSent ? deleteAccount() : generateOTP();
  };

  return (
    <div className="App">
      <h2>Delete account and all the data stored?</h2>
      <div className="info">
        <p>App name - Vaar: ExpenseTracker</p>
        <p>Developer - Vaibhav Gera (trackerapp269@gmail.com)</p>
        <p>
          Once the request is processed all the data entered(including expense
          data) by the user and email id will be deleted from our side. Please
          make sure you have the backup of the data contained in the app before
          requesting for the account deletion. You will get the confirmation
          email once the account and all related data is deleted.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <p className={apiStatus?.success ? "success" : "error"}>
            {apiStatus?.message}
          </p>
        </div>
        <div>
          <label>Email: *</label>
          <input
            type="email"
            name="email"
            onChange={handleOnChange}
            value={email}
          />
        </div>
        <div>
          <label>Reason for deletion: *</label>
          <input
            type="text"
            name="reason"
            onChange={handleOnChange}
            value={reason}
          />
        </div>
        {otpSent && (
          <div>
            <label>OTP: *</label>
            <input
              type="text"
              name="otp"
              onChange={handleOnChange}
              value={otp}
            />
          </div>
        )}
        <button
          type="submit"
          disabled={!email || !reason || (otpSent && !otp?.length >= 5)}
        >
          {otpSent ? "Delete Account" : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default AccountDeletion;
