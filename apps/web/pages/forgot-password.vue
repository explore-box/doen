<!-- Verify page -->
<!-- use to verify the otp code that passing into the email address -->

<template>
  <div>
    <Head>
      <Title>Verify OTP Code | doen</Title>
      <Meta name="description" content="Verify your email verification code" />
    </Head>

    <main class="flex flex-col">
      <section class="flex bg-white h-full w-full px-20 relative">
        <div class="flex flex-col w-1/2 py-28">
          <TextButton @click="back" class="text-gray-400 fixed top-10 left-14">
            <i class="fi fi-rr-arrow-left"></i>
            Back to login
          </TextButton>

          <h2
            class="flex w-9/12 text-7xl font-semibold font-recoleta text-brand-purple-dark mt-10 leading-none"
          >
            Verify your account
          </h2>

          <p class="text-gray-600 mt-16 w-9/12">
            We send the secure code into
            <span class="font-semibold text-brand-purple-dark">{{
              emailPassed
            }}</span
            >. Please check your email address and use the code to access your
            account.
          </p>

          <!-- signin using credential email and password -->
          <Form
            :context="form"
            @submit="verifyCode"
            class="flex flex-col gap-5 w-9/12 mt-10"
          >
            <TextInput
              name="code"
              placeholder="Your verification code"
              pre-icon="fi fi-rr-lock"
            />

            <FlatButton type="submit" class="mt-6">Verify code</FlatButton>
          </Form>
        </div>
        <div
          class="fixed w-1/2 inset-y-4 right-4 bg-[#FFF6F8] rounded-3xl flex items-end justify-center"
        >
          <NuxtImg
            src="/images/verify.png"
            fit="contain"
            height="475.04"
            width="400"
            class="mb-28"
          ></NuxtImg>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { object, string } from 'yup'

const route = useRoute()
const emailPassed = route.query.email

const fromSchema = object({
  code: string().required('Opps your your verification code not found')
})
const form = useForm({ validationSchema: fromSchema })

const back = async () => {
  await navigateTo(`/signin?email=${emailPassed}`)
}

const verifyCode = (data: any) => {
  console.log(data.code)
}
</script>
