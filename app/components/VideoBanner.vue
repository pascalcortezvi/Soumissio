<template>
  <div class="bg-white overflow-hidden h-[400px] relative">
    <div class="absolute inset-0 bg-black/40"></div>
    <video
      src="https://megjmscwejksjusiqwwv.supabase.co/storage/v1/object/public/assets/video-banner.mp4"
      autoplay
      muted
      loop
      class="w-full h-full object-cover"
    />

    <!-- Centered overlay container -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <div class="text-center max-w-2xl mx-auto px-6">
        <h1 class="text-5xl font-bold text-white mb-5">
          Trouver votre expert TI maintenant
        </h1>

        <NuxtLink to="/experts" class="white-button"
          >Découvrez tous les experts</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
