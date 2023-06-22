const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb+srv://Harishtm:Harish2004@cluster0.4p0lx9k.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'teamPlayersDB';

class TeamPlayer {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Function to perform CRUD operations
async function performCRUD() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to the server');

    // Select the database
    const db = client.db(dbName);

    // Get the teamPlayers collection
    const teamPlayersCollection = db.collection('teamPlayers');

    // Create players
    const player1 = new TeamPlayer('John', 80);
    const player2 = new TeamPlayer('Alice', 95);
    const player3 = new TeamPlayer('Bob', 70);

    // Insert players into the collection
    const insertResult = await teamPlayersCollection.insertMany([player1, player2, player3]);
    console.log('Inserted players:', insertResult.insertedCount);

    // Read players from the collection
    const players = await teamPlayersCollection.find().toArray();
    console.log('Read players:', players);

    // Update a player's score
    const filter = { name: 'John' };
    const update = { $set: { score: 90 } };
    const updateResult = await teamPlayersCollection.updateOne(filter, update);
    console.log('Updated players:', updateResult.modifiedCount);

    // Read players with updated score
    const updatedPlayers = await teamPlayersCollection.find().toArray();
    console.log('Updated players:', updatedPlayers);

    // Delete a player
    const deleteFilter = { name: 'Bob' };
    const deleteResult = await teamPlayersCollection.deleteOne(deleteFilter);
    console.log('Deleted players:', deleteResult.deletedCount);

    // Read players after deletion
    const remainingPlayers = await teamPlayersCollection.find().toArray();
    console.log('Remaining players:', remainingPlayers);
  } catch (err) {
    console.log('Error:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Perform CRUD operations
performCRUD();
