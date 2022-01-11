
import message from "antd/lib/message";
import ClipboardJS from 'clipboard'
import { DependencyList, useEffect, useRef } from 'react'

export const useCopy = <
  Target extends HTMLElement = any
>(
  buttonSelector: string,
  init: (cp: ClipboardJS) => void | VoidFunction = cp => {
    cp.on('success', () => message.success('复制成功'))
  },
  deps: DependencyList = []
) => {
  const targetRef = useRef<Target>()
  useEffect(() => {
    const targetId = `Clipboard-Target-${Date.now()}`
    const button = document.querySelector(buttonSelector)
    if (button) {
      button.setAttribute('data-clipboard-target', `#${targetId}`)
    } else {
      return
    }
    if (targetRef.current) {
      targetRef.current.id = targetId
    } else {
      button.id = targetId
    }
    const cp = new ClipboardJS(button)
    init && init(cp)
    return () => cp.destroy()
  }, [...deps, buttonSelector])
  return {
    target: targetRef,
  }
}