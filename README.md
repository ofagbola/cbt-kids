# CBT Tools for Kids 🌈✨

A bright, interactive web application designed to help children (ages 8-12) explore their thoughts, feelings, and behaviors using Cognitive Behavioral Therapy (CBT) principles in a fun, kid-friendly way.

![CBT for Kids](https://img.shields.io/badge/Age%20Range-8--12-blue) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## 🎯 What is CBT for Kids?

This application teaches children how to:
- **Identify** their thoughts and feelings
- **Recognize** unhelpful thinking patterns (cognitive distortions)
- **Practice** coping strategies and calming tools
- **Reframe** negative thoughts into helpful ones
- **Track** their progress and celebrate achievements

All presented in a **PBS Kids-inspired** design with bright colors, fun animations, and interactive games!

## ✨ Features

### 🧠 Complete CBT Journey
- **Problem Input**: Text input or category selection
- **Thought Exploration**: Identify and analyze thoughts
- **Interactive Games**: Drag-and-drop thought sorting
- **Feeling Recognition**: Emoji-based feeling picker
- **Behavior Reflection**: Plan better responses
- **Progress Tracking**: Save and review completed journeys

### 🎮 Interactive Elements
- **Thought Sorter Game**: Learn helpful vs unhelpful thoughts
- **Coping Strategy Library**: 12+ evidence-based techniques
- **Cognitive Distortion Detection**: Automatic identification of thought traps
- **Progress Tracker**: Achievement badges and journey history
- **Confetti Celebrations**: Fun rewards for completion

### 🎨 Kid-Friendly Design
- **Bright Color Palette**: Hot magenta, neon lime, bright yellow
- **Playful Animations**: Bounce, wiggle, tada, confetti effects
- **Accessible Fonts**: Fredoka and Nunito for readability
- **Emoji Integration**: Visual cues throughout the interface
- **Responsive Design**: Works on tablets, phones, and computers

### 📚 Comprehensive Content
- **8 Cognitive Distortions**: Catastrophizing, black-and-white thinking, mind reading, etc.
- **12 Coping Strategies**: Breathing, grounding, movement, thinking techniques
- **Feeling-Specific Tools**: Tailored strategies for different emotions
- **Reframing Examples**: Kid-friendly alternatives to negative thoughts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Modern web browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cbt-for-kids.git
   cd cbt-for-kids
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the application
pnpm run build

# Preview the build
pnpm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── cbt/                 # CBT-specific components
│   │   ├── CopingStrategies.tsx
│   │   ├── DragDropGame.tsx
│   │   ├── FeelingsPicker.tsx
│   │   ├── ReflectionCard.tsx
│   │   └── ThoughtTraps.tsx
│   ├── seo/                 # SEO components
│   ├── ui/                  # Reusable UI components
│   ├── BackgroundEmojiField.tsx
│   └── ProgressTracker.tsx
├── lib/
│   ├── cbt-content.ts       # CBT content library
│   ├── storage.ts           # Local storage utilities
│   └── utils.ts             # General utilities
├── pages/                   # Route components
│   ├── Index.tsx           # Home page
│   ├── Thoughts.tsx        # Thought exploration
│   ├── Game.tsx            # Thought sorting game
│   ├── Games.tsx           # Games hub
│   ├── Feelings.tsx        # Feeling selection
│   ├── Behaviors.tsx       # Behavior reflection
│   └── NotFound.tsx        # 404 page
├── assets/                 # Images and media
├── hooks/                  # Custom React hooks
└── main.tsx               # Application entry point
```

## 🎮 How to Use

### For Kids
1. **Start Your Adventure**: Enter a problem or choose a category
2. **Explore Your Thoughts**: Write down what you're thinking
3. **Play the Game**: Sort helpful vs unhelpful thoughts
4. **Pick Your Feelings**: Choose emojis that match your emotions
5. **Try Calming Tools**: Practice coping strategies
6. **Make a Plan**: Think about what you'll do differently next time
7. **Celebrate**: See your progress and achievements!

### For Parents/Teachers
- **Supervised Use**: Best used with adult guidance initially
- **Privacy**: All data stays in the child's browser (local storage)
- **Educational**: Teaches valuable emotional regulation skills
- **Evidence-Based**: Uses proven CBT techniques adapted for children

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint

# Package management
pnpm install          # Install dependencies
pnpm update           # Update dependencies
```

### Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom animations
- **UI Components**: Radix UI + Shadcn/ui
- **Routing**: React Router DOM
- **State Management**: React hooks + Local storage
- **Package Manager**: pnpm

### Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@radix-ui/react-*": "Latest",
  "tailwindcss": "^3.4.17",
  "canvas-confetti": "^1.9.3",
  "lucide-react": "^0.462.0"
}
```

## 🎨 Design System

### Colors
- **Primary**: Hot Magenta (`hsl(320 100% 50%)`)
- **Secondary**: Neon Lime (`hsl(90 100% 45%)`)
- **Accent**: Bright Yellow (`hsl(60 100% 50%)`)
- **Background**: Bright Turquoise (`hsl(180 100% 50%)`)

### Typography
- **Headings**: Fredoka (playful, rounded)
- **Body**: Nunito (clean, readable)
- **Sizes**: Responsive scaling from mobile to desktop

### Animations
- **Bounce**: Entry animations for cards
- **Wiggle**: Hover effects for buttons
- **Tada**: Celebration animations
- **Confetti**: Achievement rewards
- **Fade**: Smooth transitions

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

## 🔒 Privacy & Safety

### Data Storage
- **Local Only**: All data stored in browser's local storage
- **No Backend**: No data sent to external servers
- **Child Safe**: No personal information collected
- **Export/Import**: Users can backup their data

### Content Safety
- **Age Appropriate**: All content designed for ages 8-12
- **Positive Messaging**: Encouraging, supportive language
- **Evidence-Based**: CBT techniques adapted for children
- **Supervised Use**: Recommended with adult guidance

## 🚀 Deployment

### AWS Amplify (Recommended)
1. Push code to GitHub
2. Connect repository to AWS Amplify
3. Deploy automatically with CI/CD

### Manual Deployment
1. Build the application: `pnpm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure SPA routing for React Router

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **Conventional Commits**: Clear commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CBT Research**: Based on evidence-based Cognitive Behavioral Therapy
- **Child Psychology**: Adapted techniques for developmental appropriateness
- **Design Inspiration**: PBS Kids and other child-friendly interfaces
- **Open Source**: Built with amazing open-source tools and libraries

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/cbt-for-kids/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/cbt-for-kids/discussions)
- **Email**: support@cbtforkids.com (if applicable)

## 🗺️ Roadmap

### Version 1.1
- [ ] Additional cognitive distortions
- [ ] More coping strategies
- [ ] Parent/teacher dashboard
- [ ] Offline support

### Version 1.2
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] Advanced progress tracking
- [ ] Integration with educational platforms

### Version 2.0
- [ ] Mobile app (React Native)
- [ ] Backend integration
- [ ] Professional therapist tools
- [ ] Research collaboration features

---

**Made with ❤️ for kids everywhere!** 🌟

*Remember: This tool is designed to supplement, not replace, professional mental health care. If a child is experiencing significant emotional difficulties, please consult with a qualified mental health professional.*