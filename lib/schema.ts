import * as z from 'zod'

export const platformType = [
  'github',
  'frontendmentor',
  'twitter',
  'linkedin',
  'youtube',
  'facebook',
  'twitch',
  'devto',
  'codewars',
  'codepen',
  'freecodecamp',
  'gitlab',
  'hashnode',
  'stackoverflow',
] as const

export const linksFormSchema = z.object({
  links: z.array(
    z
      .object({
        platform: z.enum(platformType, {
          errorMap: ({ code }, _ctx) => {
            switch (code) {
              case 'invalid_enum_value':
              case 'invalid_type':
                return { message: 'Invalid platform link' }
              default:
                return { message: 'Select platform link' }
            }
          },
        }),
        url: z
          .string()
          .trim()
          .refine((v) => /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(v), {
            message: 'Invalid URL',
          }),
        slug: z.string().or(z.literal('')),
      })
      .refine((data) => data.url.startsWith(data.slug), {
        message: 'Check link again',
        path: ['url'],
      })
  ),
})

export type ILinkFormData = z.infer<typeof linksFormSchema>
export type ILinkFormDataErrors = z.inferFlattenedErrors<typeof linksFormSchema>
export type ILink = ILinkFormData['links'][number]
