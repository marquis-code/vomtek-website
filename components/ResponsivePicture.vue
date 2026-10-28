<script setup lang="ts">
withDefaults(defineProps<{
  asset: string
  alt: string
  widths?: number[]
  sizes?: string
  imgClass?: string
  width?: number
  height?: number
  priority?: boolean
}>(), {
  widths: () => [480, 800, 1200],
  sizes: '(max-width: 768px) 100vw, 50vw',
  imgClass: 'h-full w-full object-cover',
  width: 1200,
  height: 800,
  priority: false,
})

function base(asset: string, width: number, format: string) {
  if (asset.startsWith('http') || asset.startsWith('/')) return asset
  return `/images/optimized/${asset}-${width}.${format}`
}
</script>

<template>
  <picture>
    <template v-if="!asset.startsWith('http') && !asset.startsWith('/')">
      <source :srcset="widths.map(w => `${base(asset, w, 'avif')} ${w}w`).join(', ')" :sizes="sizes" type="image/avif">
      <source :srcset="widths.map(w => `${base(asset, w, 'webp')} ${w}w`).join(', ')" :sizes="sizes" type="image/webp">
    </template>
    <img
      :src="base(asset, widths[widths.length - 1] || 1200, 'jpg')"
      :srcset="widths.map(w => `${base(asset, w, 'jpg')} ${w}w`).join(', ')"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
      :class="imgClass"
    >
  </picture>
</template>
