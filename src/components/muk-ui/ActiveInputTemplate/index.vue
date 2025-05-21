<template>
  <div 
    class="rich-editor" 
    ref="editor"
    contenteditable="true"
    @input="handleInput"
    @click="handleClick"
    @keydown="handleKeydown"
    @keydown.enter="handleEnter"
    :data-placeholder="'即刻开启创作之旅！输入需求，例如：我想要一篇[宣传文案]，主题为[智能手表]，面向[年轻群体]，风格[小红书风格]。涵盖[产品设计]、[健康监测功能]等要点。更多优质模板，点击下方即可挑选'"
  ></div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  elements: {
    type: Array,
    default: () => []
  },
  showTemplate: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['change', 'submit'])
const editor = ref(null)
const inputValue = ref('')

// 添加状态管理相关的代码
const inputHistory = ref([])
const currentInputState = ref(-1)

// 添加recordInputState函数
const recordInputState = (input) => {
  console.log('Recording input state:', {
    inputId: input.closest('[data-id]').dataset.id,
    value: input.value,
    currentState: currentInputState.value,
    historyLength: inputHistory.value.length
  })
  
  // 如果当前不在最新状态，删除之后的历史
  if (currentInputState.value < inputHistory.value.length - 1) {
    inputHistory.value = inputHistory.value.slice(0, currentInputState.value + 1)
  }
  
  // 记录新状态
  inputHistory.value.push({
    inputId: input.closest('[data-id]').dataset.id,
    value: input.value,
    timestamp: Date.now()
  })
  currentInputState.value = inputHistory.value.length - 1
  
  console.log('After recording:', {
    currentState: currentInputState.value,
    historyLength: inputHistory.value.length
  })
}

// 修改extractTextFromHtml函数
const extractTextFromHtml = (html) => {
  const temp = document.createElement('div')
  temp.innerHTML = html
  
  const walk = (node) => {
    if (node.nodeType === 3) {
      return node.textContent
    }
    
    if (node.classList?.contains('editable-div')) {
      return node.textContent || ''
    }
    
    // 修改select处理逻辑
    if (node.classList?.contains('custom-select')) {
      // 只返回选中项的文本
      const selectedOption = node.querySelector('.select-option.selected')
      return selectedOption ? selectedOption.textContent : ''
    }
    
    if (node.tagName === 'SELECT') {
      return node.options[node.selectedIndex]?.text || ''
    }
    
    if (node.tagName === 'INPUT') {
      const editorInput = editor.value?.querySelector(`[data-id="${node.closest('[data-id]')?.dataset.id}"] input`)
      if (editorInput) {
        return editorInput.value || ''
      }
      return node.value || ''
    }
    
    let text = ''
    for (const child of node.childNodes) {
      text += walk(child)
    }
    return text
  }
  
  const text = walk(temp)
  return text.replace(/\s+/g, ' ').trim()
}

// 修改handleChange函数
const handleChange = (content) => {
  // 保存原始HTML
  inputValue.value = content
  
  // 提取纯文本并发送给父组件
  const plainText = extractTextFromHtml(content)
  console.log('纯文本内容:', plainText)
  initialText.value = plainText
  // emit('change', plainText)
}

// 处理Enter键
const handleEnter = (e) => {
  e.preventDefault()
  const plainText = extractTextFromHtml(inputValue.value)
  console.log('纯文本内容:', plainText)
  emit('submit', plainText)
}

// 处理输入
const handleInput = (e) => {
  const content = editor.value.innerHTML;
  // 检查内容是否为空或只包含空白字符
  if (!content || content.trim() === '' || content === '<br>' || content.replace(/&nbsp;/g, '').trim() === '') {
    editor.value.innerHTML = ''; // 确保完全清空
  }
  
  // 更新所有 editable-div 的 showing-placeholder 类
  const editableDivs = editor.value.querySelectorAll('.editable-div');
  editableDivs.forEach(div => {
    if (div.textContent.trim() === '') {
      div.classList.add('showing-placeholder');
    } else {
      div.classList.remove('showing-placeholder');
    }
  });
  
  handleChange(content);
};

// 处理点击
const handleClick = (e) => {
  const placeholder = e.target.closest('.element-placeholder')
  if (placeholder) {
    const elementId = placeholder.dataset.id
    replacePlaceholderWithElement(elementId)
  }
};

