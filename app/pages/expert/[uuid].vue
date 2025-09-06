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

    <div class="x-container py-8">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div
          class="bg-white border border-neutral-200 rounded-lg p-4 text-center"
        >
          <div class="text-2xl font-bold text-black">
            {{ expert.rating }}
          </div>
          <div class="text-sm text-neutral-600">Note moyenne</div>
        </div>
        <div
          class="bg-white border border-neutral-200 rounded-lg p-4 text-center"
        >
          <div class="text-2xl font-bold text-black">
            {{ expert.reviewsCount }}
          </div>
          <div class="text-sm text-neutral-600">Évaluations</div>
        </div>
        <div
          class="bg-white border border-neutral-200 rounded-lg p-4 text-center"
        >
          <div class="text-2xl font-bold text-black">
            {{ expert.projectsCompleted }}
          </div>
          <div class="text-sm text-neutral-600">Projets complétés</div>
        </div>
        <div
          class="bg-white border border-neutral-200 rounded-lg p-4 text-center"
        >
          <div class="text-2xl font-bold text-black">
            {{ expert.responseTime }}
          </div>
          <div class="text-sm text-neutral-600">Temps de réponse</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About Section -->
          <section class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="heroicons:user" class="w-6 h-6 text-accent" />
              <h2 class="text-xl font-bold text-black">À propos</h2>
            </div>
            <div class="text-neutral-700 leading-relaxed whitespace-pre-line">
              {{ expert.description }}
            </div>
          </section>

          <!-- Skills & Expertise -->
          <section class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="heroicons:code-bracket" class="w-6 h-6 text-accent" />
              <h2 class="text-xl font-bold text-black">
                Compétences & Expertise
              </h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="skill in expert.skills"
                :key="skill.name"
                class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border"
              >
                <div>
                  <div class="font-bold text-black">{{ skill.name }}</div>
                  <div class="text-xs text-neutral-600">
                    {{ skill.years }} an{{ skill.years > 1 ? "s" : "" }}
                  </div>
                </div>
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getSkillLevelColor(skill.level)"
                >
                  {{ skill.level }}
                </span>
              </div>
            </div>
          </section>

          <!-- Portfolio Projects -->
          <section class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="heroicons:briefcase" class="w-6 h-6 text-accent" />
              <h2 class="text-xl font-bold text-black">Portfolio</h2>
            </div>
            <div class="space-y-4">
              <div
                v-for="project in expert.portfolio"
                :key="project.id"
                class="border border-neutral-200 rounded-lg p-4 bg-neutral-50"
              >
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-lg font-bold text-black">
                    {{ project.title }}
                  </h3>
                  <div class="text-right text-sm text-neutral-600">
                    <div>{{ project.year }}</div>
                    <div>{{ project.duration }}</div>
                  </div>
                </div>
                <p class="text-neutral-700 mb-3 leading-relaxed">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="px-3 py-1 bg-main text-white text-xs rounded-full font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Client Reviews -->
          <section class="bg-white border border-neutral-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon
                name="heroicons:chat-bubble-left-ellipsis"
                class="w-6 h-6 text-accent"
              />
              <h2 class="text-xl font-bold text-black">Évaluations clients</h2>
            </div>
            <div class="space-y-4">
              <div
                v-for="review in expert.reviews"
                :key="review.id"
                class="border border-neutral-200 rounded-lg p-4 bg-neutral-50"
              >
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="font-bold text-black">
                      {{ review.client }}
                    </h4>
                    <div class="flex items-center gap-2 mt-1">
                      <div class="flex items-center">
                        <Icon
                          v-for="i in 5"
                          :key="i"
                          name="heroicons:star"
                          :class="
                            i <= review.rating
                              ? 'text-yellow-500'
                              : 'text-neutral-300'
                          "
                          class="w-4 h-4"
                        />
                      </div>
                      <span class="text-sm text-neutral-600"
                        >{{ review.rating }}/5</span
                      >
                    </div>
                  </div>
                  <span class="text-sm text-neutral-500">{{
                    formatDate(review.date)
                  }}</span>
                </div>
                <p class="text-neutral-700 mb-2 leading-relaxed">
                  {{ review.comment }}
                </p>
                <div class="text-sm text-accent font-medium">
                  {{ review.project }}
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Hire Expert -->
          <div
            class="bg-white border border-neutral-200 rounded-lg p-6 text-center"
          >
            <div class="mb-4">
              <div class="text-3xl font-bold text-accent mb-2">
                {{ expert.hourlyRate }}
              </div>
              <div class="text-sm text-neutral-600">
                {{ expert.availability }}
              </div>
            </div>

            <div class="space-y-3">
              <button
                @click="contactExpert"
                class="w-full black-button py-4 text-lg"
              >
                <Icon name="heroicons:envelope" class="w-5 h-5 inline mr-2" />
                Contacter
              </button>
              <button class="w-full outline-button py-3">
                <Icon name="heroicons:plus" class="w-4 h-4 inline mr-2" />
                Inviter pour un projet
              </button>
            </div>
          </div>

          <!-- Professional Info -->
          <div class="bg-white border border-neutral-200 rounded-lg p-6">
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
          <div class="bg-white border border-neutral-200 rounded-lg p-6">
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

          <!-- Navigation -->
          <div class="bg-white border border-neutral-200 rounded-lg p-4">
            <NuxtLink
              to="/experts"
              class="flex items-center justify-center gap-2 w-full outline-button py-3"
            >
              <Icon name="heroicons:arrow-left" class="w-4 h-4" />
              Retour aux experts
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
