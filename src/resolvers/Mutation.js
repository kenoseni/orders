import { handleError } from "../utils/handleError";

export const Mutation = {
  register: async (_, args, { auth }, info) => {
    const { email, password, phone } = args.data;

    if (password.length < 8)
      handleError("Password must be 8 characters or longer");

    const userCredential = await auth
      .createUser({ email, password, phoneNumber: phone })
      .catch((error) => {
        handleError(error.message);
      });
    const token = await auth
      .createCustomToken(userCredential.uid)
      .catch((error) => {
        handleError(error.message);
      });

    const user = {
      uid: userCredential.uid,
      email: userCredential.email,
      phone: userCredential.phoneNumber,
      name: userCredential.displayName,
    };
    return {
      user,
      token,
    };
  },
  login: async (_, args, { clientAuth, signInWithEmailAndPassword }, info) => {
    const { email, password } = args.data;
    const userCredential = await signInWithEmailAndPassword(
      clientAuth,
      email,
      password
    ).catch((error) => {
      if (error.code === "auth/network-request-failed") {
        handleError("Network connection error");
      }
      handleError("Invalid user credentials");
    });
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      phone: userCredential.user.phoneNumber,
      name: userCredential.user.displayName,
    };

    const token = userCredential.user.getIdToken();

    return {
      user,
      token,
    };
  },
};
