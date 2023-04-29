<!-- signin page -->
<!-- use to handle the user signin data and login to app -->

<script setup lang="ts">
const router = useRouter()

const back = () => {
  console.log('Back')
  router.back()
}
</script>

<template>
  <div>
    <Head>
      <Title>Signin | doen</Title>
      <Meta
        name="description"
        content="Start manage your task and boost productivity"
      />
    </Head>

    <main class="flex flex-col">
      <section class="flex bg-white h-full w-full px-20 relative">
        <div class="flex flex-col w-1/2 py-28">
          <ButtonText @click="back" class="text-gray-400 fixed top-10 left-14">
            <i class="fi fi-rr-arrow-left"></i>
            Back
          </ButtonText>

          <h2
            class="flex w-9/12 text-7xl font-semibold font-recoleta text-brand-purple-dark mt-10 leading-tight"
          >
            Login with single click
          </h2>
        </div>
      </section>
    </main>
  </div>
</template>
