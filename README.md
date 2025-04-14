# AI Health Coach Chatbot

An interactive health coach chatbot built with Next.js that provides health-related information and guidance using the Google Gemini AI API. The chatbot specializes in health, nutrition, fitness, and wellness topics.

![AI Health Coach](public/health-coach-preview.png)

## Features

- 🎯 Specialized Health Focus
  - Nutrition & Diet advice
  - Fitness & Exercise guidance
  - Mental Wellness support
  - General Health information
  - Sleep & Recovery tips
  - Healthy Habits coaching

- 💻 Technical Features
  - Real-time typing animation for responses
  - Markdown support for formatted content
  - Emoji-enhanced user interface
  - Responsive design
  - Error handling and validation
  - Health-specific content filtering

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-chat-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technology Stack

- **Frontend:**
  - Next.js 15.3.0
  - React 19.0.0
  - TailwindCSS
  - React Icons
  - React Markdown

- **API Integration:**
  - Google Gemini AI API
  - REST API endpoints

## Project Structure

```
src/
  ├── app/
  │   ├── api/
  │   │   └── chat/
  │   │       └── route.js    # Chat API endpoint
  │   ├── components/
  │   │   └── TypeWriter.js   # Typing animation component
  │   ├── layout.js           # Root layout
  │   ├── page.js             # Main chat interface
  │   └── globals.css         # Global styles
  └── ...
```

## Key Features Explained

### Health-Focused AI

The chatbot is specifically trained to:
- Only respond to health-related queries
- Provide evidence-based health information
- Include medical disclaimers when appropriate
- Encourage professional medical consultation

### Interactive UI

- Real-time typing animation for a more engaging experience
- Markdown formatting for structured responses
- Health-themed design with intuitive interface
- Loading states and error handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

## Disclaimer

This chatbot provides general health information only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
