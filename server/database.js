// database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initDatabase = async () => {
    const db = await open({
        filename: './database.db', // Path to your SQLite file
        driver: sqlite3.Database
    });

    // Create a users table
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        surname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`);

    // Create the songs table if it doesn't exist
    await db.exec(`CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        spotify_id TEXT UNIQUE NOT NULL,
        user_id INTEGER,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        image_url TEXT NOT NULL,
        spotify_uri TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);

     // Create the genres table if it doesn't exist
     await db.exec(`CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    )`);

    // Create the song_genres junction table if it doesn't exist
    await db.exec(`CREATE TABLE IF NOT EXISTS song_genres (
        song_id INTEGER,
        genre_id INTEGER,
        PRIMARY KEY (song_id, genre_id),
        FOREIGN KEY (song_id) REFERENCES songs(spotify_id) ON DELETE CASCADE,
        FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
    )`);

    return db;
};

export default initDatabase;
