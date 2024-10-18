// sampledata.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function seedDatabase() {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    // Insert users
    await db.exec(`INSERT INTO users (firstname, surname, email, password) VALUES
        ('Alice', 'Johnson', 'alice.johnson@example.com', 'password');`);

    // // Insert genres
    // await db.exec(`INSERT INTO genres (name) VALUES
    //     ('Rock'),
    //     ('Pop'),
    //     ('Jazz'),
    //     ('Classical'),
    //     ('Hip Hop');`);

    // // Insert songs
    // await db.exec(`INSERT INTO songs (spotify_id, user_id, title, artist) VALUES
    //     (123, 1, 'Song One', 'Artist A'),
    //     (134, 1, 'Song Two', 'Artist B'),
    //     (245, 1, 'Song Three', 'Artist C'),
    //     (356, 1, 'Song Four', 'Artist D');`);

    // // Insert song genres
    // await db.exec(`INSERT INTO song_genres (song_id, genre_id) VALUES
    //     (1, 1),
    //     (1, 3),
    //     (2, 2),
    //     (3, 4),
    //     (4, 5);`);

    console.log("Sample data inserted successfully!");

    await db.close();
}

export default seedDatabase;
