export type Project = {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
};

// Add a new project by adding an entry here — no component changes needed.
export const projects: Project[] = [
  {
    title: "Spotify Toolbox",
    description:
      "Shows a user's top artists & tracks and builds custom playlists from their recent listening — pushes generated playlists straight to their account via the Spotify API.",
    tech: ["React", "Node.js", "Express", "Spotify API"],
    githubUrl: "https://github.com/olivervz/spotify-toolbox",
    liveUrl: "https://spotify-toolbox.web.app",
  },
  {
    title: "Task Tracker",
    description:
      "A chronological task tracker with login — add, edit and delete tasks. React front end on Firebase, Node/Express/MySQL API on Heroku.",
    tech: ["React", "Node", "Express", "MySQL", "Firebase", "Heroku"],
    githubUrl: "https://github.com/olivervz/task-tracker-app",
    liveUrl: "https://task-list-tracker.web.app/",
  },
  {
    title: "Personal Website",
    description:
      "My first crack at a portfolio site from scratch — also the first time I opened Figma. (This is the sequel.)",
    tech: ["React", "Firebase", "Figma"],
    githubUrl: "https://github.com/olivervz/oliverv",
    liveUrl: "https://oliverv.xyz",
  },
  {
    title: "Feels Like",
    description:
      "A simple weather app. Uses the OpenWeather API for conditions and the HERE Geocoder API to turn a typed location into coordinates.",
    tech: ["React", "Firebase"],
    githubUrl: "https://github.com/olivervz/feels-like",
    liveUrl: "https://feels-like.firebaseapp.com",
  },
  {
    title: "Pneumonia CNN",
    description:
      "AI term project — a convolutional neural network trained to spot bacterial and viral pneumonia in chest X-rays.",
    tech: ["Python", "Keras"],
    githubUrl: "https://github.com/olivervz/Pneumonia-Neural-Network",
    liveUrl: "/documents/Pneumonia.pdf",
  },
  {
    title: "Greenswitch",
    description:
      "NASA Space Apps 2019 project — a Flask app that uses NASA APIs to suggest the best alternative-energy option for a given latitude and longitude.",
    tech: ["Python", "Flask"],
    githubUrl: "https://github.com/olivervz/Greenswitch",
  },
];
