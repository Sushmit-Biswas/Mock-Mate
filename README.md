<div align="center">
  <img src="public/web_banner.png" alt="MockMate Banner" width="100%">
  <h1>✨ MockMate: AI-Powered Interview Preparation Platform ✨</h1>
</div>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-cyan?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-SDK_v9+-orange?logo=firebase&logoColor=white)](https://firebase.google.com/)
  [![Vapi AI](https://img.shields.io/badge/Vapi-AI_Voice-lightgrey)](https://vapi.ai/)
  [![Deployment](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)
</div>

---

<p align="center">
  🚀 <b>Welcome to MockMate!</b> Master your interview skills with our intelligent AI interviewer that delivers personalized feedback. From technical challenges to behavioral questions, we've got you covered! 🤖💼
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •   
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-folder-structure">Folder Structure</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-testimonials">Testimonials</a> •
  <a href="#-faqs">FAQs</a> •
  <a href="#-license">License</a>
</p>

---

## 🌟 Overview

MockMate is a comprehensive interview preparation platform that simulates realistic interview scenarios using advanced AI technology. Users can select from various interview types (technical, behavioral, role-specific), engage in natural voice conversations with our AI interviewer, and receive immediate, detailed feedback on their performance.

With a focus on accessibility and user experience, MockMate helps candidates build confidence, improve their responses, and track progress over time - all in a stress-free environment.

---

## ✨ Key Features

<table>
  <tr>
    <td>
      <h3>🗣️ AI-Powered Interviews</h3>
      Engage in realistic voice conversations with our advanced AI interviewer, powered by Vapi technology.
    </td>
    <td>
      <h3>🧠 Multiple Interview Types</h3>
      Practice for technical, behavioral, leadership, and role-specific interviews across various industries.
    </td>
  </tr>
  <tr>
    <td>
      <h3>📈 Instant Feedback</h3>
      Receive detailed analysis of your answers with metrics on clarity, relevance, technical accuracy, and more.
    </td>
    <td>
      <h3>📝 Resume Checker</h3>
      Get AI-powered resume analysis and optimization suggestions tailored to your target roles.
    </td>
  </tr>
  <tr>
    <td>
      <h3>🧐 Interview Guides</h3>
      Access comprehensive resources covering common questions, strategies, and industry-specific tips.
    </td>
    <td>
      <h3>🔒 Secure Authentication</h3>
      Your data is protected with Firebase Authentication and secure cloud storage.
    </td>
  </tr>
  <tr>
    <td>
      <h3>🎨 Modern UI</h3>
      Enjoy a clean, responsive interface built with Tailwind CSS and Shadcn components.
    </td>
    <td>
      <h3>💾 Interview History</h3>
      Track your progress over time with detailed history and improvement analytics.
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <h3>⚙️ Customizable Settings</h3>
      Tailor interview difficulty, focus areas, and feedback depth to your specific needs and goals.
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" alt="Next.js" width="20" height="20"/>
*   **Language:** [TypeScript](https://www.typescriptlang.org/) <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="20" height="20"/>
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) <img src="https://camo.githubusercontent.com/f36990f11f932129fd60e5d06de1d4340057f62caddd151453609d6ad28b069f/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f7461696c77696e644373732e737667" alt="Tailwind CSS" width="20" height="20"/>
*   **Backend & Auth:** [Firebase (Auth, Firestore)](https://firebase.google.com/) <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" alt="Firebase" width="20" height="20"/>
*   **AI Voice Agent:** [Vapi](https://vapi.ai/)
*   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
*   **Deployment:** Vercel

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sushmit-Biswas/hack-nite.git
    cd hack-nite
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add the necessary environment variables. Required keys:
    ```plaintext
    # Firebase Configuration (obtain from your Firebase project console)
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
    
    # For Firebase Admin SDK (used in backend functions/API routes)
    FIREBASE_PRIVATE_KEY=
    FIREBASE_CLIENT_EMAIL=
    FIREBASE_PROJECT_ID=

    # Vapi Configuration (obtain from Vapi dashboard)
    NEXT_PUBLIC_VAPI_WEB_TOKEN=
    NEXT_PUBLIC_VAPI_WORKFLOW_ID=

    # Google AI Studio Configuration
    GOOGLE_GENERATIVE_AI_API_KEY=
    ```
    *Note: Ensure Firebase Admin SDK setup is correctly configured if used in API routes.*

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to experience MockMate! 🎉

---

## 📁 Folder Structure (Simplified)

```
hack-nite/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/           # Authentication pages (Sign In, Sign Up)
│   ├── (root)/           # Main application pages (Dashboard, Interview)
│   └── api/              # API endpoints (e.g., Vapi integration)
├── components/           # Reusable UI components (Shadcn/ui, custom)
├── constants/            # Application constants (e.g., navigation links)
├── firebase/             # Firebase configuration (client, admin SDK)
├── lib/                  # Utility functions, SDKs, actions (server/client)
├── public/               # Static assets (images, icons)
├── types/                # TypeScript type definitions
├── .env.local            # Local environment variables (Gitignored)
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```


---


## ❓ FAQs

<details>
  <summary><b>Is MockMate free to use?</b></summary>
  <p>MockMate offers both free and premium plans. The free plan gives you limited access to interview types and feedback features. Our premium plans unlock all interview types, unlimited sessions, detailed analytics, and priority support.</p>
</details>

<details>
  <summary><b>What types of interviews does MockMate support?</b></summary>
  <p>MockMate supports various interview types including technical interviews for software engineers, behavioral interviews, leadership/management interviews, and role-specific interviews for positions in marketing, sales, finance, and more.</p>
</details>

<details>
  <summary><b>How does MockMate's AI understand and evaluate my answers?</b></summary>
  <p>MockMate uses advanced natural language processing models to analyze your responses based on content relevance, structure, clarity, and technical accuracy (for technical interviews). The AI is trained on thousands of successful interview responses and industry best practices.</p>
</details>

<details>
  <summary><b>Can I use MockMate on mobile devices?</b></summary>
  <p>Yes, MockMate is fully responsive and works on mobile devices. However, for the best interview simulation experience, we recommend using a desktop or laptop computer with a stable internet connection.</p>
</details>

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes tests where applicable.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

* Inspiration from similar AI interview platforms.
* Thanks to the creators of the libraries and tools used.
* Shoutout to the Hackathon organizers/community.

---

<div align="center">
  <p>Made with ❤️ and lots of ☕ by <code>Sushmit Biswas</code> from Team <code>NexusKnight</code></p>
  <p>
    <a href="https://github.com/Sushmit-Biswas">GitHub</a> •
    <a href="https://www.linkedin.com/in/sushmit-biswas">LinkedIn</a> •
    <a href="https://x.com/Sushmit__Biswas">X</a>
  </p>
</div>