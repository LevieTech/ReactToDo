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
          After graduating, we wanted to continue learning and gaining experience in
          the software development process, so we decided to come together and do just that.
          Our goal is to continue building our portfolios, expanding our knowledge, and creating things worth sharing.
          <br /> <br />
          For questions or inquiries, send us an email at LevieTech247@gmail.com
          <br /> <br />
          <button className="btn" > Contact us! </button>
        </Typography>

        <Typography variant="h3"> Meet the team: </Typography>

        <hr style={{
          width: 800,
          height: 3,
          backgroundColor: "#4e3055"
        }} />

        <Card sx={{ maxWidth: 250, boxShadow: 5, margin: 2, padding: 2,}} >
          <Typography variant="h6"> Leigh Stephenson </Typography>
          <a href={"https://linkedin.com/in/leigh-stephenson"} target="_blank"> LinkedIn </a>
          <br />
          <img className="pic" src="./LS.png" alt="Leigh Stephenson" width="200px" />
        </Card>
        <br />

        <Card sx={{ maxWidth: 250, boxShadow: 5, margin: 2, padding: 2,}} >
          <Typography variant="h6"> Julie Gonzalez-Kincaid </Typography>
          <a href={"https://www.linkedin.com/in/julie-g-01b425268/"} target="_blank"> LinkedIn </a>
          <br />
          <img className="pic" src="./Julie.jpeg" alt="Julie" width="200px" />
        </Card>
        <br />

        <Card sx={{ maxWidth: 250, boxShadow: 5, margin: 2, padding: 2,}} >
          <Typography variant="h6"> Sam Gossie</Typography>
          <a href={"https://www.linkedin.com/in/sam-gossie-92a9008b/"} target="_blank"> LinkedIn </a>
          <br />
          <img className="pic" src="./IMG_0297.JPG" alt="Sam Gossie" width="200px" />
        </Card>

      </div>
    </center>
  );
}

export default InfoPage;
