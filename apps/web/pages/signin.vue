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
            @submit="emailSignin.mutate"
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

            <FlatButton
              type="submit"
              :disabled="emailSignin.pending.value"
              class="mt-6"
            >
              {{ emailSignin.pending.value ? 'Sigining user' : 'Signin' }}
            </FlatButton>
          </Form>

          <!-- sign using oauth methods -->
          <div class="flex flex-wrap gap-4 mt-7">
            <FlatButton
              :disabled="emailSignin.pending.value"
              @click="googleSignin"
              class="bg-gray-100 !px-5"
              ><i class="fi fi-brands-google text-xl"></i> Using
              Google</FlatButton
            >
            <FlatButton
              :disabled="emailSignin.pending.value"
              @click="githubSignin"
              class="bg-gray-100 !px-5"
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
import { AuthPayload } from '~/types/auth'

const config = useRuntimeConfig()
const router = useRouter()

// define the form and all
// of the validation schema
const fromSchema = object({
  email: string()
    .required('Opps your email not found')
    .trim()
    .email('Your email looks weird'),
  password: string()
    .required('Opps, your password not found')
    .trim()
    .min(8, 'Your password at least must be 8 characters')
})
const form = useForm({ validationSchema: fromSchema })

const back = () => router.back()

// sigin using email and
// password
const emailSignin = useMutation<AuthPayload, any>(
  async (formData: any) => {
    // start to signin using the api
    // and save the whole session
    const { data, error } = await useApiClient<AuthPayload>(
      '/v1/auth/email-pass',
      {
        method: 'post',
        body: formData
      }
    )

    // throw error if found
    if (error.value) {
      throw error.value.data
    }

    if (data.value) {
      await useFetch('/api/auth/session', {
        method: 'post',
        body: {
          key: 'user',
          value: data.value.user
        }
      })
      await useFetch('/api/auth/session', {
        method: 'post',
        body: {
          key: 'accessToken',
          value: data.value.accessToken
        }
      })
      await useFetch('/api/auth/session', {
        method: 'post',
        body: {
          key: 'resfreshToken',
          value: data.value.refreshToken
        }
      })
    }
  },
  {
    onSuccess: async () => {
      await navigateTo('/app')
    },
    onError: (error) => {
      if ((error.message = 'auth/invalid-password')) {
        form.setFieldError('password', 'Opps, your password look weird')
      }
    }
  }
)

// sign the user using google oauth2
const googleSignin = () => {
  location.href = `${config.public.auth.callbackBaseUrl}/api/auth/google`
}

// signin the user using github oauth2
const githubSignin = () => {
  location.href = `${config.public.auth.callbackBaseUrl}/api/auth/github`
}
</script>
