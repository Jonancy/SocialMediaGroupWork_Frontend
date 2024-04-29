const setLocalStorage = ({ userName, image, role, id }) => {
  localStorage.setItem("userName", JSON.stringify(userName));
  localStorage.setItem("image", JSON.stringify(image));
  localStorage.setItem("role", JSON.stringify(role));
  localStorage.setItem("id", JSON.stringify(id));
};

const getLocalStorage = () => {
  const userName = JSON.parse(localStorage.getItem("userName"));
  const image = JSON.parse(localStorage.getItem("image"));
  const role = JSON.parse(localStorage.getItem("role"));
  const id = JSON.parse(localStorage.getItem("id"));
  return { userName, image, role, id };
};

const clearLocalStorage = () => {
  localStorage.clear();
};

export { setLocalStorage, getLocalStorage, clearLocalStorage };
