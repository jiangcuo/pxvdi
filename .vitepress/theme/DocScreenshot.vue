<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  caption: { type: String, required: true },
  variant: {
    type: String,
    default: 'full',
    validator: (value) => ['full', 'settings', 'dialog', 'detail'].includes(value),
  },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
})

const route = useRoute()
const preview = ref(null)
const trigger = ref(null)
let previousOverflow

function openPreview() {
  if (!preview.value || preview.value.open) return
  preview.value.showModal()
  previousOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
}

function restoreScroll() {
  if (previousOverflow === undefined) return
  document.documentElement.style.overflow = previousOverflow
  previousOverflow = undefined
}

function closePreview() {
  preview.value?.close()
  restoreScroll()
}

function onClosed() {
  restoreScroll()
  trigger.value?.focus({ preventScroll: true })
}

function onBackdropClick(event) {
  if (event.target !== preview.value) return
  const bounds = preview.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) {
    closePreview()
  }
}

watch(() => route.path, closePreview)
onBeforeUnmount(restoreScroll)
</script>

<template>
  <figure class="doc-screenshot" :class="`doc-screenshot--${props.variant}`">
    <button
      ref="trigger"
      class="doc-screenshot__trigger"
      type="button"
      :aria-label="`放大查看：${alt}`"
      aria-haspopup="dialog"
      @click="openPreview"
    >
      <img :src="src" :alt="alt" :width="width" :height="height" loading="lazy" decoding="async" />
      <span class="doc-screenshot__hint" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
        </svg>
        放大
      </span>
    </button>
    <figcaption>{{ caption }}</figcaption>
    <dialog
      ref="preview"
      class="doc-screenshot__preview"
      :aria-label="alt"
      @click="onBackdropClick"
      @cancel.prevent="closePreview"
      @close="onClosed"
    >
      <div class="doc-screenshot__preview-header">
        <span>{{ caption }}</span>
        <button type="button" aria-label="关闭图片预览" autofocus @click="closePreview">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="m6 6 12 12M6 18 18 6" />
          </svg>
        </button>
      </div>
      <div class="doc-screenshot__preview-body">
        <img :src="src" :alt="alt" :width="width" :height="height" />
      </div>
    </dialog>
  </figure>
</template>

<style scoped>
.doc-screenshot {
  width: 100%;
  margin: 28px auto 32px;
}

.doc-screenshot--settings { max-width: 560px; }
.doc-screenshot--dialog { max-width: 320px; }
.doc-screenshot--detail { max-width: 480px; }

.doc-screenshot__trigger {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 4px 16px rgb(0 0 0 / 5%);
  cursor: zoom-in;
}

.doc-screenshot__trigger:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.doc-screenshot__trigger img {
  display: block;
  width: 100%;
  height: auto;
}

.doc-screenshot__hint {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: 6px;
  background: rgb(24 24 27 / 82%);
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  opacity: 0;
  transition: opacity 150ms;
}

.doc-screenshot__hint svg { width: 14px; height: 14px; }
.doc-screenshot__trigger:hover .doc-screenshot__hint,
.doc-screenshot__trigger:focus-visible .doc-screenshot__hint { opacity: 1; }

.doc-screenshot figcaption {
  margin-top: 10px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.7;
  text-align: center;
  text-wrap: pretty;
}

.doc-screenshot__preview {
  position: fixed;
  inset: 0;
  width: max-content;
  max-width: calc(100vw - 48px);
  max-height: calc(100dvh - 48px);
  margin: auto;
  padding: 0;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: 0 24px 80px rgb(0 0 0 / 30%);
}

.doc-screenshot__preview::backdrop { background: rgb(0 0 0 / 72%); }

.doc-screenshot__preview-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 13px;
  line-height: 1.6;
}

.doc-screenshot__preview-header button {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  cursor: pointer;
}

.doc-screenshot__preview-header button:hover { background: var(--vp-c-bg-soft); }
.doc-screenshot__preview-header button:focus-visible { outline: 2px solid var(--vp-c-brand-1); }
.doc-screenshot__preview-header svg { width: 20px; height: 20px; }
.doc-screenshot__preview-body { padding: 16px; }

.doc-screenshot__preview-body img {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: calc(100dvh - 160px);
  height: auto;
  margin: auto;
}

@media (max-width: 640px) {
  .doc-screenshot { margin-top: 20px; margin-bottom: 24px; }
  .doc-screenshot__preview { max-width: calc(100vw - 16px); max-height: calc(100dvh - 16px); }
  .doc-screenshot__preview-header { padding: 8px 12px; }
  .doc-screenshot__preview-body { padding: 8px; }
}

@media (hover: none) {
  .doc-screenshot__hint { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .doc-screenshot__hint { transition: none; }
}
</style>
