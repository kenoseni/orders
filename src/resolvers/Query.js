import { handleError } from "../utils/handleError";
import { verifyToken } from "../utils/verifyToken";

export const Query = {
  orders: async (_, args, { req, db, auth }, info) => {
    await verifyToken(req, auth).catch((error) => {
      handleError(error.message);
    });
    let limit;
    let page;
    let count;
    const orders = [];

    if (args.data) {
      limit = args.data.limit;
      page = args.data.page;
    } else {
      page = 1;
      limit = 0;
    }
    const offset = (page - 1) * limit;
    const orderRef = db
      .collection("orders")
      .orderBy("uid")
      .limit(limit)
      .offset(offset);

    const orderDocs = await orderRef.get().catch((error) => {
      handleError(error.message);
    });

    count = orderDocs.docs.length;

    orderDocs.forEach((doc) => {
      orders.push(doc.data());
    });
    return {
      orders,
      count,
    };
  },

  getCustomerOrders: async (_, args, { req, db, auth }, info) => {
    await verifyToken(req, auth).catch((error) => {
      handleError(error.message);
    });
    const orders = [];

    const { email } = args.data;

    const ordersRef = db.collection("orders");

    const allOrdersDocs = await ordersRef
      .where("customer.email", "==", email)
      .get()
      .catch((error) => {
        handleError(error.message);
      });

    allOrdersDocs.forEach((doc) => {
      orders.push({ uid: doc.id, ...doc.data() });
    });

    return { orders };
  },

  order: async (_, args, { req, db, auth }, info) => {
    await verifyToken(req, auth).catch((error) => {
      handleError(error.message);
    });

    const { uid } = args.data;

    const orderRef = db.collection("orders").doc(uid);

    const orderDoc = await orderRef.get().catch((error) => {
      handleError(error.message);
    });

    if (!orderDoc.exists) handleError("Document not found!");

    const { title, address, bookingDate, customer } = orderDoc.data();

    return {
      uid,
      title,
      bookingDate,
      address,
      customer: {
        uid: customer.uid,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
      },
    };
  },
};
