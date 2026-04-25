import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()

    const setupUuidGenerators = async () => {
      await nextTick()

      const fallbackUuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
        const random = Math.random() * 16 | 0
        const value = char === 'x' ? random : (random & 0x3) | 0x8
        return value.toString(16)
      })

      document.querySelectorAll('[data-uuid-generator]').forEach((container) => {
        if (container.dataset.uuidReady === 'true') return
        container.dataset.uuidReady = 'true'

        const generateButton = container.querySelector('[data-role="generate"]')
        const copyButton = container.querySelector('[data-role="copy"]')
        const output = container.querySelector('[data-role="output"]')

        if (!generateButton || !copyButton || !output) return

        generateButton.addEventListener('click', () => {
          const value = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : fallbackUuid()

          output.textContent = value
          copyButton.disabled = false
          copyButton.textContent = '复制 UUID'
        })

        copyButton.addEventListener('click', async () => {
          if (!output.textContent) return

          try {
            await navigator.clipboard.writeText(output.textContent)
            copyButton.textContent = '已复制'
            window.setTimeout(() => {
              copyButton.textContent = '复制 UUID'
            }, 2000)
          } catch (error) {
            console.error('Failed to copy UUID:', error)
          }
        })
      })
    }
    
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
    
    const initPageFeatures = async () => {
      await renderMermaid()
      await setupUuidGenerators()
    }

    onMounted(initPageFeatures)
    watch(() => route.path, initPageFeatures)
  }
}
