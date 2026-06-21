const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      "https://project-2-convo-ai.onrender.com/signup",
      {
        ...inputValue,
      }
    );
    const { success, message, token } = data;
    if (success) {
      localStorage.setItem("token", token);
      handleSuccess(message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      handleError(message);
    }
  } catch (error) {
    console.log(error);
  }
  setInputValue({
    ...inputValue,
    email: "",
    password: "",
    username: "",
  });
};