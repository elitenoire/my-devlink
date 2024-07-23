'use client'

import type { HTMLProps, ReactElement } from 'react'
import type {
  FieldValues,
  FieldPath,
  ControllerProps,
  UseControllerProps,
  ControllerRenderProps,
} from 'react-hook-form'
import type { InputProps } from '@/components/ui/input'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { cn } from '@/lib/utils'

type FormInputProps<T extends FieldValues = FieldValues, P extends FieldPath<T> = FieldPath<T>> = {
  label?: string
  description?: string
  standalone?: boolean
  labelClass?: HTMLProps<HTMLLabelElement>['className']
  fieldClass?: HTMLProps<HTMLDivElement>['className']
  descriptionClass?: HTMLProps<HTMLParagraphElement>['className']
  errorClass?: HTMLProps<HTMLParagraphElement>['className']
} & (Omit<InputProps, 'name'> | { children?: (field: ControllerRenderProps<T, P>) => ReactElement })

type RendererProps<
  T extends FieldValues = FieldValues,
  P extends FieldPath<T> = FieldPath<T>,
> = FormInputProps<T, P> & {
  name?: string
}

function renderer<T extends FieldValues = FieldValues, P extends FieldPath<T> = FieldPath<T>>({
  label,
  labelClass,
  description,
  descriptionClass,
  fieldClass,
  errorClass,
  standalone,
  children,
  ...rest
}: RendererProps<T, P>): ControllerProps<T, P>['render'] {
  // eslint-disable-next-line react/display-name
  return ({ field }) => {
    return (
      <FormItem className={cn('space-y-1', fieldClass)}>
        {label && (
          <FormLabel className={cn('body-s text-foreground-dark', labelClass)}>{label}</FormLabel>
        )}
        {standalone ? (
          children && typeof children === 'function' && children(field)
        ) : (
          <FormControl>
            {children && typeof children === 'function' ? (
              children(field)
            ) : (
              <Input {...rest} {...field} />
            )}
          </FormControl>
        )}
        {description && (
          <FormDescription className={cn('body-s pt-5', descriptionClass)}>
            {description}
          </FormDescription>
        )}
        <FormMessage className={cn('body-s text-right', errorClass)} />
      </FormItem>
    )
  }
}

export function FormInput<
  T extends FieldValues = FieldValues,
  P extends FieldPath<T> = FieldPath<T>,
>({
  control,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  disabled,
  ...rest
}: UseControllerProps<T, P> & FormInputProps<T, P>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      disabled={disabled}
      render={renderer<T, P>(rest)}
    />
  )
}
