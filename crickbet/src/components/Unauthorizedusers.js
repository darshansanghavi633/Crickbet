import React from "react";

export default function Unauthorizedusers() {
  return (
    <div
      className="container text-center"
      style={{ marginTop: "100px", fontSize: "x-large" }}
    >
      <span style={{ fontSize: "xx-large", color: "red" }}>Oops!</span>
      <div>
        It seems you've stumbled upon a restricted area. This section is
        reserved for authorized administrators only. If you believe you should
        have access to this area, please reach out to our support team for
        further assistance.
      </div>
      <span style={{ fontSize: "xx-large", color: "green" }}>Thank you!</span>
    </div>
  );
}
