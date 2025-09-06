<script setup>
const route = useRoute();
const expertId = route.params.uuid;

// Mock data - in real app, fetch by ID
const expert = ref({
  id: expertId,
  name: "Jean Dubois",
  jobTitle: "Développeur Full-Stack",
  city: "Montréal",
  province: "Québec",
  experience: "5 ans",
  hourlyRate: "65$/h",
  availability: "Disponible immédiatement",
  avatar: "JD",
  rating: 4.9,
  reviewsCount: 47,
  projectsCompleted: 127,
  responseTime: "2 heures",
  description: `Développeur Full-Stack passionné avec 5 ans d'expérience dans la création d'applications web modernes et performantes.

Je me spécialise dans l'écosystème JavaScript avec une expertise particulière en Vue.js, React, Node.js et les bases de données PostgreSQL. J'ai une approche méthodique du développement, privilégiant la qualité du code, les bonnes pratiques et l'expérience utilisateur.

Au cours de ma carrière, j'ai travaillé avec des startups technologiques et des entreprises établies, livrant des solutions sur mesure qui répondent aux besoins spécifiques de chaque client.`,
  skills: [
    { name: "Vue.js", level: "Expert", years: 4 },
    { name: "React", level: "Avancé", years: 3 },
    { name: "Node.js", level: "Expert", years: 5 },
    { name: "PostgreSQL", level: "Avancé", years: 4 },
    { name: "TypeScript", level: "Avancé", years: 3 },
    { name: "AWS", level: "Intermédiaire", years: 2 },
    { name: "Docker", level: "Intermédiaire", years: 2 },
    { name: "Git", level: "Expert", years: 5 },
  ],
  portfolio: [
    {
      id: 1,
      title: "Plateforme E-commerce B2B",
      description:
        "Développement complet d'une plateforme de vente B2B avec gestion des commandes, facturation et intégrations API.",
      technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe"],
      duration: "4 mois",
      year: "2024",
    },
    {
      id: 2,
      title: "Application de Gestion RH",
      description:
        "Solution complète pour la gestion des employés, absences, paies et évaluations de performance.",
      technologies: ["React", "Express.js", "MongoDB", "AWS"],
      duration: "6 mois",
      year: "2023",
    },
    {
      id: 3,
      title: "Dashboard Analytique",
      description:
        "Tableau de bord interactif pour l'analyse de données en temps réel avec graphiques dynamiques.",
      technologies: ["Vue.js", "D3.js", "Node.js", "Redis"],
      duration: "3 mois",
      year: "2023",
    },
  ],
  reviews: [
    {
      id: 1,
      client: "TechCorp Inc.",
      rating: 5,
      comment:
        "Excellent travail! Jean a livré le projet en avance et a dépassé nos attentes. Communication parfaite tout au long du projet.",
      project: "Plateforme E-commerce B2B",
      date: "2024-01-10",
    },
    {
      id: 2,
      client: "StartupXYZ",
      rating: 5,
      comment:
        "Développeur très compétent et professionnel. Code de qualité et respect des délais. Je recommande vivement!",
      project: "Application mobile",
      date: "2023-11-22",
    },
    {
      id: 3,
      client: "DigitalSolutions",
      rating: 4,
      comment:
        "Bon travail global. Jean maîtrise bien les technologies et propose de bonnes solutions techniques.",
      project: "Site web corporatif",
      date: "2023-09-15",
    },
  ],
  languages: ["Français (Natif)", "Anglais (Professionnel)"],
  education: "Baccalauréat en Informatique - Université de Montréal",
  certifications: ["AWS Certified Developer", "Vue.js Certified Developer"],
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-CA");
};

const getSkillLevelColor = (level) => {
  switch (level) {
    case "Expert":
      return "bg-green-100 text-green-800";
    case "Avancé":
      return "bg-blue-100 text-blue-800";
    case "Intermédiaire":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-neutral-100 text-neutral-800";
  }
};

const contactExpert = () => {
  alert("Fonctionnalité de contact en développement!");
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Page Header Section -->
    <PageHeader
      :title="expert.name"
      icon="material-symbols:person-search-rounded"
      :description="`${expert.jobTitle} • ${expert.city}, ${expert.province} • ${expert.hourlyRate} • ${expert.rating}/5 étoiles`"
    />

    <div class="x-container y-container">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About Section -->
          <section class="bg-blue-50 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="heroicons:user" class="w-6 h-6 text-accent" />
              <h2 class="text-xl font-bold text-black">À propos</h2>
            </div>
            <div class="text-neutral-700 leading-relaxed whitespace-pre-line">
              {{ expert.description }}
            </div>
          </section>

          <!-- Skills & Expertise -->
          <section class="bg-blue-50 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="heroicons:code-bracket" class="w-6 h-6 text-accent" />
              <h2 class="text-xl font-bold text-black">
                Compétences & Expertise
              </h2>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="skill in expert.skills"
                :key="skill.name"
                class="flex items-center justify-between p-3 bg-white rounded-md"
              >
                <div>
                  <div class="font-bold text-black">{{ skill.name }}</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Hire Expert -->
          <div class="bg-blue-50 rounded-lg p-6 text-center">
            <div class="text-3xl font-bold text-accent mb-2">$$</div>
          </div>

          <!-- Professional Info -->
          <div class="bg-blue-50 rounded-lg p-6">
            <h3 class="flex items-center gap-2 font-bold text-black mb-4">
              <Icon
                name="heroicons:information-circle"
                class="w-5 h-5 text-accent"
              />
              Informations professionnelles
            </h3>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <Icon
                  name="heroicons:map-pin"
                  class="w-5 h-5 text-neutral-400 mt-0.5"
                />
                <div>
                  <div class="text-sm text-neutral-600">Localisation</div>
                  <div class="font-medium">
                    {{ expert.city }}, {{ expert.province }}
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <Icon
                  name="heroicons:clock"
                  class="w-5 h-5 text-neutral-400 mt-0.5"
                />
                <div>
                  <div class="text-sm text-neutral-600">Expérience</div>
                  <div class="font-medium">{{ expert.experience }}</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <Icon
                  name="heroicons:language"
                  class="w-5 h-5 text-neutral-400 mt-0.5"
                />
                <div>
                  <div class="text-sm text-neutral-600">Langues</div>
                  <div class="font-medium">
                    <div
                      v-for="language in expert.languages"
                      :key="language"
                      class="text-sm"
                    >
                      {{ language }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <Icon
                  name="heroicons:academic-cap"
                  class="w-5 h-5 text-neutral-400 mt-0.5"
                />
                <div>
                  <div class="text-sm text-neutral-600">Formation</div>
                  <div class="font-medium text-sm leading-relaxed">
                    {{ expert.education }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div class="bg-blue-50 rounded-lg p-6">
            <h3 class="flex items-center gap-2 font-bold text-black mb-4">
              <Icon name="heroicons:shield-check" class="w-5 h-5 text-accent" />
              Certifications
            </h3>
            <div class="space-y-3">
              <div
                v-for="cert in expert.certifications"
                :key="cert"
                class="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg"
              >
                <Icon
                  name="heroicons:check-badge"
                  class="w-5 h-5 text-green-600"
                />
                <span class="text-sm font-medium">{{ cert }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
