# 🗺️ CBT Kids - User Flow Diagram

## Complete User Journey Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LANDING PAGE                                │
│                    "How are you feeling today?"                     │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    MOOD ASSESSMENT (Emoji Selection)                │
│                                                                      │
│   😊 Happy    😐 Neutral    😔 Sad    😰 Worried    😡 Angry       │
└──────┬────────────────────┬─────────────────────────────────────────┘
       │                    │
       │ Happy              │ Sad/Neutral/Worried/Angry
       ▼                    ▼
┌──────────────┐    ┌────────────────────────────────────────┐
│ CALM CORNER  │    │   SCENARIO CAROUSEL (Auto-Rotating)    │
│   or GAMES   │    │                                        │
│              │    │  📚 20 Problem-Solving Scenarios       │
│ • Breathing  │    │  • Auto-rotates every 2 seconds        │
│ • Meditation │    │  • Left/Right arrow navigation         │
│ • Music      │    │  • 3 cards visible (desktop)           │
│ • Activities │    │                                        │
└──────────────┘    └──────────┬─────────────────────────────┘
                               │
                               │ User selects scenario
                               ▼
                    ┌──────────────────────────┐
                    │   CBT CHATBOT OPENS      │
                    │   (Modal Interface)      │
                    └──────────┬───────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     CBT CONVERSATION FLOW                           │
│                                                                      │
│  STEP 1: THOUGHTS                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Bot: "What are you thinking about this situation?"          │  │
│  │ User: Types their thoughts                                  │  │
│  │ Bot: Detects cognitive distortions (if any)                 │  │
│  │      • Catastrophizing                                      │  │
│  │      • Black-and-white thinking                             │  │
│  │      • Mind reading                                         │  │
│  │      • Fortune telling                                      │  │
│  │      • Should statements                                    │  │
│  │      • Labeling                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                             ⬇️                                       │
│  STEP 2: FEELINGS                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Bot: "How does this thought make you feel?"                 │  │
│  │ User: Selects or types feeling                              │  │
│  │ Bot: Validates emotion and provides empathy                 │  │
│  │      😡 Angry  😰 Anxious  😢 Sad  😊 Happy                 │  │
│  │      😴 Tired  😖 Confused                                  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                             ⬇️                                       │
│  STEP 3: BEHAVIORS                                                  │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Bot: "How did you respond to this situation?"               │  │
│  │ User: Describes their action/behavior                       │  │
│  │ Bot: Acknowledges without judgment                          │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                             ⬇️                                       │
│  STEP 4: COPING STRATEGIES                                          │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Bot: Suggests personalized coping strategies                │  │
│  │      • 5-4-3-2-1 Grounding                                  │  │
│  │      • Butterfly Hugs                                       │  │
│  │      • Box Breathing                                        │  │
│  │      • Thought Reframing                                    │  │
│  │      • And more based on the feeling identified             │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               │ Conversation complete
                               ▼
                    ┌──────────────────────────┐
                    │   NEXT ACTIONS           │
                    │                          │
                    │ • Try another scenario   │
                    │ • Practice strategies    │
                    │ • Visit Calm Corner      │
                    │ • Write in Journal       │
                    │ • Play learning games    │
                    └──────────────────────────┘
```

---

## Alternative Entry Points

### Chat Bar (Available Everywhere)
```
┌─────────────────────────────────────────────────────────────┐
│  💬 Chat Bar: "Write or say how you feel..."                │
│                                                              │
│  User types: "I'm worried about school tomorrow"            │
└─────────────────────┬────────────────────────────────────────┘
                      │
                      │ AI matches to scenario
                      ▼
            ┌──────────────────────┐
            │  Auto-selects:       │
            │  "I feel anxious"    │
            │  😰 scenario         │
            └──────────┬───────────┘
                       │
                       │ Opens CBT Chat
                       ▼
              [CBT Conversation Flow]
```

### Quick Suggestions
```
┌─────────────────────────────────────────────────────────────┐
│  💡 Quick Suggestions (in Chat Bar)                         │
│                                                              │
│  😰 "I'm worried about school tomorrow"                     │
│  😡 "I had a fight with my friend"                          │
│  😔 "I made a mistake and feel bad"                         │
│  😵 "I feel overwhelmed with homework"                      │
│  😢 "I'm sad about something"                               │
│  😤 "I'm angry at my sibling"                               │
└─────────────────────┬────────────────────────────────────────┘
                      │ Click to auto-populate
                      ▼
              [Matched to scenario]
                      │
                      ▼
              [CBT Conversation Flow]
