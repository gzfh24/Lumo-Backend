const db = require('../config/db');

class UserModel {
    static async createUser({ username, email, avatar_url, birth_date }) {
        const query = `
            INSERT INTO users (username, email, avatar_url, birth_date, created_at)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING *
        `;
        const values = [username, email, avatar_url, birth_date];
        
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;