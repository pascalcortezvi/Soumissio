<script setup>
// Mock data for recent experts
const recentExperts = ref([
  {
    id: 1,
    name: "Alexandre M.",
    jobType: "Développeur Full-Stack",
    city: "Montréal",
    hourlyRate: "70$/h",
    avatar: "AM",
    skills: ["Vue.js", "Laravel", "MySQL"],
    joinedDate: "2024-01-20",
  },
  {
    id: 2,
    name: "Sarah L.",
    jobType: "Designer UX/UI",
    city: "Québec",
    hourlyRate: "60$/h",
    avatar: "SL",
    skills: ["Figma", "Adobe XD", "Sketch"],
    joinedDate: "2024-01-19",
  },
  {
    id: 3,
    name: "David T.",
    jobType: "Développeur Mobile",
    city: "Laval",
    hourlyRate: "65$/h",
    avatar: "DT",
    skills: ["React Native", "Swift", "Kotlin"],
    joinedDate: "2024-01-18",
  },
  {
    id: 4,
    name: "Emma R.",
    jobType: "Data Scientist",
    city: "Sherbrooke",
    hourlyRate: "75$/h",
    avatar: "ER",
    skills: ["Python", "TensorFlow", "SQL"],
    joinedDate: "2024-01-17",
  },
]);
</script>

<template>
  <section class="py-16 bg-blue-50">
    <div class="x-container">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-black mb-4">
          Experts récemment inscrits
        </h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
          Découvrez les derniers talents qui ont rejoint notre plateforme
        </p>
      </div>

      <!-- Experts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <NuxtLink
          v-for="expert in recentExperts"
          :key="expert.id"
          :to="`/expert/${expert.id}`"
          class="block bg-white rounded-lg p-6 group"
        >
          <!-- Avatar and Header -->
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-main text-white rounded-full flex items-center justify-center font-medium"
            >
              {{ expert.avatar }}
            </div>
            <div class="ml-3">
              <h3 class="font-bold text-black group-hover:underline">
                {{ expert.name }}
              </h3>
              <p class="text-sm text-neutral-600">{{ expert.jobType }}</p>
            </div>
          </div>

          <!-- Details -->
          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-neutral-600">Ville:</span>
              <span class="font-medium">{{ expert.city }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-neutral-600">Tarif:</span>
              <span class="font-bold text-accent">{{ expert.hourlyRate }}</span>
            </div>
          </div>

          <!-- Skills -->
          <div class="mb-4">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="skill in expert.skills.slice(0, 3)"
                :key="skill"
                class="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Join Date -->
          <div class="text-xs text-neutral-500">
            Inscrit le
            {{ new Date(expert.joinedDate).toLocaleDateString("fr-CA") }}
          </div>
        </NuxtLink>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-14">
        <NuxtLink to="/experts" class="accent-button py-3 px-8">
          Voir tous les experts
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
