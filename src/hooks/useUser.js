const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export default () => {
  let user = localStorage.getItem("user");
  if (user !== null) {
    user = JSON.parse(user);
  }
  return { user, setUser };
};
