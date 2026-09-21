export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export const cvData = {
  profile: {
    name: "Joris Guien",
    title: "Développeur Fullstack / Back-End",
    summary: "Passionné par les architectures web modernes, je suis spécialisé en développement Back-End TypeScript / Node.js. Polyvalent sur l’écosystème Full-Stack et sensibilisé aux pratiques DevOps, avec un souci constant de la qualité du code et de la sécurité.",
    contact: {
      email: "guienjoris@gmail.com",
      phone: "0663103592",
      location: "Dammarie-les-Lys (77190) / Paris",
      remote: "Télétravail ou présentiel"
    }
  },
  experiences: [
    {
      id: "exp-1",
      title: "Développeur JS/TS",
      company: "Groupe AVEC",
      location: "Paris",
      period: "De mai 2020 à juil. 2026",
      description: [
        "Développement Front-end et Back-end",
        "React (NextJS), NodeJS (NestJS)",
        "SQL/MongoDB (Postgresql)",
        "Utilisation des outils Google (GCP): Cloud Run, Kubernetes, Secret Manager, Cloud SQL, Compute Engine, App Engine",
        "CI/CD: Gitlab CI, Github CI/Actions"
      ]
    },
    {
      id: "exp-2",
      title: "Développeur web Angular - stage",
      company: "Vector Map",
      location: "Paris",
      period: "D'août 2019 à oct. 2019",
      description: [
        "Développements de composants Angular, Vector Map"
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Développeur fullstack (web & mobile) niv II RNCP",
      institution: "Simplon",
      location: "Paris",
      period: "De mars 2019 à oct. 2019",
      description: "Déploiement de site/applications comprenant le front, le back et la base de données"
    },
    {
      id: "edu-2",
      degree: "Bac Pro maintenance des équipements industriels",
      institution: "Lycée Paul Langevin",
      location: "La Seyne-sur-Mer",
      period: "2010",
      description: ""
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Opquast",
      institution: "Opquast Paris",
      period: "Depuis 2019",
      description: "Certification Qualité Web niveau Avancé"
    },
    {
      id: "cert-2",
      title: "Certification Agilité (SCRUM)",
      institution: "Simplon Paris",
      period: "Depuis 2019",
      description: ""
    }
  ],
  skills: [
    {
      category: "Gestion de versions",
      items: ["Git", "GitHub", "GitLab"]
    },
    {
      category: "Déploiement cloud",
      items: ["GCP", "AWS"]
    },
    {
      category: "Langages & Frameworks",
      items: ["React", "NextJS", "Angular", "HTML/CSS", "Node.js", "NestJS", "SQL", "PostgreSQL", "Linux"]
    }
  ],
  assets: [
    "Sociable",
    "Polyvalent",
    "Curieux - Veilles",
    "Exigeant",
    "Bonne humeur",
    "Heureux d'aider"
  ]
};
