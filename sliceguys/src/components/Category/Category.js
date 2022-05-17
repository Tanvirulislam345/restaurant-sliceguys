import { Paper } from "@mui/material";

function Category({ setIsActiveCat, isActiveCat, alldata }) {

  return (
    <div className="category">
      <h6 style={{ fontSize: '24px', fontWidth: 'bold', margin: '5px 0px', fontFamily: 'Bebas Neue', fontWeight: '400' }}>Category</h6>
      <div className="category_item">
        {
          alldata.map((data, index) => <Paper
            key={index}
            className="paper"
            onClick={() => {
              setIsActiveCat(data.categoriName);
            }}
            style={{
              background:
                isActiveCat === data.categoriName ? "#ffe500" : "#f7f7f7",
              cursor: 'pointer'
            }}
          >
            <img
              src={`data:image/*;base64, ${data.file}`}
              alt=""
            />

            <span
            >
              {data.categoriName}
            </span>
          </Paper>)
        }
      </div>
    </div>
  );
}

export default Category;
