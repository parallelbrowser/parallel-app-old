module.exports = function newPostStore (state, emitter) {
  state.prescriptName = ''
  state.prescriptInfo = ''
  state.prescriptJS = ''
  state.prescriptCSS = ''

  state.isFooterVisible = false
  state.textareaRows = 2

  emitter.on('show-footer', () => {
    state.isFooterVisible = true
    emitter.emit('render')
  })
  emitter.on('hide-footer', () => {
    state.isFooterVisible = false
    emitter.emit('render')
  })
  emitter.on('change-post-text', text => {
    state.newPostText = text
    state.textareaRows = text.split('\n').length || 2
    emitter.emit('render')
  })

  emitter.on('change-prescriptName', text => {
    state.prescriptName = text
    state.textareaRows = text.split('\n').length || 2
    emitter.emit('render')
  })

  emitter.on('change-prescriptInfo', text => {
    state.prescriptInfo = text
    state.textareaRows = text.split('\n').length || 2
    emitter.emit('render')
  })

  emitter.on('change-prescriptJS', text => {
    state.prescriptJS = text
    state.textareaRows = text.split('\n').length || 2
    emitter.emit('render')
  })

  emitter.on('change-prescriptCSS', text => {
    state.prescriptCSS = text
    state.textareaRows = text.split('\n').length || 2
    emitter.emit('render')
  })

  emitter.on('submit-comment', async () => {
    try {
      await state.DB().broadcast(state.userProfile._origin, {comment: state.newComment})
    } catch (e) {
      console.error(e)
      return
    }

    // clear form
    state.newPostText = ''
    emitter.emit('render')
    state.loadMainFeed()
  })

  emitter.on('submit-prescript', async () => {
    try {
      await state.DB().broadcast(state.userProfile._origin, {
        prescriptName: state.prescriptName,
        prescriptInfo: state.prescriptInfo,
        prescriptJS: state.prescriptJS,
        prescriptCSS: state.prescriptCSS
      })
      state.userProfile.shopSize++
    } catch (e) {
      console.error(e)
      return
    }

    state.prescriptName = ''
    state.prescriptInfo = ''
    state.prescriptJS = ''
    state.prescriptCSS = ''

    emitter.emit('render')
    state.loadMainFeed()
  })
}
