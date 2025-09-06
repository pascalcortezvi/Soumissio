<template>
  <div class="bg-white overflow-hidden h-[400px] relative">
    <div class="absolute inset-0 bg-gradient-to-b from-white to-white/50"></div>
    <video
      src="https://megjmscwejksjusiqwwv.supabase.co/storage/v1/object/public/assets/v-banner.mp4"
      autoplay
      muted
      loop
      class="w-full h-full object-cover"
    />

    <!-- Centered overlay container -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <div class="text-center max-w-2xl mx-auto px-6">
        <h1 class="text-5xl font-bold mb-10">
          Trouver votre expert en TI maintenant
        </h1>

        <NuxtLink to="/experts" class="accent-button"
          >Découvrez tous les experts</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
