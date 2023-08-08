const { joiProfileSchema } = require("../helpers/joiService");
const {
  fetchUsers,
  fetchUsersLikeFirstName,
  updateProfileInfo,
  getProfileInfoByUserId,
  countUsersPage,
} = require("../helpers/knexService");

const getProfileInfos = async (ctx) => {
  const { page } = ctx.request.params;
  try {
    const users = await fetchUsers(page);
    const pages = await countUsersPage();
    const p = pages["count(*)"];
    const pageCount = (p - (p % 10)) / 10;
    ctx.body = { response: users, pageCount: pageCount };
  } catch (error) {
    console.log(object);
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

const searchProfileInfos = async (ctx) => {
  const search = ctx.request.params.search;
  const searchInput = search.split("=")[0];
  const searchPage = parseInt(search.split("=")[1]);
  try {
    const users = await fetchUsersLikeFirstName(searchInput, searchPage);
    const pages = await countUsersPage(searchInput);
    const p = pages["count(*)"];
    const pageCount = (p - (p % 10)) / 10;
    ctx.body = { response: users, pageCount: pageCount };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

const getProfile = async (ctx) => {
  //explain
  const timeRemaining = ctx.request.timeRemaining;
  const userId = ctx.request.userId;
  try {
    const profileInfo = await getProfileInfoByUserId(userId);
    ctx.body = { response: profileInfo, timeRemaining: timeRemaining };
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (ctx) => {
  const { userId, firstName, lastName, age, gender, city, email, phone } =
    ctx.request.body;
  try {
    await joiProfileSchema(ctx.request.body);
    await updateProfileInfo(
      userId,
      firstName,
      lastName,
      age,
      gender,
      city,
      email,
      phone
    );
    ctx.body = { response: "profile information updated" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

module.exports = {
  getProfile,
  getProfileInfos,
  searchProfileInfos,
  updateProfile,
};
