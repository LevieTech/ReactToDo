import React from 'react';
import { Typography, Card } from '@mui/material';

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

        <Typography sx={{ maxWidth: 750, marginBottom: 6, }}>
          LevieTech is a collaborative organization made up of career changers looking
          to break into the tech industry. We all met in the Tanzanite FSE cohort at Prime Digital Academy.
          After graduating, we all wanted to continue learning and gaining experience in
          the software development process, so we decided to come together and do just that.
          Our goal is to continue building our portfolios, expanding our knowledge, and creating things worth sharing.
          <br /> <br />
          For questions or inquiries, send us an email at LevieTech@gmail.com
          <br /> <br />
          <button className="btn" > Contact us! </button>
        </Typography>

        <Typography variant="h3" sx={{}}> Meet the team: </Typography>

        <hr style={{
          width: 800,
          height: 3,
          backgroundColor: "#4e3055"
        }} />

        <Card sx={{ minHeight: 150, }}>
          <Typography variant="h6"> Leigh Stephenson </Typography>
          <a href=""> Find me on LinkedIn</a>
          <br/>
          <img src="./leighs.png" alt="Leigh Stephenson" />
        </Card>

        <Typography variant="h6"> Julie Gonzalez-Kincaid </Typography>

        <Typography variant="h6"> Sam Gossie </Typography>


      </div>
    </center>
  );
}

export default InfoPage;
