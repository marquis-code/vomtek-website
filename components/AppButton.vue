<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

const NuxtLinkTag = resolveComponent('NuxtLink')

const props = withDefaults(defineProps<{
  to?: string
  href?: string
  type?: 'button' | 'submit'
  variant?: 'solid' | 'signal' | 'outline' | 'light' | 'ghost' | 'outline-dark'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  disabled?: boolean
  loading?: boolean
  block?: boolean
  track?: string
}>(), {
  type: 'button',
  variant: 'solid',
  size: 'md',
  arrow: false,
  disabled: false,
  loading: false,
  block: false,
})

const tag = computed(() => props.to ? NuxtLinkTag : props.href ? 'a' : 'button')

const rootAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return {
      href: props.href,
      target: props.href.startsWith('http') ? '_blank' : undefined,
      rel: props.href.startsWith('http') ? 'noopener' : undefined,
    }
  }
  return { type: props.type, disabled: props.disabled || props.loading }
})

const classes = computed(() => {
  const base = 'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-semibold uppercase leading-none transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] select-none disabled:cursor-not-allowed disabled:opacity-45'
  const sizes: Record<string, string> = {
    sm: 'h-9 px-4 text-[11.5px] tracking-[0.08em]',
    md: 'h-11 px-5 text-[12px] tracking-[0.08em]',
    lg: 'h-14 px-7 text-[13px] tracking-[0.08em]',
  }
  const variants: Record<string, string> = {
    solid: 'btn-solid bg-brand-deep text-bone hover:bg-brand hover:text-white shadow-[0_10px_30px_-18px_rgba(0,75,43,.7)]',
    signal: 'btn-signal bg-brand-soft text-brand-deep hover:bg-bone hover:text-brand-deep',
    outline: 'border border-ink/25 text-ink hover:border-brand hover:bg-brand hover:text-white',
    light: 'bg-bone text-ink hover:bg-brand hover:text-white',
    ghost: 'text-ink hover:text-brand px-0',
    'outline-dark': 'border border-bone/30 text-bone hover:border-brand-soft hover:bg-brand-soft hover:text-brand-deep',
  }
  return [
    base,
    sizes[props.size],
    variants[props.variant],
    props.block ? 'w-full' : '',
    props.arrow && props.variant === 'ghost' ? '' : '',
    props.disabled || props.loading ? 'pointer-events-none opacity-45' : '',
  ]
})
</script>

<template>
  <component :is="tag" v-bind="rootAttrs" :class="classes" :data-track="track">
    <slot />
    <span v-if="loading" class="ml-1 inline-block size-3 animate-spin rounded-full border border-current border-t-transparent" />
    <ArrowUpRight
      v-else-if="arrow"
      :size="size === 'lg' ? 16 : 14"
      :stroke-width="1.6"
      class="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  </component>
</template>
