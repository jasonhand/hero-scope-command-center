# HeroScope Command Center

A real-time superhero operations management simulation game built with React, TypeScript, and modern web technologies.

**Demo: [HeroScope](https://hero-scope-command-center.lovable.app/)**

## 🎮 What is HeroScope?

HeroScope is an interactive command center simulation where you monitor a city's safety through advanced signal analysis and deploy superheroes strategically. You'll analyze real-time city metrics, distinguish real threats from noise, and make data-driven decisions to protect the city.

### Core Concept
You are the commander of a superhero operations center, responsible for:
- **Monitoring** city metrics in real-time (crime rates, power grid fluctuations, seismic activity, etc.)
- **Investigating** anomalies using limited investigation tokens
- **Deploying** heroes strategically based on threat analysis
- **Managing** turn-based operations with time pressure

## 🚀 Features

### Real-time Monitoring Dashboard
- **City Metrics**: Track 6 different city metrics with live data visualization
- **Anomaly Detection**: Identify unusual patterns and potential threats
- **Trend Analysis**: Monitor changes and correlations with hero deployments
- **Threat Assessment**: Evaluate severity levels and response priorities

### Hero Management System
- **Hero Roster**: Manage a diverse team of superheroes with unique abilities
- **Power Statistics**: View detailed hero stats (intelligence, strength, speed, etc.)
- **Strategic Deployment**: Deploy heroes to specific zones based on threat analysis
- **Cooldown System**: Manage hero availability and recovery times

### Game Mechanics
- **Turn-based Gameplay**: Strategic decision-making with time limits
- **Investigation Tokens**: Limited resources for deep-diving into metrics
- **Score System**: Track your performance and decision accuracy
- **Alert System**: Real-time notifications for threats and system updates

### User Experience
- **Responsive Design**: Optimized for desktop and tablet use
- **Interactive Tutorial**: Onboarding tour for new players
- **Modern UI**: Sleek, sci-fi inspired interface with smooth animations
- **Real-time Updates**: Live data feeds and dynamic content

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Context with useReducer
- **Data Visualization**: Recharts for metric charts
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Hero Data**: SuperHero API integration

## 🎯 How to Play

1. **Start the Game**: Click "Enter Operations Center" to begin
2. **Monitor Metrics**: Watch the city metrics dashboard for anomalies
3. **Investigate Threats**: Use investigation tokens to analyze suspicious patterns
4. **Deploy Heroes**: Assign heroes to zones based on threat analysis
5. **Manage Time**: Make decisions within the turn timer
6. **Progress**: Advance through turns and improve your score

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hero-scope-command-center.git
   cd hero-scope-command-center
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start playing

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🎨 Customization

### Adding New Metrics
Edit `src/utils/dataGeneration.ts` to add new city metrics with custom patterns and correlations.

### Hero Integration
The game integrates with the SuperHero API to fetch real hero data. You can modify the hero selection logic in `src/contexts/GameContext.tsx`.

### UI Themes
Customize the visual theme by modifying the Tailwind configuration in `tailwind.config.ts`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **SuperHero API**: For providing hero data and images
- **Shadcn/ui**: For the excellent component library
- **Radix UI**: For accessible UI primitives
- **Recharts**: For beautiful data visualizations

---

**Ready to save the city? Enter the HeroScope Command Center and prove your strategic prowess!** 🦸‍♂️🦸‍♀️
