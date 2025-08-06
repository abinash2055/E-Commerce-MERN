import { catchError, response } from "@/lib/helperFunction"
import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection"
import { zSchema } from "@/lib/zodSchema"
import { isValidObjectId } from "mongoose";
import MediaModel from "@/models/Media.model"

export async function PUT( request ) {
    try {
        const  auth = await isAuthenticated('admin')
        if ( !auth.isAuth ) {
            return response(
                false,
                403,
                "Unauthorized."
            )
        }
        await connectDB()

        const payload = await request.json()

        const schema = zSchema.pick({
            _id: true,
            alt: true,
            title: true
        })

        const validate = schema.safeParse(payload)
        if ( !validate ) {
            return response(
                false,
                400,
                "Invalidate or missing field.",
                validate.error
            )
        }

        const { _id, alt, title } = validate.data
        if ( !isValidObjectId(_id)) {
            return response(
              false,
              400,
              "Invalid Object Id."
            );
        }

        const getMedia = await MediaModel.findById(_id)
        if ( !getMedia) {
            return response(
                false, 
                404, 
                "Media not Found."
            )
        }

        getMedia.alt = alt
        getMedia.title = title

        await getMedia.save()

        return response(
            true, 
            200, 
            "Media Updated Successfully."
        );

    } catch (error) {
        return catchError(error)
    }
}