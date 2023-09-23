import React from 'react';
import { Typography } from '@mui/material';


function InfoPage() {
  return (
    <center>
    <div className="container">
      <Typography variant="h3"
        sx={{ textAlign: 'center', }}>
        Information
      </Typography>

      <hr style={{
        width: 800,
        height: 3,
        backgroundColor: "#4e3055"
      }} />

      <Typography sx={{maxWidth: 750}}>
        Let's use this page to summarize what we are trying to do
        with LevieTech- continue learning and collaborating together.
        We can also include introductions/photos for each of us, and
        QR codes to our linkedIn if we want. Even if this isn't
        hosted, I think it would still be good to include that
        stuff. -Leigh
      </Typography>
    </div>
    </center>
  );
}

export default InfoPage;
