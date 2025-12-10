import AppError from "../../utils/AppError.js";

export const uploadFile = async (req, res) => {
    if (!req.file) {
        throw new AppError("No file uploaded.", 400, "NO_FILE_UPLOADED", "Please provide a file under the 'file' field.");
    }

    // Build a public absolute URL for the uploaded file. The app serves /uploads statically.
    const host = req.get('host');
    const protocol = req.protocol;
    const url = `${protocol}://${host}/uploads/${req.file.filename}`;

    res.sendSuccess({ url });
};