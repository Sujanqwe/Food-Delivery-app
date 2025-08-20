import express from 'express';
import { ENV } from './config/env.js';
import { db } from './config/db.js';
import { favoritesTable } from './db/schema.js';  // ✅ matches export name
import { eq, and } from 'drizzle-orm';

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: "Server is running fine" });
});

// ✅ POST: Add a favorite
app.post("/api/favorites", async (req, res) => {  
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newFavorite = await db.insert(favoritesTable).values({
      userId,
      recipeId,
      title,
      image,
      cookTime,
      servings,
    }).returning();

    res.status(201).json(newFavorite[0]);

  } catch (error) {
    console.error("Error inserting favorite:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET: Fetch all favorites
app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params; 

    const UserFavorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId, userId))
    res.status(200).json(UserFavorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const{userId, recipeId } =req.params
    await db.delete(favoritesTable)
      .where(and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, recipeId))); 
     res.status(200).json({message: "Favorite removed successfully" });
    
  } catch (error) {
    console.error("Error removing a fetching favorites:", error);
    res.status(500).json({ error: "Server error" });
  }

})

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
