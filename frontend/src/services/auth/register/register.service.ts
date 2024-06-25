export type registerData = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

export const createNewUser = async (data: registerData) => {
  const response = await fetch("http://localhost:5001/api/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const responseData = await response.json();
  return responseData;
};
