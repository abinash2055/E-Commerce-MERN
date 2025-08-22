import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";
import OrderModel from "@/models/Order.model";
import ProductModel from "@/models/Product.model";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function GET() {
  try {
    await connectDB();

    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return response(false, 401, "Unauthorized");
    }

    const userId = auth.userId;

    // get Recent Orders
    const recentOrders = await OrderModel.find({ user: userId })
      .populate("products.productId", "name slug")
      .populate({
        path: "products.variantId",
        populate: { path: "media" },
      })
      .limit(10)
      .lean();

    // Get total order count
    const totalOrders = await OrderModel.countDocuments({ user: userId });

    return response(true, 200, "Dashboard info", {
      recentOrders,
      totalOrders,
    });
  } catch (error) {
    return catchError(error);
  }
}
