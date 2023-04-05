const oracledb = require("oracledb");

//an expressjs route is calling this service every time receives an request
const searchService = (user, searchInput) => {
  try {
    if (!validateSearchInput(searchInput)) {
      throw new Error("Invalid input");
    }

    let data = searchDataInOracle(searchInput.searchString);

    let searchResult = transformData(data);

    return searchResult;
  } catch (err) {
    throw new Error(err.message);
  }
};

// search data
const searchDataInOracle = async (searchStr) => {
  let devicesArr = [];
  let connection;
  try {
    // create an oracle connection
    connection = await oracledb.getConnection({
      user: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      connectString: process.env["DB_CONNSTRING"],
    });

    //SQL INJECTION
    const result = await connection.execute(
      "SELECT id, name, description FROM devices WHERE name like %" + searchStr
    );

    result.rows.forEach((element) => {
      devicesArr.push({
        id: element[0],
        name: element[1],
        description: element[2],
      });
    });

    await connection.close();

    return devicesArr;
  } catch (err) {
    throw err;
  }
};

// returns the data in a different schema
const transformData = (data) => {
  // not relevant
  //...
};

// it returns true if the input is valid / false if the input is is not valid
const validateSearchInput = (searchInput) => {
  // not relevant
  //...
};
