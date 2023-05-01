<!-- signin page -->
<!-- use to handle the user signin data and login to app -->

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
          <TextButton @click="back" class="text-gray-400 fixed top-10 left-14">
            <i class="fi fi-rr-arrow-left"></i>
            Back
          </TextButton>

          <h2
            class="flex w-9/12 text-7xl font-semibold font-recoleta text-brand-purple-dark mt-10 leading-tight"
          >
            Login with single click
          </h2>

          <!-- signin using credential email and password -->
          <Form
            :context="form"
            @submit="credentialSignin"
            class="flex flex-col gap-5 w-9/12 mt-16"
          >
            <TextInput
              name="email"
              placeholder="Your email address"
              pre-icon="fi fi-rr-user"
            />

            <PasswordInput
              name="password"
              placeholder="Your password"
              pre-icon="fi fi-rr-lock"
            />

            <div class="flex justify-end">
              <TextButton link="/forgot-password">Forgot Password</TextButton>
            </div>

            <FlatButton type="submit" class="mt-6">Sign in</FlatButton>
          </Form>

          <!-- sign using oauth methods -->
          <div class="flex flex-wrap gap-4 mt-7">
            <FlatButton @click="googleSignin" class="bg-gray-100 !px-5"
              ><i class="fi fi-brands-google text-xl"></i> Using
              Google</FlatButton
            >
            <FlatButton @click="githubSignin" class="bg-gray-100 !px-5"
              ><i class="fi fi-brands-github text-xl"></i> Using
              Github</FlatButton
            >
          </div>
        </div>
        <div
          class="fixed w-1/2 inset-y-4 right-4 bg-[#FFF6F8] rounded-3xl flex items-end justify-center"
        >
          <NuxtImg
            src="/images/signin.png"
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

const router = useRouter()

const passwordRegexp =
  '^(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?])(?=\\S+$).{8,}$'
const fromSchema = object({
  email: string()
    .required('Opps your email not found')
    .trim()
    .email('Your email looks weird'),
  password: string()
    .required('Please add your password')
    .trim()
    .min(8, 'The password at least must be 8 character')
    .matches(
      new RegExp(passwordRegexp),
      'Password at least contain 1 number and unique characters'
    )
})
const form = useForm({ validationSchema: fromSchema })

const back = () => {
  router.back()
}

const credentialSignin = (data: any) => {}

const googleSignin = () => {}

const githubSignin = () => {}
</script>
