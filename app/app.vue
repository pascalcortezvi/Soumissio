<template>
  <TopBar />
  <AppHeader />
  <NuxtPage />
  <AppFooter />
  <ToastNotification />
</template>

<script setup>
useHead({
  title: "Soumissio | Trouvez les meilleurs experts IT au Québec",
  meta: [
    {
      name: "description",
      content:
        "Soumissio est la plateforme québécoise qui connecte entreprises et experts IT. Trouvez rapidement le talent idéal pour vos projets technologiques.",
    },
  ],
});
</script>
