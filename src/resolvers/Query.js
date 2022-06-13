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
};
