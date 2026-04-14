import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import client from '../database/database.js'
import 'dotenv/config'
import { oauth2 } from 'googleapis/build/src/apis/oauth2/index.js'
import { oauth2client } from '../utils/googleConfig.js'
import axios from 'axios'

export const register = async (req, res) => {
    const { username, email, firstname, lastname, password } = req.body

    if (!username || !email || !firstname || !lastname || !password) {
        return res.json({
            success: false,
            message: "Missing Detail"
        })
    }

    try {
        //Existing user email
        const existingUserEmail = await client.query(` select user_id from Users where email = $1 `, [email])
        if (existingUserEmail.rows.length > 0) {
            return res.json({
                success: false,
                message: `User already register with email ${email} `
            })
        }
        //Existing user username
        const existingUserUsername = await client.query(` select username from Users where username = $1 `, [username])
        if (existingUserUsername.rows.length > 0) {
            return res.json({
                success: false,
                message: `User already register with username ${username} `
            })
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const userEntry = await client.query(` insert into Users (username, firstname, lastname, email, password) values($1, $2, $3, $4, $5) returning user_id, username, firstname, lastname, email, password`, [username, firstname, lastname, email, hashPassword])

        return res.json({
            success: true,
            message: 'User Register Successfully',
            data: userEntry.rows[0]

        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body

    if (!username) {
        return res.json({
            success: false,
            message: 'username is required!'
        })
    }
    if (!password) {
        return res.json({
            success: false,
            message: 'password is required!'
        })
    }

    try {

        const result = await client.query(`select user_id, username, email, password from Users where username = $1`, [username])
        if (result.rows.length === 0) {
            return res.json({
                success: false,
                message: 'Invalid username'
            })
        }
        const user = result.rows[0]

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        const token = jwt.sign(
            { id: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie(
            'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        }
        )
        return res.json({
            success: true,
            message: 'Login Successfull'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }


}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        })

        return res.json({
            success: true,
            message: 'Logout successfull'
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const googleAuth = async (req, res) => {
    try {
        const { code } = req.body;
        const googleRes = await oauth2client.getToken(code)
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const { email, name, given_name, family_name, picture } = userRes.data
        let result = await client.query(`select user_id, email, username, firstname, lastname from Users where email = $1`, [email])
        if (result.rows.length === 0) {
            result = await client.query(`insert into Users (username, firstname, lastname, email) values($1, $2, $3, $4) returning user_id, username, firstname, lastname, email`, [name, given_name, family_name, email])
        }
        const user = result.rows[0]
        const token = jwt.sign(
            { id: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie(
            'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        }
        )
        res.status(200).json({
            success: true,
            user,
            picture,
            message: "Login successful"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Google auth failed" });
    }
}



export const isAuthenticated = async (req, res) => {
    try {

        return res.json({
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserData = async (req, res) => {
    const { userID } = req.user;
    if (!userID) {
        return res.json({
            success: false,
            message: 'Something went wrong please login again!'
        })
    }

    try {
        const result = await client.query(`select username, firstname, lastname, email, created_at from users where user_id = $1`, [userID])

        const user = result.rows[0]

        return res.json({
            success: true,
            user: user
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }


}