// 处理键盘事件
const handleKeydown = (e) => {
  // 检查是否是撤销操作 (Ctrl+Z)
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    // 不干预撤销操作，让浏览器正常处理
    return;
  }
  
  // 只处理 Backspace 和 Delete 键
  if (e.key === 'Backspace' || e.key === 'Delete') {
    const selection = window.getSelection()
    if (!selection.rangeCount) return
    
    const range = selection.getRangeAt(0)
    const startNode = range.startContainer
    const startOffset = range.startOffset
    
    // 调试信息
    console.log('删除操作:', {
      key: e.key,
      startNodeType: startNode.nodeType,
      startNodeName: startNode.nodeName,
      startNodeContent: startNode.textContent,
      startOffset,
      previousSibling: startNode.previousSibling ? startNode.previousSibling.nodeName : 'none'
    })
    
    // 检查是否在 editable-div 内部
    let isInEditableDiv = false
    let editableDiv = null
    let currentNode = startNode
    
    while (currentNode && currentNode !== editor.value) {
      if (currentNode.classList && currentNode.classList.contains('editable-div')) {
        isInEditableDiv = true
        editableDiv = currentNode
        break
      }
      currentNode = currentNode.parentNode
    }
    
    // 如果在 editable-div 内部，允许正常删除
    if (isInEditableDiv) {
      // 检查是否会删除最后一个字符
      const willBeEmpty = (e.key === 'Backspace' && 
                          (editableDiv.textContent.length === 1 || 
                           (range.startOffset === 1 && range.startOffset === range.endOffset && startNode.textContent.length === 1))) ||
                         (e.key === 'Delete' && 
                          (editableDiv.textContent.length === 1 || 
                           (range.startOffset === 0 && range.startOffset === range.endOffset && 
                            editableDiv.textContent.length === 1)));
      
      if (willBeEmpty) {
        // 阻止默认行为，手动清空内容并显示 placeholder
        e.preventDefault();
        
        // 清空内容
        editableDiv.textContent = '';
        
        // 添加 showing-placeholder 类
        editableDiv.classList.add('showing-placeholder');
        
        // 设置光标位置
        const newRange = document.createRange();
        newRange.setStart(editableDiv, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
        
        // 触发内容变化
        handleChange(editor.value.innerHTML);
        return;
      }
      
      // 增强修复：检查是否在文本节点中按 Backspace，并且不是在文本开头
      if (e.key === 'Backspace' && 
          startNode.nodeType === Node.TEXT_NODE && 
          startOffset > 0 && 
          startOffset <= startNode.textContent.length) {
        
        // 阻止默认行为
        e.preventDefault();
        
        // 手动删除一个字符
        const text = startNode.textContent;
        const newText = text.substring(0, startOffset - 1) + text.substring(startOffset);
        startNode.textContent = newText;
        
        // 设置光标位置
        const newRange = document.createRange();
        newRange.setStart(startNode, startOffset - 1);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
        
        // 确保 editable-div 保持焦点
        editableDiv.focus();
        
        // 触发内容变化
        handleChange(editor.value.innerHTML);
        
        return;
      }
      
      // 只有当用户尝试删除空的 editable-div 时才特殊处理
      if (editableDiv.textContent.trim() === '' && 
          editableDiv.classList.contains('showing-placeholder') && 
          (e.key === 'Backspace' || e.key === 'Delete')) {
        // 不阻止默认行为，让浏览器记录撤销历史
        // 但在删除后确保光标位置正确
        setTimeout(() => {
          const wrapper = editableDiv.closest('.input-wrapper');
          if (wrapper && wrapper.parentNode) {
            // 使用 document.execCommand 来确保操作被记录到撤销历史
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNode(wrapper);
            selection.removeAllRanges();
            selection.addRange(range);
            
            // 在删除之前执行一次空的历史记录命令
            document.execCommand('insertText', false, '');
            
            // 保存光标位置
            const tempText = document.createTextNode('\u200B'); // 零宽空格
            wrapper.parentNode.insertBefore(tempText, wrapper.nextSibling);
            
            // 删除wrapper
            wrapper.remove();
            
            // 恢复光标位置
            const newRange = document.createRange();
            newRange.setStart(tempText, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            
            // 再执行一次空的历史记录命令
            document.execCommand('insertText', false, '');
            
            // 触发内容变化
            handleChange(editor.value.innerHTML);
          }
        }, 0);
        return;
      }
      
      // 其他情况下不干预，让浏览器正常处理删除
      return;
    }
    
    // 关键修复：检测是否在文本节点开始位置按 Backspace
    if (e.key === 'Backspace' && 
        startNode.nodeType === Node.TEXT_NODE && 
        startOffset === 0) {
      
      // 查找前一个元素
      let prevNode = startNode.previousSibling
      
      // 跳过空文本节点
      while (prevNode && 
             prevNode.nodeType === Node.TEXT_NODE && 
             prevNode.textContent.trim() === '') {
        prevNode = prevNode.previousSibling
      }
      
      // 如果前一个元素是 input-wrapper
      if (prevNode && 
          prevNode.nodeType === Node.ELEMENT_NODE && 
          (prevNode.classList.contains('input-wrapper') || prevNode.classList.contains('select-wrapper'))) {
        
        // 检查 input-wrapper 内是否有空的 editable-div
        const editableDiv = prevNode.querySelector('.editable-div');
        const isEmpty = editableDiv && 
                       editableDiv.textContent.trim() === '' && 
                       editableDiv.classList.contains('showing-placeholder');
        
        if (isEmpty) {
          // 阻止默认行为
          e.preventDefault();
          
          // 删除 wrapper
          const wrapper = prevNode;
          
          // 使用 document.execCommand 来确保操作被记录到撤销历史
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNode(wrapper);
          selection.removeAllRanges();
          selection.addRange(range);
          
          // 在删除之前执行一次空的历史记录命令
          document.execCommand('insertText', false, '');
          
          // 保存光标位置
          const tempText = document.createTextNode('\u200B'); // 零宽空格
          wrapper.parentNode.insertBefore(tempText, wrapper.nextSibling);
          
          // 删除wrapper
          wrapper.remove();
          
          // 恢复光标位置
          const newRange = document.createRange();
          newRange.setStart(tempText, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
          
          // 再执行一次空的历史记录命令
          document.execCommand('insertText', false, '');
          
          // 触发内容变化
          handleChange(editor.value.innerHTML);
          return;
        }
        
        // 不阻止默认行为，让浏览器记录撤销历史
        // 但我们需要确保光标不会跳入 input-wrapper
        setTimeout(() => {
          // 检查光标是否跳入了 input-wrapper
          const newSelection = window.getSelection()
          if (!newSelection.rangeCount) return
          
          const newRange = newSelection.getRangeAt(0)
          let currentNode = newRange.startContainer
          
          // 检查光标是否在 editable-div 内
          let isInEditableDiv = false
          let editableDivNode = null
          while (currentNode && currentNode !== editor.value) {
            if (currentNode.classList && currentNode.classList.contains('editable-div')) {
              isInEditableDiv = true
              editableDivNode = currentNode
              break
            }
            currentNode = currentNode.parentNode
          }
          
          // 如果光标跳入了 editable-div，将其移回 input-wrapper 后
          if (isInEditableDiv) {
            const wrapper = editableDivNode.closest('.input-wrapper')
            if (wrapper) {
              // 使用 document.execCommand 来确保操作被记录到撤销历史
              document.execCommand('insertText', false, '');
              
              // 创建一个临时的文本节点
              const tempText = document.createTextNode('\u200B') // 零宽空格
              wrapper.parentNode.insertBefore(tempText, wrapper.nextSibling)
              
              // 设置光标位置
              const fixedRange = document.createRange()
              fixedRange.setStart(tempText, 0)
              fixedRange.collapse(true)
              newSelection.removeAllRanges()
              newSelection.addRange(fixedRange)
              
              // 再执行一次空的历史记录命令
              document.execCommand('insertText', false, '');
            }
          }
          
          // 触发内容变化
          handleChange(editor.value.innerHTML)
        }, 0)
        return
      }
    }
    
    // 修改 handleKeydown 函数中处理 Delete 键的部分
    if (e.key === 'Delete') {
      // 检查是否在文本节点末尾按 Delete
      const isAtTextEnd = startNode.nodeType === Node.TEXT_NODE && 
                          startOffset === startNode.textContent.length;
      
      // 如果是在文本节点末尾，或者是在空文本节点
      if (isAtTextEnd || (startNode.nodeType === Node.TEXT_NODE && startNode.textContent.trim() === '')) {
        // 查找下一个元素
        let nextNode = startNode.nextSibling
        
        // 跳过空文本节点
        while (nextNode && 
               nextNode.nodeType === Node.TEXT_NODE && 
               nextNode.textContent.trim() === '') {
          nextNode = nextNode.nextSibling
        }
        
        // 如果下一个元素是 input-wrapper
        if (nextNode && 
            nextNode.nodeType === Node.ELEMENT_NODE && 
            nextNode.classList.contains('input-wrapper')) {
          
          // 检查 input-wrapper 内是否有 editable-div
          const editableDiv = nextNode.querySelector('.editable-div');
          if (editableDiv) {
            // 阻止默认行为
            e.preventDefault();
            
            // 关键改动：临时将 input-wrapper 的 contenteditable 设为 false
            nextNode.setAttribute('contenteditable', 'false');
            
            // 直接聚焦到 editable-div
            editableDiv.focus();
            
            // 立即设置光标位置到 editable-div 的开始
            const selection = window.getSelection();
            const range = document.createRange();
            
            if (editableDiv.firstChild && editableDiv.firstChild.nodeType === Node.TEXT_NODE) {
              range.setStart(editableDiv.firstChild, 0);
            } else {
              range.setStart(editableDiv, 0);
            }
            
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            
            // 添加调试信息
            console.log('Del 键处理: 光标已设置到 editable-div', {
              editableDiv: editableDiv,
              focused: document.activeElement === editableDiv
            });
            
            // 延迟恢复 input-wrapper 的 contenteditable 属性
            // 增加延迟时间，确保光标操作完成
            setTimeout(() => {
              // 只有当 editable-div 不再有焦点时才恢复
              if (document.activeElement !== editableDiv) {
                nextNode.setAttribute('contenteditable', 'true');
              }
            }, 300);
            
            // 触发内容变化
            handleChange(editor.value.innerHTML);
            return;
          }
        }
      }
    }
  }
  
  // 处理箭头键
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    
    // 检查光标是否在custom-select内部
    const customSelect = range.startContainer.closest?.('.custom-select') ||
                        range.startContainer.parentElement?.closest?.('.custom-select')
    
    // 如果光标在custom-select内部，则移动到其外部
    if (customSelect) {
      e.preventDefault()
      const wrapper = customSelect.closest('.select-wrapper')
      const newRange = document.createRange()
      
      if (e.key === 'ArrowRight') {
        newRange.setStartAfter(wrapper)
      } else if (e.key === 'ArrowLeft') {
        newRange.setStartBefore(wrapper)
      }
      
      newRange.collapse(true)
      selection.removeAllRanges()
      selection.addRange(newRange)
      return
    }

    // 原有的可编辑div处理逻辑
    const activeElement = document.activeElement
    if (editor.value.contains(activeElement) && 
        activeElement.classList.contains('editable-div')) {
      // 处理箭头键
      if (e.key === 'ArrowLeft') {
        if (range.startOffset === 0) {
          e.preventDefault()
          // 移动到前一个元素
          const wrapper = activeElement.closest('.input-wrapper')
          const prevElement = wrapper.previousElementSibling
          if (prevElement) {
            const newRange = document.createRange()
            newRange.setStartAfter(prevElement)
            newRange.collapse(true)
            selection.removeAllRanges()
            selection.addRange(newRange)
          }
        }
      } else if (e.key === 'ArrowRight') {
        if (range.endOffset === activeElement.textContent.length) {
          e.preventDefault()
          // 移动到后一个元素
          const wrapper = activeElement.closest('.input-wrapper')
          const nextElement = wrapper.nextElementSibling
          if (nextElement) {
            const newRange = document.createRange()
            newRange.setStartBefore(nextElement)
            newRange.collapse(true)
            selection.removeAllRanges()
            selection.addRange(newRange)
          }
        }
      }
    }
  }
}

// 添加一个辅助函数来获取节点路径
const getNodePath = (node) => {
  const path = []
  let current = node
  while (current && current !== document.body) {
    path.unshift(current.nodeName + (current.className ? `.${current.className}` : ''))
    current = current.parentNode
  }
  return path.join(' > ')
}

// 替换占位符为输入控件
const replacePlaceholderWithElement = (elementId) => {
  const elementConfig = props.elements.find(el => el.id === elementId)
  if (!elementConfig) return
  
  const placeholder = editor.value.querySelector(`[data-id="${elementId}"]`)
  if (!placeholder) return
  
  let element
  if (elementConfig.type === 'select') {
    element = document.createElement('select')
    elementConfig.options.forEach(opt => {
      const option = document.createElement('option')
      option.value = opt.value
      option.textContent = opt.label
      element.appendChild(option)
    })
    element.value = elementConfig.value
  } else {
    element = document.createElement('input')
    element.type = elementConfig.type || 'text'
    element.value = elementConfig.value
  }
  
  element.dataset.id = elementId
  placeholder.replaceWith(element)
  element.focus()
}

// 修改removeWrapperWithHistory方法
const removeWrapperWithHistory = (wrapper, isForward = false) => {
  // 创建一个临时的文本节点作为历史记录点
  const tempText = document.createTextNode('')
  wrapper.parentNode.insertBefore(tempText, wrapper)
  
  // 创建选区
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNode(wrapper)
  selection.removeAllRanges()
  selection.addRange(range)
  
  // 在删除之前执行一次空的历史记录命令
  document.execCommand('insertText', false, '')
  
  // 找到相邻的文本节点
  const siblingNode = isForward ? 
    wrapper.nextSibling : 
    wrapper.previousSibling
  
  // 删除wrapper
  if (siblingNode && siblingNode.nodeType === Node.TEXT_NODE) {
    // 如果有相邻文本节点，把光标放在文本节点的相应位置
    const newRange = document.createRange()
    if (isForward) {
      newRange.setStart(siblingNode, 0)
      newRange.setEnd(siblingNode, 0)
    } else {
      newRange.setStart(siblingNode, siblingNode.textContent.length)
      newRange.setEnd(siblingNode, siblingNode.textContent.length)
    }
    wrapper.remove()
    selection.removeAllRanges()
    selection.addRange(newRange)
  } else {
    // 如果没有相邻文本节点，创建一个零宽空格
    const textNode = document.createTextNode('\u200B')
    if (isForward) {
      wrapper.parentNode.insertBefore(textNode, wrapper.nextSibling)
    } else {
      wrapper.parentNode.insertBefore(textNode, wrapper)
    }
    wrapper.remove()
    
    const newRange = document.createRange()
    newRange.setStart(textNode, 0)
    newRange.setEnd(textNode, 0)
    selection.removeAllRanges()
    selection.addRange(newRange)
  }
  
  // 删除临时节点
  tempText.remove()
  
  // 再执行一次空的历史记录命令
  document.execCommand('insertText', false, '')
}
const initialText = ref('')
function getInitialText() {
  // 确保 editor.value 存在
  if (!editor.value) {
    console.warn('Editor element not found');
    return;
  }

  let initialContent = ''
  props.elements.forEach(el => {
    const elementHtml = createElementHtml(el)
    initialContent += elementHtml + ' '
  })
  
  // 使用 nextTick 确保 DOM 已经更新
  nextTick(() => {
    if (editor.value) {
      editor.value.innerHTML = initialContent
      // 初始化后立即提取文本并触发change事件
      initialText.value = extractTextFromHtml(initialContent)
    }
  })
}
// 修改onMounted钩子
onMounted(() => {
  // 确保 editor.value 存在
  if (!editor.value) {
    console.warn('Editor element not found');
    return;
  }

  if (props.showTemplate) {
    getInitialText()
  }

  // 使用事件委托监听input和select的事件
  editor.value.addEventListener('input', (e) => {
    const target = e.target
    if (target.tagName === 'SELECT' || target.tagName === 'INPUT' || target.classList.contains('editable-div')) {
      handleChange(editor.value.innerHTML)
    }
  })

  // 初始化 editable-div 的 placeholder 显示
  const editableDivs = editor.value.querySelectorAll('.editable-div');
  editableDivs.forEach(div => {
    if (div.textContent.trim() === '') {
      div.classList.add('showing-placeholder');
      // 确保 div 是完全空的，这样 :empty 伪类才能生效
      if (div.innerHTML !== '') {
        div.innerHTML = '';
      }
    } else {
      div.classList.remove('showing-placeholder');
    }
  });

  // 添加一个input事件监听器来确保placeholder的正确显示
  editor.value.addEventListener('input', (e) => {
    const target = e.target;
    if (target.classList && target.classList.contains('editable-div')) {
      if (target.textContent.trim() === '') {
        target.classList.add('showing-placeholder');
      } else {
        target.classList.remove('showing-placeholder');
      }
    }
  });

  // 使用事件委托处理自定义select的点击事件
  editor.value.addEventListener('click', (e) => {
    const trigger = e.target.closest('.select-trigger')
    if (trigger) {
      const customSelect = trigger.closest('.custom-select')
      customSelect.classList.toggle('open')
      
      // 添加位置计算
      if (customSelect.classList.contains('open')) {
        const options = customSelect.querySelector('.select-options')
        if (options) {
          // 获取触发器的位置
          const triggerRect = trigger.getBoundingClientRect()
          
          // 设置下拉菜单位置
          options.style.top = `${triggerRect.bottom}px`
          options.style.left = `${triggerRect.left}px`
          options.style.width = `${Math.max(triggerRect.width, 120)}px`
          
          // 检查是否会超出视窗底部
          const optionsHeight = options.offsetHeight || 200
          const viewportHeight = window.innerHeight
          
          if (triggerRect.bottom + optionsHeight > viewportHeight) {
            // 如果下拉菜单底部超出视窗，则向上显示
            options.style.top = `${triggerRect.top - optionsHeight}px`
          }
        }
      }
    }

    const option = e.target.closest('.select-option')
    if (option) {
      const customSelect = option.closest('.custom-select')
      const trigger = customSelect.querySelector('.select-trigger')
      const value = option.dataset.value
      const label = option.textContent

      // 更新选中状态
      customSelect.querySelectorAll('.select-option').forEach(opt => {
        opt.classList.remove('selected')
      })
      option.classList.add('selected')
      
      // 更新显示文本并移除 showing-placeholder 类
      trigger.textContent = label
      trigger.classList.remove('showing-placeholder')
      
      // 关闭下拉框
      customSelect.classList.remove('open')
      
      // 触发change事件
      handleChange(editor.value.innerHTML)
    }
  })

  // 点击外部关闭下拉框
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select')) {
      editor.value.querySelectorAll('.custom-select').forEach(select => {
        select.classList.remove('open')
      })
    }
  })

  // 添加事件委托处理 input-wrapper 的点击事件
  editor.value.addEventListener('click', (e) => {
    // 检查点击的是否是 input-wrapper
    const wrapper = e.target.closest('.input-wrapper');
    if (wrapper && !e.target.classList.contains('editable-div')) {
      // 如果点击的是 wrapper 但不是内部的 editable-div
      const editableDiv = wrapper.querySelector('.editable-div');
      if (editableDiv) {
        // 阻止默认行为
        e.preventDefault();
        
        // 聚焦到 editable-div
        editableDiv.focus();
        
        // 设置光标位置到 editable-div 的末尾
        const selection = window.getSelection();
        const range = document.createRange();
        
        if (editableDiv.lastChild && editableDiv.lastChild.nodeType === Node.TEXT_NODE) {
          range.setStart(editableDiv.lastChild, editableDiv.lastChild.textContent.length);
        } else {
          range.setStart(editableDiv, editableDiv.childNodes.length);
        }
        
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  });

  // 添加事件委托处理 editable-div 的 focusin 事件
  editor.value.addEventListener('focusin', (e) => {
    const target = e.target;
    if (target.classList && target.classList.contains('editable-div')) {
      // 当 editable-div 获得焦点时，临时将其父元素的 contenteditable 设为 false
      const wrapper = target.closest('.input-wrapper');
      if (wrapper) {
        wrapper.setAttribute('contenteditable', 'false');
        
        // 防止事件冒泡导致其他处理器干扰
        e.stopPropagation();
      }
    }
  });
  
  // 添加事件委托处理 editable-div 的 focusout 事件
  editor.value.addEventListener('focusout', (e) => {
    const target = e.target;
    if (target.classList && target.classList.contains('editable-div')) {
      // 当 editable-div 失去焦点时，恢复其父元素的 contenteditable 为 true
      const wrapper = target.closest('.input-wrapper');
      if (wrapper) {
        // 增加延迟时间，确保不会干扰其他操作
        setTimeout(() => {
          // 检查 editable-div 是否仍然没有焦点
          if (document.activeElement !== target) {
            wrapper.setAttribute('contenteditable', 'true');
          }
        }, 200);
      }
    }
  });
  
  // 添加事件委托处理 keydown 事件，用于处理 Backspace 键
  editor.value.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      const target = e.target;
      if (target.classList && target.classList.contains('editable-div')) {
        const wrapper = target.closest('.input-wrapper');
        if (wrapper && target.textContent.length <= 1) {
          // 如果 editable-div 内容将被完全删除，确保 wrapper 是可编辑的
          wrapper.setAttribute('contenteditable', 'true');
        }
      }
    }
  });

  // 添加一个全局点击事件监听器，防止其他事件处理器干扰
  const handleGlobalClick = (e) => {
    // 检查是否点击了 editable-div
    if (e.target.classList && e.target.classList.contains('editable-div')) {
      // 阻止事件冒泡
      e.stopPropagation();
    }
  };
  
  document.addEventListener('click', handleGlobalClick, true);
  
  // 在组件卸载时移除事件监听器
  onUnmounted(() => {
    document.removeEventListener('click', handleGlobalClick, true);
  });

  // 保存编辑器状态
  saveEditorState()
})

