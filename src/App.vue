<script setup lang="ts">
import { provide, shallowRef } from 'vue'
import router from '@/router/index.ts'
import layouts from '@/layouts/index.ts'

const layout = shallowRef<string | unknown>('div')

router.afterEach((to: any) => {
  layout.value = layouts(to.meta.layout) || 'div'
})

provide('app:layout', layout)
</script>

<template>
  <component :is="layout || 'div'"></component>
</template>
