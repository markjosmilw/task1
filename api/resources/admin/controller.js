const { fetchUsersByPage, getTotalRows } = require("./service");

const getProfileList = async (ctx) => {
  const { search, page } = ctx.query;
  if (!search) {
    try {
      const users = await fetchUsersByPage(page);
      const totalRows = await getTotalRows();
      const pageCount = (totalRows.count - (totalRows.count % 10)) / 10;
      ctx.body = { response: users, pageCount: pageCount };
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = { error: error };
    }
    return;
  }
  try {
    ctx.body = "search";
  } catch (error) {
    console.log(error);
  }
};

// const getSearchedProfileList = async (ctx) => {
//   const {search, page} = ctx.query;
//   console.log(search);
//   console.log(page);
// }

module.exports = {
  getProfileList,
  // getSearchedProfileList
};

//continue admin