// 修改onUnmounted钩子
onUnmounted(() => {
  // 清理 observer
  if (window.editorObserver) {
    window.editorObserver.disconnect()
    window.editorObserver = null
  }
})
watch(() => props.elements, (newVal) => {
  console.log('newVal', newVal);
  if (props.showTemplate) {
    getInitialText()
  }
})
// 创建元素HTML
const createElementHtml = (elementConfig) => {
  if (elementConfig.type === 'plaintext') {
    return elementConfig.value
  } else if (elementConfig.type === 'select') {
    // 获取默认选中项的标签，如果没有默认值则显示占位符
    const hasValue = elementConfig.value && elementConfig.options.some(opt => opt.value === elementConfig.value);
    const displayText = hasValue 
      ? elementConfig.options.find(opt => opt.value === elementConfig.value).label 
      : (elementConfig.placeholder || '请选择');
      
    return `<span class="select-wrapper" data-id="${elementConfig.id}" contenteditable="false">
      <div class="custom-select">
        <div class="select-trigger ${!hasValue ? 'showing-placeholder' : ''}" 
             data-placeholder="${elementConfig.placeholder || '请选择'}">${displayText}</div>
        <ul class="select-options">
          ${elementConfig.options.map(opt => 
            `<li class="select-option${opt.value === elementConfig.value ? ' selected' : ''}" 
                data-value="${opt.value}">${opt.label}</li>`
          ).join('')}
        </ul>
      </div>
    </span>`
  } else if (elementConfig.type === 'date') {
    return `<span class="input-wrapper" data-id="${elementConfig.id}" contenteditable="false">
      <input type="${elementConfig.type || 'text'}" value="${elementConfig.value}" >
    </span>`
  } else if (elementConfig.type === 'text') {
    // 将 input-wrapper 设为 contenteditable="true"，这样可以被 backspace 删除
    const isEmpty = !elementConfig.value || elementConfig.value.trim() === '';
    return `<span class="input-wrapper" data-id="${elementConfig.id}" contenteditable="true">
      <div class="editable-div ${isEmpty ? 'showing-placeholder' : ''}" contenteditable="true" data-placeholder="${elementConfig.placeholder || ''}">${elementConfig.value || ''}</div>
    </span>`
  }
}

