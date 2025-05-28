# AI Chatbot Smart Inbox
A modern, AI-powered email management system that helps users handle customer conversations efficiently with intelligent AI assistance. Built with cutting-edge technologies to provide a seamless, responsive, and intuitive user experience.

## 🚀 Features

### Smart Conversation Management
- **Real-time conversation list** with live updates
- **Unread message tracking** with visual indicators
- **Conversation selection and viewing** with smooth transitions
- **Mobile-responsive design** for all device types
- **Smart conversation organization** with priority sorting

### AI-Powered Intelligence
- **AI Copilot** for generating contextual response suggestions
- **Smart conversation summaries** to quickly understand context
- **Context-aware response generation** based on conversation history
- **Internal content detection** for sensitive information
- **Time-saving metrics** to track productivity improvements
- **Intelligent suggestion system** for common responses
- **Dual AI Architecture**: Local knowledge base (current) + External AI API integration (future)
- **Fallback system** ensuring continuous operation regardless of AI service availability

### Modern User Interface
- **Conversation List** with elegant design and smooth scrolling
- **Conversation Header** with participant information and actions
- **Message List** with rich formatting and media support
- **Reply Composer** with advanced text editing capabilities
- **AI Copilot Panel** with intelligent suggestions
- **Smart Suggestions** for quick responses
- **Mobile-friendly navigation** with touch-optimized controls

### Core Functionality
- **Real-time message sending** with instant delivery
- **Hybrid AI response generation** - Local knowledge base + External AI APIs
- **Conversation summarization** for quick context understanding
- **Smart suggestion system** for efficiency improvements
- **Notification system** for important updates
- **Search and filtering** capabilities
- **HTTP client integration** with Axios for API communication
- **Graceful fallbacks** when external services are unavailable

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.3.2 | React framework with SSR |
| **React** | 19.0.0 | UI library |
| **TailwindCSS** | 4.0 | Utility-first CSS framework |
| **Framer Motion** | 12.12.2 | Animation library |
| **Lucide React** | 0.511.0 | Icon library |
| **Axios** | 1.9.0 | HTTP client |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn**
- **Git** for version control

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-chatbot-smart-inbox.git
cd ai-chatbot-smart-inbox
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment setup

Create a `.env.local` file in the root directory:

```bash
# AI Service Configuration (Optional - for enhanced AI features)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_AI_MODE=local # Options: 'local', 'api', 'hybrid'

# External AI Service URLs (when using API mode)
AI_SERVICE_URL=https://api.openai.com/v1
AI_FALLBACK_URL=https://api.anthropic.com/v1

# Database Configuration (if applicable)
DATABASE_URL=your_database_url_here

# Authentication (if applicable)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
ai-chatbot-smart-inbox/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── ConversationList.js
│   │   ├── ConversationHeader.js
│   │   ├── MessageList.js
│   │   ├── ReplyComposer.js
│   │   ├── AICopilot.js
│   │   └── SmartSuggestions.js
│   ├── constants/           # Static data and configuration
│   │   ├── initialData.js
│   │   └── knowledgeBase.js
│   ├── utils/              # Helper functions and utilities
│   │   ├── aiHelpers.js    # Local AI logic and knowledge base
│   │   ├── aiService.js    # External AI API integration with Axios
│   │   ├── messageUtils.js
│   │   └── formatters.js
│   ├── api/                # API routes
│   │   ├── conversations/
│   │   ├── ai/            # AI service endpoints
│   │   │   ├── local.js   # Local AI processing
│   │   │   ├── external.js # External AI API calls
│   │   │   └── hybrid.js  # Combined AI approach
│   │   └── suggestions/
│   ├── globals.css         # Global styles
│   ├── layout.js          # Root layout component
│   └── page.js            # Main application page
├── public/                 # Static assets
├── .env.local             # Environment variables
├── .gitignore
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
├── package.json
└── README.md
```

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build the application for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test:ai` | Test AI integration (local and API modes) |
| `npm run setup:ai` | Configure AI service connections |

### Development Scripts for AI Testing

```bash
# Test local AI responses
npm run test:ai:local

# Test external AI API integration
npm run test:ai:api

# Test hybrid AI mode
npm run test:ai:hybrid

