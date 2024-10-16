import express from 'express';
// import nodemailer from 'nodemailer';
import cors from 'cors';
import initDatabase from './database.js';
import seedDatabase from './sampledata.js';
import dotenv from 'dotenv';

// import env from "./env.js"

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

// Initialize database
let db;

initDatabase()
    .then(database => {
        db = database; // Store the database connection for later use
        return seedDatabase(); // Chain the seedDatabase() call here
    })
    .then(() => {
        console.log('Database seeded successfully');
    })
    .catch(err => {
        console.error('Error during database initialization or seeding:', err);
    });


// GET test route
app.get('/', (req, res) => {
    res.send('Welcome to the API for Shadong!'); 
});


// Route to add a user
app.post('/api/users/register', async (req, res) => {
    console.log('Register route hit');
    console.log('Request body:', req.body); // Log the incoming request body
    const { firstname, surname, email, password } = req.body;

    // Validate the input
    if (!firstname || !surname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check for existing email
        const existingUser = await new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
                if (err) {
                    console.error('Error checking existing user:', err);
                    return reject(err);
                }
                resolve(row);
            });
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists.' });
        }

        // Insert the new user
        await new Promise((resolve, reject) => {
            db.run(`INSERT INTO users (firstname, surname, email, password) VALUES (?, ?, ?, ?)`, [firstname, surname, email, password], function (err) {
                if (err) {
                    console.error('Error inserting user:', err.message);
                    return reject(err);
                }
                console.log('Inserted user ID:', this.lastID);
                resolve(this.lastID);
            });
        });

        console.log('User added successfully.');
        return res.status(201).json({ message: 'User added successfully.' });
    } catch (err) {
        console.error('Failed to add user:', err);
        return res.status(500).json({ message: 'Failed to add user.' });
    }
});



app.post('/api/songs/add', async (req, res) => {
    const { spotifyId, userId, title, artist, genres, image_url, spotify_uri } = req.body;

    if (!spotifyId || !userId || !title || !artist || !genres) {
        return res.status(400).json({ message: 'Required fields are missing.' });
    }

    try {
        // Step 1: Insert the song into the songs table if it doesn't exist
        const insertSongStmt = `
            INSERT INTO songs (spotify_id, user_id, title, artist, image_url, spotify_uri)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(spotify_id) DO NOTHING;
        `;
        await db.run(insertSongStmt, [spotifyId, userId, title, artist, image_url, spotify_uri]);

        // Step 2: Get the song ID from the inserted or existing song
        const getSongIdStmt = `SELECT id FROM songs WHERE spotify_id = ?`;
        const songResult = await db.get(getSongIdStmt, [spotifyId]);
        const songId = songResult.id;

        // Step 3: Process each genre
        for (const genre of genres) {
            // Insert genre into genres table or ignore if it already exists
            const insertGenreStmt = `
                INSERT INTO genres (name)
                VALUES (?)
                ON CONFLICT(name) DO NOTHING;
            `;
            await db.run(insertGenreStmt, [genre]);

            // Get the genre ID
            const getGenreIdStmt = `SELECT id FROM genres WHERE name = ?`;
            const genreResult = await db.get(getGenreIdStmt, [genre]);
            const genreId = genreResult.id;

            // Step 4: Insert into song_genres table if not already existing
            const insertSongGenreStmt = `
                INSERT INTO song_genres (song_id, genre_id)
                VALUES (?, ?)
                ON CONFLICT(song_id, genre_id) DO NOTHING;
            `;
            await db.run(insertSongGenreStmt, [songId, genreId]);
        }

        res.status(201).json({ message: 'Song and genres added successfully.' });
    } catch (err) {
        console.error('Error adding song:', err.message);
        res.status(500).json({ message: 'Failed to add song and genres.' });
    }
});


app.get('/api/users/:userId/songs', async (req, res) => {
    const userId = req.params.userId;

      // Fetch songs for the given userId and include genres
      try {
        const songs = await db.all(`
            SELECT s.id AS song_id, s.title, s.artist, s.spotify_id, s.image_url, s.spotify_uri, GROUP_CONCAT(g.name) AS genres
            FROM songs s
            LEFT JOIN song_genres sg ON s.id = sg.song_id
            LEFT JOIN genres g ON sg.genre_id = g.id
            WHERE s.user_id = ?
            GROUP BY s.id
        `, [userId]);

        res.json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).send('Internal Server Error');
    }
});







//LISTEN
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
    console.log(`See server on http://localhost:${port}`)
})