// 添加清空方法
const clearInput = () => {
  // if (editor.value) {
    editor.value.innerHTML = ''
    inputValue.value = ''
    initialText.value = ''
    handleChange('')
  // }
}

// 将 clearInput 方法暴露给父组件
defineExpose({
  clearInput,
  initialText
})

// 添加一个函数来保存编辑器状态，用于撤销恢复
const saveEditorState = () => {
  // 使用 MutationObserver 监听编辑器内容变化
  if (!window.editorObserver) {
    window.editorObserver = new MutationObserver(() => {
      // 触发内容变化
      handleChange(editor.value.innerHTML)
    })
    
    // 开始观察
    window.editorObserver.observe(editor.value, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    })
  }
}

// 添加 CSS 样式
const style = document.createElement('style');
style.textContent = `
  .editable-div.showing-placeholder:empty::before {
    content: attr(data-placeholder);
    color: rgba(0, 115, 229, 0.45);
    pointer-events: none;
  }
`;
document.head.appendChild(style);
</script>

<script>
export default {
	name: "ActiveInputTemplate",
};
</script>
<style scoped>
/* 编辑器基础样式 */
.rich-editor {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  outline: none;
  min-height: 48px;
  color: #333;
  caret-color: #0073E5; /* 统一光标颜色为蓝色 */
}

