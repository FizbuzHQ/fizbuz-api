//import * as Yup from 'yup'

// query schemas
const nicknameCheckSchema = (yup: any) => {
  return yup.object().shape({
    where: yup.object().shape({
      nickname: yup.string().required(),
    }),
  })
}

const auth0SubCheckSchema = (yup: any) => {
  return yup.object().shape({
    where: yup.object().shape({
      auth0Sub: yup.string().required(),
    }),
  })
}
// mutation input schemas

const signupInputSchema = (yup: any) => {
  return yup.object().shape({
    data: yup.object().shape({
      email: yup.string().required(),
      identities: yup.object().shape({
        create: yup.array().of(
          yup.object().shape({
            auth0Sub: yup.string().required(),
          }),
        ),
      }),
      profile: yup.object().shape({
        create: yup.object().shape({
          name: yup.string().required(),
          nickname: yup.string().required(),
        }),
      }),
    }),
  })
}

const onboardingProfileUpdateSchema = (yup: any) => {
  return yup.object().shape({
    data: yup.object().shape({
      name: yup.string().min(3).required(),
      nickname: yup.string().min(5).required(),
    }),
    where: yup.object().shape({
      id: yup.string().required(),
    }),
  })
}

const onboardingSkillsUpdateSchema = (yup: any) => {
  return yup.object().shape({
    data: yup.object().shape({
      skills: yup.object().shape({
        create: yup.array().of(
          yup.object().shape({
            tool: yup.object().shape({
              connect: yup.object().shape({
                id: yup.string().required(),
              }),
            }),
          }),
        ),
      }),
    }),
    where: yup.object().shape({
      id: yup.string().required(),
    }),
  })
}

export {
  nicknameCheckSchema,
  auth0SubCheckSchema,
  onboardingProfileUpdateSchema,
  signupInputSchema,
  onboardingSkillsUpdateSchema,
}
