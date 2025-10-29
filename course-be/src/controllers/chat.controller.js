import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            process.env.OPENROUTER_API_KEY
          }`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "WebCourse AI Chatbot",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("OpenRouter error:", data.error);
      return res.status(400).json({ 
        error: data.error.message 
      });
    }

    const reply = data.choices?.[0]?.message?.content || 
      "Không có phản hồi.";
    res.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ 
      error: "Lỗi server hoặc kết nối OpenRouter thất bại." 
    });
  }
};

// ===== LẤY LỊCH SỬ CHAT (Admin) =====
export const getAdminChatHistory = async (req, res) => {
  try {
    const db = req.app.get("db");
    
    // Lấy tất cả tin nhắn giữa user và admin
    const chats = await db.Chat.findAll({
      where: {
        senderRole: ["user", "admin"],
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          as: "sender",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    // Group theo userId
    const grouped = {};
    chats.forEach((chat) => {
      const userId = chat.senderRole === "user" 
        ? chat.senderId 
        : chat.receiverId;
      
      if (!grouped[userId]) {
        grouped[userId] = [];
      }

      grouped[userId].push({
        sender: chat.senderRole,
        text: chat.message,
        timestamp: chat.createdAt,
        isRead: chat.isRead,
        userName: chat.sender?.name || "Unknown",
      });
    });

    res.json({ chats: grouped });
  } catch (error) {
    console.error("❌ Error fetching chat history:", error);
    res.status(500).json({ 
      error: "Không thể lấy lịch sử chat" 
    });
  }
};

// ===== LẤY LỊCH SỬ CHAT (User) =====
export const getUserChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const db = req.app.get("db");

    const chats = await db.Chat.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      order: [["createdAt", "ASC"]],
    });

    const messages = chats.map((chat) => ({
      sender: chat.senderRole,
      text: chat.message,
      timestamp: chat.createdAt,
    }));

    res.json({ messages });
  } catch (error) {
    console.error("❌ Error fetching user chat:", error);
    res.status(500).json({ 
      error: "Không thể lấy lịch sử chat" 
    });
  }
};