/* 统一所有可输入元素的光标样式 */
:deep(input),
:deep(.editable-div),
.rich-editor {
  caret-color: #0073E5; /* 统一光标颜色为蓝色 */
  caret-shape: bar; /* 现代浏览器支持的光标形状 */
}

/* 确保所有输入元素获得焦点时有统一的轮廓样式 */
:deep(input:focus),
:deep(.editable-div:focus),
.rich-editor:focus {
  outline: none; /* 移除默认轮廓 */
  /* 可以添加自定义轮廓效果，如果需要的话 */
  /* box-shadow: 0 0 0 2px rgba(0, 115, 229, 0.2); */
}

/* input基础样式 */
:deep(input) {
  display: inline;
  padding: 0;
  margin: 0;
  border: none;
  font-size: inherit;
}
/* input基础样式 */
:deep(input[type="date"]) {
  display: inline;
  padding: 0;
  margin: 0;
  border: 1px solid #1890ff;
  border-radius: 4px;
  font-size: inherit;
  color: #1890ff;
  background: transparent;
  outline: none;
  width: 120px;
  box-sizing: content-box;
  padding: 2px 6px;
}
/* input基础样式 */
:deep(input[type="text"]) {
  display: inline;
  padding: 0;
  margin: 0;
  border: none;
  font-size: inherit;
  color: #1890ff;
  background: transparent;
  outline: none;
  width: 4px;
  min-width: 4px;
  box-sizing: content-box;
}

