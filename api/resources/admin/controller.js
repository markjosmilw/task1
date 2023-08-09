const { fetchUsersByPage, getTotalRows } = require("./service");

const getProfileList = async (ctx) => {
  const { page } = ctx.query;
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
};

module.exports = {
  getProfileList,
};


//continue admin