```

---

## Navigation Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                         SIDEBAR MENU                                │
│                                                                      │
│  🏠 Home          → Main page with mood assessment                  │
│  🎮 Games         → Educational CBT games                           │
│  📚 Lessons       → CBT learning modules                            │
│  ⚙️  Settings      → Audio, Animations, Preferences                 │
│                                                                      │
│  ADDITIONAL LINKS:                                                  │
│  • Welcome        → Onboarding and introduction                     │
│  • Calm Corner    → Relaxation and wellness tools                   │
│  • Journal        → Reflection and progress tracking                │
│  • Thoughts       → TEA framework - Thoughts                        │
│  • Emotions       → TEA framework - Emotions                        │
│  • Actions        → TEA framework - Actions                         │
│  • Help           → Support and resources                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## User Personas & Paths

### 🎯 Persona 1: Anxious Amy (8 years old)
**Goal:** Manage school anxiety

```
Entry → Mood: 😰 Worried 
     → Carousel: Selects "I'm scared about school" 
     → Chatbot: Shares thoughts "I think I'll fail the test"
     → Identifies: Catastrophizing distortion
     → Feeling: Anxious 😰
     → Strategy: 5-4-3-2-1 Grounding + Deep breathing
     → Outcome: Feels calmer, has tools to use tomorrow
```

### 🎯 Persona 2: Frustrated Felix (10 years old)
**Goal:** Handle homework frustration

```
Entry → Chat Bar: Types "I can't figure out my homework"
     → Auto-matched: "I feel frustrated" 😤
     → Chatbot: Explores thoughts and feelings
     → Identifies: Overwhelmed feeling
     → Strategy: Break it down + Ask for help
     → Outcome: Has actionable plan
```

### 🎯 Persona 3: Lonely Luna (9 years old)
**Goal:** Cope with feeling left out

```
Entry → Mood: 😔 Sad
     → Carousel: Auto-rotates to "I feel left out" (perfect match!)
     → Chatbot: Shares experience "No one picked me for the team"
     → Identifies: Mind reading ("They must not like me")
     → Reframe: "Maybe they didn't see me raise my hand"
     → Strategy: Talk to someone + Write in journal
     → Outcome: Feels validated, has coping plan
```

### 🎯 Persona 4: Happy Hannah (7 years old)
**Goal:** Maintain good mood

```
Entry → Mood: 😊 Happy
     → Routed to: Calm Corner
     → Activities: Fun wellness games, breathing exercises, music
     → Outcome: Reinforces positive habits
```

---

## Timing & Interactions

### Carousel Auto-Rotation
- **Speed:** 2 seconds per rotation
- **Direction:** Left to right
- **Loop:** Returns to start after last scenario
- **Manual Override:** User can click arrows or cards to stop auto-rotation
- **Pause on Hover:** Auto-rotation pauses when user hovers over cards

### Chatbot Response Time
- **User sends message:** Immediate acknowledgment
- **Bot typing indicator:** 1 second delay (feels natural)
- **Suggestions appear:** 0.5 seconds after response
- **Smooth animations:** All transitions < 300ms

---

## Data Flow

```
User Input (Text/Voice/Emoji)
           │
           ▼
  Keyword Matching Algorithm
           │
           ├─→ Exact match: Direct to scenario
           │
           ├─→ Keyword match: Suggest closest scenario
           │
           └─→ No match: Create custom scenario
                          │
                          ▼
                  CBT Conversation
                          │
                          ├─→ Detect cognitive distortions
                          │
                          ├─→ Identify emotions
                          │
                          ├─→ Suggest coping strategies
                          │
                          ▼
                  Save to localStorage
                          │
                          ├─→ Journey history
                          │
                          ├─→ Favorite strategies
                          │
                          └─→ Progress metrics
```

---

## Accessibility Considerations

### Keyboard Navigation
```
Tab       → Navigate between elements
Enter     → Select scenario / Send message
Arrow ←→  → Manual carousel navigation
Esc       → Close chatbot modal
```

### Screen Reader Support
- All emojis have ARIA labels
- Buttons have descriptive text
- Form inputs have labels
- Modal has proper ARIA attributes

### Visual Accessibility
- High contrast colors
- Large, readable fonts
- Clear focus indicators
- No reliance on color alone

---

## Success Metrics

**User completes a full CBT journey when they:**
1. ✅ Select or express a problem/feeling
2. ✅ Engage with chatbot (min 3 messages)
3. ✅ Identify at least one thought
4. ✅ Recognize a feeling
5. ✅ Receive coping strategy suggestion
6. ✅ Journey saved to localStorage

**Average journey time:** 5-10 minutes
**Re-engagement rate:** Users can start multiple journeys

---

**Document Version:** 1.0  
**Last Updated:** October 10, 2025  
**Status:** ✅ Production Ready

