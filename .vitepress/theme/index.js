import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    
    const renderMermaid = async () => {
      await nextTick()
      const elements = document.querySelectorAll('pre.mermaid')
      if (elements.length === 0) return
      
      const mermaid = (await import('mermaid')).default
      const isDark = document.documentElement.classList.contains('dark')
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default'
      })
      
      for (const el of elements) {
        const code = el.textContent || ''
        if (!code.trim()) continue
        try {
          const id = 'mermaid-' + Math.random().toString(36).substr(2, 9)
          const { svg } = await mermaid.render(id, code)
          el.outerHTML = `<div class="mermaid-rendered">${svg}</div>`
        } catch (e) {
          console.error('Mermaid error:', e)
        }
      }
    }
    
    onMounted(renderMermaid)
    watch(() => route.path, renderMermaid)
  }
}
