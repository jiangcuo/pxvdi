<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  graph: {
    type: String,
    default: ''
  }
})

const container = ref(null)
const slotRef = ref(null)
const { isDark } = useData()

async function render() {
  await nextTick()
  if (!container.value) return
  
  let code = props.graph
  if (!code && slotRef.value) {
    code = slotRef.value.textContent || ''
  }
  if (!code.trim()) {
    console.log('Mermaid: no code found')
    return
  }
  
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark.value ? 'dark' : 'default'
    })
    const id = 'mermaid-' + Math.random().toString(36).substr(2, 9)
    const { svg } = await mermaid.render(id, code)
    container.value.innerHTML = svg
  } catch (e) {
    console.error('Mermaid render error:', e)
    container.value.innerHTML = '<pre style="color:red">' + e.message + '</pre>'
  }
}

onMounted(render)
watch(isDark, render)
</script>

<template>
  <div ref="slotRef" style="display:none"><slot></slot></div>
  <div ref="container" class="mermaid-container"></div>
</template>

<style scoped>
.mermaid-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