/* text类型input的特殊样式 */
:deep(input[type="text"]) {
  width: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  height: auto;
  resize: none;
}

/* select-wrapper样式 - 浅蓝色带框，如"[主题]" */
.rich-editor .select-wrapper {
  display: inline;
  color: #69b1ff;
}

/* select样式 - 深蓝色带箭头 */
:deep(select) {
  display: inline;
  appearance: none;
  padding: 0 22px 0 0;
  margin: 0;
  border: none;
  font-size: inherit;
  color: #0073E5;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230052cc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
}

/* option样式 */
:deep(select option) {
  padding: 8px 12px;
  color: #333;
  background-color: #fff;
  border: none;
  font-size: 14px;
  transition: all 0.2s;
}

/* 悬停状态 */
:deep(select option:hover) {
  background-color: #f0f7ff;
  color: #0073E5;
}

/* 选中状态 */
:deep(select option:checked) {
  background-color: #e6f7ff;
  color: #0073E5;
  font-weight: 500;
}

/* 下拉框展开时的select样式 */
:deep(select:focus) {
  outline: none;
  box-shadow: none;
}

/* 下拉列表样式 */
:deep(select::-webkit-listbox) {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  box-shadow: 0 3px 6px -4px rgba(0,0,0,0.12), 
              0 6px 16px 0 rgba(0,0,0,0.08), 
              0 9px 28px 8px rgba(0,0,0,0.05);
  background-color: #fff;
  padding: 4px 0;
  margin-top: 4px;
  min-width: 120px;
}

