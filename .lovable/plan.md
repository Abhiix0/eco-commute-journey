
# Green Commute Tracker — Implementation Plan

## Design System
- Green gradient theme (emerald/green palette)
- Rounded cards with soft shadows
- Mobile-first layout (max-width container)
- Bottom sticky navigation bar with icons for Home, Track, Leaderboard, Dashboard

## Reusable Components
- **StatCard** — icon, label, value with green gradient accent
- **PrimaryButton** — green gradient, loading state, rounded
- **MapContainer** — placeholder with gradient overlay
- **LeaderboardRow** — rank, avatar, name, points, trophy for top 3
- **ModeSelector** — dropdown for transport modes with icons
- **ChartCard** — bar chart using recharts

## Pages

### 1. Home (`/`)
- App logo/icon, title "Green Commute Tracker", tagline
- Name input field
- "Start Commuting" button → navigates to tracker
- Leaf/nature decorative illustrations (CSS-based)

### 2. Commute Tracker (`/track`)
- Large map placeholder with pulsing location dot
- Timer display and live distance card
- Start/Stop commute buttons with state toggle
- "Tracking…" status indicator with animation
- Floating card UI over the map area

### 3. Trip Summary (`/summary`)
- Distance traveled stat
- Mode selector dropdown (Walk, Cycle, Bus, Metro, Bike, Car)
- Carbon saved and eco-points earned cards with animated counters
- Confetti celebration placeholder area
- "Save Trip" button

### 4. Leaderboard (`/leaderboard`)
- Top 3 podium-style highlight with trophy icons (🥇🥈🥉)
- Scrollable ranked list with user rows
- Mock data for 10 users

### 5. Dashboard (`/dashboard`)
- Three stat cards: total distance, carbon saved, eco-points
- Bar chart showing trips by transport mode (recharts)
- Recent trips list with mode icon, distance, date

## Navigation
- Bottom tab bar (sticky) on all pages except Home
- Smooth page transitions using CSS animations

## Micro Interactions
- Button hover/tap scale effects
- Card fade-in animations on page load
- Pulsing tracking indicator
- Confetti placeholder on trip save
