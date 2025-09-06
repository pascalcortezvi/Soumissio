<template>
  <footer class="bg-main text-white">
    <!-- Main Footer Content -->
    <div class="x-container py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <Icon name="game-icons:fleur-de-lys" class="text-2xl text-white" />
            <h3 class="text-2xl font-bold">SOUMISSIO</h3>
          </div>
          <p class="text-white/80 mb-6 leading-relaxed">
            Soumissio est la référence québécoise pour trouver des experts en
            technologies de l’information. Nous connectons les entreprises aux
            meilleurs talents IT pour assurer le succès de vos projets.
          </p>
        </div>

        <!-- Platform Links -->
        <div>
          <h4 class="text-lg font-bold mb-6">Plateforme</h4>
          <div class="space-y-3">
            <NuxtLink
              to="/experts"
              class="block text-white/80 hover:text-white transition-colors"
            >
              Trouver un expert
            </NuxtLink>
            <NuxtLink
              to="/contracts"
              class="block text-white/80 hover:text-white transition-colors"
            >
              Parcourir les contrats
            </NuxtLink>
            <NuxtLink
              to="/membership"
              class="block text-white/80 hover:text-white transition-colors"
            >
              Devenir membre Premium
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block text-white/80 hover:text-white transition-colors"
            >
              Comment ça marche
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block text-white/80 hover:text-white transition-colors"
            >
              Tarification
            </NuxtLink>
          </div>
        </div>

        <!-- Support Links -->
        <div>
          <h4 class="text-lg font-bold mb-6">Support</h4>
          <div class="space-y-3">
            <NuxtLink
              to="/"
              class="block text-white/80 hover:text-white transition-colors"
            >
              Centre d'aide
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block text-white/80 hover:text-white transition-colors"
            >
              Nous contacter
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block text-white/80 hover:text-white transition-colors"
            >
              Guides & Tutoriels
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block text-white/80 hover:text-white transition-colors"
            >
              FAQ
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block text-white/80 hover:text-white transition-colors"
            >
              Statut du service
            </NuxtLink>
          </div>
        </div>

        <!-- Newsletter Signup -->
        <div>
          <h4 class="text-lg font-bold mb-6">Restez informé</h4>
          <p class="text-white/80 mb-4 text-sm">
            Recevez les dernières opportunités et conseils pour experts.
          </p>

          <form class="space-y-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              class="w-full px-4 py-3 bg-white rounded-md text-dark placeholder-neutral-400 outline-none"
            />
            <button type="submit" class="white-button w-full">S'abonner</button>
          </form>

          <p class="text-xs text-white/60 mt-3">
            En vous abonnant, vous acceptez notre politique de confidentialité.
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10">
      <div class="x-container py-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <!-- Copyright -->
          <div class="text-white/80 text-sm">
            © 2025 Soumissio. Tous droits réservés.
          </div>

          <!-- Made in Quebec -->
          <div class="flex items-center gap-2 text-white/80 text-sm">
            <Icon name="game-icons:fleur-de-lys" class="w-4 h-4 text-white" />
            <span>Fièrement québécois</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