/* select-wrapper样式 */
.rich-editor .select-wrapper {
  display: inline;
  color: #69b1ff;
  position: relative;
}

/* 添加hover效果 */
:deep(select:hover) {
  color: #40a9ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2340a9ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
}

/* 添加active效果 */
:deep(select:active) {
  color: #096dd9;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23096dd9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
}

/* 确保零宽空格不会导致不必要的间距 */
.rich-editor br {
  display: none;
}

.rich-editor br:last-child {
  display: block;
}

/* 添加一个隐藏的span用于计算宽度 */
.width-calculator {
  visibility: hidden;
  position: absolute;
  white-space: pre;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  padding: inherit;
}
:deep(.input-wrapper){
  width: fit-content;
  display: inline-block;
  padding: 4px 12px;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background: rgba(0, 115, 229, 0.04);
  margin-bottom: 4px;
}
:deep(.select-wrapper){
  width: fit-content;
  display: inline-block;
  padding: 4px 10px 4px 12px;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background: rgba(0, 115, 229, 0.04);
  margin-bottom: 4px;
}

/* date类型input的特殊样式 */
:deep(input[type="date"]::-webkit-calendar-picker-indicator) {
  filter: invert(45%) sepia(60%) saturate(2530%) hue-rotate(196deg) brightness(102%) contrast(101%); /* 转换为蓝色 #0073E5 */
  cursor: pointer;
  opacity: 1;
}

