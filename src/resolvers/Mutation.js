import { handleError } from "../utils/handleError";
import { verifyToken } from "../utils/verifyToken";

export const Mutation = {
  register: async (_, args, { auth }, info) => {
    const { email, password, phone, name } = args.data;

    if (password.length < 8)
      handleError("Password must be 8 characters or longer");

    const userCredential = await auth
      .createUser({ email, password, phoneNumber: phone, displayName: name })
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
  createOrder: async (parent, args, { req, db, auth }, info) => {
    const customerId = await verifyToken(req, auth).catch((error) => {
      handleError(error.message);
    });

    const customer = await auth.getUser(customerId).catch((error) => {
      handleError(error.message);
    });

    const bookingDate = new Date().getTime();

    const order = {
      ...args.data,
      bookingDate,
      customer: {
        uid: customer.uid,
        email: customer.email,
        phone: customer.phoneNumber,
        name: customer.displayName,
      },
    };

    const response = await db
      .collection("orders")
      .add(order)
      .catch((error) => {
        handleError(error.message);
      });

    return {
      uid: response.id,
      ...order,
    };
  },
  deleteOrder: async (parent, args, { req, db, auth }, info) => {
    const customerId = await verifyToken(req, auth).catch((error) => {
      handleError(error.message);
    });

    const { uid } = args.data;

    const orderRef = db.collection("orders").doc(uid);

    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) handleError("Document not found!");

    if (customerId !== orderDoc.data().customer.uid)
      handleError("You have no permission to delete this order");

    await db
      .collection("orders")
      .doc(uid)
      .delete()
      .catch((error) => {
        handleError(error.message);
      });

    const { title, address, bookingDate, customer } = orderDoc.data();

    return {
      uid,
      title,
      bookingDate,
      address,
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
      },
    };
  },
};
