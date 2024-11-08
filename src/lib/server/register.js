import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";
import { UserModel } from "$lib/server/models.js";
import bcrypt from "bcrypt";
import { ACCOUNT_INIT } from "$lib/type.js";

const mongo = MONGO_STRING;
let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");

const validate = (data) => {
    let { email, username, password, confirmPassword } = data;
    if(!email) return { error: "Missing email"};
    if(!username) return { error: "Missing username"};
    if(!password) return { error: "Missing password"};
    if(!confirmPassword) return { error: "Confirm your password"};
    if(password !== confirmPassword) return { error: "Passwords do not match."};

    return {};
}

const hash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

}

export const register = async (data) => {
    let { error } = validate(data);
    if(error) return { error };

    let { email, username, password } = data;

    const user = await collection.findOne({ 
        $or: [
            { email },
            { username }
        ]
    });
    
    if (user) {
        return { error: "User with this email or username already exists."};
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { 
        username, 
        email, 
        password: hashedPassword,
        ...ACCOUNT_INIT
    };

    try {
        await collection.insertOne(newUser);
        return { error: "" };
    } catch (error) {
        return { error: error?.toString() };
    }
}


export const updateInfo = async (data) => {

    let { _id, email, username, password, confirmPassword } = data;

    if(!email) return { error: "Missing email"};
    if(!username) return { error: "Missing username"};
    if(password !== confirmPassword) return { error: "Passwords do not match."};

    data.password = await hash(password);

    if(password === "") {
        delete data.password;
    }
    delete data.confirmPassword;
    delete data._id;
    

    await collection.updateOne({_id: new ObjectId(_id)}, { $set: data});
    return { message: "Update successful!", update: data}
}

export const resetPassword = async (token, newPassword) => {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        const userId = decoded.id;

        const hashedPassword = await hash(newPassword);

        await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password: hashedPassword } }
        );

        return { message: "Password reset successful." };
    } catch (error) {
        return { error: "Invalid or expired token." };
    }
};