# Validate AI configuration
npm run validate:ai-config
```

## 🔧 Configuration

### AI Mode Configuration

The application supports three AI modes that can be configured via environment variables:

```javascript
// AI Mode Options
const AI_MODES = {
  LOCAL: 'local',    // Uses local knowledge base (current default)
  API: 'api',        // Uses external AI APIs via Axios
  HYBRID: 'hybrid'   // Combines both approaches
};
```

#### Local Mode (Current Implementation)
- Uses predefined knowledge base and response templates
- No external API calls required
- Fast response times
- Works offline
- Limited to predefined responses

```javascript
// Example local AI configuration
const localAI = {
  knowledgeBase: './constants/knowledgeBase.js',
  responseTemplates: './constants/responseTemplates.js',
  fallbackResponses: true
};
```

#### API Mode (Future Implementation)
- Integrates with external AI services using Axios
- Dynamic response generation
- Advanced natural language processing
- Requires internet connection and API keys
- More intelligent and contextual responses

```javascript
// Example API configuration with Axios
const apiConfig = {
  baseURL: process.env.AI_SERVICE_URL,
  timeout: 10000,
  retries: 3,
  fallbackToLocal: true
};
```

#### Hybrid Mode (Recommended for Production)
- Combines local knowledge base with AI APIs
- Falls back to local responses if API fails
- Best of both worlds approach
- Optimal performance and reliability

### TailwindCSS Configuration

The project uses TailwindCSS 4 with custom configurations:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#64748B',
        accent: '#F59E0B'
      }
    }
  }
}
```

### AI Integration

The application supports flexible AI integration with multiple approaches:

#### Current Implementation (Local AI)
- **Local Knowledge Base**: Predefined responses and templates
- **Fast Processing**: No network latency
- **Offline Capability**: Works without internet
- **Reliable**: No dependency on external services

#### Future Implementation (External AI APIs)
The application is designed to seamlessly integrate with external AI services:

```javascript
// AI Service Integration with Axios
import axios from 'axios';

const aiService = axios.create({
  baseURL: process.env.AI_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Supported AI Providers
const AI_PROVIDERS = {
  OPENAI: 'OpenAI GPT-4',
  ANTHROPIC: 'Claude',
  GOOGLE: 'Gemini',
  CUSTOM: 'Custom AI Endpoint'
};
```

#### AI Features Available
- **Response Generation**: Context-aware reply suggestions
- **Content Summarization**: Automatic conversation summaries  
- **Smart Suggestions**: Intelligent quick responses
- **Context Analysis**: Understanding conversation flow
- **Sentiment Detection**: Emotional tone analysis
- **Language Translation**: Multi-language support (with AI APIs)

## 🎨 Key Components

### ConversationList
Displays all conversations with real-time updates and unread indicators.

### AICopilot
Provides intelligent response suggestions and conversation insights with dual-mode operation:

**Local Mode Features:**
- Predefined response templates
- Quick suggestion matching
- Offline functionality
- Instant response times

**API Mode Features (Future):**
- Dynamic response generation via Axios
- Context-aware suggestions
- Advanced language understanding
- Real-time learning capabilities

### ReplyComposer
Advanced text editor with AI-powered suggestions and formatting tools, supporting both local and API-based AI assistance.

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Desktop** (1024px and above)
- **Tablet** (768px - 1023px)
- **Mobile** (below 768px)

Key mobile features:
- Touch-optimized navigation
- Swipe gestures for actions
- Optimized layouts for small screens
- Fast loading on mobile networks

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

```bash
npm install -g vercel
vercel --prod
```

### Other Platforms

The application can be deployed on:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **DigitalOcean App Platform**

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests  
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage

# AI-specific testing
npm run test:ai:local      # Test local AI responses
npm run test:ai:api        # Test external AI API calls
npm run test:ai:fallback   # Test fallback mechanisms
npm run test:axios         # Test HTTP client functionality
```

### AI Testing Scenarios

The application includes comprehensive testing for AI functionality:

- **Local AI Testing**: Validates knowledge base responses
- **API Integration Testing**: Tests Axios-based AI service calls
- **Fallback Testing**: Ensures graceful degradation when APIs fail
- **Response Quality Testing**: Validates AI response appropriateness
- **Performance Testing**: Measures response times for both modes

## 🔒 Security

- **Environment variables** for sensitive data
- **Input validation** for all user inputs
- **XSS protection** with proper sanitization
- **CSRF protection** for forms
- **Rate limiting** for API endpoints

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Code Style

- Use **ESLint** and **Prettier** for consistent formatting
- Follow **React best practices**
- Use **TypeScript** for type safety
- Write **clean, readable code** with proper comments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for AI capabilities
- **Vercel** for the Next.js framework
- **Tailwind Labs** for the CSS framework
- **Framer** for animation library
- **Lucide** for beautiful icons

---
