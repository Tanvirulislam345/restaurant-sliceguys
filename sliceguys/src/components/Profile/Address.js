import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import AddOption from "./AddOption";

function AddressComp({ addressData, handlePostAddress }) {

  return (
    <>
      <div className="addressContainer">
        <h4 >
          <Link to='/addaddress'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            + Add New Address
          </Link>
        </h4>
      </div>
      <Grid container spacing={2}>
        {addressData.map((item) => (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}
            key={item._id}
          >
            <Paper className="checkbox2">
              <div>
                <input type="radio" name="id"
                  onClick={() => {
                    handlePostAddress(item._id)
                  }} />

              </div>
              <div className="checkbox2detailsContainer" style={{ marginLeft: '20px' }}>
                <div className="editOption">
                  <h4>{item.firstname} {item.lastname}</h4>
                  <AddOption></AddOption>
                </div>
                <p>{item.phone}</p>
                <p>{item.address}</p>
                <p>{item.city}</p>
                <p>{item.postcode}</p>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>

  );
}

export default AddressComp;
