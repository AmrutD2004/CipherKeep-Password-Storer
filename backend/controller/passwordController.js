import client from "../database/database.js";
import axios from "axios";


export const addPassword = async (req, res) => {
    const { userID } = req.user

    if (!userID) {
        return res.json({
            success: false,
            message: 'Not Authorized please login again'
        })
    }
    const { website, websiteUrl, usernameoremail, password, category, notes } = req.body

    if (!website && !websiteUrl && !usernameoremail && !password && !category && !notes) {
        return res.json({
            success: false,
            message: 'All fields are required'
        })
    }
    try {
        const result = await client.query(`Insert into "Credentials"( "user_id", "website", "websiteUrl", "usernameoremail", "password", "category", "notes") values ($1, $2, $3, $4, $5, $6, $7) returning *`, [userID, website, websiteUrl, usernameoremail, password, category, notes])

        return res.json({
            success: true,
            message: 'Password Added Successfully',
            data: result.rows[0]
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}


export const getUserPasswords = async (req, res) => {
    const { userID } = req.user;
    if (!userID) {
        return res.json({
            success: false,
            message: 'Not Authorized please login again'
        })
    }

    try {

        let result = await client.query(` select "user_id", "cred_id", "website", "websiteUrl", "usernameoremail", "password", "category", "notes", "created_at" from "Credentials" where user_id = $1 `, [userID])

        return res.json({
            success: true,
            data: result.rows
        })

    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}


export const editPassword = async (req, res) => {
    const { userID } = req.user;
    if (!userID) {
        return res.json({
            success: false,
            message: 'Not Authorized please login again'
        })
    }
    const { cred_id, website, websiteUrl, usernameoremail, password, category, notes } = req.body
    if (!cred_id) {
        return res.json({
            success: false,
            message: 'cred_id is not present'
        })
    }
    if (!website && !websiteUrl && !usernameoremail && !password && !category && !notes) {
        return res.json({
            success: false,
            message: 'All fields are required'
        })
    }

    let result = await client.query(` select * from "Credentials" where "cred_id" = $1 AND user_id = $2 `, [cred_id, userID])
    if (result.rows.length === 0) {
        return res.json({
            success: false,
            message: 'Password not found'
        })
    }
    result = await client.query(` UPDATE "Credentials" SET "website" = $1, "websiteUrl" = $2, "usernameoremail" = $3, "password" = $4, "category" = $5, "notes" = $6 where "cred_id" = $7 AND user_id = $8`, [website, websiteUrl, usernameoremail, password, category, notes, cred_id, userID])

    return res.json({
        success: true,
        message: 'Password updated successfully'
    })
}

export const deletePassword = async (req, res) => {
    const { userID } = req.user;
    const { cred_id } = req.params;
    if (!userID) {
        return res.json({
            success: false,
            message: 'Not Authorized please login again'
        })
    }
    if (!cred_id) {
        return res.json({
            success: false,
            message: 'cred_id is not present'
        })
    }

    try {
        let result = await client.query(` select * from "Credentials" where cred_id = $1 and user_id = $2 `, [cred_id, userID])

        if (result.rows.length === 0) {
            return res.json({
                success: false,
                message: 'Password not found'
            })
        }

        result = await client.query(` delete from "Credentials" where "cred_id" = $1 and user_id = $2 `, [cred_id, userID])

        return res.json({
            success: true,
            message: 'Password Deleted successfully'
        })

    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }

}