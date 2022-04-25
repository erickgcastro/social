export const checkToken = (fn) => {
  const token = localStorage.getItem("token");
  if (token) {
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fn(auth);
  } else {
    if (window.location.pathname !== "/auth") {
      window.location = "/auth";
    }
  }
};
