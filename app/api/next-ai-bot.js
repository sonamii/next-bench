// TEMPORARY CLOSED DUE TO NO PUBLIC SERVERS

require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const API_KEY = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

app.post("/ask-next-ai", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "⚠️ Message is required." });
    }

    if (!API_KEY) {
      return res
        .status(500)
        .json({ error: "⚠️ API key is missing in .env file." });
    }

    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-small-latest",
        messages: [
          {
            role: "system",
            content: `You are **Next AI**, a professional virtual assistant designed to help users/parents/students with the Next Bench website.  

             -  🚀 Next Bench is an innovative platform designed to help parents find the best schools for their children. It allows users to explore, compare, and evaluate schools based on location, curriculum, and facilities.
             🔍 Key Features:
             🌍 Location-Based Search: Find nearby schools easily.
             📊 Compare Schools: Analyze ratings, reviews, and key features.
             🏫 Detailed School Profiles: Get insights on academics, infrastructure, and extracurriculars.
             🤖 Next AI Assistance: A smart chatbot (created by 🛠 Sonamii) to guide users.
             Next Bench simplifies school selection, making the process faster, smarter, and stress-free for parents.

            - 🛠 **Created by Sonamii** to assist users on **Next Bench**.  
            - 💡 Your job is to **help users navigate and use Next Bench** effectively.  
            - 🎯 Only answer **Next Bench-related questions**.  
            - 🔍 Use **short, clear paragraphs** with **line breaks** for readability.  
            - 😊 Include **friendly emojis** for an engaging experience.  
            - 🛑 If a user asks an unrelated question, politely inform them that you only assist with Next Bench.`,
          },
          { role: "user", content: userMessage },
        ],
      },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    // Format AI response to improve readability
    const formatResponse = (text) => {
      return text
        .replace(/\n+/g, "<br>🔹 ")
        .replace(/Step/g, "📝 Step")
        .replace(/Welcome/g, "👋 Welcome")
        .replace(/Search/g, "🔍 Search")
        .replace(/Explore/g, "🌍 Explore")
        .replace(/Find/g, "🔎 Find")
        .replace(/Compare/g, "📊 Compare")
        .replace(/Select/g, "✅ Select")
        .replace(/Apply/g, "📩 Apply")
        .replace(/Next Bench/g, "🚀 Next Bench")
        .replace(/Next AI/g, "🤖 Next AI")
        .replace(/Sonamii/g, "🛠 Sonamii")
        .replace(/School/g, "🏫 School")
        .replace(/Education/g, "📚 Education")
        .replace(/Student/g, "🎓 Student")
        .replace(/Profile/g, "👤 Profile")
        .replace(/Settings/g, "⚙️ Settings")
        .replace(/Help/g, "❓ Help")
        .replace(/Support/g, "🆘 Support")
        .replace(/Network/g, "🌐 Network")
        .replace(/Community/g, "👥 Community")
        .replace(/Learn/g, "📖 Learn")
        .replace(/Improve/g, "🚀 Improve")
        .replace(/Upgrade/g, "⬆️ Upgrade")
        .replace(/Success/g, "🏆 Success")
        .replace(/Features/g, "✨ Features")
        .replace(/Smart/g, "🧠 Smart")
        .replace(/Fast/g, "⚡ Fast")
        .replace(/Safe/g, "🛡 Safe")
        .replace(/Process/g, "🔄 Process")
        .replace(/Access/g, "🔑 Access")
        .replace(/Verified/g, "✅ Verified")
        .replace(/Guide/g, "📌 Guide")
        .replace(/Resources/g, "📂 Resources")
        .replace(/News/g, "📰 News")
        .replace(/Trends/g, "📈 Trends")
        .replace(/Rankings/g, "🥇 Rankings")
        .replace(/Top/g, "🔝 Top")
        .replace(/Review/g, "⭐ Review")
        .replace(/Rating/g, "🌟 Rating")
        .replace(/Apply Now/g, "🚀 Apply Now")
        .replace(/Contact/g, "📞 Contact")
        .replace(/Message/g, "💬 Message")
        .replace(/Chat/g, "💭 Chat")
        .replace(/Call/g, "📱 Call")
        .replace(/Email/g, "📧 Email")
        .replace(/Login/g, "🔑 Login")
        .replace(/Register/g, "📝 Register")
        .replace(/Join/g, "👥 Join")
        .replace(/Upgrade/g, "📈 Upgrade")
        .replace(/Unlock/g, "🔓 Unlock")
        .replace(/Exclusive/g, "🌟 Exclusive")
        .replace(/Offers/g, "🎁 Offers")
        .replace(/Discount/g, "💸 Discount")
        .replace(/Premium/g, "💎 Premium")
        .replace(/Subscription/g, "📜 Subscription")
        .replace(/Free/g, "🆓 Free")
        .replace(/New/g, "🆕 New")
        .replace(/Update/g, "🔄 Update")
        .replace(/Announcement/g, "📢 Announcement")
        .replace(/Important/g, "❗ Important")
        .replace(/Warning/g, "⚠️ Warning")
        .replace(/Security/g, "🔒 Security")
        .replace(/Privacy/g, "🛡 Privacy")
        .replace(/Terms/g, "📜 Terms")
        .replace(/Policy/g, "📖 Policy")
        .replace(/Conditions/g, "⚖️ Conditions")
        .replace(/Agreement/g, "📝 Agreement")
        .replace(/Settings/g, "⚙️ Settings")
        .replace(/Dashboard/g, "📊 Dashboard")
        .replace(/Statistics/g, "📈 Statistics")
        .replace(/Data/g, "📊 Data")
        .replace(/Analysis/g, "🔬 Analysis")
        .replace(/Success/g, "🏆 Success")
        .replace(/Failure/g, "❌ Failure")
        .replace(/Error/g, "⚠️ Error")
        .replace(/Fix/g, "🛠 Fix")
        .replace(/Solution/g, "✅ Solution")
        .replace(/Steps/g, "📝 Steps")
        .replace(/Guide/g, "📖 Guide")
        .replace(/Tutorial/g, "🎥 Tutorial")
        .replace(/Tips/g, "💡 Tips")
        .replace(/Tricks/g, "🎩 Tricks")
        .replace(/Easy/g, "👌 Easy")
        .replace(/Difficult/g, "😓 Difficult")
        .replace(/Challenge/g, "💪 Challenge")
        .replace(/Goal/g, "🎯 Goal")
        .replace(/Target/g, "🎯 Target")
        .replace(/Deadline/g, "⏳ Deadline")
        .replace(/Time/g, "⏰ Time")
        .replace(/Date/g, "📅 Date")
        .replace(/Calendar/g, "📆 Calendar")
        .replace(/Reminder/g, "⏲️ Reminder")
        .replace(/Meeting/g, "📅 Meeting")
        .replace(/Event/g, "🎉 Event")
        .replace(/Celebration/g, "🥳 Celebration")
        .replace(/Festival/g, "🎊 Festival")
        .replace(/Gift/g, "🎁 Gift")
        .replace(/Wish/g, "🙏 Wish")
        .replace(/Congratulations/g, "🎉 Congratulations")
        .replace(/Happy/g, "😊 Happy")
        .replace(/Sad/g, "😢 Sad")
        .replace(/Excited/g, "🤩 Excited")
        .replace(/Nervous/g, "😨 Nervous")
        .replace(/Angry/g, "😡 Angry")
        .replace(/Love/g, "❤️ Love")
        .replace(/Like/g, "👍 Like")
        .replace(/Dislike/g, "👎 Dislike")
        .replace(/Share/g, "📤 Share")
        .replace(/Post/g, "📬 Post")
        .replace(/Comment/g, "💬 Comment")
        .replace(/Feedback/g, "📝 Feedback")
        .replace(/Vote/g, "🗳️ Vote")
        .replace(/Poll/g, "📊 Poll")
        .replace(/Trending/g, "🔥 Trending")
        .replace(/Popular/g, "📈 Popular")
        .replace(/Famous/g, "🌟 Famous")
        .replace(/Viral/g, "🚀 Viral")
        .replace(/Breaking/g, "⚡ Breaking")
        .replace(/Exclusive/g, "🌟 Exclusive")
        .replace(/Behind the scenes/g, "🎬 Behind the scenes")
        .replace(/Live/g, "🔴 Live")
        .replace(/Streaming/g, "📺 Streaming")
        .replace(/Music/g, "🎵 Music")
        .replace(/Movie/g, "🎬 Movie")
        .replace(/Series/g, "📺 Series")
        .replace(/Episode/g, "🎥 Episode")
        .replace(/Game/g, "🎮 Game")
        .replace(/Play/g, "▶️ Play")
        .replace(/Win/g, "🏆 Win")
        .replace(/Lose/g, "😞 Lose")
        .replace(/Score/g, "📊 Score")
        .replace(/Rank/g, "🥇 Rank")
        .replace(/Champion/g, "🏅 Champion")
        .replace(/Sports/g, "⚽ Sports")
        .replace(/Fitness/g, "🏋️ Fitness")
        .replace(/Workout/g, "💪 Workout")
        .replace(/Running/g, "🏃 Running")
        .replace(/Swimming/g, "🏊 Swimming")
        .replace(/Cycling/g, "🚴 Cycling")
        .replace(/Travel/g, "✈️ Travel")
        .replace(/Vacation/g, "🌴 Vacation")
        .replace(/Adventure/g, "🌄 Adventure")
        .replace(/Camping/g, "🏕️ Camping")
        .replace(/Hiking/g, "🥾 Hiking")
        .replace(/Food/g, "🍔 Food")
        .replace(/Drink/g, "🥤 Drink")
        .replace(/Coffee/g, "☕ Coffee")
        .replace(/Tea/g, "🍵 Tea")
        .replace(/Breakfast/g, "🥞 Breakfast")
        .replace(/Lunch/g, "🍽️ Lunch")
        .replace(/Dinner/g, "🍛 Dinner")
        .replace(/Healthy/g, "🥗 Healthy")
        .replace(/Sleep/g, "😴 Sleep")
        .replace(/Wake up/g, "⏰ Wake up")
        .replace(/Relax/g, "🧘 Relax")
        .replace(/Meditation/g, "🧘 Meditation")
        .replace(/Mindfulness/g, "🧠 Mindfulness")
        .replace(/Shopping/g, "🛍️ Shopping")
        .replace(/Fashion/g, "👗 Fashion")
        .replace(/Style/g, "🕶️ Style")
        .replace(/Clothes/g, "👚 Clothes")
        .replace(/Shoes/g, "👟 Shoes")
        .replace(/Accessories/g, "💍 Accessories")
        .replace(/Luxury/g, "💎 Luxury");
    };

    res.json({
      reply: formatResponse(response.data.choices[0].message.content),
    });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "❌ Failed to get response from Next AI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
