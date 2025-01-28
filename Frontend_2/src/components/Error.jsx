// import React from 'react'
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

export default function Error({ error }) {
  return (
    <div className="mt-4">
      {console.log(error)}
      {error.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.map((err) => (
            <p key={err.message}>{err.message}</p>
          ))}
        </Alert>
      )}
    </div>
  );
}
