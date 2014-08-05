CacheModalDialogView = require './cache-modal-dialog-view'

module.exports =
  cacheModalDialogView: null

  activate: (state) ->
    @cacheModalDialogView = new CacheModalDialogView(state.cacheModalDialogViewState)





  deactivate: ->
    @cacheModalDialogView.destroy()

  serialize: ->
    cacheModalDialogViewState: @cacheModalDialogView.serialize()
