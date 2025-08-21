import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";
import OrderModel from "@/models/Order.model";
import ProductModel from "@/models/Product.model";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const getParams = await params;
    const orderid = getParams.orderid;

    if (!orderid) {
      return response(false, 404, "Order not Found");
    }

    const orderData = await OrderModel.findOne({ order_id: orderid })
      .populate("products.productId", "name slug")
      .populate({
        path: "products.variantId",
        populate: { path: "media" },
      })
      .lean();

    if (!orderData) {
      return response(false, 404, "Order not Found");
    }

    return response(true, 200, "Order Found", orderData);
  } catch (error) {
    return catchError(error);
  }
}