/* 悬停时的颜色 */
:deep(input[type="date"]::-webkit-calendar-picker-indicator:hover) {
  filter: invert(67%) sepia(87%) saturate(5068%) hue-rotate(198deg) brightness(101%) contrast(98%); /* 转换为浅蓝色 #40a9ff */
}

:deep(.editable-div) {
  display: inline-block;
  min-width: 1em;
  padding: 0;
  margin: 0;
  border: none;
  font-size: inherit;
  color: #1890ff;
  background: transparent;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;
  /* line-height: 1.5;
  vertical-align: middle; */
}

:deep(.input-wrapper) {
  display: inline-block;
  padding: 4px 12px;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background: rgba(0, 115, 229, 0.04);
}

:deep(.editable-div.showing-placeholder) {
  color: rgba(0, 115, 229, 0.45);
}

:deep(.editable-div:empty::before) {
  content: attr(data-placeholder);
  color: rgba(0, 115, 229, 0.45);
  pointer-events: none;
  user-select: none;
}

:deep(.editable-div:focus[data-placeholder]:empty::before) {
  content: attr(data-placeholder);
  color: rgba(0, 115, 229, 0.45);
  pointer-events: none;
}

/* 自定义select样式 */
:deep(.custom-select) {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

:deep(.select-trigger) {
  padding: 0 22px 0 0;
  color: #0073E5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230052cc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
}

:deep(.select-options) {
  position: fixed;
  z-index: 1000;
  display: none;
  min-width: 120px;
  margin-top: 4px;
  padding: 4px 0;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  box-shadow: 0 3px 6px -4px rgba(0,0,0,0.12),
              0 6px 16px 0 rgba(0,0,0,0.08),
              0 9px 28px 8px rgba(0,0,0,0.05);
  list-style: none;
  max-height: 300px;
  overflow-y: auto;
}

:deep(.custom-select.open .select-options) {
  display: block;
}

:deep(.select-option) {
  padding: 8px 12px;
  color: #333;
  transition: all 0.2s;
}

:deep(.select-option:hover) {
  background-color: #f0f7ff;
  color: #0073E5;
}

:deep(.select-option.selected) {
  background-color: #e6f7ff;
  color: #0073E5;
  font-weight: 500;
}

/* 添加 placeholder 样式 */
.rich-editor:empty::before {
  content: attr(data-placeholder);
  color: #999;
  pointer-events: none;
  color: rgba(0, 0, 0, 0.25);
  font-family: "PingFang SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.rich-editor:focus:empty::before {
  color: #bbb;
}

:deep(.select-trigger.showing-placeholder) {
  color: rgba(0, 115, 229, 0.45);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(0, 115, 229, 0.45)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
}
</style>