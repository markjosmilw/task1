const { fetchUsersByPage, getUsersTotalRow } = require("./service");

// async function get(ctx) {
//   ctx.body = "test";
// }

async function getProfileList(ctx) {
  const { search, page } = ctx.query;
  if (!search) {
    try {
      const users = await fetchUsersByPage(search, page);
      const totalRows = await getUsersTotalRow();
      const pageCount = (totalRows.count - (totalRows.count % 10)) / 10;
      ctx.body = { response: users, pageCount: pageCount };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error };
    }
    return;
  }
  try {
    const users = await fetchUsersByPage(search, page);
    const totalRows = await getUsersTotalRow(search);
    ctx.body = { response: users, pageCount: totalRows };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error };
  }
}

async function deleteUser(ctx) {
  const userId = ctx.request.params.id;
  try {
  } catch (error) {}
}

module.exports = {
  getProfileList,
  deleteUser,
};

//continue admin
